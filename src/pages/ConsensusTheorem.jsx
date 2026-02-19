import React, { useState, useMemo } from 'react';
import ToolLayout from '../components/ToolLayout';
import ExplanationBlock from '../components/ExplanationBlock';
import ControlPanel from '../components/ControlPanel';
import ControlGroup from '../components/ControlGroup';
import CircuitModal from '../components/CircuitModal';
import { generateTruthTable } from '../utils/boolMath';

const appliesConsensus = (expr) => {
    const e = expr.replace(/^F\s*=\s*/, '').trim();
    return /[A-Z][^+]*[A-Z]'\s*\+\s*[A-Z]'\s*[A-Z][^+]*\s*\+\s*[A-Z][^+]*[A-Z]/i.test(e);
};

const ConsensusTheorem = () => {
    const [expr, setExpr] = useState("F = XY + X'Z + YZ");
    const vars = useMemo(() => ['X', 'Y', 'Z'], []);
    const [open, setOpen] = useState(false);
    const tt = useMemo(() => generateTruthTable(vars, expr), [vars, expr]);

    return (
        <ToolLayout title="Consensus Theorem" subtitle="XY + X'Z + YZ = XY + X'Z">
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

            <ExplanationBlock title="Applicability Check">
                <p className="explanation-intro">
                    Applies: <span className="highlight">{appliesConsensus(expr) ? 'Yes' : 'No'}</span>
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
                    🔌 Show simplified vs unsimplified circuit
                </button>
            </div>

            <CircuitModal open={open} onClose={() => setOpen(false)} expression={expr} variables={vars} />
        </ToolLayout>
    );
};

export default ConsensusTheorem;
