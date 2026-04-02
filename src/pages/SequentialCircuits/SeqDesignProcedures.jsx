import React from "react";
import SeqLayout from "./SeqLayout";

const SeqDesignProcedures = () => (
  <SeqLayout
    title="Design Procedures"
    subtitle="A systematic methodology for designing synchronous sequential circuits from a word problem to a working circuit."
  >
    <div className="seq-content">

      <div className="seq-box">
        <p className="seq-box-title">Overview</p>
        <p>
          <strong>Design</strong> is the reverse of analysis. Given a word description or
          behavioral specification, you derive the circuit schematic. The design process
          is systematic and follows well-defined steps.
        </p>
      </div>

      <h2>Complete Design Procedure</h2>
      <p>The standard design procedure for synchronous sequential circuits is:</p>

      <div className="seq-box info">
        <p className="seq-box-title">Design Steps (in order)</p>
        <p>
          1. Understand the problem specification<br/>
          2. Determine number of states and draw state diagram<br/>
          3. Construct state table<br/>
          4. State reduction (minimize number of states)<br/>
          5. State assignment (assign binary codes to states)<br/>
          6. Select flip-flop type<br/>
          7. Derive flip-flop input equations using excitation tables<br/>
          8. Derive output equations<br/>
          9. Draw the logic circuit
        </p>
      </div>

      <h2>Step 1 — Problem Specification</h2>
      <p>
        Carefully read the problem. Identify:
      </p>
      <ul>
        <li>The <strong>inputs</strong> (what triggers state changes)</li>
        <li>The <strong>outputs</strong> (what the circuit must produce)</li>
        <li>The <strong>memory requirement</strong> (what needs to be remembered between clock cycles)</li>
        <li>Whether this is a <strong>Moore</strong> (outputs depend on state only) or
          <strong>Mealy</strong> (outputs depend on state + inputs) machine</li>
      </ul>

      <h2>Step 2 — State Diagram</h2>
      <p>
        Sketch a <strong>state diagram</strong> (directed graph) where:
      </p>
      <ul>
        <li>Each <strong>circle</strong> represents a state</li>
        <li>Each <strong>arrow</strong> represents a transition (labeled with input)</li>
        <li>For Moore: output is labeled <em>inside</em> the state circle</li>
        <li>For Mealy: output is labeled <em>on the transition arrow</em></li>
      </ul>

      <h2>Step 3 — State Table</h2>
      <p>
        Convert the state diagram into a tabular form — the <strong>state table</strong>:
      </p>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead>
            <tr><th>Present State</th><th>Input (x=0)</th><th>Input (x=1)</th><th>Output</th></tr>
          </thead>
          <tbody>
            <tr><td>A</td><td>A</td><td>B</td><td>0</td></tr>
            <tr><td>B</td><td>C</td><td>B</td><td>0</td></tr>
            <tr><td>C</td><td>A</td><td>D</td><td>0</td></tr>
            <tr><td>D</td><td>A</td><td>B</td><td>1</td></tr>
          </tbody>
        </table>
      </div>
      <p><em>Generic example — your specific problem will have different states and transitions.</em></p>

      <h2>Step 4 — State Reduction</h2>
      <p>
        Remove redundant (equivalent) states to minimize hardware. Two states are
        <strong>equivalent</strong> if they produce the same output for all inputs AND
        transition to equivalent next states. See the "State Reduction & Excitation Tables"
        page for full coverage.
      </p>

      <h2>Step 5 — State Assignment</h2>
      <p>
        Assign a unique binary code to each state. For n states, you need at least
        ⌈log₂(n)⌉ flip-flops. The assignment affects the complexity of the combinational
        logic — different assignments can yield simpler or more complex equations.
      </p>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead><tr><th>State</th><th>Q₁</th><th>Q₀</th></tr></thead>
          <tbody>
            <tr><td>A</td><td>0</td><td>0</td></tr>
            <tr><td>B</td><td>0</td><td>1</td></tr>
            <tr><td>C</td><td>1</td><td>0</td></tr>
            <tr><td>D</td><td>1</td><td>1</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Step 6 — Choose Flip-Flop Type</h2>
      <p>
        Select the flip-flop type based on your design goals:
      </p>
      <ul>
        <li><strong>D flip-flop</strong> — simplest input logic, directly sets next state</li>
        <li><strong>JK flip-flop</strong> — can minimize logic for state transitions that toggle</li>
        <li><strong>T flip-flop</strong> — optimal for counter circuits</li>
        <li><strong>SR flip-flop</strong> — useful when set/reset operations map naturally to the spec</li>
      </ul>

      <h2>Step 7 — Derive Flip-Flop Input Equations</h2>
      <p>
        Using the assigned state table and the flip-flop's <strong>excitation table</strong>
        (what inputs are needed to achieve each Q→Q⁺ transition), fill in the input values
        for each state transition. Then use K-maps to minimize the Boolean expressions for
        each flip-flop input.
      </p>

      <h2>Step 8 — Derive Output Equations</h2>
      <p>
        For a Moore machine: output = f(present state) — use the state table and K-maps.<br/>
        For a Mealy machine: output = f(present state, inputs) — use K-maps over state+input.
      </p>

      <h2>Step 9 — Draw the Circuit</h2>
      <p>
        Implement the flip-flop input equations and output equations as combinational logic
        (using gates, muxes, etc.) feeding into the selected flip-flops. The flip-flop
        outputs (Q) feed back to the combinational logic, forming the complete sequential circuit.
      </p>

      <h2>Design Example: Sequence Detector</h2>
      <p>
        Design a Moore machine that outputs Z=1 when the input sequence "101" is detected
        (overlapping detection allowed).
      </p>

      <div className="seq-diagram">
        <svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg" style={{fontFamily:"'JetBrains Mono', monospace"}}>
          <defs>
            <marker id="arre" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#00ff88"/>
            </marker>
          </defs>
          {/* States: S0, S1, S2, S3 */}
          <circle cx="80" cy="120" r="32" fill="#1e2842" stroke="#00d4ff" strokeWidth="2"/>
          <text x="80" y="116" fontSize="11" fill="#00d4ff" textAnchor="middle" fontWeight="700">S0</text>
          <text x="80" y="130" fontSize="9" fill="#8b9dc3" textAnchor="middle">Z=0</text>

          <circle cx="200" cy="60" r="32" fill="#1e2842" stroke="#00d4ff" strokeWidth="2"/>
          <text x="200" y="56" fontSize="11" fill="#00d4ff" textAnchor="middle" fontWeight="700">S1</text>
          <text x="200" y="70" fontSize="9" fill="#8b9dc3" textAnchor="middle">Z=0 (got 1)</text>

          <circle cx="340" cy="60" r="32" fill="#1e2842" stroke="#00d4ff" strokeWidth="2"/>
          <text x="340" y="56" fontSize="11" fill="#00d4ff" textAnchor="middle" fontWeight="700">S2</text>
          <text x="340" y="70" fontSize="9" fill="#8b9dc3" textAnchor="middle">Z=0 (got 10)</text>

          <circle cx="440" cy="120" r="32" fill="#1e2842" stroke="#00ff88" strokeWidth="2.5"/>
          <text x="440" y="116" fontSize="11" fill="#00ff88" textAnchor="middle" fontWeight="700">S3</text>
          <text x="440" y="130" fontSize="9" fill="#00ff88" textAnchor="middle">Z=1 (101!)</text>

          {/* Transitions */}
          <line x1="111" y1="105" x2="171" y2="72" stroke="#00ff88" strokeWidth="1.8" markerEnd="url(#arre)"/>
          <text x="128" y="84" fontSize="10" fill="#fbbf24">1</text>

          <line x1="232" y1="60" x2="308" y2="60" stroke="#00ff88" strokeWidth="1.8" markerEnd="url(#arre)"/>
          <text x="265" y="52" fontSize="10" fill="#fbbf24">0</text>

          <line x1="369" y1="82" x2="416" y2="105" stroke="#00ff88" strokeWidth="1.8" markerEnd="url(#arre)"/>
          <text x="400" y="88" fontSize="10" fill="#fbbf24">1</text>

          {/* Back to S0 on 0 */}
          <line x1="200" y1="92" x2="100" y2="115" stroke="#ff3366" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arre)"/>
          <text x="130" y="110" fontSize="9" fill="#ff3366">0→S0</text>

          {/* S3 overlap back to S1 on 1 */}
          <path d="M440,152 Q440,200 200,200 Q100,200 80,152" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arre)"/>
          <text x="255" y="215" fontSize="9" fill="#00d4ff">0→S0 | 1→S1</text>
        </svg>
        <p className="seq-diagram-caption">Figure 1 — Partial state diagram for "101" sequence detector</p>
      </div>

      <div className="seq-box info">
        <p className="seq-box-title">Design Checklist</p>
        <p>
          ✓ All states reachable from the initial state<br/>
          ✓ No undefined transitions (every input handled in every state)<br/>
          ✓ Initial/reset state clearly defined<br/>
          ✓ Output correct in all states<br/>
          ✓ Don't-care states handled appropriately
        </p>
      </div>

    </div>
  </SeqLayout>
);

export default SeqDesignProcedures;
