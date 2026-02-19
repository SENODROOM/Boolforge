import React, { useState } from 'react';

const extendBits = (value, targetBits, mode) => {
  if (!/^[01]+$/.test(value)) {
    return { error: 'Input must be a binary string of 0s and 1s.' };
  }
  const n = parseInt(targetBits, 10);
  if (Number.isNaN(n) || n <= 0 || n > 32) {
    return { error: 'Target bits should be between 1 and 32.' };
  }
  if (value.length > n) {
    return { error: 'Target width must be at least as large as the original bit width.' };
  }

  if (mode === 'unsigned') {
    const extended = value.padStart(n, '0');
    return {
      error: null,
      original: value,
      extended,
      explanation: `For unsigned values we use zero‑extension: pad with 0s on the left until the bit‑width is ${n}.`,
    };
  }

  // two's complement sign extension
  const signBit = value[0];
  const extended = value.padStart(n, signBit);
  return {
    error: null,
    original: value,
    extended,
    explanation:
      `For two's‑complement signed values we copy the sign bit (${signBit}) into the new higher‑order bits. ` +
      `This preserves the numeric value while changing the width to ${n} bits.`,
  };
};

const BitExtension = () => {
  const [binary, setBinary] = useState('');
  const [bits, setBits] = useState(8);
  const [mode, setMode] = useState('signed');

  const hasInput = binary !== '';
  const result = hasInput ? extendBits(binary, bits, mode === 'unsigned' ? 'unsigned' : 'signed') : null;

  return (
    <div className="calculator-container">
      <div className="grid-background"></div>

      <header className="header">
        <div className="header-content">
          <h1 className="title">Bit Extension</h1>
          <p className="subtitle">Compare unsigned zero‑extension vs signed two&apos;s‑complement sign extension</p>
        </div>
      </header>

      <div className="main-content">
        <div className="control-panel">
          <div className="control-group">
            <label className="control-label">Binary value</label>
            <input
              type="text"
              className="control-input"
              value={binary}
              onChange={(e) => {
                const val = e.target.value.replace(/\s+/g, '');
                if (val === '' || /^[01]+$/.test(val)) {
                  setBinary(val);
                }
              }}
              placeholder="e.g. 1010"
            />
          </div>

          <div className="control-group">
            <label className="control-label">Target bit‑width</label>
            <input
              type="number"
              className="control-input"
              value={bits}
              onChange={(e) => setBits(e.target.value)}
              min="1"
              max="32"
            />
          </div>

          <div className="control-group">
            <label className="control-label">Mode</label>
            <select
              className="control-select"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="signed">Signed (two&apos;s complement)</option>
              <option value="unsigned">Unsigned (zero‑extension)</option>
            </select>
          </div>
        </div>

        {hasInput && (
          <div className="results-section fade-in">
            <div className="result-card">
              <h2 className="result-title">Extension Result</h2>

              <div className="explanation">
                <h3 className="explanation-title">How the bits change</h3>
                <div className="explanation-content">
                  {result && result.error && (
                    <p className="explanation-intro">
                      <span className="highlight">Error:</span> {result.error}
                    </p>
                  )}
                  {result && !result.error && (
                    <>
                      <p className="explanation-intro">
                        <span className="highlight">Original:</span> {result.original} ({result.original.length} bits)
                      </p>
                      <p className="explanation-intro">
                        <span className="highlight">Extended:</span> {result.extended} ({bits} bits)
                      </p>
                      <p>{result.explanation}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="explanation">
                <h3 className="explanation-title">Signed vs unsigned intuition</h3>
                <div className="explanation-content">
                  <p>
                    With <span className="highlight">unsigned</span> numbers, the leftmost bit is just another
                    magnitude bit, so new bits must be <strong>0</strong> to avoid changing the value.
                  </p>
                  <p>
                    With <span className="highlight">two&apos;s‑complement signed</span> numbers, the leftmost bit
                    encodes the sign. Repeating it into new higher‑order bits keeps the encoded integer the same, even
                    though the word size grows.
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

export default BitExtension;

