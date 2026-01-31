# BoolForge: Complete Technical Documentation

## Table of Contents
1. [Overview](#overview)
2. [Core Architecture](#core-architecture)
3. [State Management](#state-management)
4. [React Hooks Deep Dive](#react-hooks-deep-dive)
5. [Gate System](#gate-system)
6. [Wire Connection System](#wire-connection-system)
7. [Logic Evaluation Engine](#logic-evaluation-engine)
8. [Canvas Rendering](#canvas-rendering)
9. [User Interaction System](#user-interaction-system)
10. [History & Undo/Redo](#history--undoredo)
11. [Truth Table Generation](#truth-table-generation)
12. [File Operations](#file-operations)
13. [Performance Optimizations](#performance-optimizations)
14. [Advanced Concepts](#advanced-concepts)

---

## Overview

BoolForge is a visual digital logic circuit simulator built with React. It allows users to:
- Create logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR, BUFFER)
- Connect gates with wires
- Simulate circuit behavior in real-time
- Generate truth tables automatically
- Save/load circuit designs
- Undo/redo operations

The application demonstrates advanced React patterns, canvas manipulation, interactive dragging systems, recursive evaluation algorithms, and state management techniques.

---

## Core Architecture

### Component Structure

```javascript
const Boolforge = () => {
  // State declarations
  // Refs for DOM manipulation
  // Constants
  // Helper functions
  // Event handlers
  // Render logic
};
```

The component is a single functional component that manages the entire application state and logic. This monolithic approach is chosen because:
1. All state is tightly coupled (gates affect wires, wires affect evaluation)
2. Frequent re-renders are needed for real-time simulation
3. Complex interactions between different parts of the UI

---

## State Management

### Primary State Variables

#### 1. **Gates Array**
```javascript
const [gates, setGates] = useState([]);
```

**Purpose**: Stores all logic gates in the circuit.

**Structure**:
```javascript
{
  id: number,           // Unique identifier
  type: string,         // 'INPUT', 'OUTPUT', 'AND', 'OR', etc.
  x: number,           // X position on canvas
  y: number,           // Y position on canvas
  label: string,       // Display label (e.g., "Input A")
  inputs: number,      // Number of input connections (0, 1, or 2)
  hasOutput: boolean,  // Whether gate has an output connection point
  inputValues: [bool]  // For INPUT gates only: stores the input state
}
```

**Why this structure?**
- `id` enables efficient lookups and connection tracking
- Position data (`x`, `y`) needed for rendering and wire calculations
- `inputs` and `hasOutput` determine connection point rendering
- `inputValues` array allows INPUT gates to store their toggle state

#### 2. **Wires Array**
```javascript
const [wires, setWires] = useState([]);
```

**Purpose**: Stores all connections between gates.

**Structure**:
```javascript
{
  id: number,      // Unique identifier
  fromId: number,  // Source gate ID
  toId: number,    // Destination gate ID
  toIndex: number  // Which input on destination (0 or 1)
}
```

**Design rationale**:
- `fromId` and `toId` create a directed graph of connections
- `toIndex` handles gates with multiple inputs (AND, OR need two inputs)
- Separation from gates allows flexible connection topology

#### 3. **UI State Variables**

```javascript
const [selectedGate, setSelectedGate] = useState(null);
```
Tracks which gate is currently selected (for deletion, styling).

```javascript
const [dragging, setDragging] = useState(false);
```
Boolean flag indicating if user is currently dragging a gate.

```javascript
const [connectingFrom, setConnectingFrom] = useState(null);
```
Stores the source gate when user is creating a wire connection. Set when output point clicked, cleared when connection completes or canceled.

```javascript
const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
```
Stores the offset between mouse position and gate's top-left corner during dragging. This ensures smooth dragging without gates "jumping" to cursor position.

**Why separate drag offset?**
```javascript
// Without offset: gate jumps to cursor
newX = mouseX;  // Gate's top-left is now at cursor

// With offset: smooth dragging
dragOffset = { x: mouseX - gateX, y: mouseY - gateY };
newX = mouseX - dragOffset.x;  // Gate maintains relative position
```

#### 4. **Counter State**

```javascript
const [gateIdCounter, setGateIdCounter] = useState(0);
const [wireIdCounter, setWireIdCounter] = useState(0);
```

**Purpose**: Auto-incrementing IDs for new gates and wires.

**Why not array index?** Array indices change when elements are removed. Unique IDs persist and prevent bugs when deleting/re-adding elements.

#### 5. **History State**

```javascript
const [history, setHistory] = useState([]);
const [historyIndex, setHistoryIndex] = useState(-1);
```

**Purpose**: Implements undo/redo functionality.

**History array structure**:
```javascript
history = [
  { gates: [...], wires: [...], gateIdCounter: 5, wireIdCounter: 3 },
  { gates: [...], wires: [...], gateIdCounter: 6, wireIdCounter: 4 },
  // ... up to 50 states
]
```

**How it works**:
- `historyIndex` points to current state in history
- Undo: decrements index, loads previous state
- Redo: increments index, loads next state
- New action: truncates future history, adds new state

---

## React Hooks Deep Dive

### useRef Hooks

```javascript
const canvasRef = useRef(null);
const containerRef = useRef(null);
const animationFrameRef = useRef(null);
```

#### **Why useRef instead of useState?**

**useRef characteristics**:
1. Value persists across re-renders
2. Changing ref.current does NOT trigger re-render
3. Returns same object every render

**Use cases here**:

1. **canvasRef**: Direct canvas manipulation
```javascript
const ctx = canvasRef.current.getContext('2d');
ctx.strokeStyle = '#00ff88';  // Direct DOM manipulation
```
No need for React to track canvas state - we imperatively draw on it.

2. **containerRef**: Size measurements
```javascript
canvas.width = containerRef.current.clientWidth;
```
Access DOM dimensions without triggering renders.

3. **animationFrameRef**: Animation loop control
```javascript
animationFrameRef.current = requestAnimationFrame(animate);
```
Store animation frame ID to cancel on cleanup. State would cause infinite re-render loops.

### useCallback Hook

```javascript
const evaluateGate = useCallback((gate) => {
  // ... logic
}, [wires, findGateById]);
```

#### **What is useCallback?**

`useCallback` returns a memoized version of the callback that only changes if dependencies change.

#### **Why use it here?**

**Without useCallback**:
```javascript
// New function created every render
const evaluateGate = (gate) => { ... };

// If passed as dependency:
useEffect(() => {
  // Runs every render because evaluateGate is "new"
}, [evaluateGate]);
```

**With useCallback**:
```javascript
// Same function reference unless dependencies change
const evaluateGate = useCallback((gate) => { ... }, [wires, findGateById]);

// Effect only runs when function actually changes
useEffect(() => {
  // Only runs when wires or findGateById changes
}, [evaluateGate]);
```

**Benefits**:
1. Prevents unnecessary effect re-runs
2. Avoids infinite loops in dependency chains
3. Optimizes child component re-renders (if passed as props)

#### **Dependency Array Analysis**

```javascript
const saveToHistory = useCallback(() => {
  // Uses: gates, wires, gateIdCounter, wireIdCounter, historyIndex
}, [gates, wires, gateIdCounter, wireIdCounter, historyIndex]);
```

**Why these dependencies?**
- Function reads these values directly
- Must re-create when they change to capture current values
- Omitting would cause stale closures (function sees old values)

**Stale closure example**:
```javascript
// BAD - empty dependency array
const saveToHistory = useCallback(() => {
  const state = { gates };  // Always sees initial gates = []
}, []);

// GOOD - includes dependencies
const saveToHistory = useCallback(() => {
  const state = { gates };  // Sees current gates
}, [gates]);
```

### useEffect Hooks

#### **Effect 1: Animation Loop**

```javascript
useEffect(() => {
  const animate = () => {
    drawWires();
    animationFrameRef.current = requestAnimationFrame(animate);
  };
  
  animate();
  
  return () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };
}, [drawWires]);
```

**Purpose**: Continuously re-draw wires for smooth animations.

**How requestAnimationFrame works**:
```javascript
// Browser calls callback before next repaint (typically 60 FPS)
requestAnimationFrame(callback);
```

**Recursion pattern**:
```
animate() → drawWires() → requestAnimationFrame(animate) → animate() → ...
```

**Cleanup function**:
- Called when component unmounts or dependencies change
- Cancels animation to prevent memory leaks
- Prevents rendering to unmounted component

**Dependency: drawWires**
- When wire configuration changes, effect re-runs
- Cancels old animation loop
- Starts new loop with updated drawWires function

#### **Effect 2: Canvas Resizing**

```javascript
useEffect(() => {
  const canvas = canvasRef.current;
  const container = containerRef.current;
  if (!canvas || !container) return;
  
  const resizeCanvas = () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    drawWires();
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  return () => {
    window.removeEventListener('resize', resizeCanvas);
  };
}, [drawWires]);
```

**Purpose**: Keep canvas size synchronized with container.

**Why set canvas dimensions in JavaScript?**
```css
/* CSS resize doesn't work correctly for canvas */
canvas { width: 100%; height: 100%; }  /* Stretches existing pixels */
```

```javascript
// Correct way: set canvas internal resolution
canvas.width = 1000;   // Actual pixel resolution
canvas.height = 800;
```

**Event listener cleanup**:
Essential to prevent memory leaks. Without cleanup:
```javascript
// Component re-renders 100 times
// → 100 resize listeners attached
// → Performance degradation
```

#### **Effect 3: Keyboard Shortcuts**

```javascript
useEffect(() => {
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
    } else if ((e.ctrlKey || e.metaKey) && ((e.shiftKey && e.key === 'z') || e.key === 'y')) {
      e.preventDefault();
      redo();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      if (selectedGate && !dragging) {
        deleteGate(selectedGate);
      }
    } else if (e.key === 'Escape') {
      setConnectingFrom(null);
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [selectedGate, dragging, undo, redo, deleteGate]);
```

**Cross-platform modifier keys**:
```javascript
e.ctrlKey || e.metaKey  // Ctrl on Windows/Linux, Cmd on Mac
```

**Undo/Redo detection**:
- `Ctrl+Z`: Undo
- `Ctrl+Shift+Z` or `Ctrl+Y`: Redo

**Delete gate logic**:
```javascript
if (selectedGate && !dragging) {
  deleteGate(selectedGate);
}
```
**Why check `!dragging`?** Prevents accidental deletion while moving gates.

**Dependencies**:
- Effect must re-run when callbacks change
- Ensures keyboard handler has current function references
- Without dependencies, handler would call stale versions

---

## Gate System

### Gate Types and Properties

Each gate type has specific characteristics:

```javascript
const gateProperties = {
  'INPUT': { inputs: 0, hasOutput: true, label: 'Input' },
  'OUTPUT': { inputs: 1, hasOutput: false, label: 'Output' },
  'AND': { inputs: 2, hasOutput: true, label: 'AND' },
  'OR': { inputs: 2, hasOutput: true, label: 'OR' },
  'NOT': { inputs: 1, hasOutput: true, label: 'NOT' },
  'NAND': { inputs: 2, hasOutput: true, label: 'NAND' },
  'NOR': { inputs: 2, hasOutput: true, label: 'NOR' },
  'XOR': { inputs: 2, hasOutput: true, label: 'XOR' },
  'XNOR': { inputs: 2, hasOutput: true, label: 'XNOR' },
  'BUFFER': { inputs: 1, hasOutput: true, label: 'BUF' }
};
```

### Adding Gates

```javascript
const addGate = (type) => {
  const isInput = type === 'INPUT';
  const isOutput = type === 'OUTPUT';
  const isNot = type === 'NOT' || type === 'BUFFER';
  
  const newGate = {
    id: gateIdCounter,
    type,
    x: 100 + (gates.length % 10) * 150,
    y: 100 + Math.floor(gates.length / 10) * 120,
    label: isInput 
      ? `Input ${String.fromCharCode(65 + gates.filter(g => g.type === 'INPUT').length)}`
      : isOutput 
        ? `Output ${String.fromCharCode(65 + gates.filter(g => g.type === 'OUTPUT').length)}`
        : type,
    inputs: isInput ? 0 : (isNot ? 1 : 2),
    hasOutput: !isOutput,
    inputValues: isInput ? [false] : []
  };
  
  setGates([...gates, newGate]);
  setGateIdCounter(gateIdCounter + 1);
  saveToHistory();
};
```

#### **Position Calculation**

```javascript
x: 100 + (gates.length % 10) * 150
y: 100 + Math.floor(gates.length / 10) * 120
```

**Logic**:
- Creates a grid layout
- 10 gates per row (modulo 10)
- 150px horizontal spacing
- 120px vertical spacing when row wraps

**Example**:
```
Gate 0:  x=100, y=100  (100 + 0*150, 100 + 0*120)
Gate 1:  x=250, y=100  (100 + 1*150, 100 + 0*120)
Gate 10: x=100, y=220  (100 + 0*150, 100 + 1*120)
```

#### **Label Generation**

```javascript
label: isInput 
  ? `Input ${String.fromCharCode(65 + gates.filter(g => g.type === 'INPUT').length)}`
  : ...
```

**How it works**:
- `gates.filter(g => g.type === 'INPUT').length` counts existing inputs
- `String.fromCharCode(65 + count)` converts to letter
  - 65 = 'A', 66 = 'B', etc.
- Creates sequential labels: "Input A", "Input B", "Input C"

---

## Wire Connection System

### Connection Process

**Three-step process**:

#### 1. **Start Connection**
```javascript
const startConnection = (gate) => {
  setConnectingFrom(gate);
};
```
User clicks output point of a gate.

#### 2. **Complete Connection**
```javascript
const completeConnection = (gate, inputIndex) => {
  if (!connectingFrom || connectingFrom.id === gate.id) {
    setConnectingFrom(null);
    return;
  }
  
  const existingWire = wires.find(
    w => w.toId === gate.id && w.toIndex === inputIndex
  );
  
  if (existingWire) {
    setWires(wires.filter(w => w.id !== existingWire.id));
  }
  
  const newWire = {
    id: wireIdCounter,
    fromId: connectingFrom.id,
    toId: gate.id,
    toIndex: inputIndex
  };
  
  setWires([...wires, newWire]);
  setWireIdCounter(wireIdCounter + 1);
  setConnectingFrom(null);
  saveToHistory();
};
```

**Key logic**:

1. **Prevent self-connection**:
```javascript
if (connectingFrom.id === gate.id) return;
```

2. **Replace existing connection**:
```javascript
if (existingWire) {
  setWires(wires.filter(w => w.id !== existingWire.id));
}
```
Each input can only have one source. New connection replaces old.

3. **toIndex handling**:
For gates with 2 inputs (AND, OR, etc.):
- `toIndex: 0` connects to top input
- `toIndex: 1` connects to bottom input

### Wire Deletion

```javascript
const handleCanvasClick = (e) => {
  const rect = canvasRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // Check if click is near any wire
  for (let i = wires.length - 1; i >= 0; i--) {
    const wire = wires[i];
    const fromGate = findGateById(wire.fromId);
    const toGate = findGateById(wire.toId);
    
    if (!fromGate || !toGate) continue;
    
    const fromX = fromGate.x + 120;
    const fromY = fromGate.y + 50;
    const toX = toGate.x;
    const toY = toGate.y + (toGate.inputs === 1 ? 50 : (wire.toIndex === 0 ? 35 : 65));
    
    // Point-to-line distance calculation
    if (distanceToLine(x, y, fromX, fromY, toX, toY) < 10) {
      setWires(wires.filter(w => w.id !== wire.id));
      saveToHistory();
      return;
    }
  }
};
```

**Distance-to-line algorithm**:
```javascript
const distanceToLine = (px, py, x1, y1, x2, y2) => {
  const A = px - x1;
  const B = py - y1;
  const C = x2 - x1;
  const D = y2 - y1;
  
  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;
  
  if (lenSq !== 0) param = dot / lenSq;
  
  let xx, yy;
  
  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }
  
  const dx = px - xx;
  const dy = py - yy;
  return Math.sqrt(dx * dx + dy * dy);
};
```

**Algorithm explanation**:
1. Projects click point onto line
2. Finds closest point on line segment
3. Calculates distance from click to closest point
4. If distance < 10px, wire is "hit"

---

## Logic Evaluation Engine

### Recursive Evaluation Algorithm

```javascript
const evaluateGate = useCallback((gate) => {
  if (!gate) return false;
  
  if (gate.type === 'INPUT') {
    return gate.inputValues[0] || false;
  }
  
  const inputs = [];
  wires.forEach(wire => {
    if (wire.toId === gate.id) {
      const fromGate = findGateById(wire.fromId);
      if (fromGate) {
        const sourceOutput = evaluateGate(fromGate);  // RECURSION
        inputs[wire.toIndex] = sourceOutput;
      }
    }
  });
  
  switch (gate.type) {
    case 'AND':
      return inputs.length === 2 && inputs[0] && inputs[1];
    case 'OR':
      return inputs.length === 2 && (inputs[0] || inputs[1]);
    case 'NOT':
      return !inputs[0];
    case 'NAND':
      return !(inputs.length === 2 && inputs[0] && inputs[1]);
    case 'NOR':
      return !(inputs.length === 2 && (inputs[0] || inputs[1]));
    case 'XOR':
      return inputs.length === 2 && (inputs[0] !== inputs[1]);
    case 'XNOR':
      return inputs.length === 2 && (inputs[0] === inputs[1]);
    case 'BUFFER':
      return inputs[0] || false;
    case 'OUTPUT':
      return inputs[0] || false;
    default:
      return false;
  }
}, [wires, findGateById]);
```

### How Recursive Evaluation Works

**Example circuit**:
```
INPUT A ──→ AND ──→ OUTPUT
INPUT B ──→     
```

**Evaluation flow**:
```
1. evaluateGate(OUTPUT)
   ↓ Finds wire from AND gate
   ↓ Calls evaluateGate(AND)
   
2. evaluateGate(AND)
   ↓ Finds wire from INPUT A
   ↓ Calls evaluateGate(INPUT A)
   
3. evaluateGate(INPUT A)
   ↓ Returns inputValues[0] = true
   
4. Back in evaluateGate(AND)
   ↓ Finds wire from INPUT B
   ↓ Calls evaluateGate(INPUT B)
   
5. evaluateGate(INPUT B)
   ↓ Returns inputValues[0] = false
   
6. Back in evaluateGate(AND)
   ↓ inputs = [true, false]
   ↓ Returns true && false = false
   
7. Back in evaluateGate(OUTPUT)
   ↓ inputs = [false]
   ↓ Returns false
```

### Base Case and Termination

**Base case**: INPUT gates
```javascript
if (gate.type === 'INPUT') {
  return gate.inputValues[0] || false;
}
```

**Why this prevents infinite recursion**:
- INPUT gates have no incoming wires
- They return stored value immediately
- Recursion always terminates at INPUT gates

**Cycle handling**:
Current implementation doesn't detect cycles. If circuit has cycle:
```
Gate A → Gate B → Gate C → Gate A  (cycle!)
```
Result: Infinite recursion, stack overflow.

**Potential fix** (not implemented):
```javascript
const evaluateGate = (gate, visited = new Set()) => {
  if (visited.has(gate.id)) return false;  // Cycle detected
  visited.add(gate.id);
  // ... rest of logic
};
```

### Logic Gate Implementations

#### AND Gate
```javascript
return inputs.length === 2 && inputs[0] && inputs[1];
```
**Truth table**:
```
A | B | Output
0 | 0 | 0
0 | 1 | 0
1 | 0 | 0
1 | 1 | 1
```

#### OR Gate
```javascript
return inputs.length === 2 && (inputs[0] || inputs[1]);
```
**Truth table**:
```
A | B | Output
0 | 0 | 0
0 | 1 | 1
1 | 0 | 1
1 | 1 | 1
```

#### NOT Gate
```javascript
return !inputs[0];
```
**Truth table**:
```
A | Output
0 | 1
1 | 0
```

#### NAND Gate (NOT AND)
```javascript
return !(inputs.length === 2 && inputs[0] && inputs[1]);
```
**Truth table**:
```
A | B | Output
0 | 0 | 1
0 | 1 | 1
1 | 0 | 1
1 | 1 | 0
```

#### NOR Gate (NOT OR)
```javascript
return !(inputs.length === 2 && (inputs[0] || inputs[1]));
```
**Truth table**:
```
A | B | Output
0 | 0 | 1
0 | 1 | 0
1 | 0 | 0
1 | 1 | 0
```

#### XOR Gate (Exclusive OR)
```javascript
return inputs.length === 2 && (inputs[0] !== inputs[1]);
```
**Truth table**:
```
A | B | Output
0 | 0 | 0
0 | 1 | 1
1 | 0 | 1
1 | 1 | 0
```
Output is true when inputs are **different**.

#### XNOR Gate (Exclusive NOR)
```javascript
return inputs.length === 2 && (inputs[0] === inputs[1]);
```
**Truth table**:
```
A | B | Output
0 | 0 | 1
0 | 1 | 0
1 | 0 | 0
1 | 1 | 1
```
Output is true when inputs are **same**.

#### BUFFER Gate
```javascript
return inputs[0] || false;
```
Simply passes input through. Used for signal propagation delay or fan-out.

---

## Canvas Rendering

### Drawing Wires with Bezier Curves

```javascript
const drawWires = useCallback(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  wires.forEach(wire => {
    const fromGate = findGateById(wire.fromId);
    const toGate = findGateById(wire.toId);
    
    if (!fromGate || !toGate) return;
    
    // Calculate connection points
    const fromX = fromGate.x + 120;
    const fromY = fromGate.y + 50;
    
    const toInputCount = toGate.inputs;
    const toX = toGate.x;
    const toY = toGate.y + (toInputCount === 1 ? 50 : (wire.toIndex === 0 ? 35 : 65));
    
    const isActive = evaluateGate(fromGate);
    
    // Set wire appearance
    ctx.strokeStyle = isActive ? '#00ff88' : '#334155';
    ctx.lineWidth = 3;
    ctx.shadowBlur = isActive ? 12 : 0;
    ctx.shadowColor = isActive ? '#00ff88' : 'transparent';
    
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    
    // Calculate control points for smooth bezier curve
    const dx = toX - fromX;
    const dy = toY - fromY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Adaptive control point distance
    const controlDistance = Math.min(Math.abs(dx) / 2, distance / 3);
    
    // Create smooth S-curve
    ctx.bezierCurveTo(
      fromX + controlDistance, fromY,
      toX - controlDistance, toY,
      toX, toY
    );
    
    ctx.stroke();
    ctx.shadowBlur = 0;
  });
}, [wires, findGateById, evaluateGate]);
```

### Bezier Curve Mathematics

**Cubic Bezier curve** defined by 4 points:
- P0: Start point
- P1: First control point
- P2: Second control point
- P3: End point

**Formula**:
```
B(t) = (1-t)³P0 + 3(1-t)²tP1 + 3(1-t)t²P2 + t³P3, where t ∈ [0,1]
```

**Implementation**:
```javascript
ctx.bezierCurveTo(
  fromX + controlDistance, fromY,      // P1 (control point 1)
  toX - controlDistance, toY,          // P2 (control point 2)
  toX, toY                             // P3 (end point)
);
// P0 is set by ctx.moveTo(fromX, fromY)
```

**Control point calculation**:
```javascript
const dx = toX - fromX;
const distance = Math.sqrt(dx * dx + dy * dy);
const controlDistance = Math.min(Math.abs(dx) / 2, distance / 3);
```

**Why adaptive distance?**
- For long wires: uses `distance / 3` (gentler curve)
- For short wires: uses `dx / 2` (prevents over-curving)
- Creates natural-looking S-curves regardless of gate distance

**Visual representation**:
```
Output Gate              Input Gate
    •                        •
    |  P0             P3     |
    |   ↘           ↙        |
    |    P1      P2          |
    |      ⌒  ⌒              |
    +--------~~~~-----------+
```

### Active Wire Visualization

```javascript
const isActive = evaluateGate(fromGate);

ctx.strokeStyle = isActive ? '#00ff88' : '#334155';
ctx.lineWidth = 3;
ctx.shadowBlur = isActive ? 12 : 0;
ctx.shadowColor = isActive ? '#00ff88' : 'transparent';
```

**Visual effect**:
- Inactive wire: Gray (#334155), no glow
- Active wire: Bright green (#00ff88), glowing shadow

This provides immediate visual feedback of signal flow through circuit.

---

## User Interaction System

### Drag and Drop

#### Starting Drag
```javascript
const startDrag = (e, gate) => {
  e.stopPropagation();
  setDragging(true);
  setSelectedGate(gate);
  
  const offsetX = e.clientX - gate.x;
  const offsetY = e.clientY - gate.y;
  setDragOffset({ x: offsetX, y: offsetY });
  
  saveToHistory();
};
```

**Key concepts**:

1. **e.stopPropagation()**:
Prevents click from bubbling to canvas (which would deselect gate).

2. **Offset calculation**:
```javascript
offsetX = e.clientX - gate.x;
```
If mouse is 50px right of gate's left edge, offset = 50.
During drag, maintains this 50px offset.

#### During Drag
```javascript
const onDrag = (e) => {
  if (!dragging || !selectedGate) return;
  
  const newX = snapToGrid(e.clientX - dragOffset.x);
  const newY = snapToGrid(e.clientY - dragOffset.y);
  
  setGates(gates.map(g =>
    g.id === selectedGate.id
      ? { ...g, x: newX, y: newY }
      : g
  ));
};
```

**Snap to grid implementation**:
```javascript
const snapToGrid = (value) => {
  return SNAP_TO_GRID ? Math.round(value / GRID_SIZE) * GRID_SIZE : value;
};
```

**Example**:
```
GRID_SIZE = 20
value = 127
127 / 20 = 6.35
Math.round(6.35) = 6
6 * 20 = 120  ← snapped value
```

**Array immutability**:
```javascript
setGates(gates.map(g =>
  g.id === selectedGate.id
    ? { ...g, x: newX, y: newY }  // Create new object
    : g                            // Keep same reference
));
```

React requires new object references to detect changes. Spread operator `{...g}` creates shallow copy with updated properties.

#### Stopping Drag
```javascript
const stopDrag = () => {
  setDragging(false);
};
```

Simple flag reset. Gate position already updated during drag.

### Gate Deletion

Two methods:

#### 1. Right-click (Context Menu)
```javascript
onContextMenu={(e) => {
  e.preventDefault();
  deleteGate(gate);
}}
```

**e.preventDefault()**: Stops browser context menu from appearing.

#### 2. Delete/Backspace Key
```javascript
if (e.key === 'Delete' || e.key === 'Backspace') {
  if (selectedGate && !dragging) {
    deleteGate(selectedGate);
  }
}
```

**Delete implementation**:
```javascript
const deleteGate = useCallback((gate) => {
  setGates(prev => prev.filter(g => g.id !== gate.id));
  setWires(prev => prev.filter(w => 
    w.fromId !== gate.id && w.toId !== gate.id
  ));
  setSelectedGate(null);
  saveToHistory();
}, [setGates, setWires, setSelectedGate, saveToHistory]);
```

**Cascade deletion**:
- Removes gate from gates array
- Removes all wires connected to gate
- Clears selection
- Saves state for undo

**Why cascade?**
Dangling wires (pointing to non-existent gates) would cause errors in evaluation and rendering.

### Input Toggle

```javascript
const toggleInput = (gate) => {
  setGates(gates.map(g =>
    g.id === gate.id
      ? { ...g, inputValues: [!g.inputValues[0]] }
      : g
  ));
  saveToHistory();
};
```

**How it works**:
1. Finds matching gate by ID
2. Creates new gate object with flipped input value
3. Triggers re-render
4. Evaluation runs automatically
5. Wires update color based on new value

**UI representation**:
```javascript
<div
  className={`toggle-btn ${gate.inputValues[0] ? 'on' : ''}`}
  onClick={() => toggleInput(gate)}
/>
```

CSS classes provide visual feedback (e.g., green when on, gray when off).

---

## History & Undo/Redo

### State Snapshot System

```javascript
const saveToHistory = useCallback(() => {
  const state = {
    gates: JSON.parse(JSON.stringify(gates)),
    wires: JSON.parse(JSON.stringify(wires)),
    gateIdCounter,
    wireIdCounter
  };
  
  setHistory(prev => {
    const newHistory = prev.slice(0, historyIndex + 1);
    newHistory.push(state);
    return newHistory.slice(-50);
  });
  setHistoryIndex(prev => Math.min(prev + 1, 49));
}, [gates, wires, gateIdCounter, wireIdCounter, historyIndex]);
```

### Deep Cloning with JSON

```javascript
JSON.parse(JSON.stringify(gates))
```

**Why this approach?**

1. **Deep copy**: Nested objects/arrays are cloned
2. **Simple**: One line of code
3. **Safe**: No shared references between snapshots

**Limitations**:
- Loses functions, undefined, symbols
- Not efficient for large data
- Breaks circular references

For this app, objects are simple data structures, so JSON approach works well.

### History Array Management

```javascript
const newHistory = prev.slice(0, historyIndex + 1);
```

**Purpose**: Truncates "future" history when new action performed.

**Example scenario**:
```
History: [A, B, C, D, E]
Index: 2 (at state C)

User performs new action X:
1. Slice to index+1: [A, B, C]
2. Push new state: [A, B, C, X]
3. Update index: 3

States D and E are lost (no redo available)
```

**Limit to 50 states**:
```javascript
return newHistory.slice(-50);
```

Keeps memory usage bounded. Takes last 50 elements:
```javascript
[1, 2, 3, ..., 100].slice(-50)  // Returns [51, 52, ..., 100]
```

### Undo Operation

```javascript
const undo = useCallback(() => {
  if (historyIndex > 0) {
    const newIndex = historyIndex - 1;
    const state = history[newIndex];
    setGates(JSON.parse(JSON.stringify(state.gates)));
    setWires(JSON.parse(JSON.stringify(state.wires)));
    setGateIdCounter(state.gateIdCounter);
    setWireIdCounter(state.wireIdCounter);
    setHistoryIndex(newIndex);
  }
}, [history, historyIndex]);
```

**Flow**:
1. Check if undo available (`historyIndex > 0`)
2. Decrement index
3. Load state at new index
4. Deep clone to avoid mutations
5. Update all related state

**Why deep clone here?**
Prevents future modifications from affecting history snapshots.

### Redo Operation

```javascript
const redo = useCallback(() => {
  if (historyIndex < history.length - 1) {
    const newIndex = historyIndex + 1;
    const state = history[newIndex];
    setGates(JSON.parse(JSON.stringify(state.gates)));
    setWires(JSON.parse(JSON.stringify(state.wires)));
    setGateIdCounter(state.gateIdCounter);
    setWireIdCounter(state.wireIdCounter);
    setHistoryIndex(newIndex);
  }
}, [history, historyIndex]);
```

Similar to undo, but increments index instead.

### UI Integration

```javascript
<button 
  className="btn" 
  onClick={undo} 
  disabled={historyIndex <= 0}
>
  ↶ Undo
</button>
<button 
  className="btn" 
  onClick={redo} 
  disabled={historyIndex >= history.length - 1}
>
  ↷ Redo
</button>
```

**Disabled states**:
- Undo disabled when at first state
- Redo disabled when at last state

Visual feedback prevents confusion about undo/redo availability.

---

## Truth Table Generation

### Algorithm

```javascript
const generateTruthTable = () => {
  const inputGates = gates.filter(g => g.type === 'INPUT');
  const outputGates = gates.filter(g => g.type === 'OUTPUT');
  
  if (inputGates.length === 0 || outputGates.length === 0) {
    return { headers: [], rows: [] };
  }
  
  const numInputs = inputGates.length;
  const numCombinations = Math.pow(2, numInputs);
  
  const headers = [
    ...inputGates.map(g => g.label),
    ...outputGates.map(g => g.label)
  ];
  
  const rows = [];
  
  for (let i = 0; i < numCombinations; i++) {
    const inputValues = [];
    
    for (let j = 0; j < numInputs; j++) {
      const bitValue = (i >> j) & 1;
      inputValues.push(bitValue === 1);
    }
    
    // Set input values temporarily
    const tempGates = gates.map((g, idx) => {
      if (g.type === 'INPUT') {
        const inputIndex = inputGates.findIndex(ig => ig.id === g.id);
        return { ...g, inputValues: [inputValues[inputIndex]] };
      }
      return g;
    });
    
    // Create temporary evaluation function
    const tempEvaluateGate = (gate) => {
      if (!gate) return false;
      
      if (gate.type === 'INPUT') {
        const inputIndex = inputGates.findIndex(ig => ig.id === gate.id);
        return inputValues[inputIndex];
      }
      
      const inputs = [];
      wires.forEach(wire => {
        if (wire.toId === gate.id) {
          const fromGate = tempGates.find(g => g.id === wire.fromId);
          if (fromGate) {
            const sourceOutput = tempEvaluateGate(fromGate);
            inputs[wire.toIndex] = sourceOutput;
          }
        }
      });
      
      // ... gate logic (same as evaluateGate)
    };
    
    const outputValues = outputGates.map(og => 
      tempEvaluateGate(tempGates.find(g => g.id === og.id)) ? 1 : 0
    );
    
    rows.push([
      ...inputValues.map(v => v ? 1 : 0),
      ...outputValues
    ]);
  }
  
  return { headers, rows };
};
```

### Bit Manipulation for Input Combinations

```javascript
for (let i = 0; i < numCombinations; i++) {
  const inputValues = [];
  
  for (let j = 0; j < numInputs; j++) {
    const bitValue = (i >> j) & 1;
    inputValues.push(bitValue === 1);
  }
}
```

**How it generates all combinations**:

For 3 inputs (A, B, C):
```
i=0: 000 → [false, false, false]
i=1: 001 → [true,  false, false]
i=2: 010 → [false, true,  false]
i=3: 011 → [true,  true,  false]
i=4: 100 → [false, false, true]
i=5: 101 → [true,  false, true]
i=6: 110 → [false, true,  true]
i=7: 111 → [true,  true,  true]
```

**Bit operations explained**:
```javascript
i >> j     // Right shift: moves bit j to position 0
& 1        // AND with 1: extracts rightmost bit

Example: i=5 (binary: 101), numInputs=3
j=0: 101 >> 0 = 101, 101 & 1 = 1 → true
j=1: 101 >> 1 = 010, 010 & 1 = 0 → false
j=2: 101 >> 2 = 001, 001 & 1 = 1 → true

Result: [true, false, true]
```

### Why Temporary Evaluation?

```javascript
const tempEvaluateGate = (gate) => { ... };
```

**Problem**: Can't modify actual gate state (would trigger re-renders for each truth table row).

**Solution**: Create temporary evaluation that uses `inputValues` array instead of `gate.inputValues`.

This allows testing all combinations without affecting actual circuit state.

---

## File Operations

### Saving Circuit

```javascript
const saveCircuit = () => {
  const data = {
    gates: gates,
    wires: wires,
    gateIdCounter,
    wireIdCounter
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { 
    type: 'application/json' 
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'circuit.json';
  a.click();
  URL.revokeObjectURL(url);
};
```

**Process**:

1. **Create data object**:包含完整电路状态
2. **JSON.stringify with formatting**:
   ```javascript
   JSON.stringify(data, null, 2)  // 2-space indentation
   ```
3. **Create Blob**: Wraps JSON string as file-like object
4. **Create object URL**: Generates temporary URL to blob
5. **Programmatic download**: Creates invisible `<a>` element and clicks it
6. **Cleanup**: Revokes URL to free memory

**Why revoke URL?**
Object URLs persist in memory until page unload. Revoking prevents memory leaks.

### Loading Circuit

```javascript
const loadCircuit = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      setGates(data.gates || []);
      setWires(data.wires || []);
      setGateIdCounter(data.gateIdCounter || 0);
      setWireIdCounter(data.wireIdCounter || 0);
      saveToHistory();
    } catch (error) {
      alert('Error loading circuit file');
    }
  };
  reader.readAsText(file);
};
```

**FileReader API**:
- Asynchronous file reading
- `readAsText()`: Reads file as string
- `onload` callback: Triggered when read complete

**Error handling**:
```javascript
try {
  const data = JSON.parse(event.target.result);
  // ... use data
} catch (error) {
  alert('Error loading circuit file');
}
```

Catches:
- Invalid JSON syntax
- Missing expected properties
- Corrupted files

**Default values**:
```javascript
setGates(data.gates || []);
```

If property missing, uses empty array instead of undefined (prevents crashes).

---

## Performance Optimizations

### 1. **useCallback for Stable References**

```javascript
const evaluateGate = useCallback((gate) => { ... }, [wires, findGateById]);
```

Prevents recreation of function on every render, reducing:
- Unnecessary effect re-runs
- Child component re-renders
- Memory allocations

### 2. **requestAnimationFrame for Smooth Rendering**

```javascript
const animate = () => {
  drawWires();
  animationFrameRef.current = requestAnimationFrame(animate);
};
```

**Benefits**:
- Syncs with browser's repaint cycle (typically 60 FPS)
- Automatically pauses when tab inactive (saves CPU)
- Smoother than `setInterval`

**Comparison**:
```javascript
// BAD: Unpredictable timing, may exceed 60 FPS
setInterval(drawWires, 16);

// GOOD: Syncs with display refresh
requestAnimationFrame(drawWires);
```

### 3. **Conditional Rendering**

```javascript
{truthTable.headers.length > 0 && (
  <table>
    {/* Truth table JSX */}
  </table>
)}
```

Only renders truth table when inputs/outputs exist. Avoids rendering empty tables.

### 4. **Event Delegation**

```javascript
<div className="canvas-container"
  onMouseMove={onDrag}
  onMouseUp={stopDrag}
>
```

Instead of adding listeners to each gate, listens on container. Single listener handles all gates.

### 5. **Immutable Updates**

```javascript
setGates(gates.map(g =>
  g.id === selectedGate.id ? { ...g, x: newX, y: newY } : g
));
```

**Why this is fast**:
- Unchanged gates keep same object reference
- React's reconciliation can skip rendering unchanged gates
- Only modified gate re-renders

**Alternative (slower)**:
```javascript
setGates([...gates]);  // All new references, all gates re-render
```

### 6. **Canvas Clearing Optimization**

```javascript
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

Only clears canvas when needed, not entire container DOM.

---

## Advanced Concepts

### 1. **Closure in Event Handlers**

```javascript
const handleKeyDown = (e) => {
  if (selectedGate && !dragging) {
    deleteGate(selectedGate);
  }
};
```

**Closure**: Function captures variables from outer scope.

**Problem**: If not in effect dependencies, captures stale values:
```javascript
// BAD
useEffect(() => {
  const handleKeyDown = (e) => {
    console.log(selectedGate);  // Always sees initial value
  };
  window.addEventListener('keydown', handleKeyDown);
}, []);  // Empty dependencies

// GOOD
useEffect(() => {
  const handleKeyDown = (e) => {
    console.log(selectedGate);  // Sees current value
  };
  window.addEventListener('keydown', handleKeyDown);
}, [selectedGate]);  // Includes dependency
```

### 2. **React Reconciliation**

When state updates, React compares new and old virtual DOM:

```javascript
// Old: { id: 1, x: 100 }
// New: { id: 1, x: 150 }

// React detects: Same id, different x
// Result: Updates x property, doesn't recreate element
```

**Key prop optimization**:
```javascript
{gates.map(gate => (
  <div key={gate.id}>  // Stable key
))}
```

Stable keys help React track elements across renders.

### 3. **State Batching**

```javascript
setGates([...gates, newGate]);
setGateIdCounter(gateIdCounter + 1);
saveToHistory();
```

React batches these updates into single re-render (in event handlers).

**Before React 18**: Only batched in event handlers
**React 18+**: Batches everywhere (including promises, timeouts)

### 4. **Functional Updates**

```javascript
setHistory(prev => {
  const newHistory = prev.slice(0, historyIndex + 1);
  newHistory.push(state);
  return newHistory.slice(-50);
});
```

**Why functional form?**

Ensures you're working with most recent state, even if multiple updates queued:

```javascript
// BAD: May use stale state
setCount(count + 1);
setCount(count + 1);  // Both use same initial count

// GOOD: Uses current state
setCount(prev => prev + 1);
setCount(prev => prev + 1);  // Each uses updated value
```

### 5. **Canvas 2D Context Reuse**

```javascript
const ctx = canvas.getContext('2d');
```

**Important**: Multiple `getContext` calls return same context object.

Canvas maintains single context per type (2d, webgl). Reusing context is efficient and correct approach.

### 6. **Controlled vs Uncontrolled Components**

**Controlled** (used here):
```javascript
<input 
  type="file"
  onChange={loadCircuit}  // React controls value
/>
```

**Uncontrolled**:
```javascript
<input 
  type="file"
  ref={inputRef}  // DOM controls value
/>
```

File inputs are uncontrolled by necessity (security: JavaScript can't set file input values).

### 7. **Event Bubbling Control**

```javascript
const startDrag = (e, gate) => {
  e.stopPropagation();  // Prevents event bubbling
};
```

**Event flow**:
```
Gate div → Canvas div → Container div → Body → HTML → Document
     ↑
  stopPropagation() stops here
```

Without `stopPropagation()`, click would trigger both gate and canvas handlers.

### 8. **Coordinate System Transformation**

```javascript
const rect = canvasRef.current.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;
```

**Why needed?**

- `e.clientX`: Position relative to viewport
- `rect.left`: Canvas position in viewport
- `x`: Position relative to canvas (0,0)

Essential for accurate click detection on canvas.

---

## Common Patterns and Best Practices

### 1. **Guard Clauses**

```javascript
if (!canvas) return;
if (!fromGate || !toGate) return;
```

Early returns prevent errors and reduce nesting.

### 2. **Default Values**

```javascript
return gate.inputValues[0] || false;
```

Prevents undefined errors if property missing.

### 3. **Array Destructuring**

```javascript
const [gates, setGates] = useState([]);
```

Clean, readable state declarations.

### 4. **Spread Operator for Immutability**

```javascript
{ ...g, x: newX, y: newY }
```

Creates new object with updated properties.

### 5. **Array Methods for State Updates**

```javascript
.filter() // Remove items
.map()    // Update items
.find()   // Locate items
```

Functional approach to state transformations.

---

## Summary

BoolForge demonstrates:

1. **Complex state management** with multiple interdependent state variables
2. **React hooks mastery**: useState, useEffect, useCallback, useRef
3. **Canvas manipulation** with 2D rendering and bezier curves
4. **Recursive algorithms** for circuit evaluation
5. **Interactive UI** with drag-and-drop, keyboard shortcuts
6. **Advanced patterns**: History/undo, truth table generation, file I/O
7. **Performance optimization**: Memoization, batching, animation frames

The application showcases how React can handle complex, real-time, interactive applications with careful state design and performance considerations.
