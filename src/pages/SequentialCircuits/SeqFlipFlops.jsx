import React from "react";
import SeqLayout from "./SeqLayout";

const SeqFlipFlops = () => (
  <SeqLayout
    title="Introduction to Flip-Flops"
    subtitle="Edge-triggered bistable memory elements — the fundamental building blocks of synchronous sequential circuits."
  >
    <div className="seq-content-body">

      <div className="seq-box">
        <p className="seq-box-title">What is a Flip-Flop?</p>
        <p>
          A <strong>flip-flop</strong> is an edge-triggered bistable memory element. Unlike a latch
          (which is level-sensitive), a flip-flop captures its input and changes state <em>only</em>
          on a specific edge of the clock — either the <strong>rising edge</strong> (positive-edge
          triggered) or the <strong>falling edge</strong> (negative-edge triggered).
        </p>
      </div>

      <h2>From Latch to Flip-Flop: Master-Slave Configuration</h2>
      <p>
        A flip-flop is built by cascading two latches — a <strong>master</strong> and a
        <strong>slave</strong> — with complemented clocks. This guarantees that state changes
        happen only at the active clock edge, not continuously while the clock is high.
      </p>
      <ul>
        <li>When <strong>CLK = 0</strong>: Master latch is transparent (captures D); Slave latch holds</li>
        <li>When <strong>CLK = 1</strong>: Master latch holds; Slave latch is transparent (propagates to Q)</li>
        <li>Net effect: Q changes only on the <strong>rising edge</strong> of CLK</li>
      </ul>

      <div className="seq-diagram">
        <svg viewBox="0 0 560 190" xmlns="http://www.w3.org/2000/svg" style={{fontFamily:"'JetBrains Mono',monospace"}}>
          <defs>
            <marker id="arr-ff" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
              <path d="M0,0 L0,5 L7,2.5 z" fill="#60a5fa"/>
            </marker>
          </defs>
          {/* D input */}
          <line x1="20" y1="90" x2="80" y2="90" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arr-ff)"/>
          <text x="8" y="86" fontSize="12" fill="#93c5fd">D</text>
          {/* Master latch */}
          <rect x="80" y="55" width="140" height="70" rx="6" fill="rgba(30,41,59,.9)" stroke="#f59e0b" strokeWidth="2"/>
          <text x="150" y="87" fontSize="12" fill="#f59e0b" textAnchor="middle">MASTER</text>
          <text x="150" y="105" fontSize="10" fill="#9ca3af" textAnchor="middle">D Latch (CLK̄)</text>
          {/* CLK to Master (with bubble for inverted) */}
          <circle cx="150" cy="132" r="5" fill="none" stroke="#f59e0b" strokeWidth="1.5"/>
          <line x1="150" y1="137" x2="150" y2="180" stroke="#10b981" strokeWidth="2"/>
          {/* Intermediate wire */}
          <line x1="220" y1="90" x2="280" y2="90" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="5"/>
          {/* Slave latch */}
          <rect x="280" y="55" width="140" height="70" rx="6" fill="rgba(30,41,59,.9)" stroke="#60a5fa" strokeWidth="2"/>
          <text x="350" y="87" fontSize="12" fill="#60a5fa" textAnchor="middle">SLAVE</text>
          <text x="350" y="105" fontSize="10" fill="#9ca3af" textAnchor="middle">D Latch (CLK)</text>
          {/* CLK to Slave */}
          <line x1="350" y1="125" x2="350" y2="180" stroke="#10b981" strokeWidth="2"/>
          {/* CLK rail */}
          <line x1="150" y1="180" x2="350" y2="180" stroke="#10b981" strokeWidth="2"/>
          <text x="240" y="175" fontSize="11" fill="#10b981" textAnchor="middle">CLK</text>
          {/* Output Q */}
          <line x1="420" y1="90" x2="510" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#arr-ff)"/>
          <text x="515" y="95" fontSize="12" fill="#10b981">Q</text>
          {/* Bubble label */}
          <text x="110" y="150" fontSize="9" fill="#f59e0b">inverted clock</text>
        </svg>
        <p className="seq-diagram-caption">Figure 1 — Master-Slave D Flip-Flop construction</p>
      </div>

      <h2>Clock Signals and Edge Triggering</h2>
      <p>
        The clock signal determines <em>when</em> a flip-flop samples its input. There are two
        standard triggering methods:
      </p>
      <ul>
        <li>
          <strong>Positive-edge triggered (↑)</strong> — Q changes on the 0→1 (rising) transition
          of the clock. Shown as a triangle (▷) on the CLK pin in schematics.
        </li>
        <li>
          <strong>Negative-edge triggered (↓)</strong> — Q changes on the 1→0 (falling) transition.
          Shown as a bubble-then-triangle (○▷) on the CLK pin.
        </li>
      </ul>

      <div className="seq-diagram">
        <svg viewBox="0 0 500 155" xmlns="http://www.w3.org/2000/svg" style={{fontFamily:"'JetBrains Mono',monospace"}}>
          <text x="10" y="38" fontSize="11" fill="#9ca3af">CLK</text>
          <polyline
            points="50,80 50,40 120,40 120,80 200,80 200,40 270,40 270,80 350,80 350,40 420,40 420,80"
            fill="none" stroke="#60a5fa" strokeWidth="2.5"/>
          {/* Rising-edge markers */}
          <line x1="120" y1="28" x2="120" y2="88" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4"/>
          <line x1="270" y1="28" x2="270" y2="88" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4"/>
          <text x="104" y="24" fontSize="9" fill="#10b981">↑ Rise</text>
          <text x="254" y="24" fontSize="9" fill="#10b981">↑ Rise</text>
          {/* Falling-edge markers */}
          <line x1="200" y1="28" x2="200" y2="88" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4"/>
          <line x1="350" y1="28" x2="350" y2="88" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4"/>
          <text x="184" y="24" fontSize="9" fill="#ef4444">↓ Fall</text>
          <text x="334" y="24" fontSize="9" fill="#ef4444">↓ Fall</text>
          {/* Legend */}
          <text x="10" y="120" fontSize="10" fill="#10b981">▷  Positive-edge: triggers on ↑ (green lines)</text>
          <text x="10" y="140" fontSize="10" fill="#ef4444">○▷ Negative-edge: triggers on ↓ (red lines)</text>
        </svg>
        <p className="seq-diagram-caption">Figure 2 — Clock edge triggering types</p>
      </div>

      <h2>Asynchronous Inputs: Preset and Clear</h2>
      <p>
        Most practical flip-flops include <strong>asynchronous inputs</strong> that work
        independently of the clock:
      </p>
      <ul>
        <li>
          <strong>Preset (PRE / SET)</strong> — Forces Q=1 immediately when activated, regardless
          of clock. Typically active-low.
        </li>
        <li>
          <strong>Clear (CLR / RESET)</strong> — Forces Q=0 immediately when activated, regardless
          of clock. Typically active-low.
        </li>
      </ul>
      <p>
        These inputs are used for system initialization and power-on reset.
      </p>

      <div className="seq-box info">
        <p className="seq-box-title">Flip-Flop vs Latch — Quick Reference</p>
        <p>
          <strong>Latch</strong>: Level-sensitive, asynchronous, transparent when enabled.<br/>
          <strong>Flip-Flop</strong>: Edge-triggered, synchronous, changes only on clock edge.<br/>
          Flip-flops are used in virtually all synchronous designs because they prevent glitches and
          simplify timing analysis.
        </p>
      </div>

      <h2>Key Timing Parameters</h2>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead>
            <tr><th>Parameter</th><th>Symbol</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>Setup time</td><td>t<sub>su</sub></td><td>Input must be stable before clock edge</td></tr>
            <tr><td>Hold time</td><td>t<sub>h</sub></td><td>Input must remain stable after clock edge</td></tr>
            <tr><td>CLK→Q propagation</td><td>t<sub>p</sub></td><td>Delay from clock edge to valid output Q</td></tr>
            <tr><td>Min clock period</td><td>T<sub>min</sub></td><td>t<sub>p</sub> + t<sub>su</sub> + routing delay</td></tr>
            <tr><td>Max clock frequency</td><td>f<sub>max</sub></td><td>1 / T<sub>min</sub></td></tr>
          </tbody>
        </table>
      </div>

      <h2>Metastability</h2>
      <p>
        If a flip-flop's setup or hold time is violated, its output may enter a
        <strong>metastable state</strong> — an indeterminate voltage level between valid 0 and 1.
        The circuit will eventually resolve, but the resolution time is unpredictable. Proper
        synchronizer design avoids metastability by ensuring timing constraints are always met.
      </p>

      <div className="seq-box warning">
        <p className="seq-box-title">Next: Types of Flip-Flops</p>
        <p>
          The next section covers the four standard flip-flop types — <strong>SR, JK, D, and T</strong>
          — their truth tables, characteristic equations, and when each is best used.
        </p>
      </div>

    </div>
  </SeqLayout>
);

export default SeqFlipFlops;
