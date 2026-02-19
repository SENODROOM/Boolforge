import React, { useState } from 'react';

const toAsciiRows = (text) => {
  const rows = [];
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const code = ch.charCodeAt(0);
    if (code < 0 || code > 127) {
      rows.push({
        char: ch,
        code,
        hex: 'N/A',
        binary: 'N/A',
        note: 'Non‑ASCII character',
      });
    } else {
      rows.push({
        char: ch === ' ' ? '␣' : ch,
        code,
        hex: code.toString(16).toUpperCase().padStart(2, '0'),
        binary: code.toString(2).padStart(8, '0'),
        note: '',
      });
    }
  }
  return rows;
};

const ASCIINotation = () => {
  const [input, setInput] = useState('');
  const rows = input ? toAsciiRows(input) : [];

  return (
    <div className="calculator-container">
      <div className="grid-background"></div>

      <header className="header">
        <div className="header-content">
          <h1 className="title">ASCII Notation</h1>
          <p className="subtitle">See decimal, hex, and binary codes for characters</p>
        </div>
      </header>

      <div className="main-content">
        <div className="control-panel">
          <div className="control-group">
            <label className="control-label">Text</label>
            <input
              type="text"
              className="control-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a word or phrase, e.g. Bool"
            />
          </div>
        </div>

        {input && (
          <div className="results-section fade-in">
            <div className="result-card">
              <h2 className="result-title">Character Codes</h2>

              <div className="explanation">
                <h3 className="explanation-title">Per‑character breakdown</h3>
                <div className="explanation-content">
                  <p className="explanation-intro">
                    ASCII assigns each character a unique{' '}
                    <span className="highlight">7‑bit integer code</span>, usually shown in decimal,
                    hexadecimal, or binary.
                  </p>
                  <table className="binary-table">
                    <thead className="binary-table-header">
                      <tr>
                        <th>Char</th>
                        <th>Decimal</th>
                        <th>Hex</th>
                        <th className="binary-table-cell-right">Binary (8‑bit)</th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, idx) => (
                        <tr key={`${row.char}-${idx}`} className="binary-table-row">
                          <td className="binary-table-cell">{row.char}</td>
                          <td className="binary-table-cell">{row.code}</td>
                          <td className="binary-table-cell">0x{row.hex}</td>
                          <td className="binary-table-cell binary-table-cell-right binary-table-cell-mono">
                            {row.binary}
                          </td>
                          <td className="binary-table-cell">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="explanation">
                <h3 className="explanation-title">Why 7 bits?</h3>
                <div className="explanation-content">
                  <p>
                    Classic ASCII uses values from 0–127 (2⁷ − 1), fitting neatly into 7 bits. In practice it is
                    stored in 8‑bit bytes, leaving one bit unused or used for extended character sets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ASCIINotation;

