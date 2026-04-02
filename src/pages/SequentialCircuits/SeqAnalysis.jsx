import React from "react";
import SeqLayout from "./SeqLayout";

const SeqAnalysis = () => (
  <SeqLayout
    title="Analysis of Sequential Circuits"
    subtitle="Given a sequential circuit diagram, determine its state table, state diagram, and timing behavior."
  >
    <div className="seq-content">

      <div className="seq-box">
        <p className="seq-box-title">Goal of Analysis</p>
        <p>
          <strong>Analysis</strong> of a sequential circuit means: given a circuit schematic,
          determine what the circuit <em>does</em> — specifically, how its state evolves over
          time for all possible input sequences. The result is expressed as a
          <strong>state table</strong> or <strong>state diagram</strong>.
        </p>
      </div>

      <h2>Step-by-Step Analysis Procedure</h2>
      <p>
        Follow these steps to analyze any synchronous sequential circuit:
      </p>
      <ol>
        <li>
          <strong>Identify state variables</strong> — Label the output of each flip-flop
          (Q₁, Q₂, …). The number of flip-flops determines the number of states: 2<sup>n</sup>
          possible states for n flip-flops.
        </li>
        <li>
          <strong>Write flip-flop input equations</strong> — Express the input of each flip-flop
          (D, J/K, S/R, or T) as a Boolean function of the current state and external inputs.
        </li>
        <li>
          <strong>Write output equations</strong> — Express each circuit output as a Boolean
          function of the current state (and inputs if it's a Mealy machine).
        </li>
        <li>
          <strong>Determine next state</strong> — Using the flip-flop's characteristic equation,
          compute Q(t+1) for every combination of present state and input.
        </li>
        <li>
          <strong>Construct the state table</strong> — Tabulate present state, input, next state,
          and output for every combination.
        </li>
        <li>
          <strong>Draw the state diagram</strong> — Convert the table into a directed graph.
        </li>
      </ol>

      <h2>Worked Example: 2-Bit Counter with D Flip-Flops</h2>
      <p>
        Consider a circuit with two D flip-flops (Q₁ = MSB, Q₀ = LSB) and no external inputs.
        The flip-flop inputs are:
      </p>
      <div className="seq-box info">
        <p className="seq-box-title">Flip-Flop Input Equations</p>
        <p>
          D₁ = Q₁ ⊕ Q₀ &nbsp;&nbsp; (XOR)<br/>
          D₀ = Q̄₀ &nbsp;&nbsp; (complement of Q₀)
        </p>
      </div>

      <h2>Step 1 — Compute Next States</h2>
      <p>
        Using D FF characteristic equation Q(t+1) = D:
      </p>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead>
            <tr>
              <th>Present State Q₁Q₀</th>
              <th>D₁ = Q₁⊕Q₀</th>
              <th>D₀ = Q̄₀</th>
              <th>Next State Q₁⁺Q₀⁺</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>00</td><td>0⊕0 = 0</td><td>1</td><td>01</td></tr>
            <tr><td>01</td><td>0⊕1 = 1</td><td>0</td><td>10</td></tr>
            <tr><td>10</td><td>1⊕0 = 1</td><td>1</td><td>11</td></tr>
            <tr><td>11</td><td>1⊕1 = 0</td><td>0</td><td>00</td></tr>
          </tbody>
        </table>
      </div>

      <p>
        The sequence is: <strong>00 → 01 → 10 → 11 → 00 → …</strong> — this is a
        2-bit binary up-counter!
      </p>

      <div className="seq-diagram">
        <svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" style={{fontFamily:"'JetBrains Mono', monospace"}}>
          <defs>
            <marker id="arrd" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#00ff88"/>
            </marker>
          </defs>
          {/* States */}
          <circle cx="100" cy="100" r="35" fill="#1e2842" stroke="#00d4ff" strokeWidth="2"/>
          <text x="100" y="96" fontSize="13" fill="#00d4ff" textAnchor="middle" fontWeight="700">00</text>
          <text x="100" y="112" fontSize="9" fill="#8b9dc3" textAnchor="middle">S₀</text>

          <circle cx="250" cy="40" r="35" fill="#1e2842" stroke="#00d4ff" strokeWidth="2"/>
          <text x="250" y="36" fontSize="13" fill="#00d4ff" textAnchor="middle" fontWeight="700">01</text>
          <text x="250" y="52" fontSize="9" fill="#8b9dc3" textAnchor="middle">S₁</text>

          <circle cx="370" cy="100" r="35" fill="#1e2842" stroke="#00d4ff" strokeWidth="2"/>
          <text x="370" y="96" fontSize="13" fill="#00d4ff" textAnchor="middle" fontWeight="700">10</text>
          <text x="370" y="112" fontSize="9" fill="#8b9dc3" textAnchor="middle">S₂</text>

          <circle cx="250" cy="165" r="35" fill="#1e2842" stroke="#00d4ff" strokeWidth="2"/>
          <text x="250" y="161" fontSize="13" fill="#00d4ff" textAnchor="middle" fontWeight="700">11</text>
          <text x="250" y="177" fontSize="9" fill="#8b9dc3" textAnchor="middle">S₃</text>

          {/* Arrows */}
          <line x1="132" y1="82" x2="218" y2="52" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrd)"/>
          <line x1="283" y1="52" x2="338" y2="78" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrd)"/>
          <line x1="355" y1="132" x2="283" y2="155" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrd)"/>
          <line x1="218" y1="155" x2="132" y2="118" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrd)"/>
        </svg>
        <p className="seq-diagram-caption">Figure 1 — State diagram of a 2-bit binary up-counter</p>
      </div>

      <h2>Moore vs Mealy Machines</h2>
      <p>
        Sequential circuits can be classified into two types based on how outputs are generated:
      </p>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead>
            <tr><th>Property</th><th>Moore Machine</th><th>Mealy Machine</th></tr>
          </thead>
          <tbody>
            <tr><td>Output depends on</td><td>Present state only</td><td>Present state AND inputs</td></tr>
            <tr><td>Output changes</td><td>Only with clock edge</td><td>Can change asynchronously with inputs</td></tr>
            <tr><td>States needed</td><td>More states (typically)</td><td>Fewer states (typically)</td></tr>
            <tr><td>Glitch risk</td><td>Lower</td><td>Higher (input-sensitive)</td></tr>
            <tr><td>State diagram</td><td>Output labeled on states</td><td>Output labeled on transitions</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Timing Diagram Analysis</h2>
      <p>
        A <strong>timing diagram</strong> shows the clock, input signals, state signals, and outputs
        all plotted against time. To trace through a sequential circuit on a timing diagram:
      </p>
      <ol>
        <li>Note the current state before each clock edge</li>
        <li>Look up the input values <em>just before</em> the clock edge</li>
        <li>Use the state table to find the next state and output</li>
        <li>Plot the new state/output values <em>after</em> the clock edge (plus propagation delay)</li>
      </ol>

      <div className="seq-diagram">
        <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style={{fontFamily:"'JetBrains Mono', monospace"}}>
          {/* Clock */}
          <text x="10" y="35" fontSize="11" fill="#8b9dc3">CLK</text>
          <polyline points="50,50 50,20 130,20 130,50 210,50 210,20 290,20 290,50 370,50 370,20 450,20 450,50"
            fill="none" stroke="#00d4ff" strokeWidth="2"/>
          {/* Q0 */}
          <text x="10" y="95" fontSize="11" fill="#8b9dc3">Q₀</text>
          <polyline points="50,100 130,100 130,80 210,80 210,100 290,100 290,80 370,80 370,100 450,100"
            fill="none" stroke="#00ff88" strokeWidth="2"/>
          {/* Q1 */}
          <text x="10" y="155" fontSize="11" fill="#8b9dc3">Q₁</text>
          <polyline points="50,170 210,170 210,150 290,150 290,170 370,170 370,150 450,150 450,170"
            fill="none" stroke="#fbbf24" strokeWidth="2"/>
          {/* Edge markers */}
          <line x1="130" y1="15" x2="130" y2="175" stroke="#ff3366" strokeWidth="1" strokeDasharray="3"/>
          <line x1="210" y1="15" x2="210" y2="175" stroke="#ff3366" strokeWidth="1" strokeDasharray="3"/>
          <line x1="290" y1="15" x2="290" y2="175" stroke="#ff3366" strokeWidth="1" strokeDasharray="3"/>
          <line x1="370" y1="15" x2="370" y2="175" stroke="#ff3366" strokeWidth="1" strokeDasharray="3"/>
          {/* Labels */}
          <text x="60" y="195" fontSize="9" fill="#8b9dc3">t=0 (00)</text>
          <text x="150" y="195" fontSize="9" fill="#8b9dc3">t=1 (01)</text>
          <text x="230" y="195" fontSize="9" fill="#8b9dc3">t=2 (10)</text>
          <text x="310" y="195" fontSize="9" fill="#8b9dc3">t=3 (11)</text>
          <text x="390" y="195" fontSize="9" fill="#8b9dc3">t=4 (00)</text>
        </svg>
        <p className="seq-diagram-caption">Figure 2 — Timing diagram of the 2-bit up-counter</p>
      </div>

      <h2>Analysis of JK Flip-Flop Circuits</h2>
      <p>
        The same analysis procedure applies to circuits using JK, T, or SR flip-flops. The only
        difference is the characteristic equation used to find the next state:
      </p>
      <ul>
        <li>JK: Q(t+1) = J·Q̄ + K̄·Q</li>
        <li>T: Q(t+1) = T⊕Q</li>
        <li>SR: Q(t+1) = S + R̄·Q (with SR=0)</li>
        <li>D: Q(t+1) = D</li>
      </ul>

      <div className="seq-box warning">
        <p className="seq-box-title">Common Mistakes to Avoid</p>
        <p>
          • Always use the state <em>before</em> the clock edge as "present state".<br/>
          • For Mealy machines, use input values <em>just before</em> the edge for output computation.<br/>
          • Don't confuse flip-flop <em>inputs</em> (J, K, D, T, S, R) with the <em>state outputs</em> (Q).
        </p>
      </div>

    </div>
  </SeqLayout>
);

export default SeqAnalysis;
