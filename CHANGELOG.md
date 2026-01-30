# Changelog

All notable changes to the Boolforge React project will be documented in this file.

## [2.0.0] - 2026-01-30

### 🐛 Bug Fixes
- **Fixed Broken Wires** - Resolved critical issue where wires would not render or would disappear
  - Changed wire storage architecture from object references to gate IDs
  - Wire lookups now always use current gate array state
  - Wires properly persist across drag, delete, and load operations
  - Fixed stale closure issues in evaluateGate function
- **Canvas Interaction** - Enabled pointer events on canvas for wire deletion
- **Connection Point Feedback** - Fixed active state display when connecting wires
- **Dependency Arrays** - Fixed useCallback dependencies to prevent stale references

### ✨ New Features
- **Undo/Redo System**
  - Full history support with up to 50 states
  - History saved after each significant action (add, delete, move, connect)
  - Visual undo/redo buttons with disabled states
- **Keyboard Shortcuts**
  - `Ctrl+Z` / `Cmd+Z` - Undo last action
  - `Ctrl+Shift+Z` / `Cmd+Shift+Z` - Redo action
  - `Ctrl+Y` / `Cmd+Y` - Redo action (alternative)
  - `Delete` / `Backspace` - Delete selected gate
  - `Escape` - Cancel wire connection mode
- **Click to Delete Wires** - Click any wire to instantly remove it with visual feedback
- **Enhanced Instructions** - Added keyboard shortcuts section in sidebar

### 🎨 Improvements
- Better state management with immutable updates
- Improved performance with optimized useCallback dependencies
- More intuitive wire deletion interaction
- Visual feedback for undo/redo availability

### 📝 Documentation
- Updated README with all new features
- Added keyboard shortcuts section
- Documented bug fixes and improvements
- Added this CHANGELOG

## [1.0.0] - Initial Release

### ✨ Features
- Interactive drag-and-drop canvas for logic gates
- 10 logic gate types (INPUT, OUTPUT, AND, OR, NOT, NAND, NOR, XOR, XNOR, BUFFER)
- Wire connections between gates
- Real-time circuit evaluation
- Truth table generation
- Circuit save/load functionality
- Cyberpunk-themed UI with grid background
- Smooth animations and transitions
- Glowing active wires
- Input toggle switches
- Output displays with visual feedback
- Stats panel showing gate/wire counts
- Right-click to delete gates

### 🔧 Technical
- Built with React 18
- Uses HTML5 Canvas for wire rendering
- CSS-in-JS with styled-jsx
- Vite for development and build
- Functional components with hooks
- No external state management library required
