import React, { useState } from 'react';

const toBcdDigits = (value) => {
  if (!/^[0-9]+$/.test(value)) {
    return null;
  }
  return value.split('').map((d) => ({
    digit: d,
    bcd: parseInt(d, 10).toString(2).padStart(4, '0'),
  }));
};

const BCDNotation = () => {
  const [input, setInput] = useState('');
  const digits = input ? toBcdDigits(input) : null;

  return (
    <div className="calculator-container">
      <div className="grid-background"></div>

      <header className="header">
        <div className="header-content">
          <h1 className="title">BCD Notation</h1>
          <p className="subtitle">Binary Coded Decimal representation of decimal digits</p>
        </div>
      </header>

      <div className="main-content">
        <div className="control-panel">
          <div className="control-group">
            <label className="control-label">Decimal number</label>
            <input
              type="text"
              className="control-input"
              value={input}
              onChange={(e) => {
                const val = e.target.value.trim();
                if (val === '' || /^[0-9]+$/.test(val)) {
                  setInput(val);
                }
              }}
              placeholder="Enter a non‑negative integer, e.g. 4095"
            />
          </div>
        </div>

        {input && (
          <div className="results-section fade-in">
            <div className="result-card">
              <h2 className="result-title">BCD Conversion</h2>

              <div className="explanation">
                <h3 className="explanation-title">Per‑digit encoding</h3>
                <div className="explanation-content">
                  {digits ? (
                    <>
                      <p className="explanation-intro">
                        In BCD, each decimal digit is stored separately using{' '}
                        <span className="highlight">4 binary bits</span>.
                      </p>
                      <table className="binary-table">
                        <thead className="binary-table-header">
                          <tr>
                            <th>Decimal digit</th>
                            <th className="binary-table-cell-right">BCD (4‑bit)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {digits.map(({ digit, bcd }, idx) => (
                            <tr key={`${digit}-${idx}`} className="binary-table-row">
                              <td className="binary-table-cell">{digit}</td>
                              <td className="binary-table-cell binary-table-cell-right binary-table-cell-mono">
                                {bcd}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <p className="explanation-intro">
                      <span className="highlight">BCD accepts only decimal digits 0–9.</span> Remove any sign,
                      spaces, or non‑digit characters.
                    </p>
                  )}
                </div>
              </div>

              {digits && (
                <div className="explanation">
                  <h3 className="explanation-title">Combined BCD word</h3>
                  <div className="explanation-content">
                    <p className="explanation-intro">
                      Joining all digit blocks left‑to‑right gives the full BCD representation.
                    </p>
                    <p className="final-result">
                      <strong>{input}</strong>
                      {digits.map((d) => d.bcd).join(' ')}
                    </p>
                    <p>
                      Notice that BCD is different from the pure binary value of the number – it preserves the{' '}
                      <span className="highlight">decimal digit boundaries</span>, which is useful in display
                      hardware and decimal arithmetic.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BCDNotation;

