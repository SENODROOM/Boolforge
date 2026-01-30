# Boolforge - Logic Gate Simulator (React)

A professional logic gate simulator converted to React, featuring drag-and-drop gates, wire connections, truth table generation, and circuit save/load functionality.

## Features

- 🎨 **Interactive Canvas**: Drag and drop logic gates on a grid-based canvas
- 🔌 **Wire Connections**: Connect gates by clicking output → input connection points
- 🗑️ **Click to Delete Wires**: Click on any wire to remove it instantly
- ⌨️ **Keyboard Shortcuts**: Undo (Ctrl+Z), Redo (Ctrl+Shift+Z), Delete, Escape
- ↶ **Undo/Redo**: Full history support with up to 50 states
- 📊 **Truth Table Generator**: Automatically generates truth tables for your circuits
- 💾 **Save/Load Circuits**: Export and import circuit designs as JSON
- ⚡ **Live Evaluation**: Real-time circuit evaluation with visual feedback
- 🎯 **Logic Gates**: AND, OR, NOT, NAND, NOR, XOR, XNOR, BUFFER, INPUT, OUTPUT
- 🎮 **Smooth Interactions**: Snap-to-grid, smooth animations, glowing active wires

## Setup Options

### Option 1: Quick Start (No Build Tools)

1. Open `index-react.html` directly in your browser
2. The component uses React from CDN and Babel standalone for JSX transformation
3. Perfect for quick testing and development

### Option 2: Modern Development Setup (Recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
boolforge-react/
├── Boolforge.jsx          # Main React component
├── main.jsx               # Entry point for Vite
├── index.html             # HTML template for Vite
├── index-react.html       # Standalone HTML (CDN version)
├── package.json           # NPM dependencies
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## Component Architecture

The React component is structured as follows:

### State Management
- `gates`: Array of all gate objects
- `wires`: Array of all wire connections
- `selectedGate`: Currently selected gate for dragging
- `connectingFrom`: Source gate when creating a wire
- `dragging`: Boolean flag for drag state

### Key Functions
- `addGate(type)`: Adds a new gate to the canvas
- `evaluateGate(gate)`: Recursively evaluates gate logic
- `drawWires()`: Renders wire connections on canvas
- `generateTruthTable()`: Creates truth table from circuit
- `saveCircuit()`: Exports circuit as JSON
- `loadCircuit()`: Imports circuit from JSON file

## Usage Instructions

1. **Add Gates**: Click buttons in the sidebar to add gates to the canvas
2. **Move Gates**: Click and drag gates to reposition them
3. **Connect Wires**: 
   - Click on an output connection point (right side)
   - Click on an input connection point (left side) to complete the wire
4. **Delete Wires**: Click directly on any wire to remove it
5. **Toggle Inputs**: Use toggle switches to change input values
6. **View Outputs**: See real-time output values in the truth table panel
7. **Delete Gates**: Right-click on a gate to delete it
8. **Generate Truth Table**: Click "Update Table" to see all possible input/output combinations
9. **Save Circuit**: Export your circuit design as a JSON file
10. **Load Circuit**: Import a previously saved circuit

### Keyboard Shortcuts

- **Ctrl+Z / Cmd+Z**: Undo last action
- **Ctrl+Shift+Z / Cmd+Shift+Z**: Redo action
- **Ctrl+Y / Cmd+Y**: Redo action (alternative)
- **Delete / Backspace**: Delete selected gate
- **Escape**: Cancel wire connection mode

## Conversion Notes

This React version maintains all the functionality of the original vanilla JavaScript implementation with the following improvements:

### ✅ Converted Features
- Complete state management using React hooks
- Draggable gates with smooth animations
- Wire rendering on HTML canvas
- Real-time logic evaluation
- Truth table generation
- Circuit save/load functionality
- All 10 gate types (INPUT, OUTPUT, AND, OR, NOT, NAND, NOR, XOR, XNOR, BUFFER)

### 🐛 Bug Fixes (v2.0)
- **Fixed Broken Wires**: Resolved issue where wires would disappear or not render properly
  - Changed wire storage from object references to gate IDs
  - Fixed wire lookup to always use current gate array
  - Wires now persist correctly across all operations
- **Canvas Pointer Events**: Fixed canvas interaction for wire deletion
- **Connection Point Active State**: Fixed visual feedback when creating connections
- **Evaluation Dependencies**: Fixed useCallback dependencies to prevent stale closures

### 🚀 New Features (v2.0)
- **Undo/Redo System**: Full history support with up to 50 states
- **Keyboard Shortcuts**: 
  - Ctrl+Z / Cmd+Z for undo
  - Ctrl+Shift+Z / Cmd+Shift+Z or Ctrl+Y for redo
  - Delete/Backspace to remove selected gates
  - Escape to cancel wire connections
- **Click to Delete Wires**: Click any wire to instantly remove it
- **Visual History Buttons**: Undo/Redo buttons with disabled states
- **Improved Instructions**: Added keyboard shortcuts guide in sidebar

### 🎨 Styling
- All CSS has been converted to CSS-in-JS using styled-jsx syntax
- Original color scheme and animations preserved
- Grid background, glow effects, and transitions maintained

### ⚛️ React-Specific Improvements
- Declarative component structure
- Proper event handling with React synthetic events
- useCallback and useEffect hooks for performance optimization
- Cleaner separation of concerns
- No DOM manipulation - everything driven by state
- Immutable state updates for better React reconciliation

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Canvas API support required for wire rendering

## Technologies

- React 18
- HTML5 Canvas
- CSS Grid & Flexbox
- JavaScript ES6+
- Vite (for build tooling)

## License

MIT License - Feel free to use and modify for your own projects!

## Credits

Original design: Boolforge
React conversion: Complete component refactor with modern React patterns
