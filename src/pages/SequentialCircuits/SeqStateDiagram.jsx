import React from "react";
import SeqLayout from "./SeqLayout";

const SeqStateDiagram = () => (
  <SeqLayout
    title="State Diagrams & State Tables"
    subtitle="The two primary representations for describing the behavior of a sequential circuit — graphical and tabular."
  >
    <div className="seq-content">

      <div className="seq-box">
        <p className="seq-box-title">Why These Tools?</p>
        <p>
          A sequential circuit's behavior must be specified before it can be built.
          <strong>State diagrams</strong> give an intuitive visual picture, while
          <strong>state tables</strong> give an organized, complete enumeration that
          feeds directly into the design equations.
        </p>
      </div>

      <h2>State Diagrams</h2>
      <p>
        A <strong>state diagram</strong> (also called a state transition diagram or bubble diagram)
        is a directed graph where:
      </p>
      <ul>
        <li>Each <strong>node (circle)</strong> represents a state</li>
        <li>Each <strong>directed arc (arrow)</strong> represents a state transition</li>
        <li>Arrows are labeled with the <strong>input condition</strong> that causes the transition</li>
        <li>The <strong>initial state</strong> is indicated by a special arrow or a double circle</li>
        <li>Output values appear either on the state (Moore) or on the arc (Mealy)</li>
      </ul>

      <h2>Moore Machine Diagram</h2>
      <p>
        In a <strong>Moore machine</strong>, the output is associated with the <em>state</em>.
        Each state circle contains both the state name and the output value(s).
      </p>

      <div className="seq-diagram">
        <svg viewBox="0 0 500 210" xmlns="http://www.w3.org/2000/svg" style={{fontFamily:"'JetBrains Mono', monospace"}}>
          <defs>
            <marker id="arrs" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#00ff88"/>
            </marker>
          </defs>
          {/* Initial arrow */}
          <line x1="15" y1="105" x2="50" y2="105" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrs)"/>
          <text x="4" y="102" fontSize="9" fill="#8b9dc3">start</text>

          {/* States */}
          <circle cx="90" cy="105" r="38" fill="#1e2842" stroke="#00d4ff" strokeWidth="2"/>
          <text x="90" y="100" fontSize="12" fill="#00d4ff" textAnchor="middle" fontWeight="700">A</text>
          <text x="90" y="116" fontSize="10" fill="#00ff88" textAnchor="middle">Z = 0</text>

          <circle cx="250" cy="55" r="38" fill="#1e2842" stroke="#00d4ff" strokeWidth="2"/>
          <text x="250" y="50" fontSize="12" fill="#00d4ff" textAnchor="middle" fontWeight="700">B</text>
          <text x="250" y="66" fontSize="10" fill="#00ff88" textAnchor="middle">Z = 0</text>

          <circle cx="400" cy="105" r="38" fill="#1e2842" stroke="#00ff88" strokeWidth="2.5"/>
          <text x="400" y="100" fontSize="12" fill="#00ff88" textAnchor="middle" fontWeight="700">C</text>
          <text x="400" y="116" fontSize="10" fill="#00ff88" textAnchor="middle">Z = 1</text>

          <circle cx="250" cy="160" r="38" fill="#1e2842" stroke="#00d4ff" strokeWidth="2"/>
          <text x="250" y="155" fontSize="12" fill="#00d4ff" textAnchor="middle" fontWeight="700">D</text>
          <text x="250" y="171" fontSize="10" fill="#00ff88" textAnchor="middle">Z = 0</text>

          {/* Transitions */}
          <line x1="126" y1="88" x2="215" y2="65" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrs)"/>
          <text x="155" y="70" fontSize="10" fill="#fbbf24">x=1</text>

          <line x1="284" y1="70" x2="365" y2="90" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrs)"/>
          <text x="320" y="72" fontSize="10" fill="#fbbf24">x=1</text>

          <line x1="126" y1="120" x2="215" y2="148" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrs)"/>
          <text x="150" y="148" fontSize="10" fill="#fbbf24">x=0</text>

          <line x1="284" y1="148" x2="365" y2="122" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrs)"/>
          <text x="315" y="150" fontSize="10" fill="#fbbf24">x=0</text>

          {/* Back to A */}
          <path d="M400,143 Q400,195 250,195 Q100,195 90,143" fill="none" stroke="#ff3366" strokeWidth="1.5" markerEnd="url(#arrs)"/>
          <text x="245" y="208" fontSize="9" fill="#ff3366">x=0 or 1 → A</text>
        </svg>
        <p className="seq-diagram-caption">Figure 1 — Moore machine state diagram (output labeled on states)</p>
      </div>

      <h2>Mealy Machine Diagram</h2>
      <p>
        In a <strong>Mealy machine</strong>, the output is associated with the <em>transition</em>.
        Each arc is labeled with the format <strong>input / output</strong>.
      </p>

      <div className="seq-diagram">
        <svg viewBox="0 0 400 170" xmlns="http://www.w3.org/2000/svg" style={{fontFamily:"'JetBrains Mono', monospace"}}>
          <defs>
            <marker id="arrm" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#00ff88"/>
            </marker>
          </defs>
          <line x1="10" y1="85" x2="50" y2="85" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrm)"/>
          <text x="5" y="82" fontSize="9" fill="#8b9dc3">→</text>

          <circle cx="90" cy="85" r="35" fill="#1e2842" stroke="#00d4ff" strokeWidth="2"/>
          <text x="90" y="90" fontSize="12" fill="#00d4ff" textAnchor="middle" fontWeight="700">S0</text>

          <circle cx="230" cy="85" r="35" fill="#1e2842" stroke="#00d4ff" strokeWidth="2"/>
          <text x="230" y="90" fontSize="12" fill="#00d4ff" textAnchor="middle" fontWeight="700">S1</text>

          <circle cx="355" cy="85" r="35" fill="#1e2842" stroke="#00d4ff" strokeWidth="2"/>
          <text x="355" y="90" fontSize="12" fill="#00d4ff" textAnchor="middle" fontWeight="700">S2</text>

          {/* S0→S1 (x=1/z=0) */}
          <path d="M122,70 Q175,35 198,68" fill="none" stroke="#00ff88" strokeWidth="1.8" markerEnd="url(#arrm)"/>
          <text x="148" y="40" fontSize="10" fill="#fbbf24">1/0</text>

          {/* S1→S0 (x=0/z=0) */}
          <path d="M200,100 Q175,130 125,100" fill="none" stroke="#00ff88" strokeWidth="1.8" markerEnd="url(#arrm)"/>
          <text x="148" y="135" fontSize="10" fill="#fbbf24">0/0</text>

          {/* S1→S2 (x=1/z=1) */}
          <path d="M262,70 Q300,35 325,68" fill="none" stroke="#00ff88" strokeWidth="1.8" markerEnd="url(#arrm)"/>
          <text x="282" y="40" fontSize="10" fill="#fbbf24">1/1</text>

          {/* S2→S0 (x=0/z=0) */}
          <path d="M340,118 Q230,165 110,112" fill="none" stroke="#ff3366" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arrm)"/>
          <text x="220" y="160" fontSize="9" fill="#ff3366">0/0 → S0</text>

          {/* arc labels */}
          <text x="20" y="165" fontSize="9" fill="#8b9dc3">Arc label format: input / output</text>
        </svg>
        <p className="seq-diagram-caption">Figure 2 — Mealy machine state diagram (output on arcs, format: input/output)</p>
      </div>

      <h2>State Tables</h2>
      <p>
        A <strong>state table</strong> is the tabular equivalent of the state diagram. It lists
        every combination of present state and input, showing the resulting next state and output.
      </p>

      <h2>Moore Machine State Table Format</h2>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead>
            <tr>
              <th rowSpan="2">Present State</th>
              <th colSpan="2">Next State</th>
              <th rowSpan="2">Output Z</th>
            </tr>
            <tr>
              <th>x = 0</th>
              <th>x = 1</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>A</td><td>A</td><td>B</td><td>0</td></tr>
            <tr><td>B</td><td>A</td><td>C</td><td>0</td></tr>
            <tr><td>C</td><td>A</td><td>C</td><td>1</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Mealy Machine State Table Format</h2>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead>
            <tr>
              <th rowSpan="2">Present State</th>
              <th colSpan="2">Next State</th>
              <th colSpan="2">Output Z</th>
            </tr>
            <tr>
              <th>x = 0</th><th>x = 1</th>
              <th>x = 0</th><th>x = 1</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>A</td><td>A</td><td>B</td><td>0</td><td>0</td></tr>
            <tr><td>B</td><td>A</td><td>C</td><td>0</td><td>1</td></tr>
            <tr><td>C</td><td>A</td><td>C</td><td>0</td><td>0</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Converting Between Diagram and Table</h2>
      <p>
        The conversions are straightforward:
      </p>
      <ul>
        <li>
          <strong>Diagram → Table:</strong> For each state (node), follow each outgoing arc.
          Record the destination state and the input condition and output as a row in the table.
        </li>
        <li>
          <strong>Table → Diagram:</strong> For each row, create a circle for the present state
          (if not already drawn), then draw an arc to the next-state circle labeled with the input
          (and output for Mealy machines).
        </li>
      </ul>

      <h2>Incompletely Specified Machines</h2>
      <p>
        Sometimes not all input combinations occur in all states (e.g., certain inputs are
        never applied in a particular state). These transitions can be left as
        <strong>"don't-care" (–)</strong> entries, allowing flexibility during minimization.
      </p>

      <div className="seq-box info">
        <p className="seq-box-title">Best Practices</p>
        <p>
          • Always label every arc with the input that causes it (and output for Mealy)<br/>
          • Verify every state has transitions for all possible input combinations<br/>
          • Use symbolic names (A, B, C…) in the state table — assign binary codes later<br/>
          • Double-check that the number of arcs leaving each state equals 2<sup>k</sup> for k inputs
        </p>
      </div>

    </div>
  </SeqLayout>
);

export default SeqStateDiagram;
