import React, { useState, useMemo } from 'react';
import ToolLayout from '../components/ToolLayout';
import ExplanationBlock from '../components/ExplanationBlock';
import ControlPanel from '../components/ControlPanel';
import ControlGroup from '../components/ControlGroup';
import CircuitModal from '../components/CircuitModal';
import { generateTruthTable } from '../utils/boolMath';

const listMaxterms = (variables, expression) => {
  const tt = generateTruthTable(variables, expression);
  const res = [];
  tt.rows.forEach((row, i) => {
    if (row[row.length - 1] === 0) res.push(i);
  });
  return res;
};

const MaxtermsPage = () => {
  const variables = useMemo(() => ['A', 'B', 'C'], []);
  const [expr, setExpr] = useState("F = AB' + C");
  const [open, setOpen] = useState(false);
  const tt = useMemo(() => generateTruthTable(variables, expr), [variables, expr]);
  const maxs = useMemo(() => listMaxterms(variables, expr), [variables, expr]);

  return (
    <ToolLayout title="Maxterms" subtitle="Where the function outputs 0">
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

      <ExplanationBlock title="Maxterm Indexes">
        <p className="explanation-intro">{maxs.join(', ') || '—'}</p>
      </ExplanationBlock>

      <div className="binary-table-container">
        <table className="binary-table">
          <thead className="binary-table-header">
            <tr>{tt.headers.map(h => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {tt.rows.map((row, i) => (
              <tr key={i} className="binary-table-row">
                {row.map((c, j) => <td key={j} className={`binary-table-cell ${j === tt.headers.length - 1 && c === 0 ? 'binary-table-cell-secondary' : ''}`}>{c}</td>)}
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

export default MaxtermsPage;
