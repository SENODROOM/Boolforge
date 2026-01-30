const canvas = document.getElementById('wireCanvas');
const ctx = canvas.getContext('2d');
const container = document.getElementById('canvasContainer');

let gates = [];
let wires = [];
let selectedGate = null;
let dragging = false;
let dragOffset = { x: 0, y: 0 };
let connectingFrom = null;
let gateIdCounter = 0;
let wireIdCounter = 0;

function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    drawWires();
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function addGate(type) {
    const isInput = type === 'INPUT';
    const isOutput = type === 'OUTPUT';
    const isNot = type === 'NOT' || type === 'BUFFER';

    const gate = {
        id: gateIdCounter++,
        type: type,
        x: 100 + Math.random() * 300,
        y: 100 + Math.random() * 300,
        inputs: isInput ? 0 : (isNot ? 1 : 2),
        hasOutput: !isOutput,
        output: null,
        inputValues: isInput ? [false] : [],
        element: null,
        label: type === 'INPUT' ? `IN_${gateIdCounter - 1}` :
            type === 'OUTPUT' ? `OUT_${gateIdCounter - 1}` : null
    };

    const gateEl = document.createElement('div');
    gateEl.className = 'gate' + (isOutput ? ' output-gate' : '');
    gateEl.innerHTML = `
                <div class="gate-label">${type}</div>
                <div style="font-size: 11px; color: var(--text-secondary);">ID: ${gate.id}</div>
            `;
    gateEl.style.left = gate.x + 'px';
    gateEl.style.top = gate.y + 'px';

    // Add input connection points
    if (!isInput) {
        for (let i = 0; i < gate.inputs; i++) {
            const input = document.createElement('div');
            input.className = 'connection-point input-point';
            input.style.top = (gate.inputs === 1 ? 50 : (i === 0 ? 35 : 65)) + '%';
            input.onclick = (e) => {
                e.stopPropagation();
                handleConnectionClick(gate, 'input', i);
            };
            gateEl.appendChild(input);
        }
    }

    // Add output connection point
    if (!isOutput) {
        const output = document.createElement('div');
        output.className = 'connection-point output-point';
        output.onclick = (e) => {
            e.stopPropagation();
            handleConnectionClick(gate, 'output', 0);
        };
        gateEl.appendChild(output);
    }

    gateEl.onmousedown = (e) => startDrag(e, gate);
    gateEl.oncontextmenu = (e) => {
        e.preventDefault();
        deleteGate(gate.id);
    };

    container.appendChild(gateEl);
    gate.element = gateEl;
    gates.push(gate);

    updateStats();
    updateInputControls();
    updateOutputDisplay();
}

function startDrag(e, gate) {
    if (e.target.classList.contains('connection-point')) return;
    selectedGate = gate;
    dragging = true;
    dragOffset.x = e.clientX - gate.x;
    dragOffset.y = e.clientY - gate.y;
    gate.element.classList.add('selected');
}

document.addEventListener('mousemove', (e) => {
    if (dragging && selectedGate) {
        selectedGate.x = e.clientX - dragOffset.x;
        selectedGate.y = e.clientY - dragOffset.y;
        selectedGate.element.style.left = selectedGate.x + 'px';
        selectedGate.element.style.top = selectedGate.y + 'px';
        drawWires();
    }
});

document.addEventListener('mouseup', () => {
    if (selectedGate) {
        selectedGate.element.classList.remove('selected');
    }
    dragging = false;
    selectedGate = null;
});

function handleConnectionClick(gate, type, index) {
    if (type === 'output') {
        if (connectingFrom) {
            connectingFrom = null;
            document.querySelectorAll('.connection-point').forEach(el => {
                el.classList.remove('active');
            });
        } else {
            connectingFrom = { gate, type, index };
            event.target.classList.add('active');
        }
    } else if (type === 'input' && connectingFrom) {
        if (connectingFrom.gate.id !== gate.id) {
            // Check if connection already exists
            const exists = wires.some(w =>
                w.from.id === connectingFrom.gate.id &&
                w.to.id === gate.id &&
                w.toIndex === index
            );

            if (!exists) {
                wires.push({
                    id: wireIdCounter++,
                    from: connectingFrom.gate,
                    to: gate,
                    toIndex: index
                });
                drawWires();
                updateStats();
                updateOutputDisplay();
            }
        }
        document.querySelectorAll('.connection-point').forEach(el => {
            el.classList.remove('active');
        });
        connectingFrom = null;
    }
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on a wire
    for (let i = wires.length - 1; i >= 0; i--) {
        const wire = wires[i];
        if (isPointNearWire(x, y, wire)) {
            if (confirm('Delete this wire?')) {
                wires.splice(i, 1);
                drawWires();
                updateStats();
                updateOutputDisplay();
            }
            break;
        }
    }
});

function isPointNearWire(x, y, wire) {
    const fromGate = wire.from;
    const toGate = wire.to;

    const fromX = fromGate.x + fromGate.element.offsetWidth;
    const fromY = fromGate.y + fromGate.element.offsetHeight / 2;

    const toX = toGate.x;
    const toY = toGate.y + (toGate.inputs === 1 ?
        toGate.element.offsetHeight / 2 :
        toGate.element.offsetHeight * (wire.toIndex === 0 ? 0.35 : 0.65));

    // Simple distance check to curve
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const bezierX = Math.pow(1 - t, 3) * fromX +
            3 * Math.pow(1 - t, 2) * t * ((fromX + toX) / 2) +
            3 * (1 - t) * Math.pow(t, 2) * ((fromX + toX) / 2) +
            Math.pow(t, 3) * toX;
        const bezierY = Math.pow(1 - t, 3) * fromY +
            3 * Math.pow(1 - t, 2) * t * fromY +
            3 * (1 - t) * Math.pow(t, 2) * toY +
            Math.pow(t, 3) * toY;

        const dist = Math.sqrt(Math.pow(x - bezierX, 2) + Math.pow(y - bezierY, 2));
        if (dist < 8) return true;
    }
    return false;
}

function drawWires() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    wires.forEach(wire => {
        const fromGate = wire.from;
        const toGate = wire.to;

        const fromX = fromGate.x + fromGate.element.offsetWidth;
        const fromY = fromGate.y + fromGate.element.offsetHeight / 2;

        const toX = toGate.x;
        const toY = toGate.y + (toGate.inputs === 1 ?
            toGate.element.offsetHeight / 2 :
            toGate.element.offsetHeight * (wire.toIndex === 0 ? 0.35 : 0.65));

        const value = evaluateGate(fromGate);
        ctx.strokeStyle = value ? '#00ff88' : '#334155';
        ctx.lineWidth = 3;
        ctx.shadowBlur = value ? 10 : 0;
        ctx.shadowColor = value ? '#00ff88' : 'transparent';

        ctx.beginPath();
        ctx.moveTo(fromX, fromY);

        const midX = (fromX + toX) / 2;
        ctx.bezierCurveTo(
            midX, fromY,
            midX, toY,
            toX, toY
        );

        ctx.stroke();
        ctx.shadowBlur = 0;
    });
}

function evaluateGate(gate) {
    if (gate.type === 'INPUT') {
        return gate.inputValues[0] || false;
    }

    const inputWires = wires.filter(w => w.to.id === gate.id);
    const inputs = new Array(gate.inputs).fill(false);

    inputWires.forEach(wire => {
        inputs[wire.toIndex] = evaluateGate(wire.from);
    });

    switch (gate.type) {
        case 'AND':
            return inputs[0] && inputs[1];
        case 'OR':
            return inputs[0] || inputs[1];
        case 'NOT':
            return !inputs[0];
        case 'NAND':
            return !(inputs[0] && inputs[1]);
        case 'NOR':
            return !(inputs[0] || inputs[1]);
        case 'XOR':
            return inputs[0] !== inputs[1];
        case 'XNOR':
            return inputs[0] === inputs[1];
        case 'BUFFER':
            return inputs[0];
        case 'OUTPUT':
            return inputs[0] || false;
        default:
            return false;
    }
}

function updateInputControls() {
    const inputGates = gates.filter(g => g.type === 'INPUT');
    const container = document.getElementById('inputControls');
    container.innerHTML = '';

    if (inputGates.length > 0) {
        const title = document.createElement('h3');
        title.textContent = 'INPUTS';
        title.style.fontSize = '12px';
        title.style.color = 'var(--accent-primary)';
        title.style.marginBottom = '8px';
        title.style.letterSpacing = '1px';
        container.appendChild(title);
    }

    inputGates.forEach(gate => {
        const div = document.createElement('div');
        div.className = 'input-toggle';
        div.innerHTML = `
                    <label>INPUT ${gate.id}</label>
                    <div class="toggle-btn ${gate.inputValues[0] ? 'on' : ''}" onclick="toggleInput(${gate.id})"></div>
                `;
        container.appendChild(div);
    });
}

function updateOutputDisplay() {
    const outputGates = gates.filter(g => g.type === 'OUTPUT');
    const container = document.getElementById('outputDisplay');
    container.innerHTML = '';

    if (outputGates.length > 0) {
        const title = document.createElement('h3');
        title.textContent = 'OUTPUTS';
        container.appendChild(title);

        outputGates.forEach(gate => {
            const value = evaluateGate(gate);
            const div = document.createElement('div');
            div.className = 'output-item';
            div.innerHTML = `
                        <label>OUTPUT ${gate.id}</label>
                        <div class="output-value ${value ? 'high' : 'low'}">${value ? '1' : '0'}</div>
                    `;
            container.appendChild(div);

            // Update gate appearance
            if (value) {
                gate.element.classList.add('active');
            } else {
                gate.element.classList.remove('active');
            }
        });
    }
}

function toggleInput(gateId) {
    const gate = gates.find(g => g.id === gateId);
    if (gate) {
        gate.inputValues[0] = !gate.inputValues[0];
        updateInputControls();
        updateOutputDisplay();
        drawWires();
        generateTruthTable();
    }
}

function generateTruthTable() {
    const inputGates = gates.filter(g => g.type === 'INPUT');
    const outputGates = gates.filter(g => g.type === 'OUTPUT');

    if (inputGates.length === 0 || outputGates.length === 0) {
        document.getElementById('truthTableContainer').innerHTML =
            '<p style="color: var(--text-secondary); font-size: 12px;">Add INPUT and OUTPUT gates and connect them to see the truth table.</p>';
        return;
    }

    const numCombinations = Math.pow(2, inputGates.length);
    let tableHTML = '<table><thead><tr>';

    inputGates.forEach(g => {
        tableHTML += `<th>IN ${g.id}</th>`;
    });

    outputGates.forEach(g => {
        tableHTML += `<th>OUT ${g.id}</th>`;
    });

    tableHTML += '</tr></thead><tbody>';

    for (let i = 0; i < numCombinations; i++) {
        tableHTML += '<tr>';

        for (let j = 0; j < inputGates.length; j++) {
            const value = !!(i & (1 << (inputGates.length - 1 - j)));
            inputGates[j].inputValues[0] = value;
            tableHTML += `<td>${value ? '1' : '0'}</td>`;
        }

        outputGates.forEach(g => {
            const output = evaluateGate(g);
            tableHTML += `<td style="color: ${output ? 'var(--accent-primary)' : 'var(--text-secondary)'}">${output ? '1' : '0'}</td>`;
        });

        tableHTML += '</tr>';
    }

    tableHTML += '</tbody></table>';
    document.getElementById('truthTableContainer').innerHTML = tableHTML;

    updateInputControls();
    updateOutputDisplay();
    drawWires();
}

function saveCircuit() {
    const circuitData = {
        gates: gates.map(g => ({
            id: g.id,
            type: g.type,
            x: g.x,
            y: g.y,
            inputValues: g.inputValues,
            label: g.label
        })),
        wires: wires.map(w => ({
            id: w.id,
            fromId: w.from.id,
            toId: w.to.id,
            toIndex: w.toIndex
        })),
        gateIdCounter,
        wireIdCounter
    };

    const json = JSON.stringify(circuitData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logic-circuit-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function loadCircuit() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const circuitData = JSON.parse(event.target.result);

                clearAll();

                gateIdCounter = circuitData.gateIdCounter || 0;
                wireIdCounter = circuitData.wireIdCounter || 0;

                // Restore gates
                circuitData.gates.forEach(gData => {
                    const isInput = gData.type === 'INPUT';
                    const isOutput = gData.type === 'OUTPUT';
                    const isNot = gData.type === 'NOT' || gData.type === 'BUFFER';

                    const gate = {
                        id: gData.id,
                        type: gData.type,
                        x: gData.x,
                        y: gData.y,
                        inputs: isInput ? 0 : (isNot ? 1 : 2),
                        hasOutput: !isOutput,
                        output: null,
                        inputValues: gData.inputValues || (isInput ? [false] : []),
                        element: null,
                        label: gData.label
                    };

                    const gateEl = document.createElement('div');
                    gateEl.className = 'gate' + (isOutput ? ' output-gate' : '');
                    gateEl.innerHTML = `
                                <div class="gate-label">${gData.type}</div>
                                <div style="font-size: 11px; color: var(--text-secondary);">ID: ${gate.id}</div>
                            `;
                    gateEl.style.left = gate.x + 'px';
                    gateEl.style.top = gate.y + 'px';

                    if (!isInput) {
                        for (let i = 0; i < gate.inputs; i++) {
                            const input = document.createElement('div');
                            input.className = 'connection-point input-point';
                            input.style.top = (gate.inputs === 1 ? 50 : (i === 0 ? 35 : 65)) + '%';
                            input.onclick = (e) => {
                                e.stopPropagation();
                                handleConnectionClick(gate, 'input', i);
                            };
                            gateEl.appendChild(input);
                        }
                    }

                    if (!isOutput) {
                        const output = document.createElement('div');
                        output.className = 'connection-point output-point';
                        output.onclick = (e) => {
                            e.stopPropagation();
                            handleConnectionClick(gate, 'output', 0);
                        };
                        gateEl.appendChild(output);
                    }

                    gateEl.onmousedown = (e) => startDrag(e, gate);
                    gateEl.oncontextmenu = (e) => {
                        e.preventDefault();
                        deleteGate(gate.id);
                    };

                    container.appendChild(gateEl);
                    gate.element = gateEl;
                    gates.push(gate);
                });

                // Restore wires
                circuitData.wires.forEach(wData => {
                    const fromGate = gates.find(g => g.id === wData.fromId);
                    const toGate = gates.find(g => g.id === wData.toId);

                    if (fromGate && toGate) {
                        wires.push({
                            id: wData.id,
                            from: fromGate,
                            to: toGate,
                            toIndex: wData.toIndex
                        });
                    }
                });

                updateStats();
                updateInputControls();
                updateOutputDisplay();
                drawWires();

            } catch (error) {
                alert('Error loading circuit: ' + error.message);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function deleteGate(gateId) {
    wires = wires.filter(w => w.from.id !== gateId && w.to.id !== gateId);
    const gate = gates.find(g => g.id === gateId);
    if (gate && gate.element) {
        gate.element.remove();
    }
    gates = gates.filter(g => g.id !== gateId);
    updateStats();
    updateInputControls();
    updateOutputDisplay();
    drawWires();
}

function clearAll() {
    gates.forEach(g => g.element && g.element.remove());
    gates = [];
    wires = [];
    connectingFrom = null;
    updateStats();
    updateInputControls();
    updateOutputDisplay();
    drawWires();
    document.getElementById('truthTableContainer').innerHTML =
        '<p style="color: var(--text-secondary); font-size: 12px;">Add INPUT and OUTPUT gates and connect them to see the truth table.</p>';
}

function updateStats() {
    document.getElementById('gateCount').textContent = gates.length;
    document.getElementById('wireCount').textContent = wires.length;
    document.getElementById('inputCount').textContent = gates.filter(g => g.type === 'INPUT').length;
    document.getElementById('outputCount').textContent = gates.filter(g => g.type === 'OUTPUT').length;
}

setInterval(() => {
    drawWires();
    updateOutputDisplay();
}, 100);