# InteractiveCalculator Component

## Overview
The `InteractiveCalculator` component is a reusable React component that provides a standardized calculator interface with input field, action buttons, and result display. It's designed to be flexible enough for various calculation scenarios while maintaining a consistent user experience across the Boolforge application.

## Functionality
- **Input Field**: Text input for user data entry
- **Action Buttons**: Calculate, Example, and Reset buttons
- **Result Display**: Dynamic result display area
- **Example Loading**: Pre-filled example functionality
- **Input Validation**: Basic input validation and state management
- **Responsive Design**: Adapts to different content types
- **Styled-jsx**: Component-scoped styling

## Props
- `title` (string): Title for the calculator
- `description` (string): Optional description text
- `inputLabel` (string): Label for the input field
- `inputPlaceholder` (string): Placeholder text for input
- `onCalculate` (function): Callback function for calculation
- `result` (any): Calculation result to display
- `example` (string): Optional example value
- `onExample` (function): Callback for example action

## Key Features

### Input Management
```javascript
const [input, setInput] = useState('');

const handleCalculate = () => {
  if (input.trim()) {
    onCalculate(input);
  }
};
```

### Button Actions
```javascript
const handleExample = () => {
  if (example) {
    setInput(example);
    onCalculate(example);
  }
};

const handleReset = () => {
  setInput('');
  onCalculate('');
};
```

### Result Display
```javascript
{result && (
  <div className="calculator-result">
    <h4>Result:</h4>
    <div className="result-content">
      {result}
    </div>
  </div>
)}
```

## Technical Implementation

### Component Architecture
- **State Management**: Local state for input value
- **Event Handling**: Comprehensive button and input event handling
- **Conditional Rendering**: Smart rendering of example button and results
- **Styled-jsx**: Component-scoped CSS styling

### Input Handling
- **State Synchronization**: Input value synchronized with local state
- **Validation**: Basic validation for empty input
- **Reset Functionality**: Clear input and result
- **Example Integration**: Load example values automatically

### Button Logic
- **Calculate Button**: Disabled when input is empty
- **Example Button**: Only shown when example prop is provided
- **Reset Button**: Always available for clearing state
- **Visual Feedback**: Different button styles for different actions

## Usage Example
```javascript
import InteractiveCalculator from './components/InteractiveCalculator';

function MyCalculatorComponent() {
  const [result, setResult] = useState('');

  const handleCalculate = (input) => {
    // Perform calculation
    const calculationResult = performCalculation(input);
    setResult(calculationResult);
  };

  return (
    <InteractiveCalculator
      title="Binary Calculator"
      description="Convert decimal numbers to binary"
      inputLabel="Enter decimal number:"
      inputPlaceholder="e.g., 42"
      onCalculate={handleCalculate}
      result={result}
      example="255"
    />
  );
}
```

## Advanced Features

### Component-scoped Styling
```javascript
<style jsx>{`
  .calculator-title {
    color: #e2e8f0;
    margin-bottom: 12px;
  }
  
  .calculator-description {
    color: #9ca3af;
    margin-bottom: 20px;
    font-size: 0.95rem;
  }
  
  .calculator-input-group {
    margin-bottom: 20px;
  }
  
  .calculator-label {
    display: block;
    margin-bottom: 8px;
    color: #cbd5e1;
    font-weight: 500;
  }
  
  .calculator-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #475569;
    border-radius: 8px;
    background: #1e293b;
    color: #f1f5f9;
    font-size: 1rem;
  }
  
  .calculator-buttons {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
  }
  
  .calculator-result {
    padding: 16px;
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 8px;
  }
  
  .result-content {
    color: #22c55e;
    font-family: 'Courier New', monospace;
    font-size: 1.1rem;
    margin-top: 8px;
  }
`}</style>
```

### Conditional Rendering
- **Example Button**: Only renders when example prop is provided
- **Result Display**: Only shows when result is available
- **Button States**: Calculate button disabled for empty input
- **Dynamic Content**: Adapts to different result types

### Input Validation
- **Empty Check**: Prevents calculation with empty input
- **Trim Handling**: Handles whitespace in input
- **Reset Protection**: Graceful handling of reset operations
- **Error Prevention**: Basic validation to prevent errors

## Design Patterns

### Controlled Component Pattern
- **Local State**: Manages input value locally
- **Callback Communication**: Uses callbacks for parent communication
- **State Synchronization**: Keeps input and result in sync
- **Event Handling**: Comprehensive event management

### Conditional Rendering Pattern
- **Prop-based Rendering**: Renders elements based on props
- **Smart Display**: Only shows relevant elements
- **User Experience**: Clean, uncluttered interface
- **Performance**: Efficient rendering

### Styled-jsx Pattern
- **Component Scoping**: Styles scoped to component
- **No Global Pollution**: No CSS conflicts
- **Dynamic Styling**: Can use props in styles
- **Maintainability**: Styles co-located with component

## Integration Points

### Calculator Tools
- **Circuit Cost Calculator**: Used for circuit analysis calculations
- **Number System Tools**: Integration with conversion calculators
- **Boolean Algebra Tools**: Works with Boolean expression calculators
- **Educational Tools**: Integration with learning components

### Component Ecosystem
- **Button Components**: Uses consistent button styling
- **Input Components**: Follows application input patterns
- **Result Components**: Integrates with result display patterns
- **Layout Components**: Works with application layout system

## Styling Considerations

### CSS-in-JS Benefits
- **Component Isolation**: Styles don't leak to other components
- **Dynamic Styling**: Can use props and state in styles
- **Maintainability**: Styles co-located with component logic
- **Performance**: Optimized CSS injection

### Visual Design
- **Dark Theme**: Consistent with application dark theme
- **Typography**: Clear, readable fonts and sizing
- **Color Scheme**: Theme-appropriate color usage
- **Spacing**: Proper spacing and padding
- **Interactive Elements**: Clear hover and focus states

### Responsive Design
- **Flexible Layout**: Adapts to different content sizes
- **Button Stacking**: Responsive button layout
- **Input Sizing**: Appropriate input field sizing
- **Text Scaling**: Readable text on all devices

## Best Practices

### Component Design
- **Single Responsibility**: Focused on calculator functionality
- **Flexible Interface**: Works with different calculation types
- **Consistent Behavior**: Predictable component behavior
- **Clear Props**: Well-defined prop interface

### User Experience
- **Clear Feedback**: Immediate visual feedback
- **Input Guidance**: Helpful placeholders and labels
- **Error Prevention**: Basic validation to prevent errors
- **Accessibility**: Semantic HTML and keyboard support

## Performance Considerations

### Rendering Efficiency
- **Local State**: Efficient state management
- **Conditional Rendering**: Only renders necessary elements
- **Styled-jsx**: Optimized CSS injection
- **Minimal Re-renders**: Efficient update patterns

### User Experience
- **Fast Response**: Immediate feedback to user actions
- **Smooth Interactions**: Responsive button states
- **Clear Results**: Prominent result display
- **Intuitive Controls**: Easy-to-understand interface

## Extension Opportunities

### Enhanced Validation
- **Input Validation**: More sophisticated input validation
- **Error Messages**: Detailed error display
- **Format Checking**: Advanced format validation
- **Auto-correction**: Automatic input formatting

### Advanced Features
- **History**: Recent calculation history
- **Export**: Export results functionality
- **Shortcuts**: Keyboard shortcuts
- **Themes**: Theme customization options

## Learning Outcomes
Understanding this component helps developers learn:
- React component patterns and best practices
- State management with useState
- Event handling and callback patterns
- Conditional rendering techniques
- CSS-in-JS styling with styled-jsx
- Component composition and reusability
- User interface design principles
- Form input handling and validation
