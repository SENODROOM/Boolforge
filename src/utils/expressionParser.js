// Utility to parse Boolean expression and generate circuit
export const parseExpressionToCircuit = (expression, variables) => {
    if (!expression || expression === 'F = 0' || expression === 'F = 1') {
        return { gates: [], wires: [] };
    }

    // Remove "F = " prefix
    const expr = expression.replace(/^F\s*=\s*/, '').trim();

    // Split by OR operator (+)
    const terms = expr.split('+').map(t => t.trim());

    const gates = [];
    const wires = [];
    let gateId = 0;
    let wireId = 0;

    // Calculate layout parameters
    const inputSpacing = 140;
    const termSpacing = 150;
    const inputStartY = 100;
    const termStartY = 100;

    // Create input gates for each variable
    const inputGates = {};
    variables.forEach((variable, index) => {
        const inputGate = {
            id: gateId++,
            type: 'INPUT',
            label: variable,
            x: 50,
            y: inputStartY + index * inputSpacing,
            inputs: 0,
            hasOutput: true,
            inputValues: [false]
        };
        gates.push(inputGate);
        inputGates[variable] = inputGate.id;
    });

    // Create NOT gates for inverted variables (A', B', etc.)
    const notGates = {};
    variables.forEach((variable, index) => {
        const notGate = {
            id: gateId++,
            type: 'NOT',
            label: `${variable}'`,
            x: 250,
            y: inputStartY + index * inputSpacing,
            inputs: 1,
            hasOutput: true,
            inputValues: []
        };
        gates.push(notGate);
        notGates[variable] = notGate.id;

        // Connect input to NOT gate
        wires.push({
            id: wireId++,
            fromId: inputGates[variable],
            toId: notGate.id,
            toIndex: 0
        });
    });

    // Process each term
    const termGates = [];

    terms.forEach((term, termIndex) => {
        if (term === '1') {
            // Constant 1 - create a special input
            const constGate = {
                id: gateId++,
                type: 'INPUT',
                label: '1',
                x: 450,
                y: termStartY + termIndex * termSpacing,
                inputs: 0,
                hasOutput: true,
                inputValues: [true]
            };
            gates.push(constGate);
            termGates.push(constGate.id);
            return;
        }

        // Parse literals in the term (e.g., "AB'C" -> ["A", "B'", "C"])
        const literals = [];
        let i = 0;
        while (i < term.length) {
            if (term[i] === ' ') {
                i++;
                continue;
            }

            let literal = term[i];
            if (i + 1 < term.length && term[i + 1] === "'") {
                literal += "'";
                i += 2;
            } else {
                i++;
            }
            literals.push(literal);
        }

        if (literals.length === 0) return;

        if (literals.length === 1) {
            // Single literal - just use the input or NOT gate
            const literal = literals[0];
            const variable = literal.replace("'", "");
            const isInverted = literal.includes("'");

            termGates.push(isInverted ? notGates[variable] : inputGates[variable]);
        } else {
            // Multiple literals - need AND gate
            const andGate = {
                id: gateId++,
                type: 'AND',
                label: `AND${termIndex}`,
                x: 450,
                y: termStartY + termIndex * termSpacing,
                inputs: 2,
                hasOutput: true,
                inputValues: []
            };
            gates.push(andGate);

            if (literals.length === 2) {
                // Two inputs - direct connection
                literals.forEach((literal, idx) => {
                    const variable = literal.replace("'", "");
                    const isInverted = literal.includes("'");
                    const sourceId = isInverted ? notGates[variable] : inputGates[variable];

                    wires.push({
                        id: wireId++,
                        fromId: sourceId,
                        toId: andGate.id,
                        toIndex: idx
                    });
                });

                termGates.push(andGate.id);
            } else {
                // More than 2 inputs - need to chain AND gates
                let currentAndGate = andGate;

                // Connect first two literals to the first AND gate
                for (let idx = 0; idx < 2; idx++) {
                    const literal = literals[idx];
                    const variable = literal.replace("'", "");
                    const isInverted = literal.includes("'");
                    const sourceId = isInverted ? notGates[variable] : inputGates[variable];

                    wires.push({
                        id: wireId++,
                        fromId: sourceId,
                        toId: currentAndGate.id,
                        toIndex: idx
                    });
                }

                // Chain additional AND gates for remaining literals
                for (let idx = 2; idx < literals.length; idx++) {
                    const nextAndGate = {
                        id: gateId++,
                        type: 'AND',
                        label: `AND${termIndex}_${idx}`,
                        x: 450 + (idx - 1) * 150,
                        y: termStartY + termIndex * termSpacing,
                        inputs: 2,
                        hasOutput: true,
                        inputValues: []
                    };
                    gates.push(nextAndGate);

                    // Connect previous AND output to new AND input 0
                    wires.push({
                        id: wireId++,
                        fromId: currentAndGate.id,
                        toId: nextAndGate.id,
                        toIndex: 0
                    });

                    // Connect literal to new AND input 1
                    const literal = literals[idx];
                    const variable = literal.replace("'", "");
                    const isInverted = literal.includes("'");
                    const sourceId = isInverted ? notGates[variable] : inputGates[variable];

                    wires.push({
                        id: wireId++,
                        fromId: sourceId,
                        toId: nextAndGate.id,
                        toIndex: 1
                    });

                    currentAndGate = nextAndGate;
                }

                termGates.push(currentAndGate.id);
            }
        }
    });

    // Create OR gate to combine all terms (if more than one term)
    let outputSourceId;

    if (termGates.length === 0) {
        return { gates, wires };
    } else if (termGates.length === 1) {
        // Single term - connect directly to output
        outputSourceId = termGates[0];
    } else {
        // Multiple terms - need OR gates
        if (termGates.length === 2) {
            // Two terms - single OR gate
            const orGate = {
                id: gateId++,
                type: 'OR',
                label: 'OR',
                x: 650,
                y: inputStartY + ((termGates.length - 1) * termSpacing) / 2,
                inputs: 2,
                hasOutput: true,
                inputValues: []
            };
            gates.push(orGate);

            // Connect terms to OR gate
            termGates.forEach((termGateId, idx) => {
                wires.push({
                    id: wireId++,
                    fromId: termGateId,
                    toId: orGate.id,
                    toIndex: idx
                });
            });

            outputSourceId = orGate.id;
        } else {
            // More than 2 terms - chain OR gates
            let currentOrGate = {
                id: gateId++,
                type: 'OR',
                label: 'OR0',
                x: 650,
                y: termStartY,
                inputs: 2,
                hasOutput: true,
                inputValues: []
            };
            gates.push(currentOrGate);

            // Connect first two terms
            wires.push({
                id: wireId++,
                fromId: termGates[0],
                toId: currentOrGate.id,
                toIndex: 0
            });
            wires.push({
                id: wireId++,
                fromId: termGates[1],
                toId: currentOrGate.id,
                toIndex: 1
            });

            // Chain additional OR gates
            for (let i = 2; i < termGates.length; i++) {
                const nextOrGate = {
                    id: gateId++,
                    type: 'OR',
                    label: `OR${i - 1}`,
                    x: 650 + (i - 1) * 150,
                    y: termStartY + i * 60,
                    inputs: 2,
                    hasOutput: true,
                    inputValues: []
                };
                gates.push(nextOrGate);

                // Connect previous OR to new OR input 0
                wires.push({
                    id: wireId++,
                    fromId: currentOrGate.id,
                    toId: nextOrGate.id,
                    toIndex: 0
                });

                // Connect term to new OR input 1
                wires.push({
                    id: wireId++,
                    fromId: termGates[i],
                    toId: nextOrGate.id,
                    toIndex: 1
                });

                currentOrGate = nextOrGate;
            }

            outputSourceId = currentOrGate.id;
        }
    }

    // Create output gate
    const outputGate = {
        id: gateId++,
        type: 'OUTPUT',
        label: 'Z',
        x: 850,
        y: inputStartY + ((termGates.length - 1) * termSpacing) / 2,
        inputs: 1,
        hasOutput: false,
        inputValues: []
    };
    gates.push(outputGate);

    // Connect to output
    wires.push({
        id: wireId++,
        fromId: outputSourceId,
        toId: outputGate.id,
        toIndex: 0
    });

    return {
        gates,
        wires,
        gateIdCounter: gateId,
        wireIdCounter: wireId,
        inputCounter: variables.length,
        outputCounter: 1
    };
};