# WhiteboardAnimation Component

## Overview
The `WhiteboardAnimation` component is an advanced educational React component that provides animated, step-by-step visualizations of Karnaugh map grouping processes. It features multi-phase animations, mini K-map visualizations, and interactive teaching elements to create an engaging learning experience.

## Functionality
- **Multi-phase Animations**: Sequential animation phases for teaching
- **Mini K-Map Visualization**: Small K-map display with highlighting
- **Step-by-step Teaching**: Progressive revelation of concepts
- **Interactive Elements**: Visual feedback and animations
- **Educational Content**: Comprehensive teaching materials
- **Animation Control**: Coordinated with audio playback
- **Visual Learning**: Emphasis on visual teaching methods

## Props
- `step` (object): Current step object with animation data
- `stepIndex` (number): Index of current step
- `isActive` (boolean): Whether current step is active
- `grid` (array): 2D array representing the Karnaugh map
- `groups` (array): Array of grouping objects
- `variables` (array): Array of variable names
- `numVariables` (number): Number of variables (2-4)
- `getColumnLabels` (function): Function to get column labels
- `getRowLabels` (function): Function to get row labels

## Key Features

### Animation Phase Management
```javascript
const [animationPhase, setAnimationPhase] = useState(0);

useEffect(() => {
    if (isActive && step.type === 'group') {
        const phases = [0, 1, 2, 3]; // Highlight -> Circle -> Variables -> Term
        let currentPhaseIndex = 0;

        const interval = setInterval(() => {
            currentPhaseIndex++;
            if (currentPhaseIndex < phases.length) {
                setAnimationPhase(phases[currentPhaseIndex]);
            } else {
                clearInterval(interval);
            }
        }, 1500); // Change phase every 1.5 seconds

        return () => clearInterval(interval);
    } else {
        setAnimationPhase(0);
    }
}, [isActive, step, stepIndex]);
```

### Mini K-Map Visualization
```javascript
<div className="whiteboard-kmap">
    <div className="whiteboard-kmap-title">K-Map with Group Highlighted</div>
    <table className="whiteboard-table">
        <thead>
            <tr>
                <th className="whiteboard-corner"></th>
                {getColumnLabels().map((label, idx) => (
                    <th key={idx} className="whiteboard-header">{label}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {grid.map((row, rowIdx) => (
                <tr key={rowIdx}>
                    <td className="whiteboard-row-header">{getRowLabels()[rowIdx]}</td>
                    {row.map((cell, colIdx) => {
                        const isInGroup = groupData.cells.some(
                            c => c.row === rowIdx && c.col === colIdx
                        );
                        // Cell rendering logic
                    })}
                </tr>
            ))}
        </tbody>
    </table>
</div>
```

### Educational Content Display
```javascript
<div className="whiteboard-intro">
    <h3 className="whiteboard-title">📚 K-Map Simplification Tutorial</h3>
    <p className="whiteboard-description">
        This interactive whiteboard will guide you through each step of the
        grouping process, showing you exactly how we derive the simplified expression.
    </p>
    <div className="whiteboard-rules">
        <div className="rule-item">
            <span className="rule-icon">1️⃣</span>
            <span>Identify groups of 1s in powers of 2</span>
        </div>
        {/* More rules... */}
    </div>
</div>
```

## Technical Implementation

### Component Architecture
- **Animation System**: Multi-phase animation management
- **State Management**: Complex state for animation phases
- **Visual Rendering**: Dynamic content based on animation phase
- **Educational Logic**: Step-by-step teaching progression

### Animation Phases
- **Phase 0**: Initial highlighting of group cells
- **Phase 1**: Circle drawing around grouped cells
- **Phase 2**: Variable elimination visualization
- **Phase 3**: Final term generation

### Visual Teaching Elements
- **Mini K-Map**: Scaled-down K-map for focused learning
- **Progressive Revelation**: Gradual reveal of information
- **Color Coding**: Visual distinction between elements
- **Animation Timing**: Coordinated timing with audio

## Usage Example
```javascript
import { WhiteboardAnimation } from './components/WhiteboardAnimation';

function MyTeachingComponent() {
    const currentStep = {
        type: 'group',
        title: 'Group Analysis',
        groupData: {
            cells: [{row: 0, col: 0}, {row: 0, col: 1}],
            term: 'A',
            eliminatedVars: ['B', 'C']
        }
    };

    const grid = [
        [1, 1, 0, 0],
        [1, 0, 0, 0]
    ];

    return (
        <WhiteboardAnimation
            step={currentStep}
            stepIndex={0}
            isActive={true}
            grid={grid}
            groups={[]}
            variables={['A', 'B', 'C']}
            numVariables={3}
            getColumnLabels={() => ['00', '01', '11', '10']}
            getRowLabels={() => ['0', '1']}
        />
    );
}
```

## Advanced Features

### Multi-phase Animation System
- **Sequential Phases**: Progressive animation stages
- **Timing Control**: Coordinated timing with audio
- **Phase Management**: Clean phase transitions
- **Animation Cleanup**: Proper cleanup of animations

### Educational Content Generation
- **Dynamic Content**: Content generated from step data
- **Context Awareness**: Adapts to specific grouping
- **Teaching Logic**: Educational progression
- **Visual Learning**: Emphasis on visual teaching

### Interactive Elements
- **Visual Feedback**: Clear visual indication of current phase
- **Animation Synchronization**: Coordinated with other components
- **User Engagement**: Engaging visual elements
- **Learning Support**: Support for different learning styles

## Design Patterns

### Animation Pattern
- **Phase-based Animation**: Sequential animation phases
- **State-driven**: Animation driven by state changes
- **Timing Control**: Precise timing coordination
- **Cleanup Management**: Proper cleanup of animations

### Educational Pattern
- **Progressive Disclosure**: Gradual reveal of information
- **Visual Teaching**: Emphasis on visual learning
- **Step-by-step**: Sequential concept introduction
- **Multi-sensory**: Engages multiple senses

### Component Pattern
- **Prop-driven**: All content driven by props
- **Conditional Rendering**: Renders based on step type
- **State Management**: Complex state for animations
- **Effect Management**: Proper useEffect management

## Integration Points

### Teaching System
- **GroupingGuide**: Primary consumer of this component
- **Speech Synthesis**: Coordinated with audio narration
- **Educational Content**: Part of learning content system
- **Visual Learning**: Integration with visual learning tools

### Animation Ecosystem
- **CSS Animations**: Hardware-accelerated animations
- **State Coordination**: Coordinated with parent state
- **Timing System**: Integrated with timing system
- **Visual Effects**: Part of visual effects system

## Styling Considerations

### CSS Class Structure
- **whiteboard-container**: Main container styling
- **whiteboard-content**: Content area styling
- **whiteboard-title**: Title styling with emoji
- **whiteboard-kmap**: Mini K-map container
- **whiteboard-table**: Table styling for mini K-map
- **whiteboard-rules**: Rules container styling

### Visual Design
- **Educational Focus**: Clear, educational visual design
- **Animation Effects**: Smooth, educational animations
- **Color Coding**: Consistent color scheme
- **Typography**: Readable fonts and sizing
- **Responsive Design**: Works on different screen sizes

### Animation Styling
- **Phase-based Styling**: Different styles for each phase
- **Smooth Transitions**: Smooth CSS transitions
- **Visual Feedback**: Clear indication of current phase
- **Educational Clarity**: Animations that enhance learning

## Best Practices

### Animation Design
- **Clear Purpose**: Each animation has educational purpose
- **Appropriate Timing**: Timing suitable for learning
- **Visual Clarity**: Clear visual indication of changes
- **User Control**: Users can control animation pace

### Educational Design
- **Progressive Learning**: Sequential concept introduction
- **Visual Support**: Visual elements support learning
- **Multi-modal**: Engages multiple learning styles
- **Accessibility**: Accessible to all users

## Performance Considerations

### Animation Performance
- **Hardware Acceleration**: Use CSS transforms for performance
- **Memory Management**: Clean up animations properly
- **Efficient Updates**: Minimize unnecessary re-renders
- **Timing Optimization**: Efficient timing management

### Rendering Performance
- **Conditional Rendering**: Only render necessary elements
- **Key Management**: Proper React keys for efficiency
- **State Optimization**: Efficient state updates
- **Effect Cleanup**: Proper cleanup of side effects

## Extension Opportunities

### Enhanced Animations
- **Custom Animations**: Allow custom animation sequences
- **Interactive Animations**: User-controlled animations
- **3D Effects**: 3D visualization capabilities
- **Drawing Tools**: Interactive drawing capabilities

### Advanced Features
- **Recording**: Record teaching sessions
- **Export**: Export animations as video
- **Collaboration**: Multi-user whiteboard
- **Templates**: Pre-built teaching templates

## Learning Outcomes
Understanding this component helps developers learn:
- Complex animation systems in React
- Educational interface design
- State management for animations
- useEffect and cleanup patterns
- Visual teaching techniques
- Component composition for education
- Performance optimization for animations
- Multi-phase animation coordination
