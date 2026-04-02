import React from "react";
import SeqLayout from "./SeqLayout";

const SeqIntro = () => (
  <SeqLayout
    title="Introduction to Sequential Circuits"
    subtitle="Understanding circuits with memory — where outputs depend on both current inputs and past history."
  >
    <div className="seq-content-body">

      <div className="seq-box">
        <span className="seq-box-title">Core Definition</span>
        <p>
          A <strong>sequential circuit</strong> is a digital circuit whose output depends not only on
          the current inputs but also on the <strong>history of past inputs</strong>. It contains
          memory elements that store state information between clock cycles.
        </p>
      </div>

      <h2>Combinational vs Sequential</h2>
      <p>
        In a <strong>combinational circuit</strong>, output is determined purely by the current inputs —
        there is no memory. In a <strong>sequential circuit</strong>, feedback paths and storage
        elements allow the circuit to "remember" previous states.
      </p>

      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Combinational</th>
              <th>Sequential</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Output depends on</td><td>Current inputs only</td><td>Inputs + stored state</td></tr>
            <tr><td>Memory elements</td><td>None</td><td>Flip-flops / Latches</td></tr>
            <tr><td>Feedback paths</td><td>No</td><td>Yes</td></tr>
            <tr><td>Clock required</td><td>No (usually)</td><td>Yes (synchronous)</td></tr>
            <tr><td>Examples</td><td>Adder, Mux, Decoder</td><td>Counter, Register, FSM</td></tr>
          </tbody>
        </table>
      </div>

      <h2>General Model</h2>
      <p>Every sequential circuit has three fundamental parts:</p>

      <div className="seq-grid-2">
        <div className="seq-feature-card">
          <span className="seq-feature-icon">⚙️</span>
          <p className="seq-feature-title">Combinational Logic</p>
          <p className="seq-feature-desc">Computes the next state and output values from current state and inputs.</p>
        </div>
        <div className="seq-feature-card">
          <span className="seq-feature-icon">💾</span>
          <p className="seq-feature-title">Memory Elements</p>
          <p className="seq-feature-desc">Flip-flops that hold the current state between clock cycles.</p>
        </div>
        <div className="seq-feature-card">
          <span className="seq-feature-icon">🔄</span>
          <p className="seq-feature-title">Feedback Path</p>
          <p className="seq-feature-desc">Current state feeds back into the combinational block to influence the next state.</p>
        </div>
      </div>

      <div className="seq-diagram">
        <svg viewBox="0 0 620 270" xmlns="http://www.w3.org/2000/svg" style={{fontFamily:"'JetBrains Mono',monospace"}}>
          <defs>
            <marker id="a0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3z" fill="#6366f1"/>
            </marker>
            <filter id="glow0">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {/* Input */}
          <line x1="20" y1="135" x2="90" y2="135" stroke="#6366f1" strokeWidth="2" markerEnd="url(#a0)"/>
          <text x="12" y="122" fontSize="11" fill="#94a3b8">Inputs</text>
          {/* Combinational box */}
          <rect x="90" y="80" width="170" height="110" rx="10" fill="rgba(30,27,75,0.9)" stroke="#6366f1" strokeWidth="2"/>
          <rect x="90" y="80" width="170" height="4" rx="2" fill="#6366f1" opacity="0.6"/>
          <text x="175" y="132" fontSize="12" fill="#a5b4fc" textAnchor="middle" fontWeight="700">Combinational</text>
          <text x="175" y="150" fontSize="11" fill="#64748b" textAnchor="middle">Logic Block</text>
          {/* Output */}
          <line x1="260" y1="110" x2="400" y2="110" stroke="#10b981" strokeWidth="2" markerEnd="url(#a0)" filter="url(#glow0)"/>
          <text x="408" y="114" fontSize="11" fill="#10b981" fontWeight="700">Outputs</text>
          {/* Next state */}
          <line x1="260" y1="160" x2="320" y2="160" stroke="#6366f1" strokeWidth="2" markerEnd="url(#a0)"/>
          <text x="265" y="152" fontSize="9" fill="#818cf8">Next State</text>
          {/* Memory box */}
          <rect x="320" y="110" width="150" height="100" rx="10" fill="rgba(30,27,75,0.9)" stroke="#f59e0b" strokeWidth="2"/>
          <rect x="320" y="110" width="150" height="4" rx="2" fill="#f59e0b" opacity="0.6"/>
          <text x="395" y="158" fontSize="12" fill="#fbbf24" textAnchor="middle" fontWeight="700">Memory</text>
          <text x="395" y="175" fontSize="11" fill="#64748b" textAnchor="middle">(Flip-Flops)</text>
          {/* Feedback */}
          <line x1="395" y1="210" x2="395" y2="250" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="6"/>
          <line x1="395" y1="250" x2="60"  y2="250" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="6"/>
          <line x1="60"  y1="250" x2="60"  y2="155" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="6"/>
          <line x1="60"  y1="155" x2="90"  y2="155" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#a0)"/>
          <text x="200" y="268" fontSize="9" fill="#818cf8" textAnchor="middle" letterSpacing="0.1em">CURRENT STATE FEEDBACK</text>
        </svg>
        <p className="seq-diagram-caption">Figure 1 — General block diagram of a synchronous sequential circuit</p>
      </div>

      <h2>Types of Sequential Circuits</h2>

      <div className="seq-grid-2">
        <div className="seq-feature-card">
          <span className="seq-feature-icon">⏱️</span>
          <p className="seq-feature-title">Synchronous</p>
          <p className="seq-feature-desc">State changes only at clock edges. Predictable, easy to design and analyze. Used in virtually all modern digital systems.</p>
        </div>
        <div className="seq-feature-card">
          <span className="seq-feature-icon">⚡</span>
          <p className="seq-feature-title">Asynchronous</p>
          <p className="seq-feature-desc">State changes respond immediately to inputs — no clock. Faster but prone to hazards and difficult to design correctly.</p>
        </div>
      </div>

      <h2>The Clock Signal</h2>
      <p>
        In synchronous circuits, a periodic square-wave <strong>clock</strong> coordinates all state
        changes. Flip-flops respond on the <strong>rising edge</strong> (positive-edge triggered) or
        <strong>falling edge</strong> (negative-edge triggered).
      </p>

      <div className="seq-box info">
        <span className="seq-box-title">Key Terminology</span>
        <p>
          <strong>State</strong> — The binary values stored in flip-flops at a given instant.<br/>
          <strong>Present State</strong> — The current stored value in the state register.<br/>
          <strong>Next State</strong> — The value the state will take after the next clock edge.<br/>
          <strong>State Register</strong> — All flip-flops holding the current circuit state.
        </p>
      </div>

      <h2>Real-World Applications</h2>
      <div className="seq-grid-2">
        <div className="seq-feature-card"><span className="seq-feature-icon">🧮</span><p className="seq-feature-title">Registers & Shift Registers</p><p className="seq-feature-desc">Store and shift data in processors and communication systems.</p></div>
        <div className="seq-feature-card"><span className="seq-feature-icon">🔢</span><p className="seq-feature-title">Counters</p><p className="seq-feature-desc">Ripple, synchronous, and modulo-N counting circuits.</p></div>
        <div className="seq-feature-card"><span className="seq-feature-icon">🧠</span><p className="seq-feature-title">FSMs — Moore & Mealy</p><p className="seq-feature-desc">Control units in CPUs, communication protocols, traffic lights.</p></div>
        <div className="seq-feature-card"><span className="seq-feature-icon">💬</span><p className="seq-feature-title">Serial Communication</p><p className="seq-feature-desc">UART, SPI, I²C interfaces that send data bit-by-bit over time.</p></div>
      </div>

      <div className="seq-box success">
        <span className="seq-box-title">What's Coming Next</span>
        <p>
          The next sections walk you through <strong>Latches</strong> → <strong>Flip-Flops</strong>
          → <strong>Types</strong> → <strong>Analysis</strong> → <strong>Design Procedures</strong>
          → <strong>State Diagrams</strong> → <strong>State Reduction</strong>. Each builds on the last.
        </p>
      </div>

    </div>
  </SeqLayout>
);

export default SeqIntro;
