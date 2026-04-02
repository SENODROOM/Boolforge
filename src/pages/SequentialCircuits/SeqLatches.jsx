import React, { useState } from "react";
import SeqLayout from "./SeqLayout";

/* ── Interactive SR Latch ── */
const SRLatchSim = () => {
  const [S, setS] = useState(0);
  const [R, setR] = useState(0);

  let Q, Qbar, state;
  const isInvalid = S === 1 && R === 1;

  if      (S === 0 && R === 0) { Q = "Q (hold)"; Qbar = "Q̄ (hold)"; state = "Memory — no change"; }
  else if (S === 1 && R === 0) { Q = "1";        Qbar = "0";         state = "Set"; }
  else if (S === 0 && R === 1) { Q = "0";        Qbar = "1";         state = "Reset"; }
  else                         { Q = "?";        Qbar = "?";         state = "⚠ Invalid — forbidden state"; }

  return (
    <div className="seq-sim">
      <p className="seq-sim-title">Interactive SR Latch Simulator</p>
      <div className="seq-sim-inputs">
        <label className="seq-sim-label">
          S (Set)
          <button className={`seq-sim-toggle ${S ? "on" : "off"}`} onClick={() => setS(s => 1 - s)}>{S}</button>
        </label>
        <label className="seq-sim-label">
          R (Reset)
          <button className={`seq-sim-toggle ${R ? "on" : "off"}`} onClick={() => setR(r => 1 - r)}>{R}</button>
        </label>
      </div>
      <div className={`seq-sim-output${isInvalid ? " invalid" : ""}`}>
        <div><span className="seq-out-label">Q  =</span><span className="seq-out-val">{Q}</span></div>
        <div><span className="seq-out-label">Q̄  =</span><span className="seq-out-val">{Qbar}</span></div>
        <div className="seq-sim-state">{state}</div>
      </div>
    </div>
  );
};

const SeqLatches = () => (
  <SeqLayout
    title="Introduction to Latches"
    subtitle="The simplest bistable memory elements — asynchronous storage that responds directly to input levels."
  >
    <div className="seq-content-body">

      <div className="seq-box">
        <p className="seq-box-title">What is a Latch?</p>
        <p>
          A <strong>latch</strong> is a bistable multivibrator — a circuit with two stable states (0
          and 1) that can be switched between them. It is the most fundamental memory element and is
          <strong>level-sensitive</strong>: it responds to the <em>level</em> of the enable signal,
          not its edge.
        </p>
      </div>

      <h2>SR Latch (Set-Reset Latch)</h2>
      <p>
        The <strong>SR latch</strong> is built from two cross-coupled NOR gates (or NAND gates).
        It has two inputs — <strong>S (Set)</strong> and <strong>R (Reset)</strong> — and two
        complementary outputs <strong>Q</strong> and <strong>Q̄</strong>.
      </p>

      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead>
            <tr><th>S</th><th>R</th><th>Q (next)</th><th>Q̄ (next)</th><th>Action</th></tr>
          </thead>
          <tbody>
            <tr><td>0</td><td>0</td><td>Q</td><td>Q̄</td><td>No change (memory)</td></tr>
            <tr><td>1</td><td>0</td><td>1</td><td>0</td><td>Set</td></tr>
            <tr><td>0</td><td>1</td><td>0</td><td>1</td><td>Reset</td></tr>
            <tr><td>1</td><td>1</td><td>?</td><td>?</td><td>Forbidden (invalid)</td></tr>
          </tbody>
        </table>
      </div>

      <p>
        The S=1, R=1 condition is <strong>forbidden</strong> because it forces both Q and Q̄ to the
        same level, violating their complementary relationship and leaving the circuit in an
        unpredictable state when inputs return to 00.
      </p>

      <SRLatchSim />

      <div className="seq-diagram">
        <svg viewBox="0 0 420 190" xmlns="http://www.w3.org/2000/svg" style={{fontFamily:"'JetBrains Mono',monospace"}}>
          <defs>
            <marker id="arr-l" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
              <path d="M0,0 L0,5 L7,2.5 z" fill="#60a5fa"/>
            </marker>
          </defs>
          {/* S input */}
          <line x1="20" y1="55" x2="90" y2="55" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arr-l)"/>
          <text x="8" y="50" fontSize="12" fill="#93c5fd">S</text>
          {/* R input */}
          <line x1="20" y1="135" x2="90" y2="135" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arr-l)"/>
          <text x="8" y="130" fontSize="12" fill="#93c5fd">R</text>
          {/* NOR 1 */}
          <rect x="90" y="30" width="90" height="50" rx="6" fill="rgba(30,41,59,.9)" stroke="#818cf8" strokeWidth="2"/>
          <text x="135" y="60" fontSize="12" fill="#818cf8" textAnchor="middle">NOR</text>
          {/* NOR 2 */}
          <rect x="90" y="120" width="90" height="50" rx="6" fill="rgba(30,41,59,.9)" stroke="#818cf8" strokeWidth="2"/>
          <text x="135" y="150" fontSize="12" fill="#818cf8" textAnchor="middle">NOR</text>
          {/* Output Q */}
          <line x1="180" y1="55" x2="330" y2="55" stroke="#10b981" strokeWidth="2"/>
          <text x="335" y="60" fontSize="12" fill="#10b981">Q</text>
          {/* Output Q-bar */}
          <line x1="180" y1="145" x2="330" y2="145" stroke="#10b981" strokeWidth="2"/>
          <text x="335" y="150" fontSize="12" fill="#10b981">Q̄</text>
          {/* Cross feedback lines */}
          <line x1="280" y1="55"  x2="280" y2="90"  stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5"/>
          <line x1="280" y1="90"  x2="90"  y2="120" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5"/>
          <line x1="280" y1="145" x2="280" y2="110" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5"/>
          <line x1="280" y1="110" x2="90"  y2="80"  stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5"/>
          <text x="285" y="100" fontSize="9" fill="#f59e0b">feedback</text>
        </svg>
        <p className="seq-diagram-caption">Figure 1 — SR Latch using cross-coupled NOR gates</p>
      </div>

      <h2>SR Latch using NAND Gates</h2>
      <p>
        An SR latch built from two cross-coupled NAND gates has <strong>active-low</strong> inputs
        (S̄, R̄). The latch sets when S̄=0 and resets when R̄=0. The truth table is the complement
        of the NOR version.
      </p>

      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead><tr><th>S̄</th><th>R̄</th><th>Q (next)</th><th>Q̄ (next)</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>1</td><td>Q</td><td>Q̄</td><td>No change</td></tr>
            <tr><td>0</td><td>1</td><td>1</td><td>0</td><td>Set</td></tr>
            <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>Reset</td></tr>
            <tr><td>0</td><td>0</td><td>?</td><td>?</td><td>Forbidden</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Gated SR Latch (SR Latch with Enable)</h2>
      <p>
        A <strong>gated SR latch</strong> adds an <strong>Enable (EN)</strong> input. The latch only
        responds to S and R when EN=1. When EN=0, the outputs hold regardless of S and R.
      </p>
      <ul>
        <li><strong>EN = 0</strong> → Latch disabled, state holds</li>
        <li><strong>EN = 1</strong> → Latch behaves as a standard SR latch</li>
      </ul>

      <h2>D Latch (Data / Transparent Latch)</h2>
      <p>
        The <strong>D latch</strong> eliminates the forbidden state by tying R to D̄. It has one
        data input <strong>D</strong> and an <strong>Enable</strong> input.
      </p>
      <ul>
        <li>When EN=1: Q follows D <em>(transparent mode)</em></li>
        <li>When EN=0: Q holds its last value <em>(hold mode)</em></li>
      </ul>

      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead><tr><th>EN</th><th>D</th><th>Q (next)</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>X</td><td>Q</td><td>Hold</td></tr>
            <tr><td>1</td><td>0</td><td>0</td><td>Reset</td></tr>
            <tr><td>1</td><td>1</td><td>1</td><td>Set</td></tr>
          </tbody>
        </table>
      </div>

      <div className="seq-box info">
        <p className="seq-box-title">Latch vs Flip-Flop</p>
        <p>
          A <strong>latch</strong> is <em>level-sensitive</em> — it responds whenever the enable
          signal is active. A <strong>flip-flop</strong> is <em>edge-triggered</em> — it captures
          input only on a specific clock edge. Flip-flops are covered in the next section.
        </p>
      </div>

      <h2>Propagation Delay and Setup / Hold Times</h2>
      <p>Real latches have timing constraints that must be respected:</p>
      <ul>
        <li><strong>Propagation delay (t<sub>pd</sub>)</strong> — time from input change to stable output</li>
        <li><strong>Setup time (t<sub>su</sub>)</strong> — how long before the enable edge the input must be stable</li>
        <li><strong>Hold time (t<sub>h</sub>)</strong> — how long after the enable edge the input must remain stable</li>
      </ul>
      <p>
        Violating setup or hold times risks <strong>metastability</strong> — the latch output may
        settle to an indeterminate value and remain there for an unpredictable duration.
      </p>

    </div>
  </SeqLayout>
);

export default SeqLatches;
