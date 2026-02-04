import React, { useState } from 'react';

export default function BitConverter() {
    const [inputValue, setInputValue] = useState('1');
    const [fromUnit, setFromUnit] = useState('MB');
    const [toUnit, setToUnit] = useState('KB');
    const [result, setResult] = useState('');
    const [showTable, setShowTable] = useState(false);

    // Conversion factors to bits
    const units = {
        'bit': { toBits: 1, power: 0, label: 'Bit', category: 'base' },
        'B': { toBits: 8, power: 3, label: 'Byte', category: 'byte' },
        'KB': { toBits: 8 * 1024, power: 13, label: 'Kilobyte', category: 'byte' },
        'MB': { toBits: 8 * 1024 * 1024, power: 23, label: 'Megabyte', category: 'byte' },
        'GB': { toBits: 8 * 1024 * 1024 * 1024, power: 33, label: 'Gigabyte', category: 'byte' },
        'TB': { toBits: 8 * Math.pow(1024, 4), power: 43, label: 'Terabyte', category: 'byte' },
        'PB': { toBits: 8 * Math.pow(1024, 5), power: 53, label: 'Petabyte', category: 'byte' },
        'Kib': { toBits: 1024, power: 10, label: 'Kibibit', category: 'bit' },
        'Mib': { toBits: 1024 * 1024, power: 20, label: 'Mebibit', category: 'bit' },
        'Gib': { toBits: 1024 * 1024 * 1024, power: 30, label: 'Gibibit', category: 'bit' },
        'Tib': { toBits: Math.pow(1024, 4), power: 40, label: 'Tebibit', category: 'bit' },
        'Pib': { toBits: Math.pow(1024, 5), power: 50, label: 'Pebibit', category: 'bit' }
    };

    const handleConvert = () => {
        if (!inputValue || isNaN(inputValue)) {
            setResult('');
            return;
        }

        const fromBits = units[fromUnit].toBits;
        const toBits = units[toUnit].toBits;

        const totalBits = parseFloat(inputValue) * fromBits;
        const converted = totalBits / toBits;

        setResult(converted.toLocaleString('en-US', { maximumFractionDigits: 10 }));
    };

    const formatNumber = (num) => {
        if (num >= 1e15) {
            return num.toExponential(2);
        }
        return num.toLocaleString('en-US');
    };

    // Generate table data
    const tableData = [
        { unit: 'Bit', symbol: 'bit', power: 0, bits: 1, category: 'base' },
        { unit: 'Byte', symbol: 'B', power: 3, bits: 8, category: 'base' },
        { unit: 'Kibibit', symbol: 'Kib', power: 10, bits: units.Kib.toBits, category: 'binary-bits' },
        { unit: 'Mebibit', symbol: 'Mib', power: 20, bits: units.Mib.toBits, category: 'binary-bits' },
        { unit: 'Gibibit', symbol: 'Gib', power: 30, bits: units.Gib.toBits, category: 'binary-bits' },
        { unit: 'Tebibit', symbol: 'Tib', power: 40, bits: units.Tib.toBits, category: 'binary-bits' },
        { unit: 'Pebibit', symbol: 'Pib', power: 50, bits: units.Pib.toBits, category: 'binary-bits' },
        { unit: 'Kilobyte', symbol: 'KB', power: 13, bits: units.KB.toBits, category: 'bytes' },
        { unit: 'Megabyte', symbol: 'MB', power: 23, bits: units.MB.toBits, category: 'bytes' },
        { unit: 'Gigabyte', symbol: 'GB', power: 33, bits: units.GB.toBits, category: 'bytes' },
        { unit: 'Terabyte', symbol: 'TB', power: 43, bits: units.TB.toBits, category: 'bytes' },
        { unit: 'Petabyte', symbol: 'PB', power: 53, bits: units.PB.toBits, category: 'bytes' }
    ];

    const groupedData = {
        'Base Units': tableData.filter(d => d.category === 'base'),
        'Binary Bits (1024-based)': tableData.filter(d => d.category === 'binary-bits'),
        'Bytes (1024-based)': tableData.filter(d => d.category === 'bytes')
    };

    return (
        <div className="binary-container">
            <div className="binary-wrapper">
                <h1 className="binary-main-title">Bit & Byte Converter</h1>
                <p className="binary-subtitle">Convert between digital storage units with precision</p>

                {/* ================= CONVERTER SECTION ================= */}
                <section className="binary-card">
                    <h2 className="binary-section-title binary-title-primary">
                        <span className="binary-dot binary-dot-primary"></span>
                        Unit Conversion
                    </h2>

                    <div className="binary-info-box binary-info-primary">
                        <h3 className="binary-info-heading">How it works:</h3>
                        <p className="binary-text">
                            Select your <span className="binary-highlight-primary">source unit</span>, enter a value,
                            then choose the <span className="binary-highlight-primary">target unit</span> for conversion.
                        </p>

                        <div style={{ marginTop: '20px' }}>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>
                                Quick Reference:
                            </h4>
                            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px' }}>
                                <ul className="binary-list" style={{ margin: 0, paddingLeft: '20px' }}>
                                    <li><strong>1 Byte</strong> = 8 bits</li>
                                    <li><strong>Binary units</strong> use 1024 (2<sup>10</sup>) as base</li>
                                    <li><strong>Decimal units</strong> use 1000 (10<sup>3</sup>) as base</li>
                                    <li><strong>IEC standard:</strong> KB/MB/GB (binary) vs kB/mB/gB (decimal)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Converter Controls */}
                    <h3 className="binary-info-heading" style={{ fontSize: '1.1rem', marginTop: '30px' }}>
                        Convert Your Value
                    </h3>

                    <div className="binary-controls-grid">
                        <div className="binary-input-group">
                            <label className="binary-label">From Unit</label>
                            <select
                                className="binary-input-field binary-input-primary"
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}
                                style={{
                                    padding: '12px',
                                    fontSize: '1rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <optgroup label="Bytes" style={{ background: 'var(--bg-medium)', color: 'var(--accent-primary)' }}>
                                    <option value="B">Byte (B)</option>
                                    <option value="KB">Kilobyte (KB)</option>
                                    <option value="MB">Megabyte (MB)</option>
                                    <option value="GB">Gigabyte (GB)</option>
                                    <option value="TB">Terabyte (TB)</option>
                                    <option value="PB">Petabyte (PB)</option>
                                </optgroup>
                                <optgroup label="Bits" style={{ background: 'var(--bg-medium)', color: 'var(--accent-primary)' }}>
                                    <option value="bit">Bit</option>
                                    <option value="Kib">Kibibit (Kib)</option>
                                    <option value="Mib">Mebibit (Mib)</option>
                                    <option value="Gib">Gibibit (Gib)</option>
                                    <option value="Tib">Tebibit (Tib)</option>
                                    <option value="Pib">Pebibit (Pib)</option>
                                </optgroup>
                            </select>
                        </div>

                        <div className="binary-input-group">
                            <label className="binary-label">Value</label>
                            <input
                                type="number"
                                className="binary-input-field binary-input-primary"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter value..."
                                style={{ fontSize: '1rem' }}
                            />
                        </div>
                    </div>

                    <div className="binary-controls-grid" style={{ marginTop: '15px' }}>
                        <div className="binary-input-group">
                            <label className="binary-label">To Unit</label>
                            <select
                                className="binary-input-field binary-input-primary"
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value)}
                                style={{
                                    padding: '12px',
                                    fontSize: '1rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <optgroup label="Bytes" style={{ background: 'var(--bg-medium)', color: 'var(--accent-primary)' }}>
                                    <option value="B">Byte (B)</option>
                                    <option value="KB">Kilobyte (KB)</option>
                                    <option value="MB">Megabyte (MB)</option>
                                    <option value="GB">Gigabyte (GB)</option>
                                    <option value="TB">Terabyte (TB)</option>
                                    <option value="PB">Petabyte (PB)</option>
                                </optgroup>
                                <optgroup label="Bits" style={{ background: 'var(--bg-medium)', color: 'var(--accent-primary)' }}>
                                    <option value="bit">Bit</option>
                                    <option value="Kib">Kibibit (Kib)</option>
                                    <option value="Mib">Mebibit (Mib)</option>
                                    <option value="Gib">Gibibit (Gib)</option>
                                    <option value="Tib">Tebibit (Tib)</option>
                                    <option value="Pib">Pebibit (Pib)</option>
                                </optgroup>
                            </select>
                        </div>

                        <div className="binary-input-group" style={{ justifyContent: 'flex-end', paddingTop: '24px' }}>
                            <button
                                onClick={handleConvert}
                                style={{
                                    background: 'var(--accent-primary)',
                                    color: 'var(--bg-dark)',
                                    border: 'none',
                                    padding: '12px 32px',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    width: '100%'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.background = 'var(--accent-secondary)';
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(0, 255, 136, 0.4)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.background = 'var(--accent-primary)';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                Convert
                            </button>
                        </div>
                    </div>

                    {result && (
                        <div className="binary-result-box binary-result-primary" style={{ marginTop: '20px' }}>
                            <div style={{ marginBottom: '15px' }}>
                                <div style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)',
                                    marginBottom: '8px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    Result
                                </div>
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 'bold',
                                    color: 'var(--accent-primary)',
                                    fontFamily: 'monospace',
                                    wordBreak: 'break-all'
                                }}>
                                    {result}
                                </div>
                                <div style={{
                                    fontSize: '1.1rem',
                                    color: 'var(--text-secondary)',
                                    marginTop: '8px'
                                }}>
                                    {units[toUnit].label}
                                </div>
                            </div>
                            <div className="binary-details-grid">
                                <div><strong>From:</strong> {inputValue} {units[fromUnit].label}</div>
                                <div><strong>To:</strong> {units[toUnit].label}</div>
                            </div>
                        </div>
                    )}
                </section>

                {/* ================= UNITS REFERENCE TABLE ================= */}
                <section className="binary-card">
                    <h2 className="binary-section-title binary-title-secondary">
                        <span className="binary-dot binary-dot-secondary"></span>
                        Units Reference
                    </h2>

                    <div className="binary-info-box binary-info-secondary">
                        <h3 className="binary-info-heading">Understanding Binary Units:</h3>
                        <p className="binary-text">
                            Computer storage uses <span className="binary-highlight-secondary">powers of 2</span>.
                            Each unit represents 2<sup>n</sup> bits where n is the power value.
                        </p>

                        {/* Dropdown Toggle */}
                        <button
                            onClick={() => setShowTable(!showTable)}
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
                            {showTable ? "Hide Complete Reference Table" : "Show Complete Reference Table"}
                        </button>

                        {/* The Table */}
                        {showTable && (
                            <div style={{
                                marginTop: '15px',
                                maxHeight: '500px',
                                overflowY: 'auto',
                                border: '1px solid var(--bg-medium)',
                                borderRadius: '8px'
                            }}>
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    fontSize: '0.9rem'
                                }}>
                                    <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-medium)', zIndex: 10 }}>
                                        <tr style={{ color: 'var(--text-secondary)' }}>
                                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid var(--accent-secondary)' }}>Unit</th>
                                            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid var(--accent-secondary)' }}>Symbol</th>
                                            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid var(--accent-secondary)' }}>2<sup>n</sup> Bits</th>
                                            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid var(--accent-secondary)' }}>Total Bits</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(groupedData).map(([category, items]) => (
                                            <React.Fragment key={category}>
                                                <tr style={{ background: 'var(--bg-light)' }}>
                                                    <td
                                                        colSpan="4"
                                                        style={{
                                                            padding: '10px 12px',
                                                            color: 'var(--accent-amber)',
                                                            fontWeight: 'bold',
                                                            fontSize: '0.85rem',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '1px',
                                                            borderTop: '2px solid var(--bg-dark)'
                                                        }}
                                                    >
                                                        {category}
                                                    </td>
                                                </tr>
                                                {items.map((row) => (
                                                    <tr
                                                        key={row.symbol}
                                                        style={{
                                                            borderBottom: '1px solid var(--bg-dark)',
                                                            transition: 'background 0.2s ease'
                                                        }}
                                                        onMouseOver={(e) => {
                                                            e.currentTarget.style.background = 'rgba(0, 212, 255, 0.05)';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.currentTarget.style.background = 'transparent';
                                                        }}
                                                    >
                                                        <td style={{ padding: '10px 12px', color: 'var(--text-primary)', fontWeight: '600' }}>
                                                            {row.unit}
                                                        </td>
                                                        <td style={{
                                                            padding: '10px 12px',
                                                            textAlign: 'center',
                                                            fontFamily: 'monospace',
                                                            color: 'var(--accent-secondary)',
                                                            fontWeight: 'bold'
                                                        }}>
                                                            {row.symbol}
                                                        </td>
                                                        <td style={{
                                                            padding: '10px 12px',
                                                            textAlign: 'center',
                                                            fontFamily: 'monospace',
                                                            color: 'var(--accent-amber)'
                                                        }}>
                                                            2<sup>{row.power}</sup>
                                                        </td>
                                                        <td style={{
                                                            padding: '10px 12px',
                                                            textAlign: 'right',
                                                            fontFamily: 'monospace',
                                                            color: 'var(--accent-primary)'
                                                        }}>
                                                            {formatNumber(row.bits)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <h4 style={{ color: 'var(--text-primary)', marginTop: '20px', marginBottom: '10px' }}>
                            Example: <span className="binary-highlight-secondary">1 Megabyte (MB)</span>
                        </h4>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px' }}>
                            <ol className="binary-list" style={{ margin: 0, paddingLeft: '20px' }}>
                                <li><strong>1 MB</strong> = 1024 KB</li>
                                <li><strong>1 MB</strong> = 1,048,576 Bytes</li>
                                <li><strong>1 MB</strong> = <span className="binary-highlight-secondary">8,388,608 bits</span></li>
                                <li><strong>Power:</strong> 2<sup>23</sup> bits</li>
                            </ol>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}