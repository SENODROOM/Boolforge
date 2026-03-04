# InteractiveDemo Component

## Overview
The `InteractiveDemo` component is a comprehensive React component designed for creating interactive demonstrations of Boolean logic and digital circuits. It provides toggle switches for inputs, displays for outputs, and optional truth table visualization, making it ideal for educational and demonstration purposes.

## Functionality
- **Interactive Inputs**: Toggle switches for Boolean input variables
- **Output Display**: Real-time display of calculation results
- **Truth Table Integration**: Optional truth table visualization
- **State Management**: Manages input state and change notifications
- **Responsive Layout**: Organized grid layout for inputs and outputs
- **Customizable Appearance**: Flexible styling and labeling

## Props
- `title` (string): Title for the demonstration
- `description` (string): Optional description text
- `inputs` (array): Array of input objects with name and label properties
- `outputs` (array): Array of output objects with name, label, and value properties
- `onInputChange` (function): Callback function when inputs change
- `showTruthTable` (boolean): Whether to show truth table (default: false)
- `truthTableData` (array): Truth table data array

## Key Features

### Input Management
```javascript
const [inputValues, setInputValues] = useState(
  inputs.reduce((acc, input) => ({ ...acc, [input.name]: false }), {})
);
```

### Toggle Switch Interface
```javascript
<div className="toggle-switch">
  <input
    type="checkbox"
    checked={inputValues[input.name]}
    onChange={(e) => handleInputChange(input.name, e.target.checked)}
  />
  <span className="toggle-slider"></span>
  <span className="toggle-value">
    {inputValues[input.name] ? '1' : '0'}
  </span>
</div>
```

### Output Display
```javascript
<span className="output-value">
  {output.value !== undefined ? (output.value ? '1' : '0') : '-'}
</span>
```

## Technical Implementation

### State Management
- **Input State**: Tracks Boolean values for all inputs
- **Change Handling**: Manages input changes and notifications
- **Initial State**: Sets all inputs to false initially
- **Callback Support**: Notifies parent of input changes

### Component Structure
- **Demo Container**: Main container with title and description
- **Input Section**: Organized area for input controls
- **Output Section**: Display area for output values
- **Truth Table Section**: Optional truth table visualization

### Interactive Elements
- **Toggle Switches**: Custom-styled checkbox inputs
- **Real-time Updates**: Immediate feedback on input changes
- **Binary Display**: Shows 1/0 values for Boolean logic
- **Grid Layout**: Organized arrangement of controls

## Usage Example
```javascript
import InteractiveDemo from './components/InteractiveDemo';

const inputs = [
  { name: 'A', label: 'Input A' },
  { name: 'B', label: 'Input B' },
  { name: 'C', label: 'Input C' }
];

const outputs = [
  { name: 'F', label: 'Output F', value: calculatedValue }
];

const truthTableData = [
  { inputs: { A: false, B: false, C: false }, outputs: { F: false } },
  { inputs: { A: false, B: false, C: true }, outputs: { F: true } },
  // ... more rows
];

function MyComponent() {
  const [outputs, setOutputs] = useState([]);

  const handleInputChange = (inputValues) => {
    // Calculate outputs based on inputs
    const result = calculateLogic(inputValues);
    setOutputs([{ name: 'F', label: 'Output F', value: result }]);
  };

  return (
    <InteractiveDemo
      title="AND Gate Demonstration"
      description="Interactive demonstration of AND gate logic"
      inputs={inputs}
      outputs={outputs}
      onInputChange={handleInputChange}
      showTruthTable={true}
      truthTableData={truthTableData}
    />
  );
}
```

## Advanced Features

### Dynamic Input Handling
- **Flexible Input Count**: Handles any number of inputs
- **Custom Labels**: Supports custom input labels
- **State Initialization**: Automatically initializes input state
- **Change Propagation**: Efficient state update and notification

### Truth Table Integration
- **Conditional Display**: Only shows when enabled and data provided
- **Dynamic Headers**: Generates headers from input/output definitions
- **Data Mapping**: Maps truth table data to display format
- **Binary Formatting**: Displays values as 1/0 for clarity

### Visual Design
- **Toggle Switches**: Custom-styled toggle switches
- **Grid Layout**: Organized grid arrangement
- **Binary Display**: Clear 1/0 value display
- **Responsive Design**: Adapts to different screen sizes

## Design Patterns

### State Management Pattern
- **Local State**: Manages input values locally
- **Callback Pattern**: Notifies parent of changes
- **Initialization**: Proper state initialization
- **Update Handling**: Efficient state updates

### Component Composition Pattern
- **Flexible Interface**: Works with different input/output configurations
- **Conditional Features**: Optional truth table display
- **Extensible Design**: Easy to add new features
- **Reusable Component**: Can be used across different demonstrations

### Interactive Pattern
- **Real-time Feedback**: Immediate response to user input
- **Binary Interface**: Boolean logic interface design
- **Visual Feedback**: Clear visual state indication
- **User-friendly**: Intuitive interaction design

## Integration Points

### Educational Tools
- **Logic Gate Demonstrations**: Perfect for gate behavior visualization
- **Boolean Algebra**: Interactive Boolean expression evaluation
- **Circuit Analysis**: Real-time circuit behavior demonstration
- **Learning Tools**: Educational content presentation

### Component Ecosystem
- **Calculation Components**: Works with calculation engines
- **Visualization Components**: Complements chart and graph components
- **Educational Components**: Fits with learning content
- **Analysis Components**: Integrates with analysis tools

## Styling Considerations

### CSS Class Structure
- **interactive-demo**: Main container styling
- **demo-title/demo-description**: Header styling
- **input-section/output-section**: Section containers
- **input-grid/output-grid**: Grid layout styling
- **toggle-switch**: Custom toggle switch styling
- **output-display**: Output value styling

### Visual Design
- **Toggle Switches**: Modern, accessible toggle design
- **Grid Layout**: Clean, organized arrangement
- **Binary Display**: Clear 1/0 value presentation
- **Color Coding**: Visual distinction between states
- **Typography**: Readable labels and values

### Responsive Behavior
- **Mobile Adaptation**: Touch-friendly toggle switches
- **Grid Responsiveness**: Adapts grid to screen size
- **Text Scaling**: Appropriate text sizing
- **Spacing Optimization**: Efficient use of space

## Best Practices

### Component Design
- **Flexible Interface**: Accommodate various use cases
- **Clear Props**: Well-defined prop interface
- **Consistent Behavior**: Predictable component behavior
- **Error Handling**: Graceful handling of edge cases

### User Experience
- **Intuitive Controls**: Easy-to-understand toggle switches
- **Clear Feedback**: Immediate visual feedback
- **Readable Display**: Clear value presentation
- **Accessibility**: Screen reader friendly design

## Performance Considerations

### Rendering Efficiency
- **State Optimization**: Efficient state management
- **Conditional Rendering**: Only render necessary sections
- **Key Management**: Proper React key usage
- **Update Optimization**: Minimize unnecessary re-renders

### Interaction Performance
- **Real-time Updates**: Fast response to user input
- **State Batching**: Efficient state updates
- **Event Handling**: Optimized event handling
- **Memory Management**: Clean state management

## Extension Opportunities

### Enhanced Interactions
- **Animation**: Add transition animations
- **Keyboard Support**: Keyboard navigation
- **Touch Gestures**: Enhanced touch interactions
- **Voice Control**: Voice command integration

### Advanced Features
- **Input History**: Track input changes over time
- **Export Functionality**: Export current state
- **Comparison Mode**: Compare different configurations
- **Custom Themes**: Theme customization support

## Learning Outcomes
Understanding this component helps developers learn:
- Interactive component design patterns
- State management in React
- Custom form control implementation
- Component composition techniques
- Educational interface design
- Responsive layout implementation
- Event handling patterns
- User experience design principles
