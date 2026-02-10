import { useState, useEffect } from 'react';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { WhiteboardAnimation } from './WhiteboardAnimation';

export const GroupingGuide = ({ groups, variables, numVariables, grid, getColumnLabels, getRowLabels }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showWhiteboard, setShowWhiteboard] = useState(true);
    const { speak, cancel, isSpeaking } = useSpeechSynthesis();

    useEffect(() => {
        return () => cancel();
    }, [cancel]);

    const explanations = generateExplanations(groups, variables, numVariables, grid);

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

    const handlePlayAll = () => {
        handlePlayExplanation(0);
    };

    const handleStop = () => {
        cancel();
        setIsPlaying(false);
    };

    return (
        <div className="kmap-card kmap-grouping-guide">
            <h2 className="kmap-section-title">
                <span className="kmap-voice-icon">🔊</span>
                Interactive Grouping Explanation
            </h2>

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

            {/* Whiteboard Teaching Animation */}
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

            <div className="kmap-explanation-steps">
                {explanations.map((explanation, index) => (
                    <div
                        key={index}
                        className={`kmap-explanation-step ${currentStep === index && isPlaying ? 'active' : ''
                            }`}
                    >
                        <div className="kmap-step-header">
                            <div className="kmap-step-number">Step {index + 1}</div>
                            <button
                                className="kmap-btn-icon"
                                onClick={() => handlePlayExplanation(index)}
                                disabled={isPlaying}
                                title="Play this step"
                            >
                                🔊
                            </button>
                        </div>
                        <div className="kmap-step-content">
                            <h4 className="kmap-step-title">{explanation.title}</h4>
                            <p className="kmap-step-text">{explanation.text}</p>
                            {explanation.visualization && (
                                <div className="kmap-step-visualization">
                                    {explanation.visualization}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="kmap-info-box" style={{ marginTop: 'var(--spacing-lg)' }}>
                <p className="kmap-info-title">K-Map Grouping Rules:</p>
                <ul className="kmap-info-list">
                    <li className="kmap-info-item">Group sizes must be powers of 2: 1, 2, 4, 8, or 16 cells</li>
                    <li className="kmap-info-item">Groups must be rectangular (can be squares or rectangles)</li>
                    <li className="kmap-info-item">Groups must be rectangular (can be squares or rectangles)</li>
                    <li className="kmap-info-item">Groups can wrap around edges (top-bottom, left-right)</li>
                    <li className="kmap-info-item">Make groups as large as possible to eliminate more variables</li>
                    <li className="kmap-info-item">Variables that change within a group are eliminated</li>
                    <li className="kmap-info-item">A cell can belong to multiple groups</li>
                    <li className="kmap-info-item">All 1s must be covered by at least one group</li>
                </ul>
            </div>
        </div>
    );
};

const generateExplanations = (groups, variables, numVariables, grid) => {
    const explanations = [];

    // Introduction
    explanations.push({
        title: 'Introduction to K-Map Grouping',
        text: `Welcome to the Karnaugh Map grouping explanation. We have identified ${groups.length} group${groups.length !== 1 ? 's' : ''} in this K-map. The goal is to simplify the Boolean expression by grouping adjacent ones in powers of 2. Let's examine each group and understand how it contributes to the final simplified expression.`,
        type: 'intro',
        groupData: null
    });

    // Explain each group
    groups.forEach((group, index) => {
        const groupNumber = index + 1;
        const cellsText = group.size === 1 ? '1 cell' : `${group.size} cells`;
        const mintermsText = group.minterms.join(', ');

        let explanation = `Group ${groupNumber} contains ${cellsText}, covering minterm${group.minterms.length > 1 ? 's' : ''} ${mintermsText}. `;

        // Analyze which variables are eliminated
        const eliminatedVars = analyzeGroupVariables(group, variables, numVariables);

        if (eliminatedVars.eliminated.length > 0) {
            explanation += `In this group, the variable${eliminatedVars.eliminated.length > 1 ? 's' : ''} ${eliminatedVars.eliminated.join(' and ')} ${eliminatedVars.eliminated.length > 1 ? 'change' : 'changes'} within the group, so ${eliminatedVars.eliminated.length > 1 ? 'they are' : 'it is'} eliminated. `;
        }

        if (eliminatedVars.kept.length > 0) {
            explanation += `The variable${eliminatedVars.kept.length > 1 ? 's' : ''} ${eliminatedVars.kept.join(' and ')} ${eliminatedVars.kept.length > 1 ? 'remain' : 'remains'} constant in this group, contributing to the term ${eliminatedVars.term}. `;
        } else {
            explanation += `All variables are eliminated, giving us a constant term of 1. `;
        }

        explanation += `This is why this group represents the term ${eliminatedVars.term} in our simplified expression.`;

        explanations.push({
            title: `Group ${groupNumber}: ${cellsText}`,
            text: explanation,
            visualization: `Term: ${eliminatedVars.term}`,
            type: 'group',
            groupData: {
                ...group,
                eliminatedVars
            }
        });
    });

    // Final expression
    const finalTerms = groups.map((group) => {
        const eliminatedVars = analyzeGroupVariables(group, variables, numVariables);
        return eliminatedVars.term;
    });

    explanations.push({
        title: 'Final Simplified Expression',
        text: `Combining all the terms from our groups, we get the final simplified Boolean expression. Each group we identified contributes one term. The terms are: ${finalTerms.join(', ')}. When we combine these with OR operations, we get our complete simplified expression. This is the most optimized form of the Boolean function based on the Karnaugh Map grouping method.`,
        type: 'conclusion',
        groupData: { finalTerms }
    });

    return explanations;
};

const analyzeGroupVariables = (group, variables, numVariables) => {
    // Convert minterms to binary and analyze
    const binaryMinterms = group.minterms.map(m =>
        m.toString(2).padStart(numVariables, '0')
    );

    const eliminated = [];
    const kept = [];
    let term = '';

    for (let i = 0; i < numVariables; i++) {
        const values = new Set(binaryMinterms.map(b => b[i]));

        if (values.size === 1) {
            // Variable is constant
            const value = Array.from(values)[0];
            kept.push(variables[i]);
            term += value === '1' ? variables[i] : `${variables[i]}'`;
        } else {
            // Variable changes, so it's eliminated
            eliminated.push(variables[i]);
        }
    }

    if (term === '') {
        term = '1';
    }

    return { eliminated, kept, term };
};