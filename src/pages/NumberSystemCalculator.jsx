import React, { useState, useEffect } from 'react';

const NumberSystemCalculator = () => {
    const [numberSystem, setNumberSystem] = useState('');
    const [binaryRepresentation, setBinaryRepresentation] = useState('twos-complement');
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

    const binaryRepresentations = [
        { value: 'twos-complement', label: "2's Complement" },
        { value: 'signed-magnitude', label: 'Signed Magnitude' }
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

    // Binary helper functions
    const decimalToTwosComplement = (num, bits = 8) => {
        if (num >= 0) {
            return num.toString(2).padStart(bits, '0');
        } else {
            const positive = Math.abs(num);
            let binary = positive.toString(2).padStart(bits, '0');
            let inverted = binary.split('').map(b => b === '0' ? '1' : '0').join('');
            let result = (parseInt(inverted, 2) + 1).toString(2).padStart(bits, '0');
            return result;
        }
    };

    const twosComplementToDecimal = (binary) => {
        if (binary.length === 0) return 0;
        if (binary[0] === '0') {
            return parseInt(binary, 2);
        } else {
            let inverted = binary.split('').map(b => b === '0' ? '1' : '0').join('');
            let decimal = parseInt(inverted, 2) + 1;
            return -decimal;
        }
    };

    const decimalToSignedMagnitude = (num, bits = 8) => {
        const sign = num < 0 ? '1' : '0';
        const magnitude = Math.abs(num).toString(2).padStart(bits - 1, '0');
        return sign + magnitude;
    };

    const signedMagnitudeToDecimal = (binary) => {
        if (binary.length === 0) return 0;
        const sign = binary[0] === '1' ? -1 : 1;
        const magnitude = parseInt(binary.slice(1), 2);
        return sign * magnitude;
    };

    const binaryInputToDecimal = (value) => {
        return parseInt(value, 2);
    };

    const decimalToBinaryOutput = (value, bits = 8) => {
        if (binaryRepresentation === 'signed-magnitude') {
            return decimalToSignedMagnitude(value, bits);
        } else {
            return decimalToTwosComplement(value, bits);
        }
    };

    const performBinaryOperation = (num1Str, num2Str, op) => {
        const num1 = binaryInputToDecimal(num1Str);
        const num2 = binaryInputToDecimal(num2Str);

        let resultDecimal;
        let operationName;

        switch (op) {
            case 'addition':
                resultDecimal = num1 + num2;
                operationName = 'Addition';
                break;
            case 'subtraction':
                resultDecimal = num1 - num2;
                operationName = 'Subtraction';
                break;
            case 'multiplication':
                resultDecimal = num1 * num2;
                operationName = 'Multiplication';
                break;
            default:
                return null;
        }

        const bits = 8;
        const binary1 = decimalToBinaryOutput(num1, bits);
        const binary2 = decimalToBinaryOutput(num2, bits);
        const binaryResult = decimalToBinaryOutput(resultDecimal, bits);

        const stepData = {
            input1: num1Str,
            input2: num2Str,
            decimal1: num1,
            decimal2: num2,
            binary1: binary1,
            binary2: binary2,
            decimalResult: resultDecimal,
            binaryResult: binaryResult,
            operation: operationName,
            representation: binaryRepresentation
        };

        return {
            result: binaryResult,
            decimal: resultDecimal,
            steps: stepData,
            isBinarySpecial: true
        };
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

        const isNegative = dec1 < dec2;

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

        try {
            const base = getBase(numberSystem);
            let calcResult;

            if (numberSystem === 'binary') {
                calcResult = performBinaryOperation(input1, input2, operation);
                setResult(calcResult);
                setSteps([]); // Binary operations don't use array steps
            } else {
                if (operation === 'addition') {
                    calcResult = performAddition(input1.toUpperCase(), input2.toUpperCase(), base);
                } else if (operation === 'subtraction') {
                    calcResult = performSubtraction(input1.toUpperCase(), input2.toUpperCase(), base);
                } else if (operation === 'multiplication') {
                    calcResult = performMultiplication(input1.toUpperCase(), input2.toUpperCase(), base);
                }
                setResult(calcResult);
                setSteps(calcResult.steps);
            }
        } catch (error) {
            console.error('Calculation error:', error);
        }
    };

    const renderAdditionVisualization = () => {
        if (!result || operation !== 'addition') return null;

        // For binary special operations
        if (result.isBinarySpecial) {
            const num1Digits = result.steps.binary1.split('');
            const num2Digits = result.steps.binary2.split('');
            const resultDigits = result.result.split('');
            const maxLen = Math.max(num1Digits.length, num2Digits.length);

            while (num1Digits.length < maxLen) num1Digits.unshift(' ');
            while (num2Digits.length < maxLen) num2Digits.unshift(' ');

            return (
                <div className="calculation-visual">
                    <div className="visual-work">
                        <div className="digit-row">
                            <div className="operator-space"></div>
                            {num1Digits.map((digit, idx) => (
                                <div key={idx} className="digit-cell">{digit}</div>
                            ))}
                        </div>
                        <div className="digit-row">
                            <div className="operator-space">+</div>
                            {num2Digits.map((digit, idx) => (
                                <div key={idx} className="digit-cell">{digit}</div>
                            ))}
                        </div>
                        <div className="separator-line"></div>
                        <div className="digit-row result-row">
                            <div className="operator-space"></div>
                            {resultDigits.map((digit, idx) => (
                                <div key={idx} className="digit-cell result-digit">{digit}</div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        // Regular addition
        const num1Digits = input1.toUpperCase().split('');
        const num2Digits = input2.toUpperCase().split('');
        const resultDigits = result.result.split('');
        const maxLen = Math.max(num1Digits.length, num2Digits.length, resultDigits.length - 1);

        while (num1Digits.length < maxLen) num1Digits.unshift(' ');
        while (num2Digits.length < maxLen) num2Digits.unshift(' ');

        return (
            <div className="calculation-visual">
                <div className="visual-work">
                    <div className="digit-row carry-row">
                        <div className="operator-space"></div>
                        {steps.map((step, idx) => (
                            <div key={idx} className="digit-cell">
                                {step.newCarry > 0 && (
                                    <span className="carry-indicator">{step.newCarry}</span>
                                )}
                            </div>
                        )).reverse()}
                    </div>
                    <div className="digit-row">
                        <div className="operator-space"></div>
                        {num1Digits.map((digit, idx) => (
                            <div key={idx} className="digit-cell">{digit}</div>
                        ))}
                    </div>
                    <div className="digit-row">
                        <div className="operator-space">+</div>
                        {num2Digits.map((digit, idx) => (
                            <div key={idx} className="digit-cell">{digit}</div>
                        ))}
                    </div>
                    <div className="separator-line"></div>
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

        // For binary special operations
        if (result.isBinarySpecial) {
            const num1Digits = result.steps.binary1.split('');
            const num2Digits = result.steps.binary2.split('');
            const resultDigits = result.result.split('');
            const maxLen = Math.max(num1Digits.length, num2Digits.length);

            while (num1Digits.length < maxLen) num1Digits.unshift(' ');
            while (num2Digits.length < maxLen) num2Digits.unshift(' ');
            while (resultDigits.length < maxLen) resultDigits.unshift(' ');

            return (
                <div className="calculation-visual">
                    <div className="visual-work">
                        <div className="digit-row">
                            <div className="operator-space"></div>
                            {num1Digits.map((digit, idx) => (
                                <div key={idx} className="digit-cell">{digit}</div>
                            ))}
                        </div>
                        <div className="digit-row">
                            <div className="operator-space">−</div>
                            {num2Digits.map((digit, idx) => (
                                <div key={idx} className="digit-cell">{digit}</div>
                            ))}
                        </div>
                        <div className="separator-line"></div>
                        <div className="digit-row result-row">
                            <div className="operator-space"></div>
                            {resultDigits.map((digit, idx) => (
                                <div key={idx} className="digit-cell result-digit">{digit}</div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        // Regular subtraction
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
                    <div className="digit-row borrow-row">
                        <div className="operator-space"></div>
                        {steps.map((step, idx) => (
                            <div key={idx} className="digit-cell">
                                {step.newBorrow > 0 && (
                                    <span className="borrow-indicator">{step.newBorrow}</span>
                                )}
                            </div>
                        )).reverse()}
                    </div>
                    <div className="digit-row">
                        <div className="operator-space"></div>
                        {num1Digits.map((digit, idx) => (
                            <div key={idx} className="digit-cell">{digit}</div>
                        ))}
                    </div>
                    <div className="digit-row">
                        <div className="operator-space">−</div>
                        {num2Digits.map((digit, idx) => (
                            <div key={idx} className="digit-cell">{digit}</div>
                        ))}
                    </div>
                    <div className="separator-line"></div>
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

        // For binary special operations
        if (result.isBinarySpecial) {
            const num1Digits = result.steps.binary1.split('');
            const num2Digits = result.steps.binary2.split('');
            const resultDigits = result.result.split('');

            return (
                <div className="calculation-visual">
                    <div className="visual-work">
                        <div className="digit-row">
                            <div className="operator-space"></div>
                            {num1Digits.map((digit, idx) => (
                                <div key={idx} className="digit-cell">{digit}</div>
                            ))}
                        </div>
                        <div className="digit-row">
                            <div className="operator-space">×</div>
                            {num2Digits.map((digit, idx) => (
                                <div key={idx} className="digit-cell">{digit}</div>
                            ))}
                        </div>
                        <div className="separator-line"></div>
                        <div className="digit-row result-row">
                            <div className="operator-space"></div>
                            {resultDigits.map((digit, idx) => (
                                <div key={idx} className="digit-cell result-digit">{digit}</div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        // Regular multiplication
        const num1Digits = input1.toUpperCase().split('');
        const num2Digits = input2.toUpperCase().split('');
        const resultDigits = result.result.split('');

        return (
            <div className="calculation-visual">
                <div className="visual-work">
                    <div className="digit-row">
                        <div className="operator-space"></div>
                        {num1Digits.map((digit, idx) => (
                            <div key={idx} className="digit-cell">{digit}</div>
                        ))}
                    </div>
                    <div className="digit-row">
                        <div className="operator-space">×</div>
                        {num2Digits.map((digit, idx) => (
                            <div key={idx} className="digit-cell">{digit}</div>
                        ))}
                    </div>
                    <div className="separator-line"></div>
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

    const renderBinaryExplanation = () => {
        if (!result || !result.isBinarySpecial) return null;

        const { steps } = result;
        const isTwosComp = binaryRepresentation === 'twos-complement';
        const repName = isTwosComp ? "2's Complement" : "Signed Magnitude";

        return (
            <div className="explanation">
                <h3 className="explanation-title">Step-by-Step: {repName} Explanation</h3>
                <div className="explanation-content">
                    <p className="explanation-intro">
                        Computing <span className="highlight">{steps.input1}</span> {steps.operation === 'Addition' ? '+' : steps.operation === 'Subtraction' ? '−' : '×'} <span className="highlight">{steps.input2}</span> using {repName}
                    </p>

                    <div className="step-detail">
                        <div className="step-header">Step 1: Convert inputs to decimal</div>
                        <div className="step-body">
                            • Input 1: {steps.input1} (binary) = {steps.decimal1} (decimal)
                            <br />
                            • Input 2: {steps.input2} (binary) = {steps.decimal2} (decimal)
                        </div>
                    </div>

                    <div className="step-detail">
                        <div className="step-header">Step 2: Represent in {repName} (8-bit)</div>
                        <div className="step-body">
                            {isTwosComp ? (
                                <>
                                    <strong>What is 2's Complement?</strong> The leftmost bit is the sign bit. 0 = positive, 1 = negative.
                                    For negative numbers, invert all bits and add 1.
                                    <br /><br />
                                    • {steps.decimal1} → <code className="binary-highlight">{steps.binary1}</code>
                                    {steps.decimal1 < 0 && <span className="hint"> (starts with 1 = negative)</span>}
                                    {steps.decimal1 >= 0 && <span className="hint"> (starts with 0 = positive)</span>}
                                    <br />
                                    • {steps.decimal2} → <code className="binary-highlight">{steps.binary2}</code>
                                    {steps.decimal2 < 0 && <span className="hint"> (starts with 1 = negative)</span>}
                                    {steps.decimal2 >= 0 && <span className="hint"> (starts with 0 = positive)</span>}
                                </>
                            ) : (
                                <>
                                    <strong>What is Signed Magnitude?</strong> Simple! First bit = sign (0=positive, 1=negative), remaining bits = magnitude.
                                    <br /><br />
                                    • {steps.decimal1} → <code className="binary-highlight">{steps.binary1}</code>
                                    {steps.decimal1 < 0 && <span className="hint"> (sign bit=1, magnitude={Math.abs(steps.decimal1)})</span>}
                                    {steps.decimal1 >= 0 && <span className="hint"> (sign bit=0, magnitude={steps.decimal1})</span>}
                                    <br />
                                    • {steps.decimal2} → <code className="binary-highlight">{steps.binary2}</code>
                                    {steps.decimal2 < 0 && <span className="hint"> (sign bit=1, magnitude={Math.abs(steps.decimal2)})</span>}
                                    {steps.decimal2 >= 0 && <span className="hint"> (sign bit=0, magnitude={steps.decimal2})</span>}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="step-detail">
                        <div className="step-header">Step 3: Perform {steps.operation}</div>
                        <div className="step-body">
                            • Decimal: {steps.decimal1} {steps.operation === 'Addition' ? '+' : steps.operation === 'Subtraction' ? '−' : '×'} {steps.decimal2} = <strong>{steps.decimalResult}</strong>
                            <br />
                            {isTwosComp && (
                                <span className="hint">💡 With 2's complement, the same addition circuit works for both positive and negative numbers!</span>
                            )}
                            {!isTwosComp && steps.decimalResult < 0 && (
                                <span className="hint">💡 With signed magnitude, we compute the magnitude separately and set the sign bit based on the result.</span>
                            )}
                        </div>
                    </div>

                    <div className="step-detail">
                        <div className="step-header">Step 4: Result in {repName}</div>
                        <div className="step-body">
                            • Binary result: <code className="binary-highlight">{steps.binaryResult}</code>
                            <br />
                            • Decimal: <strong>{steps.decimalResult}</strong>
                            <br />
                            {steps.decimalResult < 0 ?
                                <span className="hint">First bit is 1 → This is a negative number</span> :
                                <span className="hint">First bit is 0 → This is a positive number</span>
                            }
                        </div>
                    </div>

                    <div className="final-result">
                        <strong>Final Answer:</strong> {steps.binaryResult} ({steps.decimalResult} in decimal)
                    </div>
                </div>
            </div>
        );
    };

    const renderExplanation = () => {
        if (!result) return null;

        if (result.isBinarySpecial) {
            return renderBinaryExplanation();
        }

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

                        {steps.slice().reverse().map((step, idx) => (
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

                        {steps.slice().reverse().map((step, idx) => (
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
    }, [input1, input2, operation, numberSystem, binaryRepresentation]);

    return (
        <div className="calculator-container">
            <style>{`
                .binary-highlight {
                    font-family: 'Courier New', monospace;
                    background-color: #e3f2fd;
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-weight: 600;
                    color: #1565c0;
                }
                
                .hint {
                    color: #7b1fa2;
                    font-style: italic;
                    font-size: 0.9em;
                    margin-left: 8px;
                }
            `}</style>
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

                    {numberSystem === 'binary' && (
                        <div className="control-group fade-in">
                            <label className="control-label">Binary Representation</label>
                            <select
                                className="control-select"
                                value={binaryRepresentation}
                                onChange={(e) => setBinaryRepresentation(e.target.value)}
                            >
                                {binaryRepresentations.map((rep) => (
                                    <option key={rep.value} value={rep.value}>
                                        {rep.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

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