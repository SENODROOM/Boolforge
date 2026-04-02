import React from "react";
import SeqLayout from "./SeqLayout";

const SeqStateReduction = () => (
  <SeqLayout
    title="State Reduction & Excitation Tables"
    subtitle="Minimize states to reduce hardware cost, and use excitation tables to derive flip-flop input equations."
  >
    <div className="seq-content">

      {/* ══════════════════ STATE REDUCTION ══════════════════ */}
      <h2>Part 1 — State Reduction</h2>

      <div className="seq-box">
        <p className="seq-box-title">Why Reduce States?</p>
        <p>
          Fewer states means fewer flip-flops and simpler combinational logic, which reduces
          area, power, and cost. State reduction finds and merges <strong>equivalent states</strong>
          — states that behave identically for all possible input sequences.
        </p>
      </div>

      <h2>Equivalent States</h2>
      <p>Two states <strong>S<sub>i</sub></strong> and <strong>S<sub>j</sub></strong> are equivalent if and only if:</p>
      <ol>
        <li>They produce the <strong>same output</strong> for every input combination, AND</li>
        <li>For every input, they transition to <strong>equivalent next states</strong>.</li>
      </ol>
      <p>
        This definition is recursive — equivalence must be verified transitively. If merging
        two states causes their successors to also become equivalent, those can be merged too.
      </p>

      <h2>State Reduction Algorithm (Row Matching / Implication Chart)</h2>
      <p>There are two common methods:</p>

      <h2>Method 1: Row Matching (Inspection)</h2>
      <p>
        Scan the state table for rows (states) that have identical output values and identical
        next-state entries (or next states that are themselves equivalent). Merge matching rows
        and repeat until no more merges are possible.
      </p>

      <h2>Worked Example — Row Matching</h2>
      <p>Consider this state table with one input x:</p>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead>
            <tr><th>Present State</th><th>Next(x=0)</th><th>Next(x=1)</th><th>Output</th></tr>
          </thead>
          <tbody>
            <tr><td>A</td><td>B</td><td>C</td><td>0</td></tr>
            <tr><td>B</td><td>A</td><td>D</td><td>0</td></tr>
            <tr><td>C</td><td>B</td><td>C</td><td>1</td></tr>
            <tr><td>D</td><td>A</td><td>D</td><td>0</td></tr>
            <tr><td>E</td><td>B</td><td>E</td><td>1</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Step 1:</strong> Compare outputs. States with different outputs cannot be equivalent.
        Group: {"{"}A, B, D{"}"} → output=0; {"{"}C, E{"}"} → output=1.
      </p>
      <p>
        <strong>Step 2:</strong> Check next-state transitions within each group.
      </p>
      <ul>
        <li>B (x=0→A, x=1→D) and D (x=0→A, x=1→D) → <strong>B ≡ D</strong> ✓</li>
        <li>C (x=0→B, x=1→C) and E (x=0→B, x=1→E) → C and E go to C and E respectively on x=1; since C≡E only if this holds... check recursively → <strong>C ≡ E</strong> ✓</li>
      </ul>
      <p>
        <strong>Step 3:</strong> Merge. Replace D with B, replace E with C everywhere.
      </p>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead>
            <tr><th>Present State</th><th>Next(x=0)</th><th>Next(x=1)</th><th>Output</th></tr>
          </thead>
          <tbody>
            <tr><td>A</td><td>B</td><td>C</td><td>0</td></tr>
            <tr><td>B</td><td>A</td><td>B</td><td>0</td></tr>
            <tr><td>C</td><td>B</td><td>C</td><td>1</td></tr>
          </tbody>
        </table>
      </div>
      <p>Reduced from 5 states to 3 states — saving one flip-flop!</p>

      <h2>Method 2: Implication Chart</h2>
      <p>
        An <strong>implication chart</strong> (or pair chart) is a triangular table listing all
        pairs of states. The procedure is:
      </p>
      <ol>
        <li>Fill each cell (S<sub>i</sub>, S<sub>j</sub>) with "X" if outputs differ (cannot be equivalent)</li>
        <li>Otherwise, fill the cell with the <strong>implied pairs</strong> — the pairs of next states
        that must also be equivalent for S<sub>i</sub> ≡ S<sub>j</sub> to hold</li>
        <li>Mark any cell whose implied pairs are already marked "X" with "X" as well</li>
        <li>Repeat step 3 until no new X's are added</li>
        <li>Any unmarked cell represents an equivalent pair that can be merged</li>
      </ol>

      <div className="seq-box info">
        <p className="seq-box-title">When to Use Which Method</p>
        <p>
          <strong>Row matching</strong> is quick for small tables and when equivalences are obvious.
          <strong>Implication charts</strong> are more systematic and guaranteed to find all
          equivalences, especially for larger state tables.
        </p>
      </div>

      {/* ══════════════════ EXCITATION TABLES ══════════════════ */}
      <h2>Part 2 — Excitation Tables</h2>

      <div className="seq-box">
        <p className="seq-box-title">What is an Excitation Table?</p>
        <p>
          An <strong>excitation table</strong> (also called a flip-flop input table) answers the
          question: "What input must I apply to this flip-flop to achieve a specific
          Q(t) → Q(t+1) transition?" It is the <em>inverse</em> of the characteristic table.
        </p>
      </div>

      <h2>SR Flip-Flop Excitation Table</h2>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead><tr><th>Q(t)</th><th>Q(t+1)</th><th>S</th><th>R</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0</td><td>0</td><td>X</td></tr>
            <tr><td>0</td><td>1</td><td>1</td><td>0</td></tr>
            <tr><td>1</td><td>0</td><td>0</td><td>1</td></tr>
            <tr><td>1</td><td>1</td><td>X</td><td>0</td></tr>
          </tbody>
        </table>
      </div>

      <h2>JK Flip-Flop Excitation Table</h2>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead><tr><th>Q(t)</th><th>Q(t+1)</th><th>J</th><th>K</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0</td><td>0</td><td>X</td></tr>
            <tr><td>0</td><td>1</td><td>1</td><td>X</td></tr>
            <tr><td>1</td><td>0</td><td>X</td><td>1</td></tr>
            <tr><td>1</td><td>1</td><td>X</td><td>0</td></tr>
          </tbody>
        </table>
      </div>

      <h2>D Flip-Flop Excitation Table</h2>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead><tr><th>Q(t)</th><th>Q(t+1)</th><th>D</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0</td><td>0</td></tr>
            <tr><td>0</td><td>1</td><td>1</td></tr>
            <tr><td>1</td><td>0</td><td>0</td></tr>
            <tr><td>1</td><td>1</td><td>1</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        For D flip-flops, D simply equals the desired next state. This makes D flip-flops the
        easiest to work with during design.
      </p>

      <h2>T Flip-Flop Excitation Table</h2>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead><tr><th>Q(t)</th><th>Q(t+1)</th><th>T</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0</td><td>0</td></tr>
            <tr><td>0</td><td>1</td><td>1</td></tr>
            <tr><td>1</td><td>0</td><td>1</td></tr>
            <tr><td>1</td><td>1</td><td>0</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        For T flip-flops, T = Q(t) ⊕ Q(t+1) — toggle when they differ, hold when they are the same.
      </p>

      <h2>Using Excitation Tables in Design</h2>
      <p>
        After you have a reduced and assigned state table, the excitation table tells you
        what inputs to drive each flip-flop:
      </p>
      <ol>
        <li>For each row in the state table, identify Q(t) and Q(t+1) for every flip-flop</li>
        <li>Look up the required flip-flop input(s) using the excitation table</li>
        <li>Build a new table with columns for the flip-flop inputs (J, K or D or T) and output</li>
        <li>Use K-maps to minimize each flip-flop input equation</li>
        <li>Implement the minimized equations as gates</li>
      </ol>

      <h2>Worked Example — JK Flip-Flop Design</h2>
      <p>
        State table with 2 bits (Q₁Q₀), one input x. After state assignment:
      </p>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead>
            <tr>
              <th>Q₁Q₀ (present)</th>
              <th>x</th>
              <th>Q₁⁺Q₀⁺ (next)</th>
              <th>J₁</th><th>K₁</th>
              <th>J₀</th><th>K₀</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>00</td><td>0</td><td>00</td><td>0</td><td>X</td><td>0</td><td>X</td></tr>
            <tr><td>00</td><td>1</td><td>01</td><td>0</td><td>X</td><td>1</td><td>X</td></tr>
            <tr><td>01</td><td>0</td><td>01</td><td>0</td><td>X</td><td>X</td><td>0</td></tr>
            <tr><td>01</td><td>1</td><td>10</td><td>1</td><td>X</td><td>X</td><td>1</td></tr>
            <tr><td>10</td><td>0</td><td>10</td><td>X</td><td>0</td><td>0</td><td>X</td></tr>
            <tr><td>10</td><td>1</td><td>11</td><td>X</td><td>0</td><td>1</td><td>X</td></tr>
            <tr><td>11</td><td>0</td><td>00</td><td>X</td><td>1</td><td>X</td><td>1</td></tr>
            <tr><td>11</td><td>1</td><td>11</td><td>X</td><td>0</td><td>X</td><td>0</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        From this table, use K-maps to find simplified Boolean expressions for
        J₁, K₁, J₀, K₀ as functions of Q₁, Q₀, and x. The don't-cares (X) increase
        simplification opportunities.
      </p>

      <div className="seq-box warning">
        <p className="seq-box-title">Key Insight on JK Excitation</p>
        <p>
          JK flip-flops have the most don't-cares in their excitation table (two out of four
          entries have X for both inputs), which leads to the most K-map simplification.
          This is why JK flip-flops can sometimes yield simpler input logic than D flip-flops
          — though the tradeoff is more complex logic connections.
        </p>
      </div>

      <h2>Summary — All Excitation Tables</h2>
      <div className="seq-table-wrap">
        <table className="seq-table">
          <thead>
            <tr>
              <th>Q(t)→Q(t+1)</th>
              <th>SR: S,R</th>
              <th>JK: J,K</th>
              <th>D</th>
              <th>T</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>0 → 0</td><td>0, X</td><td>0, X</td><td>0</td><td>0</td></tr>
            <tr><td>0 → 1</td><td>1, 0</td><td>1, X</td><td>1</td><td>1</td></tr>
            <tr><td>1 → 0</td><td>0, 1</td><td>X, 1</td><td>0</td><td>1</td></tr>
            <tr><td>1 → 1</td><td>X, 0</td><td>X, 0</td><td>1</td><td>0</td></tr>
          </tbody>
        </table>
      </div>

      <div className="seq-box info">
        <p className="seq-box-title">You've Reached the End of Sequential Circuits</p>
        <p>
          You have now covered the complete theory of sequential circuits — from basic latches
          and flip-flops, through analysis and design, to state minimization and excitation
          tables. These concepts form the backbone of every digital system that has memory:
          processors, controllers, communication interfaces, and more.
        </p>
      </div>

    </div>
  </SeqLayout>
);

export default SeqStateReduction;
