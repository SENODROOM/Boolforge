# 🔬 DigitalLogicsStudio — by SENODROOM

> **Formerly known as Boolforge** — now donated to and maintained by the **QuantumLogicsLabs** GitHub organization.
> Live repository: [QuantumLogicsLabs/DigitalLogicsStudio](https://github.com/QuantumLogicsLabs/DigitalLogicsStudio)

A comprehensive, interactive **Digital Logic & Boolean Algebra learning platform** built with **React 18**. From drag-and-drop circuit simulation to K-Map solvers, truth table generators, number system converters, sequential circuit analysis, and a full arithmetic functions suite — DigitalLogicsStudio is a one-stop environment for learning and experimenting with digital logic design.

---

## 🏛️ Project History

| Milestone            | Details                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| **Original Creator** | **SENODROOM** (Muhammad Saad Amin)                                                                |
| **Original Name**    | Boolforge                                                                                         |
| **v1.0.0**           | Initial release — Logic Gate Simulator                                                            |
| **v2.0.0**           | Major bug fixes & Undo/Redo system                                                                |
| **Donation**         | Project donated by SENODROOM to **QuantumLogicsLabs** GitHub organization                         |
| **New Home**         | [QuantumLogicsLabs/DigitalLogicsStudio](https://github.com/QuantumLogicsLabs/DigitalLogicsStudio) |
| **Copyright**        | © 2025 QuantumLogics Incorporated. All Rights Reserved.                                           |

---

## ✨ Features

### 🎛️ Logic Gate Simulator (Boolforge Canvas)

- 🎨 **Interactive Canvas** — Drag and drop logic gates on a grid-based canvas
- 🔌 **Wire Connections** — Connect gates by clicking output → input points
- 🗑️ **Click to Delete Wires** — Remove any wire with a single click
- ↶ **Undo / Redo** — Full history system (up to 50 states)
- ⌨️ **Keyboard Shortcuts** — Fast editing with familiar hotkeys
- 📊 **Truth Table Generator** — Automatically generate circuit truth tables
- 💾 **Save / Load Circuits** — Export and import designs as JSON
- ⚡ **Live Evaluation** — Real-time logic updates with visual feedback
- 🎯 **10 Logic Gate Types** — INPUT, OUTPUT, AND, OR, NOT, NAND, NOR, XOR, XNOR, BUFFER
- 🎮 **Smooth Interactions** — Snap-to-grid, animations, glowing active wires

### 📚 Learning Modules

- 📖 **Boolean Algebra** — Laws, identities, duality principle, consensus theorem
- 🗺️ **K-Map Generator** — Interactive Karnaugh Map solver with grouping guide
- 📐 **Minterms & Maxterms** — SOP/POS standard forms, minterm/maxterm relations
- 🔢 **Number Systems** — Binary, octal, decimal, hex conversions & calculator
- 🧮 **Bit Converter & Extension** — Sign extension, bit operations
- 🔤 **ASCII & BCD Notation** — Interactive reference pages
- ⏱️ **Time Diagrams** — Visual signal timing analysis
- 💡 **Gate Explanation** — In-depth breakdown of all gate types
- 🔁 **Universal Gates** — NAND/NOR universality demonstrations
- 📉 **Circuit Cost** — Logic minimization and cost analysis
- 🎲 **Odd Functions & Parity** — Parity bit calculator and generator

### ➕ Arithmetic Functions & HDLs

- **Binary Adders** — Half adder, full adder, ripple carry, look-ahead carry
- **Binary Subtractor** — Half/full subtractors
- **Add/Subtract Unit** — Combined binary add-subtractor
- **Binary Multipliers** — Array multiplier circuits
- **Complements** — 1's and 2's complement calculator
- **Code Conversion** — BCD, Gray code, and other conversions
- **Magnitude Comparator** — Interactive N-bit comparator
- **Parity Generators** — Even/odd parity logic
- **Signed/Unsigned Arithmetic** — Overflow detection, sign handling
- **Design Applications** — Real-world combinational circuit design

### 🔀 Encoders & Decoders

- **Encoder Pages** — 4-to-2, 8-to-3 priority encoders with interactive simulators
- **Decoder Pages** — BCD, 7-segment, function generator demos
- **Cascading Explainer** — Multi-level encoder/decoder cascading
- **Minterm Equation Builder** — Visual minterm-to-boolean expression tool
- **Signal Flow Diagrams** — Animated signal path visualization
- **Comparison Tables** — Side-by-side encoder/decoder type comparison
- **Priority Conflict Simulator** — Visualize priority encoder conflicts
- **Built-in Quizzes** — Test your encoder/decoder knowledge

### 🔄 Sequential Circuits

- **Latches** — SR, D, JK latch simulations
- **Flip-Flops** — D, JK, T, SR flip-flop types with timing diagrams
- **State Diagrams** — Interactive FSM state diagram builder
- **State Reduction** — Minimization of FSM states
- **Sequential Analysis** — Analysis of existing sequential circuits
- **Design Procedures** — Step-by-step sequential circuit design
- **7-Segment Display** — BCD-to-7seg interactive decoder

### 📖 Digital Logic Book

- Built-in reference chapters (Ch1, Ch2) from core DLD curriculum

---

## ⌨️ Keyboard Shortcuts

| Shortcut                       | Action                      |
| ------------------------------ | --------------------------- |
| `Ctrl+Z` / `Cmd+Z`             | Undo last action            |
| `Ctrl+Shift+Z` / `Cmd+Shift+Z` | Redo action                 |
| `Ctrl+Y` / `Cmd+Y`             | Redo action (alternative)   |
| `Delete` / `Backspace`         | Delete selected gate        |
| `Escape`                       | Cancel wire connection mode |

---

## 🚀 Setup

### Prerequisites

- Node.js 18.x, 20.x, or 22.x
- npm

### Installation & Running

```bash
git clone https://github.com/QuantumLogicsLabs/DigitalLogicsStudio.git
cd DigitalLogicsStudio
npm install
npm start
```

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

### CI/CD

The project uses **GitHub Actions** with Node.js CI, automatically building and testing across Node 18.x, 20.x, and 22.x on every push and pull request to `main`.

---

## 🧠 Usage Guide

1. **Add Gates** — Use sidebar buttons on the simulator canvas
2. **Move Gates** — Drag them around the canvas
3. **Connect Wires** — Click an output point, then an input point
4. **Delete Wires** — Click directly on a wire
5. **Toggle Inputs** — Use input switches to change logic levels
6. **View Outputs** — Check the truth table panel
7. **Delete Gates** — Right-click a gate
8. **Generate Truth Table** — Click "Update Table"
9. **Save Circuit** — Export your design as JSON
10. **Load Circuit** — Import a previously saved design
11. **Explore Modules** — Navigate to learning pages from the Home/Navbar

---

## 🏗️ Project Structure

```
DigitalLogicsStudio/
├── .github/
│   └── workflows/
│       └── node.js.yml          # CI/CD pipeline
├── public/
│   ├── css/styles.css
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── scripts/
│   └── updateArithmeticPages.js
├── src/
│   ├── assets/
│   ├── components/              # Shared UI components
│   │   ├── CircuitModal.jsx
│   │   ├── ControlPanel.jsx
│   │   ├── KMapDisplay.jsx
│   │   ├── TruthTable.jsx
│   │   ├── WhiteboardAnimation.jsx
│   │   └── ...
│   ├── data/
│   │   └── gates.js
│   ├── hooks/
│   │   ├── useKMapLogic.js
│   │   └── useSpeechSynthesis.js
│   ├── pages/
│   │   ├── ArithmeticFunctionsAndHDLs/  # Full arithmetic suite
│   │   ├── Book/                         # DLD reference chapters
│   │   ├── BooleanAlgebra/
│   │   ├── EncoderAndDecoder/            # Encoder & decoder modules
│   │   ├── Home/                         # Landing page
│   │   ├── SequentialCircuits/           # Latches, flip-flops, FSMs
│   │   ├── Boolforge.jsx                 # Main simulator canvas
│   │   ├── KmapGenerator.jsx
│   │   ├── NumberSystemCalculator.jsx
│   │   ├── TimeDiagrams.jsx
│   │   └── ...                           # 30+ additional learning pages
│   ├── utils/
│   │   ├── boolMath.js
│   │   ├── expressionParser.js
│   │   ├── QuineMcCluskey.js
│   │   └── ...
│   ├── App.js
│   └── index.js
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

---

## ⚙️ Technologies

| Technology                       | Usage                        |
| -------------------------------- | ---------------------------- |
| React 18                         | Core UI framework            |
| React Router v6                  | Client-side routing          |
| HTML5 Canvas                     | Logic gate simulation canvas |
| CSS Grid & Flexbox               | Layouts                      |
| JavaScript ES6+                  | Logic, utilities             |
| Create React App (react-scripts) | Build tooling                |
| GitHub Actions                   | CI/CD (Node 18/20/22)        |
| Font Awesome 7                   | Icons                        |
| Lucide React                     | Additional icons             |
| React Icons                      | Icon library                 |

---

## 📝 Changelog

### [3.0.0] — 2026 (DigitalLogicsStudio — Post-Donation Release)

#### 🏛️ Organizational

- Project donated by **SENODROOM** to **QuantumLogicsLabs** GitHub organization
- Repository moved to [QuantumLogicsLabs/DigitalLogicsStudio](https://github.com/QuantumLogicsLabs/DigitalLogicsStudio)
- Copyright transferred to **QuantumLogics Incorporated**

#### ✨ Major Expansion — Full Learning Platform

- Added **Sequential Circuits** module: latches, flip-flops (D, JK, T, SR), state diagrams, state reduction, FSM analysis and design procedures
- Added **Arithmetic Functions & HDLs** suite: binary adders, subtractors, multipliers, add-subtract units, magnitude comparators, parity generators, signed/unsigned arithmetic, code conversion, design applications
- Added **Encoder & Decoder** module: 4-to-2 and 8-to-3 encoders, BCD/7-segment decoders, cascading explainer, minterm equation builder, signal flow diagrams, priority conflict simulator, quizzes
- Added **K-Map Generator** with grouping guide and Quine-McCluskey solver
- Added **Boolean Algebra** overview: laws, identities, duality, consensus theorem, standard forms
- Added **Number System** pages: calculator, converters, BCD, ASCII, bit extension
- Added **DLD Book** reference (Ch1 & Ch2)
- Added **Time Diagrams**, **Circuit Cost**, **Parity Bit Calculator**, **Universal Gates**, **Gate Explanation**, **Odd Functions** pages
- Added `useSpeechSynthesis` hook for accessibility
- Integrated **Font Awesome 7** and **Lucide React** icon libraries
- Added **GitHub Actions** CI/CD pipeline (Node 18/20/22)

#### 🎨 Platform Redesign

- Full Home page with hero section, article section, navbar, and footer
- Cyberpunk-inspired CSS design system with CSS custom properties

---

### [2.0.0] — 2026-01-30

#### 🐛 Bug Fixes

- Fixed broken wires by switching storage from object refs to gate IDs
- Wires now persist across drag, delete, and load operations
- Fixed stale closure issues in evaluation logic
- Enabled canvas pointer events for wire deletion
- Fixed connection point active state visuals
- Corrected `useCallback` dependency arrays

#### ✨ New Features

- Undo/Redo system with 50-state history
- Keyboard shortcuts for undo, redo, delete, cancel
- Click-to-delete wires
- Visual undo/redo buttons
- Improved sidebar instructions

#### 🎨 Improvements

- Better immutable state management
- Performance optimizations
- Improved wire deletion UX
- Clearer visual history feedback

---

### [1.0.0] — Initial Release

- Drag-and-drop logic gate canvas
- 10 gate types (INPUT, OUTPUT, AND, OR, NOT, NAND, NOR, XOR, XNOR, BUFFER)
- Wire connections with real-time evaluation
- Truth table generation
- Circuit save/load (JSON)
- Cyberpunk UI theme with animated glowing wires
- Stats panel
- Right-click gate deletion

---

## 📄 License

Proprietary License — Copyright © 2025 **QuantumLogics Incorporated**. All Rights Reserved.

This project is the exclusive proprietary property of QuantumLogics Incorporated. Unauthorized use, reproduction, modification, or distribution is strictly prohibited.

For permissions, contact: **legal@quantumlogics.com**

---

## 🙌 Credits

| Role                             | Person / Entity                                           |
| -------------------------------- | --------------------------------------------------------- |
| **Original Creator & Developer** | **SENODROOM** (Muhammad Saad Amin)                        |
| **Project Donor**                | SENODROOM → QuantumLogicsLabs                             |
| **Current Maintainer**           | [QuantumLogicsLabs](https://github.com/QuantumLogicsLabs) |
| **Original Concept**             | Boolforge — Logic Gate Simulator                          |
