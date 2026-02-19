import React, { useState, useMemo } from 'react';
import ToolLayout from '../components/ToolLayout';
import ExplanationBlock from '../components/ExplanationBlock';
import ControlPanel from '../components/ControlPanel';
import ControlGroup from '../components/ControlGroup';
import CircuitModal from '../components/CircuitModal';
import { generateTruthTable } from '../utils/boolMath';

const MintermsMaxtermsRelation = () => {
  const variables = useMemo(() => ['A', 'B', 'C'], []);
  const [expr, setExpr] = useState("F = AB' + C");
  const [open, setOpen] = useState(false);
  const tt = useMemo(() => generateTruthTable(variables, expr), [variables, expr]);

  const mins = tt.rows.map((row, i) => row[row.length - 1] === 1 ? i : null).filter(x => x !== null);
  const maxs = tt.rows.map((row, i) => row[row.length - 1] === 0 ? i : null).filter(x => x !== null);

  return (
    <ToolLayout title="Relationship Between Minterms & Maxterms" subtitle="Mapping 1s and 0s across forms">
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

      <ExplanationBlock title="Indexes">
        <p className="explanation-intro">
          Minterms (1s): <span className="highlight">{mins.join(', ') || '—'}</span>
        </p>
        <p className="explanation-intro">
          Maxterms (0s): <span className="highlight">{maxs.join(', ') || '—'}</span>
        </p>
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
          🔌 Visualize SOP vs POS circuit
        </button>
      </div>

      <CircuitModal open={open} onClose={() => setOpen(false)} expression={expr} variables={variables} />
    </ToolLayout>
  );
};

export default MintermsMaxtermsRelation;
