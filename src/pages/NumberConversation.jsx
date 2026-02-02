import React, { useState } from 'react';

export default function NumberConverter() {
    const [decimal, setDecimal] = useState('');
    const [binary, setBinary] = useState('');
    const [octal, setOctal] = useState('');
    const [hexadecimal, setHexadecimal] = useState('');

    const [selectedConversion, setSelectedConversion] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    // Conversion functions
    const updateFromDecimal = (value) => {
        if (value === '') {
            setDecimal('');
            setBinary('');
            setOctal('');
            setHexadecimal('');
            return;
        }

        const num = parseInt(value, 10);
        if (isNaN(num)) return;

        setDecimal(value);
        setBinary(num.toString(2));
        setOctal(num.toString(8));
        setHexadecimal(num.toString(16).toUpperCase());
    };

    const updateFromBinary = (value) => {
        if (value === '') {
            setDecimal('');
            setBinary('');
            setOctal('');
            setHexadecimal('');
            return;
        }

        // Validate binary input
        if (!/^[01]+$/.test(value)) return;

        const num = parseInt(value, 2);
        setDecimal(num.toString());
        setBinary(value);
        setOctal(num.toString(8));
        setHexadecimal(num.toString(16).toUpperCase());
    };

    const updateFromOctal = (value) => {
        if (value === '') {
            setDecimal('');
            setBinary('');
            setOctal('');
            setHexadecimal('');
            return;
        }

        // Validate octal input
        if (!/^[0-7]+$/.test(value)) return;

        const num = parseInt(value, 8);
        setDecimal(num.toString());
        setBinary(num.toString(2));
        setOctal(value);
        setHexadecimal(num.toString(16).toUpperCase());
    };

    const updateFromHexadecimal = (value) => {
        if (value === '') {
            setDecimal('');
            setBinary('');
            setOctal('');
            setHexadecimal('');
            return;
        }

        // Validate hex input
        if (!/^[0-9A-Fa-f]+$/.test(value)) return;

        const num = parseInt(value, 16);
        setDecimal(num.toString());
        setBinary(num.toString(2));
        setOctal(num.toString(8));
        setHexadecimal(value.toUpperCase());
    };

    const conversions = [
        { id: 'bin-to-dec', label: 'Binary → Decimal', from: 'Binary', to: 'Decimal' },
        { id: 'bin-to-oct', label: 'Binary → Octal', from: 'Binary', to: 'Octal' },
        { id: 'bin-to-hex', label: 'Binary → Hexadecimal', from: 'Binary', to: 'Hexadecimal' },
        { id: 'dec-to-bin', label: 'Decimal → Binary', from: 'Decimal', to: 'Binary' },
        { id: 'dec-to-oct', label: 'Decimal → Octal', from: 'Decimal', to: 'Octal' },
        { id: 'dec-to-hex', label: 'Decimal → Hexadecimal', from: 'Decimal', to: 'Hexadecimal' },
        { id: 'oct-to-bin', label: 'Octal → Binary', from: 'Octal', to: 'Binary' },
        { id: 'oct-to-dec', label: 'Octal → Decimal', from: 'Octal', to: 'Decimal' },
        { id: 'oct-to-hex', label: 'Octal → Hexadecimal', from: 'Octal', to: 'Hexadecimal' },
        { id: 'hex-to-bin', label: 'Hexadecimal → Binary', from: 'Hexadecimal', to: 'Binary' },
        { id: 'hex-to-dec', label: 'Hexadecimal → Decimal', from: 'Hexadecimal', to: 'Decimal' },
        { id: 'hex-to-oct', label: 'Hexadecimal → Octal', from: 'Hexadecimal', to: 'Octal' },
    ];

    const getExplanation = (conversion) => {
        const examples = {
            decimal: decimal || '42',
            binary: binary || '101010',
            octal: octal || '52',
            hexadecimal: hexadecimal || '2A'
        };

        const explanations = {
            'bin-to-dec': {
                title: 'Binary to Decimal Conversion',
                steps: [
                    'Binary uses base-2 (only 0s and 1s)',
                    `Let's convert ${examples.binary} to decimal:`,
                    'Each position represents a power of 2 (right to left: 2⁰, 2¹, 2², 2³...)',
                    `Breaking down ${examples.binary}:`,
                    ...examples.binary.split('').reverse().map((bit, idx) =>
                        `Position ${idx}: ${bit} × 2^${idx} = ${bit} × ${Math.pow(2, idx)} = ${bit * Math.pow(2, idx)}`
                    ),
                    `Sum: ${examples.binary.split('').reverse().map((bit, idx) => bit * Math.pow(2, idx)).join(' + ')} = ${parseInt(examples.binary, 2)}`,
                    `Result: ${examples.binary}₂ = ${parseInt(examples.binary, 2)}₁₀`
                ]
            },
            'bin-to-oct': {
                title: 'Binary to Octal Conversion',
                steps: [
                    'Group binary digits in sets of 3 (from right to left)',
                    `Converting ${examples.binary}:`,
                    'Each group of 3 binary digits equals one octal digit',
                    `Binary: ${examples.binary.padStart(Math.ceil(examples.binary.length / 3) * 3, '0')}`,
                    'Grouped: ' + examples.binary.padStart(Math.ceil(examples.binary.length / 3) * 3, '0').match(/.{1,3}/g).join(' '),
                    'Convert each group: ' + examples.binary.padStart(Math.ceil(examples.binary.length / 3) * 3, '0').match(/.{1,3}/g).map(g => parseInt(g, 2)).join(' '),
                    `Result: ${examples.binary}₂ = ${parseInt(examples.binary, 2).toString(8)}₈`
                ]
            },
            'bin-to-hex': {
                title: 'Binary to Hexadecimal Conversion',
                steps: [
                    'Group binary digits in sets of 4 (from right to left)',
                    `Converting ${examples.binary}:`,
                    'Each group of 4 binary digits equals one hex digit',
                    `Binary: ${examples.binary.padStart(Math.ceil(examples.binary.length / 4) * 4, '0')}`,
                    'Grouped: ' + examples.binary.padStart(Math.ceil(examples.binary.length / 4) * 4, '0').match(/.{1,4}/g).join(' '),
                    'Convert each group: ' + examples.binary.padStart(Math.ceil(examples.binary.length / 4) * 4, '0').match(/.{1,4}/g).map(g => parseInt(g, 2).toString(16).toUpperCase()).join(' '),
                    `Result: ${examples.binary}₂ = ${parseInt(examples.binary, 2).toString(16).toUpperCase()}₁₆`
                ]
            },
            'dec-to-bin': {
                title: 'Decimal to Binary Conversion',
                steps: [
                    'Repeatedly divide by 2 and track remainders',
                    `Converting ${examples.decimal}:`,
                    'Division process (read remainders bottom-to-top):',
                    ...generateDivisionSteps(parseInt(examples.decimal), 2),
                    `Result: ${examples.decimal}₁₀ = ${parseInt(examples.decimal).toString(2)}₂`
                ]
            },
            'dec-to-oct': {
                title: 'Decimal to Octal Conversion',
                steps: [
                    'Repeatedly divide by 8 and track remainders',
                    `Converting ${examples.decimal}:`,
                    'Division process (read remainders bottom-to-top):',
                    ...generateDivisionSteps(parseInt(examples.decimal), 8),
                    `Result: ${examples.decimal}₁₀ = ${parseInt(examples.decimal).toString(8)}₈`
                ]
            },
            'dec-to-hex': {
                title: 'Decimal to Hexadecimal Conversion',
                steps: [
                    'Repeatedly divide by 16 and track remainders',
                    `Converting ${examples.decimal}:`,
                    'Hex digits: 0-9, A(10), B(11), C(12), D(13), E(14), F(15)',
                    'Division process (read remainders bottom-to-top):',
                    ...generateDivisionSteps(parseInt(examples.decimal), 16),
                    `Result: ${examples.decimal}₁₀ = ${parseInt(examples.decimal).toString(16).toUpperCase()}₁₆`
                ]
            },
            'oct-to-bin': {
                title: 'Octal to Binary Conversion',
                steps: [
                    'Convert each octal digit to 3 binary digits',
                    `Converting ${examples.octal}:`,
                    'Octal digits and their binary equivalents:',
                    ...examples.octal.split('').map(digit =>
                        `${digit}₈ = ${parseInt(digit, 8).toString(2).padStart(3, '0')}₂`
                    ),
                    'Combine: ' + examples.octal.split('').map(d => parseInt(d, 8).toString(2).padStart(3, '0')).join(' '),
                    `Result: ${examples.octal}₈ = ${parseInt(examples.octal, 8).toString(2)}₂`
                ]
            },
            'oct-to-dec': {
                title: 'Octal to Decimal Conversion',
                steps: [
                    'Octal uses base-8',
                    `Converting ${examples.octal}:`,
                    'Each position represents a power of 8 (right to left: 8⁰, 8¹, 8²...)',
                    ...examples.octal.split('').reverse().map((digit, idx) =>
                        `Position ${idx}: ${digit} × 8^${idx} = ${digit} × ${Math.pow(8, idx)} = ${digit * Math.pow(8, idx)}`
                    ),
                    `Sum: ${examples.octal.split('').reverse().map((digit, idx) => digit * Math.pow(8, idx)).join(' + ')} = ${parseInt(examples.octal, 8)}`,
                    `Result: ${examples.octal}₈ = ${parseInt(examples.octal, 8)}₁₀`
                ]
            },
            'oct-to-hex': {
                title: 'Octal to Hexadecimal Conversion',
                steps: [
                    'Convert octal → binary → hexadecimal',
                    `Step 1: ${examples.octal}₈ to binary`,
                    'Each octal digit becomes 3 binary digits:',
                    examples.octal.split('').map(d => `${d} → ${parseInt(d, 8).toString(2).padStart(3, '0')}`).join(', '),
                    `Binary: ${parseInt(examples.octal, 8).toString(2)}`,
                    'Step 2: Binary to hexadecimal (group by 4):',
                    `Result: ${examples.octal}₈ = ${parseInt(examples.octal, 8).toString(16).toUpperCase()}₁₆`
                ]
            },
            'hex-to-bin': {
                title: 'Hexadecimal to Binary Conversion',
                steps: [
                    'Convert each hex digit to 4 binary digits',
                    `Converting ${examples.hexadecimal}:`,
                    'Hex digits and their binary equivalents:',
                    ...examples.hexadecimal.split('').map(digit =>
                        `${digit}₁₆ = ${parseInt(digit, 16).toString(2).padStart(4, '0')}₂`
                    ),
                    'Combine: ' + examples.hexadecimal.split('').map(d => parseInt(d, 16).toString(2).padStart(4, '0')).join(' '),
                    `Result: ${examples.hexadecimal}₁₆ = ${parseInt(examples.hexadecimal, 16).toString(2)}₂`
                ]
            },
            'hex-to-dec': {
                title: 'Hexadecimal to Decimal Conversion',
                steps: [
                    'Hexadecimal uses base-16',
                    'Hex digits: 0-9, A(10), B(11), C(12), D(13), E(14), F(15)',
                    `Converting ${examples.hexadecimal}:`,
                    'Each position represents a power of 16 (right to left: 16⁰, 16¹, 16²...)',
                    ...examples.hexadecimal.split('').reverse().map((digit, idx) =>
                        `Position ${idx}: ${digit} (${parseInt(digit, 16)}) × 16^${idx} = ${parseInt(digit, 16)} × ${Math.pow(16, idx)} = ${parseInt(digit, 16) * Math.pow(16, idx)}`
                    ),
                    `Sum: ${examples.hexadecimal.split('').reverse().map((digit, idx) => parseInt(digit, 16) * Math.pow(16, idx)).join(' + ')} = ${parseInt(examples.hexadecimal, 16)}`,
                    `Result: ${examples.hexadecimal}₁₆ = ${parseInt(examples.hexadecimal, 16)}₁₀`
                ]
            },
            'hex-to-oct': {
                title: 'Hexadecimal to Octal Conversion',
                steps: [
                    'Convert hexadecimal → binary → octal',
                    `Step 1: ${examples.hexadecimal}₁₆ to binary`,
                    'Each hex digit becomes 4 binary digits:',
                    examples.hexadecimal.split('').map(d => `${d} → ${parseInt(d, 16).toString(2).padStart(4, '0')}`).join(', '),
                    `Binary: ${parseInt(examples.hexadecimal, 16).toString(2)}`,
                    'Step 2: Binary to octal (group by 3):',
                    `Result: ${examples.hexadecimal}₁₆ = ${parseInt(examples.hexadecimal, 16).toString(8)}₈`
                ]
            }
        };

        return explanations[conversion.id];
    };

    const generateDivisionSteps = (num, base) => {
        const steps = [];
        let current = num;
        while (current > 0) {
            const remainder = current % base;
            const quotient = Math.floor(current / base);
            const remainderDisplay = base === 16 ? (remainder > 9 ? String.fromCharCode(65 + remainder - 10) : remainder) : remainder;
            steps.push(`${current} ÷ ${base} = ${quotient} remainder ${remainderDisplay}`);
            current = quotient;
        }
        return steps;
    };

    const handleConversionClick = (conversion) => {
        setSelectedConversion(conversion);
        setShowExplanation(true);
    };

    return (
        <div className="converter-container">
            {/* Title */}
            <div className="title-section">
                <h1 className="main-title">BASE CONVERTER</h1>
                <p className="subtitle">Real-time Number System Conversion</p>
            </div>

            {/* Converter Boxes */}
            <div className="converter-grid">
                {/* Decimal */}
                <div className="converter-card">
                    <div className="card-header">
                        <div className="base-icon decimal">10</div>
                        <h2 className="card-title decimal">DECIMAL</h2>
                    </div>
                    <input
                        className="converter-input"
                        type="text"
                        value={decimal}
                        onChange={(e) => updateFromDecimal(e.target.value)}
                        placeholder="Enter decimal..."
                    />
                    <p className="card-info">Base 10 • Digits: 0-9</p>
                </div>

                {/* Binary */}
                <div className="converter-card">
                    <div className="card-header">
                        <div className="base-icon binary">2</div>
                        <h2 className="card-title binary">BINARY</h2>
                    </div>
                    <input
                        className="converter-input"
                        type="text"
                        value={binary}
                        onChange={(e) => updateFromBinary(e.target.value)}
                        placeholder="Enter binary..."
                    />
                    <p className="card-info">Base 2 • Digits: 0-1</p>
                </div>

                {/* Octal */}
                <div className="converter-card">
                    <div className="card-header">
                        <div className="base-icon octal">8</div>
                        <h2 className="card-title octal">OCTAL</h2>
                    </div>
                    <input
                        className="converter-input"
                        type="text"
                        value={octal}
                        onChange={(e) => updateFromOctal(e.target.value)}
                        placeholder="Enter octal..."
                    />
                    <p className="card-info">Base 8 • Digits: 0-7</p>
                </div>

                {/* Hexadecimal */}
                <div className="converter-card">
                    <div className="card-header">
                        <div className="base-icon hexadecimal">16</div>
                        <h2 className="card-title hexadecimal">HEXADECIMAL</h2>
                    </div>
                    <input
                        className="converter-input"
                        type="text"
                        value={hexadecimal}
                        onChange={(e) => updateFromHexadecimal(e.target.value)}
                        placeholder="Enter hex..."
                    />
                    <p className="card-info">Base 16 • Digits: 0-9, A-F</p>
                </div>
            </div>

            {/* Explanation Section */}
            <div className="explanation-section">
                <div className="explanation-header">
                    <h2 className="explanation-title">LEARN CONVERSIONS</h2>
                    <p className="explanation-subtitle">
                        Click any conversion to see a detailed step-by-step explanation
                    </p>
                </div>

                {/* Conversion Grid */}
                <div className="conversion-grid">
                    {conversions.map((conversion) => (
                        <button
                            key={conversion.id}
                            className="conversion-btn"
                            onClick={() => handleConversionClick(conversion)}
                        >
                            {conversion.label}
                        </button>
                    ))}
                </div>

                {/* Explanation Modal */}
                {showExplanation && selectedConversion && (
                    <div className="modal-overlay" onClick={() => setShowExplanation(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button
                                className="modal-close"
                                onClick={() => setShowExplanation(false)}
                            >
                                ×
                            </button>

                            <h3 className="modal-title">
                                {getExplanation(selectedConversion).title}
                            </h3>

                            <div className="steps-container">
                                {getExplanation(selectedConversion).steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className={`step-item ${index % 2 === 0 ? 'even' : 'odd'}`}
                                    >
                                        {step}
                                    </div>
                                ))}
                            </div>

                            <div className="pro-tip">
                                <p className="pro-tip-label">💡 Pro Tip</p>
                                <p className="pro-tip-text">
                                    Try entering different values in the converter boxes above to see how numbers change across different bases in real-time!
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}