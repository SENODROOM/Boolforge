import React, { useState } from 'react';

const countSignificantDigits = (value) => {
  if (!value || /^\s*$/.test(value)) return { count: 0, msd: null, lsd: null, cleaned: '' };

  let str = value.trim();

  // Handle scientific notation by normalizing the significand
  const sciMatch = str.match(/^([+-]?\d*\.?\d+)[eE]([+-]?\d+)$/);
  if (sciMatch) {
    const significand = sciMatch[1].replace(/[+-]/g, '');
    const digitsOnly = significand.replace('.', '');
    const stripped = digitsOnly.replace(/^0+/, '').replace(/0+$/, '');
    if (!stripped) return { count: 0, msd: null, lsd: null, cleaned: '' };
    return {
      count: stripped.length,
      msd: stripped[0],
      lsd: stripped[stripped.length - 1],
      cleaned: stripped
    };
  }

  // Regular decimal representation
  const signless = str.replace(/[+-]/g, '');
  if (!/^\d*\.?\d*$/.test(signless)) {
    return { count: 0, msd: null, lsd: null, cleaned: '' };
  }

  if (!signless.includes('.')) {
    // Integer: trailing zeros are not significant unless explicitly specified by a decimal point
    const withoutLeading = signless.replace(/^0+/, '');
    const core = withoutLeading.replace(/0+$/, '');
    if (!core) return { count: 0, msd: null, lsd: null, cleaned: '' };
    return {
      count: core.length,
      msd: core[0],
      lsd: core[core.length - 1],
      cleaned: core
    };
  }

  // Number with decimal point
  const [intPart, fracPart] = signless.split('.');
  const intNoLeading = intPart.replace(/^0+/, '');
  let combined;

  if (intNoLeading) {
    // Case: digits before decimal, all digits around decimal are significant
    combined = intNoLeading + fracPart;
    combined = combined.replace(/0+$/, '');
  } else {
    // Case: leading zeros after decimal are not significant
    const fracNoLeading = fracPart.replace(/^0+/, '');
    combined = fracNoLeading;
  }

  if (!combined) return { count: 0, msd: null, lsd: null, cleaned: '' };

  return {
    count: combined.length,
    msd: combined[0],
    lsd: combined[combined.length - 1],
    cleaned: combined
  };
};

const SignificantDigits = () => {
  const [input, setInput] = useState('');
  const result = countSignificantDigits(input);

  return (
    <div className="calculator-container">
      <div className="grid-background"></div>

      <header className="header">
        <div className="header-content">
          <h1 className="title">Significant Digits Explorer</h1>
          <p className="subtitle">Count significant figures, MSD, and LSD for any number</p>
        </div>
      </header>

      <div className="main-content">
        <div className="control-panel">
          <div className="control-group">
            <label className="control-label">Enter a number</label>
            <input
              type="text"
              className="control-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Examples: 0.004500 , 1200 , 3.40 , 6.02e23"
            />
          </div>
        </div>

        {input && (
          <div className="results-section fade-in">
            <div className="result-card">
              <h2 className="result-title">Significant Digit Analysis</h2>

              <div className="explanation">
                <h3 className="explanation-title">Result Summary</h3>
                {result.count === 0 ? (
                  <p className="explanation-intro">
                    <span className="highlight">The input does not contain any significant digits</span> under standard
                    conventions. Check the format and try again.
                  </p>
                ) : (
                  <>
                    <p className="explanation-intro">
                      <span className="highlight">Total significant digits:</span> {result.count}
                    </p>
                    <div className="explanation-content">
                      <p>
                        <span className="highlight">Most Significant Digit (MSD):</span>{' '}
                        {result.msd}
                      </p>
                      <p>
                        <span className="highlight">Least Significant Digit (LSD):</span>{' '}
                        {result.lsd}
                      </p>
                      <p>
                        We strip off non-significant leading and trailing zeros and focus on the{' '}
                        <span className="highlight">meaningful digits</span> that affect the measured precision.
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="explanation">
                <h3 className="explanation-title">Quick Rules</h3>
                <div className="explanation-content">
                  <ul>
                    <li>All non‑zero digits are always significant.</li>
                    <li>Zeros between non‑zero digits are significant (e.g. 1005 → 4 sig. digits).</li>
                    <li>Leading zeros are never significant (e.g. 0.0034 → 2 sig. digits).</li>
                    <li>Trailing zeros after a decimal point are significant (e.g. 2.300 → 4 sig. digits).</li>
                    <li>In scientific notation, only digits in the coefficient count as significant.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignificantDigits;

