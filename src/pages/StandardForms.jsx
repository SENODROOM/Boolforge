import React, { useState, useMemo } from 'react';
import ToolLayout from '../components/ToolLayout';
import ExplanationBlock from '../components/ExplanationBlock';
import ControlPanel from '../components/ControlPanel';
import ControlGroup from '../components/ControlGroup';
import CircuitModal from '../components/CircuitModal';
import { parseSOP, generateTruthTable } from '../utils/boolMath';

const toPOS = (variables, expression) => {
  const tt = generateTruthTable(variables, expression);
  const rows = tt.rows;
  const maxterms = [];
  rows.forEach((row, idx) => {
    if (row[row.length - 1] === 0) {
      const parts = variables.map((v, j) => row[j] === 1 ? `${v}'` : v);
      maxterms.push(`(${parts.join('+')})`);
    }
  });
  return maxterms.length ? maxterms.join('.') : '1';
};

const StandardForms = () => {
  const variables = useMemo(() => ['A', 'B', 'C'], []);
  const [expr, setExpr] = useState("F = AB' + C");
  const [open, setOpen] = useState(false);
  const tt = useMemo(() => generateTruthTable(variables, expr), [variables, expr]);
  const sopTerms = useMemo(() => parseSOP(expr), [expr]);
  const pos = useMemo(() => toPOS(variables, expr), [variables, expr]);

  return (
    <ToolLayout title="Standard Forms (SOP & POS)" subtitle="Convert expressions and verify with truth tables">
      <ControlPanel>
        <ControlGroup label="Expression (SOP)">
          <input
            type="text"
            className="control-input"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
          />
        </ControlGroup>
      </ControlPanel>

      <ExplanationBlock title="SOP">
        <p className="explanation-intro">Terms: {sopTerms.map(t => t.map(l => l.v + (l.n ? "'" : '')).join('')).join(' + ') || '—'}</p>
      </ExplanationBlock>

      <ExplanationBlock title="POS">
        <p className="explanation-intro">POS: <span className="highlight">{pos}</span></p>
      </ExplanationBlock>

      <div className="binary-table-container">
        <table className="binary-table">
          <thead className="binary-table-header">
            <tr>{tt.headers.map(h => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {tt.rows.map((row, i) => (
              <tr key={i} className="binary-table-row">
                {row.map((c, j) => <td key={j} className="binary-table-cell">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="kmap-card">
        <button className="kmap-btn kmap-btn-primary kmap-btn-full" onClick={() => setOpen(true)}>
          🔌 Visualize Circuit
        </button>
      </div>

      <CircuitModal open={open} onClose={() => setOpen(false)} expression={expr} variables={variables} />
    </ToolLayout>
  );
};

export default StandardForms;
