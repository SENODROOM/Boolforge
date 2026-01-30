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

// Smooth drag and drop configuration
const GRID_SIZE = 20;
const SNAP_TO_GRID = true;
const DRAG_SMOOTHING = 0.3;
let targetX = 0;
let targetY = 0;

function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    drawWires();
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Logic gate symbols as SVG paths
const gateSymbols = {
    'AND': `
        <svg viewBox="0 0 80 60" class="gate-symbol">
            <path d="M 10 10 L 10 50 L 40 50 Q 65 50 65 30 Q 65 10 40 10 Z" 
                  fill="none" stroke="currentColor" stroke-width="2.5"/>
            <line x1="2" y1="22" x2="10" y2="22" stroke="currentColor" stroke-width="2"/>
            <line x1="2" y1="38" x2="10" y2="38" stroke="currentColor" stroke-width="2"/>
            <line x1="65" y1="30" x2="78" y2="30" stroke="currentColor" stroke-width="2"/>
        </svg>
    `,
    'OR': `
        <svg viewBox="0 0 80 60" class="gate-symbol">
            <path d="M 10 10 Q 25 10 40 30 Q 25 50 10 50 Q 20 30 10 10 Z" 
                  fill="none" stroke="currentColor" stroke-width="2.5"/>
            <path d="M 40 30 Q 60 30 65 30" fill="none" stroke="currentColor" stroke-width="2.5"/>
            <line x1="2" y1="22" x2="10" y2="22" stroke="currentColor" stroke-width="2"/>
            <line x1="2" y1="38" x2="10" y2="38" stroke="currentColor" stroke-width="2"/>
            <line x1="65" y1="30" x2="78" y2="30" stroke="currentColor" stroke-width="2"/>
        </svg>
    `,
    'NOT': `
        <svg viewBox="0 0 80 60" class="gate-symbol">
            <path d="M 10 15 L 10 45 L 55 30 Z" 
                  fill="none" stroke="currentColor" stroke-width="2.5"/>
            <circle cx="60" cy="30" r="5" fill="none" stroke="currentColor" stroke-width="2.5"/>
            <line x1="2" y1="30" x2="10" y2="30" stroke="currentColor" stroke-width="2"/>
            <line x1="65" y1="30" x2="78" y2="30" stroke="currentColor" stroke-width="2"/>
        </svg>
    `,
    'NAND': `
        <svg viewBox="0 0 80 60" class="gate-symbol">
            <path d="M 10 10 L 10 50 L 40 50 Q 60 50 60 30 Q 60 10 40 10 Z" 
                  fill="none" stroke="currentColor" stroke-width="2.5"/>
            <circle cx="65" cy="30" r="5" fill="none" stroke="currentColor" stroke-width="2.5"/>
            <line x1="2" y1="22" x2="10" y2="22" stroke="currentColor" stroke-width="2"/>
            <line x1="2" y1="38" x2="10" y2="38" stroke="currentColor" stroke-width="2"/>
            <line x1="70" y1="30" x2="78" y2="30" stroke="currentColor" stroke-width="2"/>
        </svg>
    `,
    'NOR': `
        <svg viewBox="0 0 80 60" class="gate-symbol">
            <path d="M 10 10 Q 25 10 40 30 Q 25 50 10 50 Q 20 30 10 10 Z" 
                  fill="none" stroke="currentColor" stroke-width="2.5"/>
            <path d="M 40 30 Q 55 30 60 30" fill="none" stroke="currentColor" stroke-width="2.5"/>
            <circle cx="65" cy="30" r="5" fill="none" stroke="currentColor" stroke-width="2.5"/>
            <line x1="2" y1="22" x2="10" y2="22" stroke="currentColor" stroke-width="2"/>
            <line x1="2" y1="38" x2="10" y2="38" stroke="currentColor" stroke-width="2"/>
            <line x1="70" y1="30" x2="78" y2="30" stroke="currentColor" stroke-width="2"/>
        </svg>
    `,
    'XOR': `
        <svg viewBox="0 0 80 60" class="gate-symbol">
            <path d="M 5 10 Q 15 30 5 50" fill="none" stroke="currentColor" stroke-width="2"/>
            <path d="M 10 10 Q 25 10 40 30 Q 25 50 10 50 Q 20 30 10 10 Z" 
                  fill="none" stroke="currentColor" stroke-width="2.5"/>
            <path d="M 40 30 Q 60 30 65 30" fill="none" stroke="currentColor" stroke-width="2.5"/>
            <line x1="2" y1="22" x2="10" y2="22" stroke="currentColor" stroke-width="2"/>
            <line x1="2" y1="38" x2="10" y2="38" stroke="currentColor" stroke-width="2"/>
            <line x1="65" y1="30" x2="78" y2="30" stroke="currentColor" stroke-width="2"/>
        </svg>
    `,
    'XNOR': `
        <svg viewBox="0 0 80 60" class="gate-symbol">
            <path d="M 5 10 Q 15 30 5 50" fill="none" stroke="currentColor" stroke-width="2"/>
            <path d="M 10 10 Q 25 10 40 30 Q 25 50 10 50 Q 20 30 10 10 Z" 
                  fill="none" stroke="currentColor" stroke-width="2.5"/>
            <path d="M 40 30 Q 55 30 60 30" fill="none" stroke="currentColor" stroke-width="2.5"/>
            <circle cx="65" cy="30" r="5" fill="none" stroke="currentColor" stroke-width="2.5"/>
            <line x1="2" y1="22" x2="10" y2="22" stroke="currentColor" stroke-width="2"/>
            <line x1="2" y1="38" x2="10" y2="38" stroke="currentColor" stroke-width="2"/>
            <line x1="70" y1="30" x2="78" y2="30" stroke="currentColor" stroke-width="2"/>
        </svg>
    `,
    'BUFFER': `
        <svg viewBox="0 0 80 60" class="gate-symbol">
            <path d="M 10 15 L 10 45 L 65 30 Z" 
                  fill="none" stroke="currentColor" stroke-width="2.5"/>
            <line x1="2" y1="30" x2="10" y2="30" stroke="currentColor" stroke-width="2"/>
            <line x1="65" y1="30" x2="78" y2="30" stroke="currentColor" stroke-width="2"/>
        </svg>
    `,
    'INPUT': `
        <svg viewBox="0 0 80 60" class="gate-symbol">
            <rect x="15" y="20" width="50" height="20" rx="3" 
                  fill="none" stroke="currentColor" stroke-width="2.5"/>
            <line x1="65" y1="30" x2="78" y2="30" stroke="currentColor" stroke-width="2"/>
        </svg>
    `,
    'OUTPUT': `
        <svg viewBox="0 0 80 60" class="gate-symbol">
            <rect x="15" y="20" width="50" height="20" rx="3" 
                  fill="none" stroke="currentColor" stroke-width="2.5"/>
            <line x1="2" y1="30" x2="15" y2="30" stroke="currentColor" stroke-width="2"/>
        </svg>
    `
};

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

    // Add gate symbol
    const symbolHTML = gateSymbols[type] || '';

    gateEl.innerHTML = `
        <div class="gate-content">
            ${symbolHTML}
            <div class="gate-label">${type}</div>
        </div>
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

function snapToGrid(value) {
    return SNAP_TO_GRID ? Math.round(value / GRID_SIZE) * GRID_SIZE : value;
}

function startDrag(e, gate) {
    if (e.target.classList.contains('connection-point')) return;

    selectedGate = gate;
    dragging = true;
    dragOffset.x = e.clientX - gate.x;
    dragOffset.y = e.clientY - gate.y;

    // Set initial target position
    targetX = gate.x;
    targetY = gate.y;

    gate.element.classList.add('selected');
    gate.element.style.cursor = 'grabbing';

    // Add visual feedback
    gate.element.style.transform = 'scale(1.05)';
    gate.element.style.zIndex = '1000';
}

// Smooth animation loop for dragging
function smoothDrag() {
    if (dragging && selectedGate) {
        // Interpolate towards target position
        const dx = targetX - selectedGate.x;
        const dy = targetY - selectedGate.y;

        selectedGate.x += dx * DRAG_SMOOTHING;
        selectedGate.y += dy * DRAG_SMOOTHING;

        selectedGate.element.style.left = selectedGate.x + 'px';
        selectedGate.element.style.top = selectedGate.y + 'px';

        drawWires();
    }
    requestAnimationFrame(smoothDrag);
}

// Start the smooth drag animation loop
smoothDrag();

document.addEventListener('mousemove', (e) => {
    if (dragging && selectedGate) {
        // Update target position with optional grid snapping
        const rawX = e.clientX - dragOffset.x;
        const rawY = e.clientY - dragOffset.y;

        // Constrain to canvas bounds
        const bounds = container.getBoundingClientRect();
        const maxX = bounds.width - selectedGate.element.offsetWidth;
        const maxY = bounds.height - selectedGate.element.offsetHeight;

        targetX = snapToGrid(Math.max(0, Math.min(maxX, rawX)));
        targetY = snapToGrid(Math.max(0, Math.min(maxY, rawY)));

        // Show snap guide if enabled
        if (SNAP_TO_GRID) {
            selectedGate.element.classList.add('snapping');
        }
    }
});

document.addEventListener('mouseup', () => {
    if (selectedGate) {
        selectedGate.element.classList.remove('selected');
        selectedGate.element.classList.remove('snapping');
        selectedGate.element.style.cursor = 'move';
        selectedGate.element.style.transform = 'scale(1)';
        selectedGate.element.style.zIndex = '';

        // Final snap to grid
        if (SNAP_TO_GRID) {
            selectedGate.x = snapToGrid(selectedGate.x);
            selectedGate.y = snapToGrid(selectedGate.y);
            selectedGate.element.style.left = selectedGate.x + 'px';
            selectedGate.element.style.top = selectedGate.y + 'px';
        }
    }
    dragging = false;
    selectedGate = null;
    drawWires();
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
        if (dist < 10) return true;
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
        return gate.inputValues[0];
    }

    const inputWires = wires.filter(w => w.to.id === gate.id);
    const inputs = [];

    for (let i = 0; i < gate.inputs; i++) {
        const wire = inputWires.find(w => w.toIndex === i);
        inputs[i] = wire ? evaluateGate(wire.from) : false;
    }

    switch (gate.type) {
        case 'AND':
            return inputs.every(x => x);
        case 'OR':
            return inputs.some(x => x);
        case 'NOT':
            return !inputs[0];
        case 'NAND':
            return !inputs.every(x => x);
        case 'NOR':
            return !inputs.some(x => x);
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

    if (inputGates.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); font-size: 11px;">No INPUT gates added yet</p>';
        return;
    }

    container.innerHTML = inputGates.map(gate => `
        <div class="input-toggle">
            <label>${gate.label || 'Input ' + gate.id}</label>
            <div class="toggle-btn ${gate.inputValues[0] ? 'on' : ''}" 
                 onclick="toggleInput(${gate.id})">
            </div>
        </div>
    `).join('');
}

function updateOutputDisplay() {
    const outputGates = gates.filter(g => g.type === 'OUTPUT');
    const container = document.getElementById('outputDisplay');

    if (outputGates.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); font-size: 11px;">No OUTPUT gates added yet</p>';
        return;
    }

    container.innerHTML = '<h3>Output States</h3>' + outputGates.map(gate => {
        const value = evaluateGate(gate);
        gate.element.classList.toggle('active', value);
        return `
            <div class="output-item">
                <label>${gate.label || 'Output ' + gate.id}</label>
                <div class="output-value ${value ? 'high' : 'low'}">
                    ${value ? '1' : '0'}
                </div>
            </div>
        `;
    }).join('');
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
        tableHTML += `<th>${g.label || 'IN ' + g.id}</th>`;
    });

    outputGates.forEach(g => {
        tableHTML += `<th>${g.label || 'OUT ' + g.id}</th>`;
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

                    const symbolHTML = gateSymbols[gData.type] || '';

                    gateEl.innerHTML = `
                        <div class="gate-content">
                            ${symbolHTML}
                            <div class="gate-label">${gData.type}</div>
                            <div class="gate-id">ID: ${gate.id}</div>
                        </div>
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
