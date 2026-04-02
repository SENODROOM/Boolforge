import React, { useState } from "react";
import SeqLayout from "./SeqLayout";

/* ── Interactive D Flip-Flop ── */
const DFFSim = () => {
  const [D, setD] = useState(0);
  const [Q, setQ] = useState(0);

  return (
    <div className="seq-sim-mini">
      <p className="seq-sim-title">D Flip-Flop — Positive-Edge Triggered</p>
      <div className="seq-sim-inputs">
        <label className="seq-sim-label">
          D (data input)
          <button
            className={`seq-sim-toggle ${D ? "on" : "off"}`}
            onClick={() => setD(d => 1 - d)}
          >{D}</button>
        </label>
        <button className="seq-clk-btn" onClick={() => setQ(D)}>
          ↑ Trigger Clock Edge
        </button>
      </div>
      <div className="seq-sim-output">
        <div><span className="seq-out-label">Q  =</span><span className="seq-out-val">{Q}</span></div>
        <div><span className="seq-out-label">Q̄  =</span><span className="seq-out-val">{1 - Q}</span></div>
        <div className="seq-sim-state">Click "Trigger Clock Edge" to sample D → Q</div>
      </div>
    </div>
  );
};

/* ── Interactive JK Flip-Flop ── */
const JKFFSim = () => {
  const [J, setJ] = useState(0);
  const [K, setK] = useState(0);
  const [Q, setQ] = useState(0);

  const trigger = () => {
    if      (J === 0 && K === 0) { /* no change */ }
    else if (J === 0 && K === 1) { setQ(0); }
    else if (J === 1 && K === 0) { setQ(1); }
    else                         { setQ(q => 1 - q); } // toggle
  };

  const getAction = () => {
    if (J === 0 && K === 0) return "No change (hold)";
    if (J === 0 && K === 1) return "Reset → Q = 0";
    if (J === 1 && K === 0) return "Set → Q = 1";
    return "Toggle → Q flips";
  };

  return (
    <div className="seq-sim-mini">
      <p className="seq-sim-title">JK Flip-Flop — Positive-Edge Triggered</p>
      <div className="seq-sim-inputs">
        <label className="seq-sim-label">
          J
          <button className={`seq-sim-toggle ${J ? "on" : "off"}`} onClick={() => setJ(j => 1 - j)}>{J}</button>
        </label>
        <label className="seq-sim-label">
          K
          <button className={`seq-sim-toggle ${K ? "on" : "off"}`} onClick={() => setK(k => 1 - k)}>{K}</button>
        </label>
        <button className="seq-clk-btn" onClick={trigger}>↑ Clock Edge</button>
      </div>
      <div className="seq-sim-output">
        <div><span className="seq-out-label">Q  =</span><span className="seq-out-val">{Q}</span></div>
        <div><span className="seq-out-label">Q̄  =</span><span className="seq-out-val">{1 - Q}</span></div>
        <div className="seq-sim-state">{getAction()}</div>
      </div>
    </div>
  );
};

const SeqFlipFlopTypes = () => (
  <SeqLayout
    title="Types of Flip-Flops"
    subtitle="SR, JK, D, and T flip-flops — their truth tables, characteristic equations, excitation requirements, and practical trade-offs."
  >
    <div className="seq-content-body">

      <p>
        There are four standard flip-flop types. Each is defined by its
        <strong> characteristic table</strong> (next state Q⁺ as a function of inputs and Q)
        and its <strong>characteristic equation</strong>.
      </p>

      {/* ── SR ── */}
      <h2>1. SR Flip-Flop (Set-Reset)</h2>
      <p>
        The clocked version of the SR latch. Two inputs — <strong>S</strong> and
        <strong>R</strong> — and state changes only on the clock edge. The S=1, R=1 condition
        remains undefined.
      </p>

      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead><tr><th>S</th><th>R</th><th>Q⁺</th><th>Operation</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0</td><td>Q</td><td>No change</td></tr>
            <tr><td>0</td><td>1</td><td>0</td><td>Reset</td></tr>
            <tr><td>1</td><td>0</td><td>1</td><td>Set</td></tr>
            <tr><td>1</td><td>1</td><td>?</td><td>Undefined</td></tr>
          </tbody>
        </table>
      </div>

      <div className="seq-box">
        <p className="seq-box-title">Characteristic Equation</p>
        <p><strong>Q⁺ = S + R̄·Q</strong> &nbsp;&nbsp; (with constraint S·R = 0)</p>
      </div>

      <p>
        The forbidden state makes SR flip-flops difficult to use in automatic synthesis.
        The JK flip-flop resolves this limitation.
      </p>

      {/* ── JK ── */}
      <h2>2. JK Flip-Flop</h2>
      <p>
        An improvement over the SR: when J=1 and K=1, the output <strong>toggles</strong>
        instead of entering an undefined state. This makes it a universal flip-flop — it can
        emulate SR, D, and T behavior.
      </p>

      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead><tr><th>J</th><th>K</th><th>Q⁺</th><th>Operation</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0</td><td>Q</td><td>No change</td></tr>
            <tr><td>0</td><td>1</td><td>0</td><td>Reset</td></tr>
            <tr><td>1</td><td>0</td><td>1</td><td>Set</td></tr>
            <tr><td>1</td><td>1</td><td>Q̄</td><td>Toggle</td></tr>
          </tbody>
        </table>
      </div>

      <div className="seq-box">
        <p className="seq-box-title">Characteristic Equation</p>
        <p><strong>Q⁺ = J·Q̄ + K̄·Q</strong></p>
      </div>

      <JKFFSim />

      {/* ── D ── */}
      <h2>3. D Flip-Flop (Data / Delay)</h2>
      <p>
        The simplest and most widely used flip-flop. A single data input <strong>D</strong>
        is copied to Q on each active clock edge. It eliminates the forbidden state completely
        and is the standard element in VLSI synthesis flows.
      </p>

      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead><tr><th>D</th><th>Q⁺</th><th>Operation</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0</td><td>Reset</td></tr>
            <tr><td>1</td><td>1</td><td>Set</td></tr>
          </tbody>
        </table>
      </div>

      <div className="seq-box">
        <p className="seq-box-title">Characteristic Equation</p>
        <p><strong>Q⁺ = D</strong></p>
      </div>

      <DFFSim />

      <p>
        Derived from SR by setting R = D̄, or from JK by setting K = J̄.
      </p>

      {/* ── T ── */}
      <h2>4. T Flip-Flop (Toggle)</h2>
      <p>
        A single input <strong>T</strong>: when T=1 the output toggles each clock edge; when
        T=0 it holds. The natural building block for binary counters.
      </p>

      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead><tr><th>T</th><th>Q⁺</th><th>Operation</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>Q</td><td>Hold</td></tr>
            <tr><td>1</td><td>Q̄</td><td>Toggle</td></tr>
          </tbody>
        </table>
      </div>

      <div className="seq-box">
        <p className="seq-box-title">Characteristic Equation</p>
        <p><strong>Q⁺ = T ⊕ Q</strong></p>
      </div>

      <p>Obtained from JK by connecting J = K = T, or from D by connecting D = T ⊕ Q.</p>

      {/* ── Comparison ── */}
      <h2>Comparison Summary</h2>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead>
            <tr><th>Type</th><th>Inputs</th><th>Char. Equation</th><th>Key Feature</th></tr>
          </thead>
          <tbody>
            <tr><td>SR</td><td>S, R</td><td>S + R̄Q</td><td>Forbidden SR=11</td></tr>
            <tr><td>JK</td><td>J, K</td><td>JQ̄ + K̄Q</td><td>Toggle on JK=11; universal</td></tr>
            <tr><td>D</td><td>D</td><td>D</td><td>Simplest; dominant in VLSI</td></tr>
            <tr><td>T</td><td>T</td><td>T ⊕ Q</td><td>Ideal for counters</td></tr>
          </tbody>
        </table>
      </div>

      {/* ── Conversions ── */}
      <h2>Flip-Flop Conversions</h2>
      <p>
        Any flip-flop type can emulate another by adding combinational logic to its inputs:
      </p>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead>
            <tr><th>Have → Want</th><th>Conversion Logic</th></tr>
          </thead>
          <tbody>
            <tr><td>JK → D</td><td>J = D, K = D̄</td></tr>
            <tr><td>JK → T</td><td>J = T, K = T</td></tr>
            <tr><td>D → JK</td><td>D = JQ̄ + K̄Q</td></tr>
            <tr><td>D → T</td><td>D = T ⊕ Q</td></tr>
            <tr><td>D → SR</td><td>D = S + R̄Q (constraint SR=0)</td></tr>
          </tbody>
        </table>
      </div>

      <div className="seq-box info">
        <p className="seq-box-title">Industry Practice</p>
        <p>
          Modern digital design (FPGA and ASIC) almost exclusively uses <strong>D flip-flops</strong>.
          Synthesis tools map all sequential behavior to D flip-flops automatically. T and JK
          flip-flops are primarily studied for understanding counter design theory and for
          exam purposes.
        </p>
      </div>

    </div>
  </SeqLayout>
);

export default SeqFlipFlopTypes;
