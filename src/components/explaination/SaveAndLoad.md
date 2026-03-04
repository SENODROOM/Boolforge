# SaveAndLoad Component

## Overview
The `SaveAndLoad` component is a comprehensive React component that provides project management functionality for the Boolforge circuit builder. It enables users to save, load, and manage circuit projects with version history, local storage persistence, and an intuitive modal interface.

## Functionality
- **Project Saving**: Save circuit projects with custom names
- **Project Loading**: Load previously saved projects
- **Version History**: Maintain up to 10 versions per project
- **Project Management**: Delete and organize saved projects
- **Local Storage**: Persistent storage using browser localStorage
- **Modal Interface**: Clean modal dialogs for save/load operations
- **State Restoration**: Complete circuit state restoration

## Props
- `data` (object): Current circuit data to save
- `setGates` (function): Function to set gates state
- `setWires` (function): Function to set wires state
- `setGateIdCounter` (function): Function to set gate ID counter
- `setWireIdCounter` (function): Function to set wire ID counter
- `setInputCounter` (function): Function to set input counter
- `setOutputCounter` (function): Function to set output counter
- `saveToHistory` (function): Function to save to history

## Key Features

### Storage Management
```javascript
const STORAGE_KEY = "logic_editor_saved_projects_v1";

const getProjects = () =>
    JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

const setProjects = (p) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
```

### Project Saving
```javascript
const saveProject = () => {
    if (!projectName.trim()) return;

    const projects = getProjects();

    if (projects[projectName]) {
        if (!window.confirm("Overwrite existing project?")) return;
    }

    projects[projectName] = {
        versions: [
            { ...data, time: Date.now() },
            ...(projects[projectName]?.versions || [])
        ].slice(0, 10)
    };

    setProjects(projects);
    setShowSave(false);
    setProjectName("");
};
```

### State Restoration
```javascript
const loadSnapshot = (snap) => {
    setGates(snap.gates || []);
    setWires(snap.wires || []);
    setGateIdCounter(snap.gateIdCounter || 0);
    setWireIdCounter(snap.wireIdCounter || 0);
    setInputCounter(snap.inputCounter || 0);
    setOutputCounter(snap.outputCounter || 0);
    saveToHistory();
    setShowLoad(false);
};
```

## Technical Implementation

### Component Architecture
- **State Management**: Local state for modals and project name
- **Storage Integration**: localStorage for persistent storage
- **Modal System**: Dual modal system for save/load operations
- **Version Control**: Automatic version history management

### Data Persistence
- **localStorage API**: Browser-based persistent storage
- **JSON Serialization**: Efficient data serialization
- **Version Management**: Maintains version history per project
- **Data Integrity**: Safe data handling with fallbacks

### State Restoration
- **Complete Restoration**: Restores all circuit state components
- **Counter Management**: Restores ID counters for continuity
- **History Integration**: Integrates with undo/redo system
- **Error Handling**: Graceful handling of missing data

## Usage Example
```javascript
import { SaveAndLoad } from './components/SaveAndLoad';

function MyCircuitEditor() {
    const [gates, setGates] = useState([]);
    const [wires, setWires] = useState([]);
    const [gateIdCounter, setGateIdCounter] = useState(0);
    const [wireIdCounter, setWireIdCounter] = useState(0);
    const [inputCounter, setInputCounter] = useState(0);
    const [outputCounter, setOutputCounter] = useState(0);

    const circuitData = {
        gates,
        wires,
        gateIdCounter,
        wireIdCounter,
        inputCounter,
        outputCounter
    };

    const saveToHistory = () => {
        // Save to undo/redo history
    };

    return (
        <SaveAndLoad
            data={circuitData}
            setGates={setGates}
            setWires={setWires}
            setGateIdCounter={setGateIdCounter}
            setWireIdCounter={setWireIdCounter}
            setInputCounter={setInputCounter}
            setOutputCounter={setOutputCounter}
            saveToHistory={saveToHistory}
        />
    );
}
```

## Advanced Features

### Version History System
- **Automatic Versioning**: Each save creates a new version
- **Version Limit**: Maintains up to 10 versions per project
- **Timestamp Tracking**: Each version has a timestamp
- **Version Selection**: Users can select specific versions to load

### Project Management
- **Overwrite Protection**: Confirmation before overwriting projects
- **Project Deletion**: Delete unwanted projects
- **Project Listing**: Clear list of all saved projects
- **Version Display**: Show version history for each project

### Modal Interface
- **Save Modal**: Clean interface for saving projects
- **Load Modal**: Organized interface for loading projects
- **Version Selection**: Interface for selecting specific versions
- **Confirmation Dialogs**: User confirmation for destructive actions

## Design Patterns

### Storage Pattern
- **localStorage Integration**: Browser-based persistent storage
- **JSON Serialization**: Efficient data format
- **Key Management**: Unique storage key for versioning
- **Data Validation**: Safe data handling with fallbacks

### Modal Pattern
- **Dual Modal System**: Separate modals for save/load
- **State Management**: Local state for modal visibility
- **Event Handling**: Comprehensive modal control
- **User Interaction**: Intuitive modal interactions

### Version Control Pattern
- **Automatic Versioning**: Transparent version management
- **History Limit**: Automatic cleanup of old versions
- **Timestamp Tracking**: Temporal organization of versions
- **Rollback Capability**: Load specific versions

## Integration Points

### Circuit Builder
- **Boolforge Component**: Primary integration point
- **State Management**: Integrates with circuit state
- **History System**: Works with undo/redo functionality
- **Data Flow**: Manages complete circuit data flow

### Storage System
- **Browser Storage**: Uses localStorage API
- **Data Persistence**: Ensures data survives sessions
- **Cross-session**: Projects available across browser sessions
- **Backup**: Natural backup through browser storage

## Styling Considerations

### CSS Class Structure
- **logic-circuit-project-manager-primary-action-button**: Main button styling
- **logic-circuit-project-manager-fullscreen-overlay-background-container**: Modal overlay
- **logic-circuit-project-manager-modal-window-card-container**: Modal container
- **logic-circuit-project-manager-modal-title-text-heading**: Modal title
- **logic-circuit-project-manager-project-name-text-input-field**: Input field styling

### Visual Design
- **Modal Design**: Clean, modern modal interface
- **Button Styling**: Consistent button appearance
- **Input Styling**: Clear, readable input fields
- **Layout Organization**: Organized modal layout
- **Responsive Design**: Works on different screen sizes

### User Experience
- **Clear Actions**: Obvious save/load buttons
- **Confirmation Dialogs**: Prevent accidental data loss
- **Visual Feedback**: Clear indication of operations
- **Intuitive Interface**: Easy-to-understand controls

## Best Practices

### Data Management
- **Validation**: Validate data before storage
- **Error Handling**: Graceful handling of storage errors
- **Backup Strategy**: Multiple versions for safety
- **Data Integrity**: Ensure data consistency

### User Experience
- **Confirmation**: Confirm destructive actions
- **Feedback**: Clear feedback for operations
- **Intuitive Design**: Easy-to-understand interface
- **Error Prevention**: Prevent user errors

## Performance Considerations

### Storage Efficiency
- **JSON Serialization**: Efficient data format
- **Version Limiting**: Prevent storage bloat
- **Data Compression**: Minimal data storage
- **Cleanup Strategy**: Automatic cleanup of old data

### Rendering Performance
- **Modal Efficiency**: Efficient modal rendering
- **List Rendering**: Efficient project list rendering
- **State Updates**: Optimized state updates
- **Memory Management**: Clean memory usage

## Extension Opportunities

### Cloud Storage
- **Cloud Sync**: Sync projects to cloud storage
- **Sharing**: Share projects with other users
- **Collaboration**: Multi-user project collaboration
- **Backup**: Cloud backup for projects

### Advanced Features
- **Project Templates**: Pre-built project templates
- **Import/Export**: Import/export project files
- **Project Search**: Search saved projects
- **Project Tags**: Tag and categorize projects

## Learning Outcomes
Understanding this component helps developers learn:
- localStorage API usage and best practices
- Modal component implementation patterns
- State management and restoration techniques
- Version control implementation in frontend
- Data serialization and validation
- User interface design for project management
- Error handling and data integrity
- Browser storage limitations and considerations
