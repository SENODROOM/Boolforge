# InputControls Component

## Overview
The `InputControls` component is a comprehensive React component that provides a complete control interface for Karnaugh map configuration. It offers controls for variable selection, minterm input, don't care specification, and optimization type selection, making it the primary user interface for K-map tool configuration.

## Functionality
- **Variable Configuration**: Controls for number of variables and custom variable names
- **Minterm Input**: Text input for comma-separated minterm indices
- **Don't Care Specification**: Optional input for don't care terms
- **Optimization Type Selection**: Toggle between SOP and POS optimization
- **Action Buttons**: Generate, example, and reset functionality
- **Real-time Validation**: Input validation and helper text guidance
- **Responsive Layout**: Organized grid layout for controls

## Props
- `numVariables` (number): Current number of variables (2-4)
- `variables` (array): Array of variable names
- `minterms` (string): Comma-separated minterm string
- `dontCares` (string): Comma-separated don't care string
- `optimizationType` (string): 'SOP' or 'POS'
- `onVariablesChange` (function): Callback for variable count change
- `onVariablesUpdate` (function): Callback for variable name updates
- `onMintermsChange` (function): Callback for minterm input change
- `onDontCaresChange` (function): Callback for don't care input change
- `onOptimizationTypeChange` (function): Callback for optimization type change
- `onGenerate` (function): Callback for generate action
- `onExample` (function): Callback for example action
- `onReset` (function): Callback for reset action

## Key Features

### Variable Configuration
```javascript
<div className="kmap-control-group">
    <label className="kmap-label">Number of Variables</label>
    <select
        className="kmap-input"
        value={numVariables}
        onChange={(e) => onVariablesChange(e.target.value)}
    >
        <option value="2">2 Variables</option>
        <option value="3">3 Variables</option>
        <option value="4">4 Variables</option>
    </select>
</div>
```

### Variable Name Management
```javascript
const handleVariableNameChange = (index, value) => {
    const newVars = [...variables];
    newVars[index] = value.toUpperCase().charAt(0) || variables[index];
    onVariablesUpdate(newVars);
};
```

### Minterm and Don't Care Input
```javascript
<div className="kmap-control-group">
    <label className="kmap-label">Minterms (comma-separated)</label>
    <input
        type="text"
        className="kmap-input"
        value={minterms}
        onChange={(e) => onMintermsChange(e.target.value)}
        placeholder="e.g., 0,1,2,5,6,7"
    />
    <p className="kmap-helper-text">
        Enter decimal minterm numbers (0 to {Math.pow(2, numVariables) - 1})
    </p>
</div>
```

## Technical Implementation

### Component Architecture
- **Control Groups**: Organized sections for different control types
- **Event Handling**: Comprehensive event handling for all inputs
- **Input Validation**: Real-time validation and user guidance
- **Responsive Layout**: Grid-based layout for organization

### State Management
- **Controlled Components**: All inputs are controlled components
- **Callback Pattern**: Uses callbacks to communicate with parent
- **Real-time Updates**: Immediate feedback on input changes
- **Validation Logic**: Input validation and error prevention

### User Interface Design
- **Grid Layout**: CSS Grid for organized control arrangement
- **Helper Text**: Contextual help text for each control
- **Visual Hierarchy**: Clear labeling and organization
- **Consistent Styling**: Uniform appearance across controls

## Usage Example
```javascript
import { InputControls } from './components/InputControls';

function MyKMapTool() {
    const [numVariables, setNumVariables] = useState(3);
    const [variables, setVariables] = useState(['A', 'B', 'C']);
    const [minterms, setMinterms] = useState('');
    const [dontCares, setDontCares] = useState('');
    const [optimizationType, setOptimizationType] = useState('SOP');

    const handleGenerate = () => {
        // Generate K-map based on inputs
    };

    const handleExample = () => {
        // Load example data
    };

    const handleReset = () => {
        // Reset all inputs
    };

    return (
        <InputControls
            numVariables={numVariables}
            variables={variables}
            minterms={minterms}
            dontCares={dontCares}
            optimizationType={optimizationType}
            onVariablesChange={setNumVariables}
            onVariablesUpdate={setVariables}
            onMintermsChange={setMinterms}
            onDontCaresChange={setDontCares}
            onOptimizationTypeChange={setOptimizationType}
            onGenerate={handleGenerate}
            onExample={handleExample}
            onReset={handleReset}
        />
    );
}
```

## Advanced Features

### Dynamic Variable Management
- **Variable Count Selection**: Dropdown for 2-4 variables
- **Custom Variable Names**: Editable inputs for variable names
- **Character Validation**: Ensures single uppercase letters
- **Auto-correction**: Automatic formatting of variable names

### Input Validation and Guidance
- **Range Validation**: Dynamic range hints based on variable count
- **Format Guidance**: Placeholder text showing expected format
- **Helper Text**: Contextual help for each input type
- **Error Prevention**: Input validation to prevent errors

### Optimization Type Selection
- **Dual Mode Support**: SOP and POS optimization options
- **Educational Labels**: Clear descriptions of optimization types
- **Helper Text**: Mathematical notation for each type
- **Visual Distinction**: Clear selection interface

## Design Patterns

### Controlled Component Pattern
- **State Synchronization**: All inputs synchronized with parent state
- **Callback Communication**: Uses callbacks for state updates
- **Validation Integration**: Validation integrated with state updates
- **Real-time Feedback**: Immediate response to user input

### Form Control Pattern
- **Label-Input Association**: Proper label-input relationships
- **Helper Text Integration**: Contextual help text
- **Input Grouping**: Logical grouping of related controls
- **Visual Hierarchy**: Clear organization of controls

### Event Handling Pattern
- **Event Delegation**: Efficient event handling
- **Input Validation**: Validation on input change
- **State Updates**: Coordinated state updates
- **User Feedback**: Immediate visual feedback

## Integration Points

### K-Map Tools
- **KMapGenerator**: Primary consumer of this component
- **useKMapLogic**: Hook that processes the input data
- **KMapDisplay**: Component that displays results
- **Educational Tools**: Integration with learning components

### Form Ecosystem
- **Control Components**: Uses consistent control styling
- **Validation System**: Integrates with validation framework
- **Helper System**: Uses consistent helper text patterns
- **Layout System**: Follows application layout guidelines

## Styling Considerations

### CSS Class Structure
- **kmap-card**: Main container styling
- **kmap-controls-grid**: Grid layout for controls
- **kmap-control-group**: Individual control group styling
- **kmap-label**: Label styling
- **kmap-input**: Input field styling
- **kmap-helper-text**: Helper text styling

### Visual Design
- **Grid Layout**: Organized grid arrangement of controls
- **Consistent Spacing**: Uniform spacing between elements
- **Typography**: Clear, readable labels and text
- **Color Scheme**: Theme-appropriate colors
- **Interactive Elements**: Clear focus and hover states

### Responsive Behavior
- **Grid Adaptation**: Adapts grid to screen size
- **Input Sizing**: Appropriate input field sizes
- **Text Scaling**: Readable text on all devices
- **Touch Targets**: Touch-friendly control sizes

## Best Practices

### Input Design
- **Clear Labeling**: Descriptive labels for all controls
- **Helper Text**: Contextual help for user guidance
- **Input Validation**: Prevent invalid input
- **Format Guidance**: Show expected input format

### Component Design
- **Single Responsibility**: Focused on input control
- **Prop Interface**: Clear, comprehensive prop interface
- **Callback Pattern**: Efficient communication with parent
- **Consistent Behavior**: Predictable component behavior

## Performance Considerations

### Rendering Efficiency
- **Minimal State**: No internal state management
- **Efficient Updates**: Only re-renders when props change
- **Input Optimization**: Optimized input handling
- **Layout Efficiency**: Efficient CSS Grid layout

### User Experience
- **Real-time Feedback**: Immediate response to input
- **Validation Prevention**: Prevents errors before they occur
- **Helper Guidance**: Contextual help when needed
- **Consistent Interface**: Uniform control behavior

## Extension Opportunities

### Enhanced Validation
- **Real-time Validation**: More sophisticated input validation
- **Error Messages**: Detailed error message display
- **Format Checking**: Advanced format validation
- **Auto-completion**: Suggest valid inputs

### Advanced Features
- **Presets**: Predefined configuration presets
- **Import/Export**: Import/export configurations
- **History**: Recent configuration history
- **Templates**: Configuration templates

## Learning Outcomes
Understanding this component helps developers learn:
- Controlled component patterns in React
- Form input handling and validation
- Event handling and callback patterns
- Responsive form design
- User interface design principles
- Component composition techniques
- State management patterns
- Educational interface design
