import React, { useState, useEffect } from 'react';

const NumberSystemCalculator = () => {
    const [numberSystem, setNumberSystem] = useState('');
    const [operation, setOperation] = useState('');
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [result, setResult] = useState(null);
    const [steps, setSteps] = useState([]);

    const numberSystems = [
        { value: 'decimal', label: 'Decimal (Base 10)' },
        { value: 'binary', label: 'Binary (Base 2)' },
        { value: 'octal', label: 'Octal (Base 8)' },
        { value: 'hexadecimal', label: 'Hexadecimal (Base 16)' }
    ];

    const operations = [
        { value: 'addition', label: 'Addition (+)' },
        { value: 'subtraction', label: 'Subtraction (−)' },
        { value: 'multiplication', label: 'Multiplication (×)' }
    ];

    const getBase = (system) => {
        const bases = { decimal: 10, binary: 2, octal: 8, hexadecimal: 16 };
        return bases[system];
    };

    const isValidInput = (value, system) => {
        if (!value) return true;
        const patterns = {
            decimal: /^[0-9]+$/,
            binary: /^[01]+$/,
            octal: /^[0-7]+$/,
            hexadecimal: /^[0-9A-Fa-f]+$/
        };
        return patterns[system].test(value);
    };

    const toDecimal = (value, base) => {
        return parseInt(value.toUpperCase(), base);
    };

    const fromDecimal = (value, base) => {
        return value.toString(base).toUpperCase();
    };

    const performAddition = (num1, num2, base) => {
        const digits1 = num1.split('').reverse();
        const digits2 = num2.split('').reverse();
        const maxLen = Math.max(digits1.length, digits2.length);

        let carry = 0;
        const resultDigits = [];
        const stepData = [];

        for (let i = 0; i < maxLen || carry > 0; i++) {
            const d1 = i < digits1.length ? toDecimal(digits1[i], base) : 0;
            const d2 = i < digits2.length ? toDecimal(digits2[i], base) : 0;
            const sum = d1 + d2 + carry;
            const newCarry = Math.floor(sum / base);
            const digit = sum % base;

            stepData.push({
                position: i,
                digit1: i < digits1.length ? digits1[i] : '0',
                digit2: i < digits2.length ? digits2[i] : '0',
                carry: carry,
                sum: sum,
                resultDigit: fromDecimal(digit, base),
                newCarry: newCarry
            });

            resultDigits.push(fromDecimal(digit, base));
            carry = newCarry;
        }

        return {
            result: resultDigits.reverse().join(''),
            steps: stepData
        };
    };

    const performSubtraction = (num1, num2, base) => {
        const dec1 = toDecimal(num1, base);
        const dec2 = toDecimal(num2, base);

        // Check if result will be negative
        const isNegative = dec1 < dec2;

        // If negative, swap numbers and calculate positive result
        let largerNum, smallerNum;
        if (isNegative) {
            largerNum = num2;
            smallerNum = num1;
        } else {
            largerNum = num1;
            smallerNum = num2;
        }

        const digits1 = largerNum.split('').reverse();
        const digits2 = smallerNum.split('').reverse();
        const maxLen = Math.max(digits1.length, digits2.length);

        let borrow = 0;
        const resultDigits = [];
        const stepData = [];

        for (let i = 0; i < maxLen; i++) {
            let d1 = i < digits1.length ? toDecimal(digits1[i], base) : 0;
            const d2 = i < digits2.length ? toDecimal(digits2[i], base) : 0;

            d1 -= borrow;

            let diff;
            let newBorrow = 0;

            if (d1 < d2) {
                diff = (d1 + base) - d2;
                newBorrow = 1;
            } else {
                diff = d1 - d2;
            }

            stepData.push({
                position: i,
                digit1: i < digits1.length ? digits1[i] : '0',
                digit2: i < digits2.length ? digits2[i] : '0',
                borrow: borrow,
                diff: diff,
                resultDigit: fromDecimal(diff, base),
                newBorrow: newBorrow,
                originalNum1: largerNum,
                originalNum2: smallerNum
            });

            resultDigits.push(fromDecimal(diff, base));
            borrow = newBorrow;
        }

        // Remove leading zeros
        while (resultDigits.length > 1 && resultDigits[resultDigits.length - 1] === '0') {
            resultDigits.pop();
        }

        return {
            result: resultDigits.reverse().join(''),
            steps: stepData,
            isNegative: isNegative,
            displayNum1: largerNum,
            displayNum2: smallerNum
        };
    };

    const performMultiplication = (num1, num2, base) => {
        const digits1 = num1.split('').reverse();
        const digits2 = num2.split('').reverse();

        const partialProducts = [];
        const stepData = [];

        for (let i = 0; i < digits2.length; i++) {
            const d2 = toDecimal(digits2[i], base);
            let carry = 0;
            const product = [];

            // Add leading zeros for position
            for (let z = 0; z < i; z++) {
                product.push('0');
            }

            for (let j = 0; j < digits1.length || carry > 0; j++) {
                const d1 = j < digits1.length ? toDecimal(digits1[j], base) : 0;
                const mult = d1 * d2 + carry;
                const digit = mult % base;
                carry = Math.floor(mult / base);

                stepData.push({
                    row: i,
                    position: j,
                    digit1: j < digits1.length ? digits1[j] : '0',
                    digit2: digits2[i],
                    carry: carry > 0 ? Math.floor((d1 * d2 + (mult - digit)) / base) : 0,
                    product: mult,
                    resultDigit: fromDecimal(digit, base),
                    newCarry: carry
                });

                product.push(fromDecimal(digit, base));
            }

            partialProducts.push(product.reverse().join(''));
        }

        // Sum all partial products
        let finalResult = '0';
        for (const partial of partialProducts) {
            const addResult = performAddition(finalResult, partial, base);
            finalResult = addResult.result;
        }

        return {
            result: finalResult,
            partialProducts: partialProducts,
            steps: stepData
        };
    };

    const handleCalculate = () => {
        if (!input1 || !input2) return;

        const base = getBase(numberSystem);
        let calcResult;

        if (operation === 'addition') {
            calcResult = performAddition(input1.toUpperCase(), input2.toUpperCase(), base);
        } else if (operation === 'subtraction') {
            calcResult = performSubtraction(input1.toUpperCase(), input2.toUpperCase(), base);
        } else if (operation === 'multiplication') {
            calcResult = performMultiplication(input1.toUpperCase(), input2.toUpperCase(), base);
        }

        setResult(calcResult);
        setSteps(calcResult.steps);
    };

    const renderAdditionVisualization = () => {
        if (!result || operation !== 'addition') return null;

        const num1Digits = input1.toUpperCase().split('');
        const num2Digits = input2.toUpperCase().split('');
        const resultDigits = result.result.split('');
        const maxLen = Math.max(num1Digits.length, num2Digits.length, resultDigits.length - 1);

        // Pad arrays
        while (num1Digits.length < maxLen) num1Digits.unshift(' ');
        while (num2Digits.length < maxLen) num2Digits.unshift(' ');

        return (
            <div className="calculation-visual">
                <div className="visual-work">
                    {/* Carry row */}
                    <div className="digit-row carry-row">
                        <div className="operator-space"></div>
                        {result.steps.map((step, idx) => (
                            <div key={idx} className="digit-cell">
                                {step.newCarry > 0 && (
                                    <span className="carry-indicator">{step.newCarry}</span>
                                )}
                            </div>
                        )).reverse()}
                    </div>

                    {/* First number */}
                    <div className="digit-row">
                        <div className="operator-space"></div>
                        {num1Digits.map((digit, idx) => (
                            <div key={idx} className="digit-cell">{digit}</div>
                        ))}
                    </div>

                    {/* Second number */}
                    <div className="digit-row">
                        <div className="operator-space">+</div>
                        {num2Digits.map((digit, idx) => (
                            <div key={idx} className="digit-cell">{digit}</div>
                        ))}
                    </div>

                    {/* Line */}
                    <div className="separator-line"></div>

                    {/* Result */}
                    <div className="digit-row result-row">
                        <div className="operator-space"></div>
                        {resultDigits.map((digit, idx) => (
                            <div key={idx} className="digit-cell result-digit">{digit}</div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderSubtractionVisualization = () => {
        if (!result || operation !== 'subtraction') return null;

        const num1Digits = result.displayNum1.split('');
        const num2Digits = result.displayNum2.split('');
        const resultDigits = result.result.split('');
        const maxLen = Math.max(num1Digits.length, num2Digits.length);

        while (num1Digits.length < maxLen) num1Digits.unshift(' ');
        while (num2Digits.length < maxLen) num2Digits.unshift(' ');
        while (resultDigits.length < maxLen) resultDigits.unshift(' ');

        return (
            <div className="calculation-visual">
                <div className="visual-work">
                    {/* Borrow row */}
                    <div className="digit-row borrow-row">
                        <div className="operator-space"></div>
                        {result.steps.map((step, idx) => (
                            <div key={idx} className="digit-cell">
                                {step.newBorrow > 0 && (
                                    <span className="borrow-indicator">{step.newBorrow}</span>
                                )}
                            </div>
                        )).reverse()}
                    </div>

                    {/* First number */}
                    <div className="digit-row">
                        <div className="operator-space"></div>
                        {num1Digits.map((digit, idx) => (
                            <div key={idx} className="digit-cell">{digit}</div>
                        ))}
                    </div>

                    {/* Second number */}
                    <div className="digit-row">
                        <div className="operator-space">−</div>
                        {num2Digits.map((digit, idx) => (
                            <div key={idx} className="digit-cell">{digit}</div>
                        ))}
                    </div>

                    {/* Line */}
                    <div className="separator-line"></div>

                    {/* Result */}
                    <div className="digit-row result-row">
                        <div className="operator-space">{result.isNegative ? '−' : ''}</div>
                        {resultDigits.map((digit, idx) => (
                            <div key={idx} className={`digit-cell result-digit ${result.isNegative ? 'negative' : ''}`}>
                                {digit}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderMultiplicationVisualization = () => {
        if (!result || operation !== 'multiplication') return null;

        const num1Digits = input1.toUpperCase().split('');
        const num2Digits = input2.toUpperCase().split('');
        const resultDigits = result.result.split('');

        return (
            <div className="calculation-visual">
                <div className="visual-work">
                    {/* First number */}
                    <div className="digit-row">
                        <div className="operator-space"></div>
                        {num1Digits.map((digit, idx) => (
                            <div key={idx} className="digit-cell">{digit}</div>
                        ))}
                    </div>

                    {/* Second number */}
                    <div className="digit-row">
                        <div className="operator-space">×</div>
                        {num2Digits.map((digit, idx) => (
                            <div key={idx} className="digit-cell">{digit}</div>
                        ))}
                    </div>

                    {/* Line */}
                    <div className="separator-line"></div>

                    {/* Partial products */}
                    {result.partialProducts && result.partialProducts.map((partial, idx) => {
                        const partialDigits = partial.split('');
                        return (
                            <div key={idx} className="digit-row partial-product">
                                <div className="operator-space"></div>
                                {partialDigits.map((digit, didx) => (
                                    <div key={didx} className="digit-cell">{digit}</div>
                                ))}
                            </div>
                        );
                    })}

                    {result.partialProducts && result.partialProducts.length > 1 && (
                        <div className="separator-line"></div>
                    )}

                    {/* Result */}
                    <div className="digit-row result-row">
                        <div className="operator-space"></div>
                        {resultDigits.map((digit, idx) => (
                            <div key={idx} className="digit-cell result-digit">{digit}</div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderExplanation = () => {
        if (!result) return null;

        const base = getBase(numberSystem);
        const baseName = numberSystem.charAt(0).toUpperCase() + numberSystem.slice(1);

        if (operation === 'addition') {
            return (
                <div className="explanation">
                    <h3 className="explanation-title">Step-by-Step Explanation</h3>
                    <div className="explanation-content">
                        <p className="explanation-intro">
                            We're adding <span className="highlight">{input1.toUpperCase()}</span> and{' '}
                            <span className="highlight">{input2.toUpperCase()}</span> in {baseName} (base {base}).
                        </p>

                        {result.steps.slice().reverse().map((step, idx) => (
                            <div key={idx} className="step-detail">
                                <div className="step-header">Position {step.position} (from right):</div>
                                <div className="step-body">
                                    • Add digits: {step.digit1} + {step.digit2}
                                    {step.carry > 0 && ` + ${step.carry} (carry)`} = {step.sum} (decimal)
                                    <br />
                                    • In base {base}: {step.sum} = {step.resultDigit} with carry {step.newCarry}
                                    {step.newCarry > 0 && (
                                        <span className="carry-note"> ← Carry generated!</span>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="final-result">
                            <strong>Final Result:</strong> {result.result}
                        </div>
                    </div>
                </div>
            );
        }

        if (operation === 'subtraction') {
            return (
                <div className="explanation">
                    <h3 className="explanation-title">Step-by-Step Explanation</h3>
                    <div className="explanation-content">
                        <p className="explanation-intro">
                            We're subtracting <span className="highlight">{input2.toUpperCase()}</span> from{' '}
                            <span className="highlight">{input1.toUpperCase()}</span> in {baseName} (base {base}).
                        </p>

                        {result.isNegative && (
                            <div className="negative-note">
                                <strong>Note:</strong> Since {input1.toUpperCase()} is smaller than {input2.toUpperCase()},
                                the result will be negative. We calculate {input2.toUpperCase()} − {input1.toUpperCase()} and
                                add a negative sign.
                            </div>
                        )}

                        <p className="calculation-note">
                            <strong>Calculation:</strong> {result.displayNum1} − {result.displayNum2}
                        </p>

                        {result.steps.slice().reverse().map((step, idx) => (
                            <div key={idx} className="step-detail">
                                <div className="step-header">Position {step.position} (from right):</div>
                                <div className="step-body">
                                    • Subtract: {step.digit1}
                                    {step.borrow > 0 && ` - ${step.borrow} (borrow)`}
                                    {' '}- {step.digit2}
                                    <br />
                                    {step.newBorrow > 0 ? (
                                        <>
                                            • Need to borrow! Add {base} and subtract: ({step.digit1} + {base}
                                            {step.borrow > 0 && ` - ${step.borrow}`}) - {step.digit2} = {step.diff}
                                            <span className="borrow-note"> ← Borrow needed!</span>
                                        </>
                                    ) : (
                                        <>• Result: {step.diff}</>
                                    )}
                                    <br />
                                    • Digit: {step.resultDigit}
                                </div>
                            </div>
                        ))}

                        <div className="final-result">
                            <strong>Final Result:</strong> {result.isNegative ? '−' : ''}{result.result}
                        </div>
                    </div>
                </div>
            );
        }

        if (operation === 'multiplication') {
            return (
                <div className="explanation">
                    <h3 className="explanation-title">Step-by-Step Explanation</h3>
                    <div className="explanation-content">
                        <p className="explanation-intro">
                            We're multiplying <span className="highlight">{input1.toUpperCase()}</span> by{' '}
                            <span className="highlight">{input2.toUpperCase()}</span> in {baseName} (base {base}).
                        </p>

                        <div className="step-detail">
                            <div className="step-header">Partial Products:</div>
                            {result.partialProducts && result.partialProducts.map((partial, idx) => (
                                <div key={idx} className="step-body">
                                    Row {idx + 1}: Multiply {input1.toUpperCase()} by {input2.toUpperCase().split('').reverse()[idx]} = {partial}
                                </div>
                            ))}
                        </div>

                        {result.partialProducts && result.partialProducts.length > 1 && (
                            <div className="step-detail">
                                <div className="step-header">Addition:</div>
                                <div className="step-body">
                                    Add all partial products together to get the final result.
                                </div>
                            </div>
                        )}

                        <div className="final-result">
                            <strong>Final Result:</strong> {result.result}
                        </div>
                    </div>
                </div>
            );
        }
    };

    useEffect(() => {
        if (input1 && input2 && operation && numberSystem) {
            handleCalculate();
        } else {
            setResult(null);
            setSteps([]);
        }
    }, [input1, input2, operation, numberSystem]);

    return (
        <div className="calculator-container">
            <div className="grid-background"></div>

            <header className="header">
                <div className="header-content">
                    <h1 className="title">Number System Calculator</h1>
                    <p className="subtitle">Visual arithmetic across different bases</p>
                </div>
            </header>

            <div className="main-content">
                <div className="control-panel">
                    <div className="control-group">
                        <label className="control-label">Number System</label>
                        <select
                            className="control-select"
                            value={numberSystem}
                            onChange={(e) => {
                                setNumberSystem(e.target.value);
                                setInput1('');
                                setInput2('');
                                setOperation('');
                            }}
                        >
                            <option value="">Select a number system...</option>
                            {numberSystems.map((sys) => (
                                <option key={sys.value} value={sys.value}>
                                    {sys.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {numberSystem && (
                        <div className="control-group fade-in">
                            <label className="control-label">Operation</label>
                            <select
                                className="control-select"
                                value={operation}
                                onChange={(e) => setOperation(e.target.value)}
                            >
                                <option value="">Select an operation...</option>
                                {operations.map((op) => (
                                    <option key={op.value} value={op.value}>
                                        {op.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {operation && (
                        <div className="input-group fade-in">
                            <div className="control-group">
                                <label className="control-label">First Number</label>
                                <input
                                    type="text"
                                    className="control-input"
                                    value={input1}
                                    onChange={(e) => {
                                        const val = e.target.value.toUpperCase();
                                        if (isValidInput(val, numberSystem)) {
                                            setInput1(val);
                                        }
                                    }}
                                    placeholder={`Enter ${numberSystem} number...`}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">Second Number</label>
                                <input
                                    type="text"
                                    className="control-input"
                                    value={input2}
                                    onChange={(e) => {
                                        const val = e.target.value.toUpperCase();
                                        if (isValidInput(val, numberSystem)) {
                                            setInput2(val);
                                        }
                                    }}
                                    placeholder={`Enter ${numberSystem} number...`}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {result && (
                    <div className="results-section fade-in">
                        <div className="result-card">
                            <h2 className="result-title">Visual Calculation</h2>
                            {operation === 'addition' && renderAdditionVisualization()}
                            {operation === 'subtraction' && renderSubtractionVisualization()}
                            {operation === 'multiplication' && renderMultiplicationVisualization()}
                        </div>

                        {renderExplanation()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NumberSystemCalculator;