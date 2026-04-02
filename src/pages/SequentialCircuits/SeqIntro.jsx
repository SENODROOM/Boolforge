import React from "react";
import SeqLayout from "./SeqLayout";

const SeqIntro = () => (
  <SeqLayout
    title="Introduction to Sequential Circuits"
    subtitle="Understanding circuits with memory — where outputs depend on both current inputs and past history."
  >
    <div className="seq-content">

      <div className="seq-box">
        <p className="seq-box-title">Definition</p>
        <p>
          A <strong>sequential circuit</strong> is a digital circuit whose output depends not only on the
          current inputs but also on the <strong>history of past inputs</strong>. It contains memory
          elements that store state information between clock cycles.
        </p>
      </div>

      <h2>Combinational vs Sequential Circuits</h2>
      <p>
        In a <strong>combinational circuit</strong>, the output at any instant is determined purely by the
        current inputs — there is no memory. In contrast, a <strong>sequential circuit</strong> has
        feedback paths and storage elements, allowing it to "remember" previous inputs.
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
            <tr><td>Output depends on</td><td>Current inputs only</td><td>Current inputs + stored state</td></tr>
            <tr><td>Memory elements</td><td>None</td><td>Flip-flops / Latches</td></tr>
            <tr><td>Feedback</td><td>No</td><td>Yes</td></tr>
            <tr><td>Clock required</td><td>No (usually)</td><td>Yes (synchronous type)</td></tr>
            <tr><td>Examples</td><td>Adder, Mux, Decoder</td><td>Counter, Register, FSM</td></tr>
          </tbody>
        </table>
      </div>

      <h2>General Model of a Sequential Circuit</h2>
      <p>
        Every sequential circuit can be modelled with three key parts:
      </p>
      <ul>
        <li><strong>Combinational logic block</strong> — computes the next state and outputs</li>
        <li><strong>Memory elements (flip-flops)</strong> — hold the current state</li>
        <li><strong>Feedback path</strong> — current state feeds back into the combinational block</li>
      </ul>

      <div className="seq-diagram">
        <svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg" style={{fontFamily:"'JetBrains Mono', monospace"}}>
          {/* Input arrow */}
          <line x1="20" y1="130" x2="90" y2="130" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arr)"/>
          <text x="10" y="120" fontSize="11" fill="#8b9dc3">Inputs</text>
          {/* Combinational box */}
          <rect x="90" y="80" width="160" height="100" rx="6" fill="#1e2842" stroke="#00d4ff" strokeWidth="2"/>
          <text x="170" y="126" fontSize="12" fill="#00d4ff" textAnchor="middle">Combinational</text>
          <text x="170" y="142" fontSize="12" fill="#00d4ff" textAnchor="middle">Logic</text>
          {/* Output arrow */}
          <line x1="250" y1="110" x2="360" y2="110" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arr)"/>
          <text x="362" y="114" fontSize="11" fill="#8b9dc3">Outputs</text>
          {/* State to FF */}
          <line x1="250" y1="150" x2="310" y2="150" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arr)"/>
          <text x="260" y="144" fontSize="10" fill="#fbbf24">Next State</text>
          {/* Flip-flop box */}
          <rect x="310" y="100" width="140" height="100" rx="6" fill="#1e2842" stroke="#fbbf24" strokeWidth="2"/>
          <text x="380" y="146" fontSize="12" fill="#fbbf24" textAnchor="middle">Memory</text>
          <text x="380" y="162" fontSize="12" fill="#fbbf24" textAnchor="middle">(Flip-Flops)</text>
          {/* Feedback */}
          <line x1="380" y1="200" x2="380" y2="240" stroke="#00ff88" strokeWidth="2"/>
          <line x1="380" y1="240" x2="60" y2="240" stroke="#00ff88" strokeWidth="2"/>
          <line x1="60" y1="240" x2="60" y2="150" stroke="#00ff88" strokeWidth="2"/>
          <line x1="60" y1="150" x2="90" y2="150" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arr)"/>
          <text x="180" y="255" fontSize="10" fill="#8b9dc3" textAnchor="middle">Current State (feedback)</text>
          {/* Arrow marker */}
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#00ff88"/>
            </marker>
          </defs>
        </svg>
        <p className="seq-diagram-caption">Figure 1 — Block diagram of a general sequential circuit</p>
      </div>

      <h2>Types of Sequential Circuits</h2>
      <p>Sequential circuits are classified based on how their state changes with respect to time:</p>
      <ul>
        <li>
          <strong>Synchronous Sequential Circuits</strong> — State changes occur only at specific times
          determined by a clock signal. All memory elements are triggered simultaneously by the
          clock edge (rising or falling). They are predictable and easier to design.
        </li>
        <li>
          <strong>Asynchronous Sequential Circuits</strong> — State changes can occur at any time
          in response to input changes, without a clock. They are faster but harder to design and
          analyze due to potential timing hazards.
        </li>
      </ul>

      <h2>The Role of the Clock Signal</h2>
      <p>
        In synchronous circuits, a <strong>clock signal</strong> is a periodic square wave that
        coordinates all state changes. Flip-flops respond either on the <strong>rising edge</strong>
        (positive-edge triggered) or <strong>falling edge</strong> (negative-edge triggered) of the clock.
      </p>

      <div className="seq-box info">
        <p className="seq-box-title">Key Terminology</p>
        <p>
          <strong>State</strong> — The stored binary value(s) in the memory elements at any instant.<br/>
          <strong>Next State</strong> — The value the state will take after the next clock edge.<br/>
          <strong>Present State</strong> — The current stored value in memory elements.<br/>
          <strong>State Register</strong> — The collection of all flip-flops holding the circuit state.
        </p>
      </div>

      <h2>Applications of Sequential Circuits</h2>
      <ul>
        <li>Registers and shift registers</li>
        <li>Counters (ripple, synchronous, modulo-N)</li>
        <li>Finite State Machines (FSMs) — Moore and Mealy</li>
        <li>Memory units (RAM, ROM controllers)</li>
        <li>Serial data communication (UART, SPI, I²C)</li>
        <li>CPU pipelines and control units</li>
      </ul>

      <div className="seq-box warning">
        <p className="seq-box-title">What's Coming Next</p>
        <p>
          In the following sections you will study <strong>Latches</strong> (the simplest memory
          elements), then <strong>Flip-Flops</strong> (clocked versions), followed by analysis and
          design procedures for complete sequential systems.
        </p>
      </div>

    </div>
  </SeqLayout>
);

export default SeqIntro;
