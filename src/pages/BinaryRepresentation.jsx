import React, { useState, useEffect } from 'react';

export default function BinaryRepresentation() {
    // --- State for Signed Magnitude ---
    const [smInput, setSmInput] = useState('');
    const [smPadding, setSmPadding] = useState(0);
    const [smResult, setSmResult] = useState(null);
    const [smBitsInput, setSmBitsInput] = useState(8);
    const [smRange, setSmRange] = useState({ min: 0, max: 0, distinct: 0 });
    const [showSmChart, setShowSmChart] = useState(false); // Toggle for SM Chart

    // --- State for 2's Complement ---
    const [tcInput, setTcInput] = useState('');
    const [tcPadding, setTcPadding] = useState(0);
    const [tcResult, setTcResult] = useState(null);
    const [tcBitsInput, setTcBitsInput] = useState(8);
    const [tcRange, setTcRange] = useState({ min: 0, max: 0, distinct: 0 });
    const [showTcChart, setShowTcChart] = useState(false); // Toggle for TC Chart

    // --- EFFECT: Calculate Ranges ---
    useEffect(() => {
        const n = parseInt(smBitsInput, 10);
        if (!isNaN(n) && n > 0 && n <= 53) {
            const max = Math.pow(2, n - 1) - 1;
            setSmRange({ min: -max, max, distinct: Math.pow(2, n) });
        } else { setSmRange(null); }
    }, [smBitsInput]);

    useEffect(() => {
        const n = parseInt(tcBitsInput, 10);
        if (!isNaN(n) && n > 0 && n <= 53) {
            const max = Math.pow(2, n - 1) - 1;
            setTcRange({ min: -Math.pow(2, n - 1), max, distinct: Math.pow(2, n) });
        } else { setTcRange(null); }
    }, [tcBitsInput]);

    // --- EFFECT: Conversion Logics ---
    useEffect(() => {
        if (!smInput || smInput === '-' || smInput === '+') { setSmResult(null); return; }
        const num = parseInt(smInput, 10);
        if (isNaN(num)) return;

        if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
            setSmResult({ error: "Number too large" }); return;
        }

        const isNegative = num < 0;
        const magnitude = Math.abs(num);
        let binaryStr = magnitude.toString(2);
        const totalMagnitudeBits = Math.max(binaryStr.length, binaryStr.length + smPadding);

        setSmResult({
            signBit: isNegative ? '1' : '0',
            magnitudeBits: binaryStr.padStart(totalMagnitudeBits, '0'),
            totalBits: totalMagnitudeBits + 1,
            decimal: num.toString(),
            error: null
        });
    }, [smInput, smPadding]);

    useEffect(() => {
        if (!tcInput || tcInput === '-' || tcInput === '+') { setTcResult(null); return; }
        const num = parseInt(tcInput, 10);
        if (isNaN(num)) return;

        if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
            setTcResult({ error: "Number too large" }); return;
        }

        let minBits;
        if (num >= 0) minBits = num.toString(2).length + 1;
        else {
            let abs = Math.abs(num);
            let bits = abs.toString(2).length;
            if (num < -Math.pow(2, bits - 1)) bits++;
            minBits = bits + 1;
        }

        const targetBits = Math.max(minBits, minBits + tcPadding);
        let binary = num >= 0
            ? num.toString(2).padStart(targetBits, '0')
            : (Math.pow(2, targetBits) + num).toString(2);

        setTcResult({
            binary,
            signBit: binary[0],
            remainingBits: binary.slice(1),
            totalBits: targetBits,
            decimal: num.toString(),
            error: null
        });
    }, [tcInput, tcPadding]);

    // --- Helper: Generate Reference Charts (5 Bits) ---
    const generateChartData = (type) => {
        const data = [];
        // Loop from 10 down to -10
        for (let i = 10; i >= -10; i--) {
            let binary = '';

            if (type === 'SM') {
                // Signed Magnitude (5 bits)
                const abs = Math.abs(i);
                const bin = abs.toString(2).padStart(4, '0');

                if (i === 0) {
                    // Show +0 and -0 for educational purposes?
                    // Standard is +0 (00000). 
                    binary = `0${bin}`;
                } else {
                    binary = (i < 0 ? '1' : '0') + bin;
                }
            } else {
                // 2's Complement (5 bits)
                // 2^5 = 32
                if (i >= 0) binary = i.toString(2).padStart(5, '0');
                else binary = (32 + i).toString(2);
            }
            data.push({ dec: i, bin: binary });
        }
        return data;
    };

    return (
        <div className="binary-container">
            <div className="binary-wrapper">
                <h1 className="binary-main-title">Binary Number Representation</h1>
                <p className="binary-subtitle">Standard Precision (Max ±9 Quadrillion)</p>

                {/* ================= SIGNED MAGNITUDE ================= */}
                <section className="binary-card">
                    <h2 className="binary-section-title binary-title-primary">
                        <span className="binary-dot binary-dot-primary"></span>
                        Signed Magnitude
                    </h2>

                    <div className="binary-info-box binary-info-primary">
                        <h3 className="binary-info-heading">How it works:</h3>
                        <p className="binary-text">
                            <span className="binary-highlight-primary">Leftmost bit</span> is sign (0=+, 1=-). Remaining bits are magnitude.
                        </p>

                        {/* Dropdown Toggle */}
                        <button
                            onClick={() => setShowSmChart(!showSmChart)}
                            style={{
                                marginTop: '10px',
                                background: 'transparent',
                                border: '1px solid var(--accent-primary)',
                                color: 'var(--accent-primary)',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                width: '100%'
                            }}
                        >
                            {showSmChart ? "Hide Reference Chart (-10 to 10)" : "Show Reference Chart (-10 to 10)"}
                        </button>

                        {/* The Chart */}
                        {showSmChart && (
                            <div style={{ marginTop: '15px', maxHeight: '300px', overflowY: 'auto', border: '1px solid var(--bg-medium)', borderRadius: '8px' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ background: 'var(--bg-medium)', color: 'var(--text-secondary)' }}>
                                            <th style={{ padding: '8px', textAlign: 'left' }}>Decimal</th>
                                            <th style={{ padding: '8px', textAlign: 'right' }}>5-Bit Binary</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {generateChartData('SM').map((row) => (
                                            <tr key={row.dec} style={{ borderBottom: '1px solid var(--bg-dark)' }}>
                                                <td style={{ padding: '8px', color: 'var(--text-primary)' }}>{row.dec}</td>
                                                <td style={{ padding: '8px', textAlign: 'right', fontFamily: 'monospace', color: 'var(--accent-primary)' }}>
                                                    {/* Color the sign bit */}
                                                    <span style={{ color: row.bin[0] === '1' ? 'var(--accent-danger)' : 'inherit' }}>{row.bin[0]}</span>
                                                    {row.bin.slice(1)}
                                                </td>
                                            </tr>
                                        ))}
                                        {/* Manually add -0 row for Signed Magnitude Education */}
                                        <tr style={{ borderBottom: '1px solid var(--bg-dark)' }}>
                                            <td style={{ padding: '8px', color: 'var(--text-primary)' }}>-0</td>
                                            <td style={{ padding: '8px', textAlign: 'right', fontFamily: 'monospace', color: 'var(--accent-primary)' }}>
                                                <span style={{ color: 'var(--accent-danger)' }}>1</span>0000
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div style={{ padding: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', background: 'var(--bg-medium)' }}>
                                    Note: SM has two zeros (+0 and -0)
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Range Calculator */}
                    <div className="binary-info-box" style={{ borderLeft: '4px solid var(--text-secondary)' }}>
                        <h3 className="binary-info-heading" style={{ fontSize: '1.1rem' }}>Step 1: Calculate Range</h3>
                        <div className="binary-controls-grid">
                            <div className="binary-input-group">
                                <label className="binary-label">Number of Bits (N)</label>
                                <input type="number" className="binary-input-field binary-input-primary"
                                    value={smBitsInput} onChange={(e) => setSmBitsInput(e.target.value)} min="2" max="53" />
                            </div>
                            <div className="binary-input-group" style={{ justifyContent: 'center' }}>
                                {smRange && (
                                    <div className="binary-text" style={{ fontSize: '0.9rem' }}>
                                        <div style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                            {smRange.min.toLocaleString()} to +{smRange.max.toLocaleString()}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Converter */}
                    <h3 className="binary-info-heading" style={{ fontSize: '1.1rem', marginTop: '30px' }}>Step 2: Convert Decimal</h3>
                    <div className="binary-controls-grid">
                        <div className="binary-input-group">
                            <label className="binary-label">Decimal Number</label>
                            <input type="number" className="binary-input-field binary-input-primary"
                                value={smInput} onChange={(e) => setSmInput(e.target.value)} placeholder="Enter integer..." />
                        </div>
                        <div className="binary-input-group">
                            <label className="binary-label">Add Padding</label>
                            <input type="number" className="binary-input-field binary-input-primary"
                                value={smPadding} onChange={(e) => setSmPadding(Math.max(0, parseInt(e.target.value) || 0))} min="0" />
                        </div>
                    </div>

                    {smResult && (
                        <div className="binary-result-box binary-result-primary">
                            {smResult.error ? <div className="binary-error-msg">{smResult.error}</div> : (
                                <>
                                    <div className="binary-bits-display">
                                        <span className="binary-sign-bit binary-sb-primary">{smResult.signBit}</span>
                                        <span className="binary-bits-primary">{smResult.magnitudeBits}</span>
                                    </div>
                                    <div className="binary-details-grid">
                                        <div><strong>Bits:</strong> {smResult.totalBits}</div>
                                        <div><strong>Sign:</strong> {smResult.signBit === '1' ? 'Negative' : 'Positive'}</div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </section>

                {/* ================= 2'S COMPLEMENT ================= */}
                <section className="binary-card">
                    <h2 className="binary-section-title binary-title-secondary">
                        <span className="binary-dot binary-dot-secondary"></span>
                        2's Complement
                    </h2>

                    <div className="binary-info-box binary-info-secondary">
                        <h3 className="binary-info-heading">Deep Dive:</h3>
                        <p className="binary-text">
                            Standard computer integer math. No double zeros. Easy subtraction.
                        </p>

                        {/* Dropdown Toggle */}
                        <button
                            onClick={() => setShowTcChart(!showTcChart)}
                            style={{
                                marginTop: '10px',
                                background: 'transparent',
                                border: '1px solid var(--accent-secondary)',
                                color: 'var(--accent-secondary)',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                width: '100%'
                            }}
                        >
                            {showTcChart ? "Hide Reference Chart (-10 to 10)" : "Show Reference Chart (-10 to 10)"}
                        </button>

                        {/* The Chart */}
                        {showTcChart && (
                            <div style={{ marginTop: '15px', maxHeight: '300px', overflowY: 'auto', border: '1px solid var(--bg-medium)', borderRadius: '8px' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ background: 'var(--bg-medium)', color: 'var(--text-secondary)' }}>
                                            <th style={{ padding: '8px', textAlign: 'left' }}>Decimal</th>
                                            <th style={{ padding: '8px', textAlign: 'right' }}>5-Bit Binary</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {generateChartData('TC').map((row) => (
                                            <tr key={row.dec} style={{ borderBottom: '1px solid var(--bg-dark)' }}>
                                                <td style={{ padding: '8px', color: 'var(--text-primary)' }}>{row.dec}</td>
                                                <td style={{ padding: '8px', textAlign: 'right', fontFamily: 'monospace', color: 'var(--accent-secondary)' }}>
                                                    {/* Color the sign bit */}
                                                    <span style={{ color: row.bin[0] === '1' ? 'var(--accent-danger)' : 'inherit' }}>{row.bin[0]}</span>
                                                    {row.bin.slice(1)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <h4 style={{ color: 'var(--text-primary)', marginTop: '20px', marginBottom: '10px' }}>
                            Example: <span className="binary-highlight-secondary">-5</span>
                        </h4>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px' }}>
                            <ol className="binary-list" style={{ margin: 0, paddingLeft: '20px' }}>
                                <li><strong>+5:</strong> 0101</li>
                                <li><strong>Invert:</strong> 1010</li>
                                <li><strong>Add 1:</strong> <span className="binary-highlight-secondary">1011</span></li>
                            </ol>
                        </div>
                    </div>


                    {/* Range Calculator */}
                    <div className="binary-info-box" style={{ borderLeft: '4px solid var(--text-secondary)' }}>
                        <h3 className="binary-info-heading" style={{ fontSize: '1.1rem' }}>Step 1: Calculate Range</h3>
                        <div className="binary-controls-grid">
                            <div className="binary-input-group">
                                <label className="binary-label">Number of Bits (N)</label>
                                <input type="number" className="binary-input-field binary-input-secondary"
                                    value={tcBitsInput} onChange={(e) => setTcBitsInput(e.target.value)} min="2" max="53" />
                            </div>
                            <div className="binary-input-group" style={{ justifyContent: 'center' }}>
                                {tcRange && (
                                    <div className="binary-text" style={{ fontSize: '0.9rem' }}>
                                        <div style={{ color: 'var(--accent-secondary)', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                            {tcRange.min.toLocaleString()} to +{tcRange.max.toLocaleString()}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Converter */}
                    <h3 className="binary-info-heading" style={{ fontSize: '1.1rem', marginTop: '30px' }}>Step 2: Convert Decimal</h3>
                    <div className="binary-controls-grid">
                        <div className="binary-input-group">
                            <label className="binary-label">Decimal Number</label>
                            <input type="number" className="binary-input-field binary-input-secondary"
                                value={tcInput} onChange={(e) => setTcInput(e.target.value)} placeholder="Enter integer..." />
                        </div>
                        <div className="binary-input-group">
                            <label className="binary-label">Add Padding</label>
                            <input type="number" className="binary-input-field binary-input-secondary"
                                value={tcPadding} onChange={(e) => setTcPadding(Math.max(0, parseInt(e.target.value) || 0))} min="0" />
                        </div>
                    </div>

                    {tcResult && (
                        <div className="binary-result-box binary-result-secondary">
                            {tcResult.error ? <div className="binary-error-msg">{tcResult.error}</div> : (
                                <>
                                    <div className="binary-bits-display">
                                        <span className="binary-sign-bit binary-sb-primary">{tcResult.signBit}</span>
                                        <span className="binary-bits-secondary">{tcResult.remainingBits}</span>
                                    </div>
                                    <div className="binary-details-grid">
                                        <div><strong>Bits:</strong> {tcResult.totalBits}</div>
                                        <div><strong>Decimal:</strong> {tcResult.decimal}</div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}