# Logic Gate Simulator

A **browser-based interactive Logic Gate Simulator** built using **HTML, CSS, and Vanilla JavaScript**. This project allows users to visually design digital logic circuits by placing gates, connecting them with wires, toggling inputs, observing real-time outputs, and automatically generating truth tables.

The simulator is designed for **students, beginners, and anyone learning digital logic** who wants to understand how logic gates work through visual experimentation.

---

## 🚀 Features

- Add logic gates: **INPUT, OUTPUT, AND, OR, NOT, NAND, NOR, XOR, XNOR, BUFFER**
- Drag & drop gates on a grid-based canvas
- Connect gates using animated wires
- Live signal propagation (green = 1, dark = 0)
- Toggle INPUT gates to test circuits
- Automatic **truth table generation**
- Save circuits as JSON files
- Load previously saved circuits
- Delete gates (right-click) and wires (click wire)
- Real-time statistics (gate count, wire count, inputs, outputs)

---

## 📁 Project Structure

```
logic-gate-simulator/
│
├── index.html     # Application structure (UI layout)
├── styles.css     # Complete UI styling and animations
├── script.js      # Core logic, interaction, simulation engine
└── README.md      # Project documentation
```

---

## 🧠 How the Project Works (High-Level)

1. **HTML** creates the layout (sidebar, canvas, truth table panel)
2. **CSS** styles the UI (dark theme, gates, wires, animations)
3. **JavaScript** handles:
   - Gate creation & deletion
   - Dragging logic
   - Wire connections
   - Boolean evaluation
   - Truth table generation
   - Saving & loading circuits

---

## 🧱 index.html — Structure Explained

### 1. Fonts & Styles
```html
<link rel="stylesheet" href="styles.css">
```
- Loads the custom dark theme and UI styling
- Google Fonts provide a **monospace, circuit-style look**

---

### 2. Main Layout
```html
<div class="container">...</div>
```
The app uses a **3-column grid layout**:

| Section | Purpose |
|------|--------|
| Sidebar | Gate library & instructions |
| Canvas | Circuit design area |
| Right Panel | Inputs, outputs, truth table |

---

### 3. Gate Library (Sidebar)
```html
<button onclick="addGate('AND')">AND Gate</button>
```
- Each button calls `addGate(type)`
- Dynamically creates a gate on the canvas

---

### 4. Canvas Area
```html
<canvas id="wireCanvas"></canvas>
```
- Used **only for drawing wires**
- Gates themselves are HTML elements placed above the canvas

---

### 5. Truth Table & Controls
- INPUT toggles
- OUTPUT displays
- Buttons for:
  - Update Table
  - Save Circuit
  - Load Circuit
  - Clear All

---

## 🎨 styles.css — Styling Explained

### CSS Variables (Theme)
```css
:root {
  --bg-dark: #0a0e1a;
  --accent-primary: #00ff88;
}
```
- Centralized theme colors
- Makes the UI consistent and easy to customize

---

### Gate Styling
```css
.gate {
  position: absolute;
  border: 2px solid var(--accent-primary);
}
```
- Gates are draggable blocks
- Absolute positioning allows free movement

---

### Connection Points
```css
.connection-point {
  width: 12px;
  height: 12px;
}
```
- Small circles on gates
- Inputs on the left, outputs on the right
- Highlighted when active

---

### Wire Visualization
- Wires glow **green** when signal = `1`
- Dark when signal = `0`
- Animated using canvas shadows

---

## 🧠 script.js — JavaScript Explained from Scratch

### 1. Core Data Structures
```js
let gates = [];
let wires = [];
```

#### Gate Object
Each gate is stored as an object:
```js
{
  id,
  type,
  x, y,
  inputs,
  inputValues,
  element
}
```

#### Wire Object
```js
{
  id,
  from,
  to,
  toIndex
}
```

---

### 2. Canvas Setup
```js
const canvas = document.getElementById('wireCanvas');
```
- Used only for wire rendering
- Automatically resizes with window

---

### 3. Adding a Gate
```js
function addGate(type) { ... }
```

What this function does:
1. Determines gate type (INPUT, OUTPUT, NOT, etc.)
2. Creates a JavaScript gate object
3. Creates a DOM element (`div`)
4. Adds input/output connection points
5. Enables dragging and right-click deletion
6. Stores the gate in `gates[]`

---

### 4. Drag & Drop Logic
```js
startDrag()
mousemove
mouseup
```

- Calculates mouse offset
- Updates gate position in real-time
- Redraws wires while dragging

---

### 5. Connecting Gates (Wires)
```js
handleConnectionClick()
```

Process:
1. Click output → select source
2. Click input → create wire
3. Prevents duplicate connections
4. Stores wire in `wires[]`

---

### 6. Drawing Wires
```js
drawWires()
```

- Uses **Bezier curves** for smooth wires
- Color depends on evaluated signal
- Re-drawn continuously for live updates

---

### 7. Gate Evaluation (Logic Engine)
```js
function evaluateGate(gate) { ... }
```

This is the **core logic simulator**.

Example:
```js
case 'AND':
  return inputs[0] && inputs[1];
```

- Uses recursion
- Evaluates inputs by following wires backward

---

### 8. Input Toggles
```js
toggleInput(gateId)
```

- Flips input value (0 ↔ 1)
- Updates:
  - Outputs
  - Wires
  - Truth table

---

### 9. Truth Table Generation
```js
generateTruthTable()
```

Steps:
1. Count INPUT gates
2. Generate `2^n` combinations
3. Assign inputs programmatically
4. Evaluate outputs
5. Render HTML table

---

### 10. Saving & Loading Circuits

#### Save
```js
saveCircuit()
```
- Serializes gates & wires into JSON
- Downloads file locally

#### Load
```js
loadCircuit()
```
- Reads JSON
- Rebuilds gates & wires
- Restores positions and values

---

### 11. Deleting & Clearing

- **Right-click gate** → delete gate & wires
- **Click wire** → delete wire
- **Clear All** → reset simulator

---

## 📊 Live Statistics

```js
updateStats()
```
Displays:
- Total gates
- Total wires
- Number of inputs
- Number of outputs

---

## 🧪 Educational Value

This project helps users understand:

- Boolean logic
- Digital circuit design
- Signal propagation
- Truth tables
- Graph traversal (recursive evaluation)
- Event-driven programming

---

## 🛠 Technologies Used

- **HTML5** – Structure
- **CSS3** – Styling & animations
- **JavaScript (ES6)** – Logic & interaction
- **Canvas API** – Wire rendering

---

## 📌 Future Improvements

- Clocked circuits
- Flip-flops & memory
- Multi-output gates
- Zoom & pan canvas
- Export as image

---

## 👤 Author

**Muhammad Saad Amin**  
Logic Gate Simulator Project

---

## 📜 License

This project is open-source and free to use for learning and educational purposes.

