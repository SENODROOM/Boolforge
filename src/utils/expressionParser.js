// Utility to parse Boolean expression and generate circuit
export const parseExpressionToCircuit = (expression, variables) => {
    if (!expression || expression === 'F = 0' || expression === 'F = 1') {
        return { gates: [], wires: [] };
    }

    // Remove "F = " prefix
    let expr = expression.replace(/^F\s*=\s*/, '').trim();
    // Normalize explicit AND operators to a single symbol and remove spaces
    expr = expr.replace(/[•.*]/g, '•').replace(/\s+/g, '');

    // Helper: split at top-level by a separator (ignoring parentheses)
    const splitTopLevel = (str, sep) => {
        const parts = [];
        let depth = 0;
        let last = 0;
        for (let i = 0; i < str.length; i++) {
            const ch = str[i];
            if (ch === '(') depth++;
            else if (ch === ')') depth = Math.max(0, depth - 1);
            else if (ch === sep && depth === 0) {
                parts.push(str.slice(last, i));
                last = i + 1;
            }
        }
        parts.push(str.slice(last));
        return parts.filter(p => p.length > 0);
    };

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

    // Parse factors within a product term
    const parseProduct = (term, termIndex) => {
        const factors = [];
        for (let i = 0; i < term.length; i++) {
            const ch = term[i];
            if (ch === '(') {
                // Parse inner parenthesized expression (may have trailing ')
                let j = i + 1;
                let depth = 1;
                while (j < term.length && depth > 0) {
                    if (term[j] === '(') depth++;
                    else if (term[j] === ')') depth--;
                    j++;
                }
                const inner = term.slice(i + 1, j - 1);
                const hasNot = j < term.length && term[j] === "'";
                // Build sub-expression gate (OR of inner terms or product)
                const subGateId = buildSubExpression(inner, termIndex);
                let sourceId = subGateId;
                if (hasNot) {
                    const notGate = {
                        id: gateId++,
                        type: 'NOT',
                        label: `(${inner})'`,
                        x: 550,
                        y: termStartY + termIndex * termSpacing,
                        inputs: 1,
                        hasOutput: true,
                        inputValues: []
                    };
                    gates.push(notGate);
                    wires.push({ id: wireId++, fromId: subGateId, toId: notGate.id, toIndex: 0 });
                    sourceId = notGate.id;
                    i = j; // consumed ')'
                } else {
                    i = j - 1; // consumed ')'
                }
                factors.push({ type: 'gate', id: sourceId });
            } else if (ch === '•') {
                // explicit AND separator, skip
            } else {
                // Variable or constant possibly with apostrophe
                let token = ch;
                if (i + 1 < term.length && term[i + 1] === "'") {
                    token += "'";
                    i++;
                }
                factors.push({ type: 'literal', token });
            }
        }

        if (factors.length === 0) return null;
        if (factors.length === 1) {
            const f = factors[0];
            if (f.type === 'gate') return f.id;
            const variable = f.token.replace("'", "");
            const isInverted = f.token.includes("'");
            if (variable === '1' || variable === '0') {
                const constGate = {
                    id: gateId++,
                    type: 'INPUT',
                    label: variable,
                    x: 450,
                    y: termStartY + termIndex * termSpacing,
                    inputs: 0,
                    hasOutput: true,
                    inputValues: [variable === '1']
                };
                gates.push(constGate);
                return constGate.id;
            }
            return isInverted ? notGates[variable] : inputGates[variable];
        }

        // Build AND chain for multiple factors
        const andGateBase = {
            id: gateId++,
            type: 'AND',
            label: `AND${termIndex}`,
            x: 450,
            y: termStartY + termIndex * termSpacing,
            inputs: 2,
            hasOutput: true,
            inputValues: []
        };
        gates.push(andGateBase);

        const getSourceId = (factor) => {
            if (factor.type === 'gate') return factor.id;
            const variable = factor.token.replace("'", "");
            const isInverted = factor.token.includes("'");
            if (variable === '1' || variable === '0') {
                const constGate = {
                    id: gateId++,
                    type: 'INPUT',
                    label: variable,
                    x: 450,
                    y: termStartY + termIndex * termSpacing,
                    inputs: 0,
                    hasOutput: true,
                    inputValues: [variable === '1']
                };
                gates.push(constGate);
                return constGate.id;
            }
            return isInverted ? notGates[variable] : inputGates[variable];
        };

        const firstTwo = factors.slice(0, 2);
        firstTwo.forEach((f, idx) => {
            wires.push({
                id: wireId++,
                fromId: getSourceId(f),
                toId: andGateBase.id,
                toIndex: idx
            });
        });

        let currentAndGate = andGateBase;
        for (let idx = 2; idx < factors.length; idx++) {
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
            wires.push({ id: wireId++, fromId: currentAndGate.id, toId: nextAndGate.id, toIndex: 0 });
            wires.push({ id: wireId++, fromId: getSourceId(factors[idx]), toId: nextAndGate.id, toIndex: 1 });
            currentAndGate = nextAndGate;
        }
        return currentAndGate.id;
    };

    // Build sub-expression for parentheses (returns gate id)
    const buildSubExpression = (inner, termIndex) => {
        const innerTerms = splitTopLevel(inner, '+');
        const innerTermGateIds = innerTerms.map(t => parseProduct(t, termIndex)).filter(Boolean);
        if (innerTermGateIds.length === 0) return null;
        if (innerTermGateIds.length === 1) return innerTermGateIds[0];
        // Chain OR gates
        let currentOrGate = {
            id: gateId++,
            type: 'OR',
            label: `OR${termIndex}_0`,
            x: 650,
            y: termStartY + termIndex * termSpacing,
            inputs: 2,
            hasOutput: true,
            inputValues: []
        };
        gates.push(currentOrGate);
        wires.push({ id: wireId++, fromId: innerTermGateIds[0], toId: currentOrGate.id, toIndex: 0 });
        wires.push({ id: wireId++, fromId: innerTermGateIds[1], toId: currentOrGate.id, toIndex: 1 });
        for (let i = 2; i < innerTermGateIds.length; i++) {
            const nextOrGate = {
                id: gateId++,
                type: 'OR',
                label: `OR${termIndex}_${i - 1}`,
                x: 650 + (i - 1) * 150,
                y: termStartY + termIndex * termSpacing,
                inputs: 2,
                hasOutput: true,
                inputValues: []
            };
            gates.push(nextOrGate);
            wires.push({ id: wireId++, fromId: currentOrGate.id, toId: nextOrGate.id, toIndex: 0 });
            wires.push({ id: wireId++, fromId: innerTermGateIds[i], toId: nextOrGate.id, toIndex: 1 });
            currentOrGate = nextOrGate;
        }
        return currentOrGate.id;
    };

    const terms = splitTopLevel(expr, '+');

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
        if (term === '0') {
            const constGate = {
                id: gateId++,
                type: 'INPUT',
                label: '0',
                x: 450,
                y: termStartY + termIndex * termSpacing,
                inputs: 0,
                hasOutput: true,
                inputValues: [false]
            };
            gates.push(constGate);
            termGates.push(constGate.id);
            return;
        }

        const gateIdForTerm = parseProduct(term, termIndex);
        if (gateIdForTerm !== null && gateIdForTerm !== undefined) {
            termGates.push(gateIdForTerm);
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
