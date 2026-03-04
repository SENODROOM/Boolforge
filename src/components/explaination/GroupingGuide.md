# GroupingGuide Component

## Overview
The `GroupingGuide` component is an advanced educational React component that provides an interactive, step-by-step explanation of Karnaugh map grouping with speech synthesis, whiteboard animations, and comprehensive learning features. It combines audio narration, visual animations, and interactive controls to create an immersive learning experience.

## Functionality
- **Speech Synthesis**: Audio narration of grouping explanations
- **Whiteboard Animation**: Visual teaching animations
- **Step-by-step Guide**: Sequential explanation of grouping process
- **Interactive Controls**: Play, stop, and navigation controls
- **Visual Synchronization**: Coordinated audio and visual content
- **Educational Content**: Comprehensive grouping explanations
- **Progress Tracking**: Visual indication of current learning step

## Props
- `groups` (array): Array of grouping objects with color information
- `variables` (array): Array of variable names
- `numVariables` (number): Number of variables (2-4)
- `grid` (array): 2D array representing the Karnaugh map
- `getColumnLabels` (function): Function to get column labels
- `getRowLabels` (function): Function to get row labels
- `optimizationType` (string): 'SOP' or 'POS' (default: 'SOP')

## Key Features

### Speech Integration
```javascript
const { speak, cancel, isSpeaking } = useSpeechSynthesis();

const handlePlayExplanation = (index) => {
    if (isSpeaking) {
        cancel();
    }
    setCurrentStep(index);
    setIsPlaying(true);
    speak(explanations[index].text, () => {
        setIsPlaying(false);
        if (index < explanations.length - 1) {
            setTimeout(() => {
                handlePlayExplanation(index + 1);
            }, 1500);
        }
    });
};
```

### Whiteboard Integration
```javascript
{showWhiteboard && (
    <WhiteboardAnimation
        step={explanations[currentStep]}
        stepIndex={currentStep}
        isActive={isPlaying}
        grid={grid}
        groups={groups}
        variables={variables}
        numVariables={numVariables}
        getColumnLabels={getColumnLabels}
        getRowLabels={getRowLabels}
    />
)}
```

### Control Interface
```javascript
<div className="kmap-guide-controls">
    <button
        className="kmap-btn kmap-btn-primary"
        onClick={handlePlayAll}
        disabled={isPlaying}
    >
        {isPlaying ? '▶️ Playing...' : '▶️ Play Full Explanation'}
    </button>
    <button
        className="kmap-btn kmap-btn-outline"
        onClick={handleStop}
        disabled={!isPlaying}
    >
        ⏹️ Stop
    </button>
    <button
        className="kmap-btn kmap-btn-secondary"
        onClick={() => setShowWhiteboard(!showWhiteboard)}
    >
        {showWhiteboard ? '📋 Hide' : '🎨 Show'} Whiteboard
    </button>
</div>
```

## Technical Implementation

### Component Architecture
- **Multi-modal Learning**: Combines audio, visual, and interactive elements
- **State Management**: Complex state for playback, steps, and UI
- **Hook Integration**: Uses custom hooks for speech synthesis
- **Animation Coordination**: Synchronizes animations with audio

### Speech Synthesis Integration
- **Custom Hook**: Uses useSpeechSynthesis hook
- **Sequential Playback**: Automatic progression through steps
- **Playback Control**: Play, stop, and pause functionality
- **Error Handling**: Graceful handling of speech errors

### Animation System
- **Whiteboard Component**: Dedicated animation component
- **Step Synchronization**: Animations synchronized with audio
- **Visual Feedback**: Clear visual indication of current step
- **Educational Focus**: Animations designed for learning

## Usage Example
```javascript
import { GroupingGuide } from './components/GroupingGuide';

function MyKMapComponent() {
    const groups = [
        {
            id: 'group1',
            cells: [{row: 0, col: 0}, {row: 0, col: 1}],
            color: { bg: 'rgba(34, 197, 94, 0.3)', border: '#22c55e' }
        }
    ];

    const grid = [
        [1, 1, 0, 0],
        [1, 0, 0, 0]
    ];

    return (
        <GroupingGuide
            groups={groups}
            variables={['A', 'B', 'C']}
            numVariables={3}
            grid={grid}
            getColumnLabels={() => ['00', '01', '11', '10']}
            getRowLabels={() => ['0', '1']}
            optimizationType="SOP"
        />
    );
}
```

## Advanced Features

### Multi-modal Learning
- **Audio Narration**: Speech synthesis for explanations
- **Visual Animations**: Whiteboard-style teaching animations
- **Interactive Controls**: User control over learning pace
- **Progress Tracking**: Visual indication of learning progress

### Sequential Playback
- **Auto-progression**: Automatic advancement through steps
- **Pause Control**: User can pause and resume
- **Step Navigation**: Jump to specific steps
- **Completion Handling**: Proper handling of sequence completion

### Educational Content Generation
- **Dynamic Explanations**: Generates explanations based on groups
- **Context-aware**: Adapts to specific K-map configuration
- **Step-by-step**: Breaks down complex concepts
- **Learning Objectives**: Clear educational goals

## Design Patterns

### Multi-modal Pattern
- **Audio Integration**: Speech synthesis for narration
- **Visual Integration**: Whiteboard animations
- **Interactive Elements**: User controls for learning
- **Synchronization**: Coordinated audio and visual content

### Educational Pattern
- **Step-by-step Learning**: Sequential concept introduction
- **Progressive Disclosure**: Gradual reveal of information
- **Interactive Learning**: User control over learning pace
- **Multi-sensory Learning**: Engages multiple senses

### State Management Pattern
- **Complex State**: Multiple state variables for coordination
- **State Synchronization**: Coordinated state updates
- **Event Handling**: Comprehensive event management
- **Cleanup**: Proper cleanup of resources

## Integration Points

### K-Map Tools
- **KMapGenerator**: Primary consumer of this component
- **useKMapLogic**: Hook providing grouping data
- **KMapDisplay**: Companion component for visualization
- **Educational Tools**: Integration with learning system

### Animation System
- **WhiteboardAnimation**: Dedicated animation component
- **Speech Synthesis**: Integration with speech system
- **Educational Content**: Part of learning content system
- **Visual Learning**: Integration with visual learning tools

## Styling Considerations

### CSS Class Structure
- **kmap-card**: Main container styling
- **kmap-grouping-guide**: Specific guide styling
- **kmap-section-title**: Title styling with voice icon
- **kmap-guide-controls**: Control button styling
- **kmap-explanation-steps**: Step container styling
- **kmap-explanation-step**: Individual step styling

### Visual Design
- **Educational Focus**: Clear, educational visual design
- **Interactive Elements**: Prominent control buttons
- **Progress Indication**: Visual indication of current step
- **Accessibility**: Screen reader friendly design
- **Responsive Design**: Works on different screen sizes

### Animation Integration
- **Synchronized Timing**: Coordinated with audio playback
- **Visual Feedback**: Clear indication of active steps
- **Smooth Transitions**: Smooth animations between steps
- **Educational Clarity**: Animations that enhance learning

## Best Practices

### Educational Design
- **Clear Progression**: Logical sequence of concepts
- **Multi-modal Engagement**: Engage multiple learning styles
- **User Control**: Allow users to control learning pace
- **Accessibility**: Ensure accessibility for all users

### Component Design
- **Modular Design**: Separate concerns for maintainability
- **Hook Integration**: Efficient use of custom hooks
- **State Management**: Clean state management
- **Performance**: Optimized for smooth playback

## Performance Considerations

### Animation Performance
- **Hardware Acceleration**: Use CSS animations for performance
- **Memory Management**: Clean up animations properly
- **Synchronization**: Efficient coordination of elements
- **Resource Cleanup**: Proper cleanup of resources

### Audio Performance
- **Speech Optimization**: Efficient speech synthesis
- **Buffer Management**: Proper audio buffer management
- **Error Handling**: Graceful handling of audio errors
- **User Experience**: Smooth audio playback

## Extension Opportunities

### Enhanced Learning
- **Quiz Integration**: Interactive quizzes for assessment
- **Progress Tracking**: Track user learning progress
- **Custom Content**: Allow custom educational content
- **Multiple Languages**: Support for multiple languages

### Advanced Features
- **Recording**: Allow users to record explanations
- **Sharing**: Share learning sessions
- **Collaboration**: Multi-user learning sessions
- **Analytics**: Learning analytics and insights

## Learning Outcomes
Understanding this component helps developers learn:
- Multi-modal educational interface design
- Speech synthesis integration in React
- Animation coordination and synchronization
- Complex state management patterns
- Educational content generation
- User experience design for learning
- Accessibility considerations
- Performance optimization for multimedia
