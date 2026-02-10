import React, { useState } from 'react';
import { InputControls } from '../components/InputControls';
import { KMapDisplay } from '../components/KMapDisplay';
import { SimplifiedExpression } from '../components/SimplifiedExpression';
import { GroupingGuide } from '../components/GroupingGuide';
import { TruthTableDisplay } from '../components/TruthTableDisplay';
import { useKMapLogic } from '../hooks/useKMapLogic';

const KMapGenerator = () => {
    const [numVariables, setNumVariables] = useState(3);
    const [variables, setVariables] = useState(['A', 'B', 'C']);
    const [minterms, setMinterms] = useState('');
    const [showSolution, setShowSolution] = useState(false);
    const [showGroupingGuide, setShowGroupingGuide] = useState(false);

    const {
        grid,
        expression,
        groups,
        getColumnLabels,
        getRowLabels,
        simplifyBoolean
    } = useKMapLogic(numVariables, variables, minterms);

    const handleVariablesChange = (value) => {
        const num = parseInt(value);
        setNumVariables(num);
        const defaultVars = ['A', 'B', 'C', 'D'];
        setVariables(defaultVars.slice(0, num));
        setShowSolution(false);
    };

    const handleExample = () => {
        if (numVariables === 3) {
            setMinterms('0,1,2,5,6,7');
        } else if (numVariables === 4) {
            setMinterms('0,1,2,5,6,7,8,9,10,14');
        } else {
            setMinterms('0,2,3');
        }
        setShowSolution(false);
    };

    const handleReset = () => {
        setMinterms('');
        setShowSolution(false);
        setShowGroupingGuide(false);
    };

    return (
        <div className="kmap-container">
            <div className="kmap-header-gradient">
                <h1 className="kmap-main-title">Karnaugh Map Generator</h1>
                <p className="kmap-subtitle">Simplify Boolean expressions with interactive K-Maps</p>
            </div>

            <div className="kmap-content-wrapper">
                <InputControls
                    numVariables={numVariables}
                    variables={variables}
                    minterms={minterms}
                    onVariablesChange={handleVariablesChange}
                    onVariablesUpdate={setVariables}
                    onMintermsChange={setMinterms}
                    onGenerate={() => setShowSolution(true)}
                    onExample={handleExample}
                    onReset={handleReset}
                />

                {showSolution && (
                    <>
                        <KMapDisplay
                            grid={grid}
                            groups={groups}
                            numVariables={numVariables}
                            variables={variables}
                            getColumnLabels={getColumnLabels}
                            getRowLabels={getRowLabels}
                            showGroupingGuide={showGroupingGuide}
                        />

                        <SimplifiedExpression
                            expression={expression}
                            showGroupingGuide={showGroupingGuide}
                            onToggleGuide={() => setShowGroupingGuide(!showGroupingGuide)}
                        />

                        {showGroupingGuide && (
                            <GroupingGuide
                                groups={groups}
                                variables={variables}
                                numVariables={numVariables}
                                grid={grid}
                                getColumnLabels={getColumnLabels}
                                getRowLabels={getRowLabels}
                            />
                        )}

                        <TruthTableDisplay
                            numVariables={numVariables}
                            variables={variables}
                            minterms={minterms}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default KMapGenerator;