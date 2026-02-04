import React, { useState } from 'react';

export default function ParityBitCalculator() {
    // State for table rows
    const [rows, setRows] = useState([
        { id: 1, decimal: '' },
        { id: 2, decimal: '' },
        { id: 3, decimal: '' }
    ]);

    const [showEvenTable, setShowEvenTable] = useState(false);
    const [showOddTable, setShowOddTable] = useState(false);

    // Calculate 7-bit binary
    const calculate7BitBinary = (decimal) => {
        if (!decimal || isNaN(decimal) || decimal === '') return '';
        const num = parseInt(decimal, 10);
        if (num < 0 || num > 127) return 'Out of range';
        return num.toString(2).padStart(7, '0');
    };

    // Calculate parity bit (even parity)
    const calculateEvenParityBit = (binary7) => {
        if (!binary7 || binary7 === 'Out of range') return '';
        const ones = binary7.split('').filter(bit => bit === '1').length;
        return ones % 2 === 0 ? '0' : '1'; // Add bit to make even number of 1s
    };

    // Calculate parity bit (odd parity)
    const calculateOddParityBit = (binary7) => {
        if (!binary7 || binary7 === 'Out of range') return '';
        const ones = binary7.split('').filter(bit => bit === '1').length;
        return ones % 2 === 0 ? '1' : '0'; // Add bit to make odd number of 1s
    };

    // Calculate 8-bit with parity
    const calculate8BitWithParity = (binary7, parityType = 'even') => {
        if (!binary7 || binary7 === 'Out of range') return '';
        const parityBit = parityType === 'even'
            ? calculateEvenParityBit(binary7)
            : calculateOddParityBit(binary7);
        return parityBit + binary7;
    };

    // Convert binary to hexadecimal
    const binaryToHex = (binary8) => {
        if (!binary8 || binary8 === 'Out of range') return '';
        const decimal = parseInt(binary8, 2);
        return '0x' + decimal.toString(16).toUpperCase().padStart(2, '0');
    };

    // Handle input change
    const handleDecimalChange = (id, value) => {
        setRows(rows.map(row =>
            row.id === id ? { ...row, decimal: value } : row
        ));
    };

    // Add new row
    const addRow = () => {
        setRows([...rows, { id: rows.length + 1, decimal: '' }]);
    };

    // Remove row
    const removeRow = (id) => {
        if (rows.length > 1) {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    // Example data for reference tables
    const evenParityExamples = [
        { decimal: 6, binary7: '0000110', parity: '0', binary8: '00000110', hex: '0x06' },
        { decimal: 15, binary7: '0001111', parity: '1', binary8: '10001111', hex: '0x8F' },
        { decimal: 24, binary7: '0011000', parity: '0', binary8: '00011000', hex: '0x18' }
    ];

    const oddParityExamples = [
        { decimal: 6, binary7: '0000110', parity: '1', binary8: '10000110', hex: '0x86' },
        { decimal: 15, binary7: '0001111', parity: '0', binary8: '00001111', hex: '0x0F' },
        { decimal: 24, binary7: '0011000', parity: '1', binary8: '10011000', hex: '0x98' }
    ];

    return (
        <div className="binary-container">
            <div className="binary-wrapper">
                <h1 className="binary-main-title">Parity Bit Calculator</h1>
                <p className="binary-subtitle">Error Detection using Even & Odd Parity</p>

                {/* ================= WHAT IS PARITY BIT ================= */}
                <section className="binary-card">
                    <h2 className="binary-section-title binary-title-primary">
                        <span className="binary-dot binary-dot-primary"></span>
                        What is a Parity Bit?
                    </h2>

                    <div className="binary-info-box binary-info-primary">
                        <h3 className="binary-info-heading">Definition:</h3>
                        <p className="binary-text">
                            A <span className="binary-highlight-primary">parity bit</span> is an extra bit added to binary data
                            for error detection. It ensures the total number of 1-bits is either even (even parity) or odd (odd parity).
                        </p>

                        <div style={{ marginTop: '20px' }}>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>
                                Key Points:
                            </h4>
                            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px' }}>
                                <ul className="binary-list" style={{ margin: 0, paddingLeft: '20px' }}>
                                    <li><strong>Purpose:</strong> Detect single-bit errors in data transmission</li>
                                    <li><strong>Position:</strong> Usually added as the leftmost (MSB) or rightmost (LSB) bit</li>
                                    <li><strong>Types:</strong> Even Parity and Odd Parity</li>
                                    <li><strong>Limitation:</strong> Cannot detect even number of bit errors (2, 4, 6...)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= EVEN PARITY ================= */}
                <section className="binary-card">
                    <h2 className="binary-section-title binary-title-primary">
                        <span className="binary-dot binary-dot-primary"></span>
                        Even Parity
                    </h2>

                    <div className="binary-info-box binary-info-primary">
                        <h3 className="binary-info-heading">How it works:</h3>
                        <p className="binary-text">
                            The parity bit is set so that the <span className="binary-highlight-primary">total number of 1s</span> in
                            the entire data (including parity bit) is <span className="binary-highlight-primary">EVEN</span>.
                        </p>

                        {/* Dropdown Toggle */}
                        <button
                            onClick={() => setShowEvenTable(!showEvenTable)}
                            style={{
                                marginTop: '10px',
                                background: 'transparent',
                                border: '1px solid var(--accent-primary)',
                                color: 'var(--accent-primary)',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                width: '100%',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.background = 'rgba(0, 255, 136, 0.1)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.background = 'transparent';
                            }}
                        >
                            {showEvenTable ? "Hide Reference Examples" : "Show Reference Examples"}
                        </button>

                        {/* Reference Table */}
                        {showEvenTable && (
                            <div style={{
                                marginTop: '15px',
                                overflowX: 'auto',
                                border: '1px solid var(--bg-medium)',
                                borderRadius: '8px'
                            }}>
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    fontSize: '0.85rem'
                                }}>
                                    <thead style={{ background: 'var(--bg-medium)' }}>
                                        <tr style={{ color: 'var(--text-secondary)' }}>
                                            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid var(--accent-primary)', border: '1px solid var(--bg-dark)' }}>
                                                Decimal Number
                                            </th>
                                            <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid var(--accent-primary)', border: '1px solid var(--bg-dark)' }}>
                                                7-bit binary equivalent
                                            </th>
                                            <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid var(--accent-primary)', border: '1px solid var(--bg-dark)' }}>
                                                8-bit number including parity bit
                                            </th>
                                            <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid var(--accent-primary)', border: '1px solid var(--bg-dark)' }}>
                                                Hexadecimal equivalent of the previous column
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {evenParityExamples.map((row, idx) => (
                                            <tr key={idx}>
                                                <td style={{ padding: '10px', color: 'var(--text-primary)', border: '1px solid var(--bg-dark)' }}>
                                                    {row.decimal}
                                                </td>
                                                <td style={{
                                                    padding: '10px',
                                                    textAlign: 'center',
                                                    fontFamily: 'monospace',
                                                    color: 'var(--accent-secondary)',
                                                    border: '1px solid var(--bg-dark)'
                                                }}>
                                                    {row.binary7}
                                                </td>
                                                <td style={{
                                                    padding: '10px',
                                                    textAlign: 'center',
                                                    fontFamily: 'monospace',
                                                    color: 'var(--accent-primary)',
                                                    border: '1px solid var(--bg-dark)'
                                                }}>
                                                    <span style={{ color: 'var(--accent-danger)' }}>{row.parity}</span>
                                                    {row.binary7}
                                                </td>
                                                <td style={{
                                                    padding: '10px',
                                                    textAlign: 'center',
                                                    fontFamily: 'monospace',
                                                    color: 'var(--accent-amber)',
                                                    border: '1px solid var(--bg-dark)'
                                                }}>
                                                    {row.hex}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <h4 style={{ color: 'var(--text-primary)', marginTop: '20px', marginBottom: '10px' }}>
                            Example: Number <span className="binary-highlight-primary">15</span> (Decimal)
                        </h4>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px' }}>
                            <ol className="binary-list" style={{ margin: 0, paddingLeft: '20px' }}>
                                <li><strong>7-bit binary:</strong> 0001111</li>
                                <li><strong>Count of 1s:</strong> 4 (even)</li>
                                <li><strong>Even parity rule:</strong> If number of 1s is even → parity bit = 0</li>
                                <li>
                                    <strong>Parity bit:</strong>{' '}
                                    <span className="binary-highlight-primary">0</span>
                                </li>
                                <li><strong>Final result:</strong> 00001111</li>
                            </ol>
                            <div style={{ marginTop: '15px', padding: '10px', background: 'rgba(0,255,136,0.1)', borderRadius: '6px', borderLeft: '3px solid var(--accent-primary)' }}>
                                <strong>Simplified:</strong> For number 15 (0001111 with 4 ones):
                                <br />• Even Parity: Add parity bit <span className="binary-highlight-primary">0</span> → 00001111 (4 ones total - EVEN) → Hex: 0x0F
                                <br />• The data has even count of 1s, so parity = 0 to maintain even total
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= ODD PARITY ================= */}
                <section className="binary-card">
                    <h2 className="binary-section-title binary-title-secondary">
                        <span className="binary-dot binary-dot-secondary"></span>
                        Odd Parity
                    </h2>

                    <div className="binary-info-box binary-info-secondary">
                        <h3 className="binary-info-heading">How it works:</h3>
                        <p className="binary-text">
                            The parity bit is set so that the <span className="binary-highlight-secondary">total number of 1s</span> in
                            the entire data (including parity bit) is <span className="binary-highlight-secondary">ODD</span>.
                        </p>

                        {/* Dropdown Toggle */}
                        <button
                            onClick={() => setShowOddTable(!showOddTable)}
                            style={{
                                marginTop: '10px',
                                background: 'transparent',
                                border: '1px solid var(--accent-secondary)',
                                color: 'var(--accent-secondary)',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                width: '100%',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.background = 'rgba(0, 212, 255, 0.1)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.background = 'transparent';
                            }}
                        >
                            {showOddTable ? "Hide Reference Examples" : "Show Reference Examples"}
                        </button>

                        {/* Reference Table */}
                        {showOddTable && (
                            <div style={{
                                marginTop: '15px',
                                overflowX: 'auto',
                                border: '1px solid var(--bg-medium)',
                                borderRadius: '8px'
                            }}>
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    fontSize: '0.85rem'
                                }}>
                                    <thead style={{ background: 'var(--bg-medium)' }}>
                                        <tr style={{ color: 'var(--text-secondary)' }}>
                                            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid var(--accent-secondary)', border: '1px solid var(--bg-dark)' }}>
                                                Decimal Number
                                            </th>
                                            <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid var(--accent-secondary)', border: '1px solid var(--bg-dark)' }}>
                                                7-bit binary equivalent
                                            </th>
                                            <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid var(--accent-secondary)', border: '1px solid var(--bg-dark)' }}>
                                                8-bit number including parity bit
                                            </th>
                                            <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid var(--accent-secondary)', border: '1px solid var(--bg-dark)' }}>
                                                Hexadecimal equivalent of the previous column
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {oddParityExamples.map((row, idx) => (
                                            <tr key={idx}>
                                                <td style={{ padding: '10px', color: 'var(--text-primary)', border: '1px solid var(--bg-dark)' }}>
                                                    {row.decimal}
                                                </td>
                                                <td style={{
                                                    padding: '10px',
                                                    textAlign: 'center',
                                                    fontFamily: 'monospace',
                                                    color: 'var(--accent-secondary)',
                                                    border: '1px solid var(--bg-dark)'
                                                }}>
                                                    {row.binary7}
                                                </td>
                                                <td style={{
                                                    padding: '10px',
                                                    textAlign: 'center',
                                                    fontFamily: 'monospace',
                                                    color: 'var(--accent-secondary)',
                                                    border: '1px solid var(--bg-dark)'
                                                }}>
                                                    <span style={{ color: 'var(--accent-danger)' }}>{row.parity}</span>
                                                    {row.binary7}
                                                </td>
                                                <td style={{
                                                    padding: '10px',
                                                    textAlign: 'center',
                                                    fontFamily: 'monospace',
                                                    color: 'var(--accent-amber)',
                                                    border: '1px solid var(--bg-dark)'
                                                }}>
                                                    {row.hex}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <h4 style={{ color: 'var(--text-primary)', marginTop: '20px', marginBottom: '10px' }}>
                            Example: Number <span className="binary-highlight-secondary">24</span> (Decimal)
                        </h4>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px' }}>
                            <ol className="binary-list" style={{ margin: 0, paddingLeft: '20px' }}>
                                <li><strong>7-bit binary:</strong> 0011000 (two 1s - EVEN count)</li>
                                <li><strong>Count 1s:</strong> 2 ones (even count)</li>
                                <li><strong>For ODD parity:</strong> Need total to be ODD</li>
                                <li><strong>Parity bit:</strong> <span className="binary-highlight-secondary">1</span> (2 + 1 = 3, which is ODD) ✓</li>
                                <li><strong>8-bit result:</strong> <span style={{ color: 'var(--accent-danger)' }}>1</span>0011000 = 3 ones total (ODD)</li>
                                <li><strong>Hexadecimal:</strong> 10011000 = 152 decimal = 0x98</li>
                            </ol>
                        </div>
                    </div>
                </section>

                {/* ================= INTERACTIVE CALCULATOR - EVEN PARITY ================= */}
                <section className="binary-card">
                    <h2 className="binary-section-title binary-title-primary">
                        <span className="binary-dot binary-dot-primary"></span>
                        Interactive Calculator - Even Parity
                    </h2>

                    <div className="binary-info-box binary-info-primary">
                        <h3 className="binary-info-heading">Try it yourself:</h3>
                        <p className="binary-text">
                            Enter decimal numbers (0-127) in the table below. The calculator will automatically
                            compute the 7-bit binary, add even parity bit, and show the hexadecimal result.
                        </p>
                    </div>

                    <div style={{
                        marginTop: '20px',
                        overflowX: 'auto',
                        border: '1px solid var(--bg-medium)',
                        borderRadius: '8px'
                    }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: '0.9rem'
                        }}>
                            <thead style={{ background: 'var(--bg-medium)' }}>
                                <tr style={{ color: 'var(--text-secondary)' }}>
                                    <th style={{ padding: '10px', width: '15%', borderBottom: '2px solid var(--accent-primary)', border: '1px solid var(--bg-dark)' }}>
                                        Decimal Number
                                    </th>
                                    <th style={{ padding: '10px', width: '25%', borderBottom: '2px solid var(--accent-primary)', border: '1px solid var(--bg-dark)' }}>
                                        7-bit binary equivalent
                                    </th>
                                    <th style={{ padding: '10px', width: '30%', borderBottom: '2px solid var(--accent-primary)', border: '1px solid var(--bg-dark)' }}>
                                        8-bit number including parity bit
                                    </th>
                                    <th style={{ padding: '10px', width: '25%', borderBottom: '2px solid var(--accent-primary)', border: '1px solid var(--bg-dark)' }}>
                                        Hexadecimal equivalent of the previous column
                                    </th>
                                    <th style={{ padding: '10px', width: '5%', borderBottom: '2px solid var(--accent-primary)', border: '1px solid var(--bg-dark)' }}>

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row) => {
                                    const binary7 = calculate7BitBinary(row.decimal);
                                    const binary8 = calculate8BitWithParity(binary7, 'even');
                                    const hex = binaryToHex(binary8);
                                    const parityBit = calculateEvenParityBit(binary7);

                                    return (
                                        <tr key={row.id}>
                                            <td style={{ padding: '8px', border: '1px solid var(--bg-dark)' }}>
                                                <input
                                                    type="number"
                                                    value={row.decimal}
                                                    onChange={(e) => handleDecimalChange(row.id, e.target.value)}
                                                    placeholder="0-127"
                                                    min="0"
                                                    max="127"
                                                    style={{
                                                        width: '100%',
                                                        background: 'var(--bg-dark)',
                                                        border: '1px solid var(--bg-light)',
                                                        color: 'var(--text-primary)',
                                                        padding: '8px',
                                                        borderRadius: '4px',
                                                        fontSize: '0.9rem',
                                                        fontFamily: 'monospace'
                                                    }}
                                                />
                                            </td>
                                            <td style={{
                                                padding: '10px',
                                                textAlign: 'center',
                                                fontFamily: 'monospace',
                                                color: 'var(--accent-secondary)',
                                                border: '1px solid var(--bg-dark)',
                                                fontSize: '1rem'
                                            }}>
                                                {binary7}
                                            </td>
                                            <td style={{
                                                padding: '10px',
                                                textAlign: 'center',
                                                fontFamily: 'monospace',
                                                color: 'var(--accent-primary)',
                                                border: '1px solid var(--bg-dark)',
                                                fontSize: '1rem'
                                            }}>
                                                {binary8 && (
                                                    <>
                                                        <span style={{ color: 'var(--accent-danger)', fontWeight: 'bold' }}>{parityBit}</span>
                                                        {binary7}
                                                    </>
                                                )}
                                            </td>
                                            <td style={{
                                                padding: '10px',
                                                textAlign: 'center',
                                                fontFamily: 'monospace',
                                                color: 'var(--accent-amber)',
                                                border: '1px solid var(--bg-dark)',
                                                fontSize: '1rem',
                                                fontWeight: 'bold'
                                            }}>
                                                {hex}
                                            </td>
                                            <td style={{ padding: '8px', border: '1px solid var(--bg-dark)', textAlign: 'center' }}>
                                                <button
                                                    onClick={() => removeRow(row.id)}
                                                    disabled={rows.length === 1}
                                                    style={{
                                                        background: rows.length === 1 ? 'var(--bg-light)' : 'var(--accent-danger)',
                                                        color: rows.length === 1 ? 'var(--text-secondary)' : 'white',
                                                        border: 'none',
                                                        padding: '6px 10px',
                                                        borderRadius: '4px',
                                                        cursor: rows.length === 1 ? 'not-allowed' : 'pointer',
                                                        fontSize: '0.8rem',
                                                        opacity: rows.length === 1 ? 0.5 : 1
                                                    }}
                                                >
                                                    ✕
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <button
                        onClick={addRow}
                        style={{
                            marginTop: '15px',
                            background: 'var(--accent-primary)',
                            color: 'var(--bg-dark)',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = 'var(--accent-secondary)';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = 'var(--accent-primary)';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        + Add Row
                    </button>
                </section>

                {/* ================= COMPARISON ================= */}
                <section className="binary-card">
                    <h2 className="binary-section-title binary-title-secondary">
                        <span className="binary-dot binary-dot-secondary"></span>
                        Even vs Odd Parity Comparison
                    </h2>

                    <div className="binary-info-box binary-info-secondary">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '20px',
                            marginTop: '15px'
                        }}>
                            <div style={{
                                background: 'rgba(0, 255, 136, 0.1)',
                                padding: '15px',
                                borderRadius: '8px',
                                border: '2px solid var(--accent-primary)'
                            }}>
                                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '10px', textAlign: 'center' }}>
                                    EVEN Parity
                                </h4>
                                <ul className="binary-list" style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                                    <li>Total 1s must be <strong>EVEN</strong></li>
                                    <li>If data has ODD 1s → parity = <strong>1</strong></li>
                                    <li>If data has EVEN 1s → parity = <strong>0</strong></li>
                                    <li>Used in: RAM, UART</li>
                                </ul>
                            </div>

                            <div style={{
                                background: 'rgba(0, 212, 255, 0.1)',
                                padding: '15px',
                                borderRadius: '8px',
                                border: '2px solid var(--accent-secondary)'
                            }}>
                                <h4 style={{ color: 'var(--accent-secondary)', marginBottom: '10px', textAlign: 'center' }}>
                                    ODD Parity
                                </h4>
                                <ul className="binary-list" style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                                    <li>Total 1s must be <strong>ODD</strong></li>
                                    <li>If data has EVEN 1s → parity = <strong>1</strong></li>
                                    <li>If data has ODD 1s → parity = <strong>0</strong></li>
                                    <li>Used in: Serial comm, ASCII</li>
                                </ul>
                            </div>
                        </div>

                        <div style={{
                            marginTop: '20px',
                            padding: '15px',
                            background: 'rgba(251, 191, 36, 0.1)',
                            borderRadius: '8px',
                            borderLeft: '4px solid var(--accent-amber)'
                        }}>
                            <h4 style={{ color: 'var(--accent-amber)', marginBottom: '10px' }}>
                                ⚠️ Important Notes:
                            </h4>
                            <ul className="binary-list" style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                                <li>Both methods detect <strong>single-bit errors</strong> only</li>
                                <li>Cannot detect errors in <strong>even number of bits</strong> (2, 4, 6...)</li>
                                <li>Cannot <strong>correct</strong> errors, only detect them</li>
                                <li>Simple but effective for basic error detection</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}