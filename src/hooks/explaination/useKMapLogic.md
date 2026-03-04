# useKMapLogic Hook

## Overview
The `useKMapLogic` hook is a comprehensive React custom hook that provides all the logic and state management needed for Karnaugh map functionality. It handles minterm processing, grid generation, expression simplification, and grouping detection for Boolean function optimization.

## Functionality
- **Minterm Processing**: Parse and validate minterm and don't care inputs
- **Grid Generation**: Create Karnaugh map grids for 2-4 variables
- **Expression Simplification**: Generate optimized Boolean expressions
- **Group Detection**: Identify optimal groups in the Karnaugh map
- **Label Generation**: Provide proper Gray code labels for rows and columns
- **Position Mapping**: Map minterms to grid positions

## Parameters
- `numVariables` (number): Number of variables (2-4)
- `variables` (array): Array of variable names ['A', 'B', 'C', 'D']
- `minterms` (string): Comma-separated minterm indices
- `dontCares` (string): Comma-separated don't care indices (optional)
- `optimizationType` (string): 'SOP' or 'POS' (default: 'SOP')

## Return Values
- `grid`: 2D array representing the Karnaugh map
- `expression`: Simplified Boolean expression
- `groups`: Array of identified groups for visualization
- `getColumnLabels()`: Function to get column labels
- `getRowLabels()`: Function to get row labels
- `getMintermPosition()`: Function to map minterm to grid position
- `simplifyBoolean()`: Function to get simplified expression
- `dontCareArray`: Processed don't care array
- `optimizationType`: Current optimization type

## Key Features

### Minterm Processing
```javascript
const mintermArray = useMemo(() => {
    return minterms
        .split(',')
        .map(m => m.trim())
        .filter(m => m !== '')
        .map(m => parseInt(m))
        .filter(m => !isNaN(m) && m >= 0 && m < Math.pow(2, numVariables));
}, [minterms, numVariables]);
```

### Grid Generation
- **2 Variables**: 2x2 grid with simple mapping
- **3 Variables**: 2x4 grid with Gray code columns
- **4 Variables**: 4x4 grid with Gray code rows and columns
- **Cell Values**: 1 for minterms, 'X' for don't cares, 0 otherwise

### Expression Simplification
- **SOP Optimization**: Uses Quine-McCluskey algorithm
- **POS Optimization**: Works with maxterms (complement of minterms)
- **Edge Cases**: Handles empty minterms (F=0) and full coverage (F=1)
- **Don't Care Integration**: Incorporates don't cares in optimization

## Technical Implementation

### Gray Code Implementation
```javascript
const grayCode4 = [0, 1, 3, 2]; // 00, 01, 11, 10
```
- Ensures proper adjacency in Karnaugh maps
- Used for both row and column labeling
- Critical for correct group detection

### Grid Construction Algorithm
1. **Initialize Grid**: Create appropriate sized array
2. **Map Minterms**: Place 1s for minterm positions
3. **Map Don't Cares**: Place 'X' for don't care positions
4. **Fill Zeros**: Remaining positions get 0

### Expression Generation
- **QuineMcCluskey Integration**: Uses external utility for simplification
- **POS Conversion**: Handles maxterm generation for POS optimization
- **Variable Mapping**: Maps results to provided variable names

## Usage Example
```javascript
const {
    grid,
    expression,
    groups,
    getColumnLabels,
    getRowLabels
} = useKMapLogic(
    3,                    // 3 variables
    ['A', 'B', 'C'],     // Variable names
    '0,1,2,5,6,7',       // Minterms
    '3,4',               // Don't cares
    'SOP'                // Optimization type
);
```

## Advanced Features

### Position Mapping
```javascript
const getMintermPosition = (minterm) => {
    // Maps minterm index to grid coordinates
    // Handles different variable counts
    // Uses Gray code for proper positioning
};
```

### Label Generation
- **Dynamic Labels**: Adapts to variable count
- **Gray Code Labels**: Proper binary labels for adjacency
- **Consistent Formatting**: Standardized label presentation

### Group Detection Integration
- **External Utility**: Uses `detectGroups` from GroupDetector
- **Optimization Aware**: Handles both SOP and POS grouping
- **Visual Support**: Provides data for group visualization

## Performance Optimizations

### useMemo Usage
- **Minterm Processing**: Caches parsed minterm arrays
- **Grid Generation**: Caches constructed grid
- **Expression Simplification**: Caches simplified expressions
- **Group Detection**: Caches detected groups

### Dependency Tracking
- **Efficient Updates**: Only recalculates when inputs change
- **Minimal Recalculation**: Avoids unnecessary computations
- **Responsive UI**: Maintains smooth user experience

## Error Handling
- **Input Validation**: Filters invalid minterm values
- **Range Checking**: Ensures minterms within valid range
- **Edge Case Handling**: Manages empty and full coverage cases
- **Graceful Degradation**: Handles malformed input gracefully

## Integration Points

### External Dependencies
- **QuineMcCluskey**: Expression simplification algorithm
- **GroupDetector**: Group identification logic
- **React Hooks**: useMemo for performance optimization

### Component Integration
- **KMapDisplay**: Uses grid and groups for visualization
- **SimplifiedExpression**: Uses expression for display
- **InputControls**: Provides parameters for hook

## Educational Value
- **Algorithm Visualization**: Shows how Karnaugh maps work internally
- **Optimization Process**: Demonstrates Boolean simplification
- **Gray Code Understanding**: Illustrates importance of proper adjacency
- **Systematic Approach**: Provides structured method for K-map analysis

## Learning Outcomes
Understanding this hook helps developers learn:
- How to implement complex algorithms in React hooks
- Karnaugh map construction and optimization
- Boolean expression simplification techniques
- Performance optimization with useMemo
- Integration of multiple utilities in cohesive interface
