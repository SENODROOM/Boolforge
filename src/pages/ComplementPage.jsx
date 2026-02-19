import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import ExplanationBlock from '../components/ExplanationBlock';
import ControlPanel from '../components/ControlPanel';
import ControlGroup from '../components/ControlGroup';
import CircuitModal from '../components/CircuitModal';
import { parseSOP } from '../utils/boolMath';

const toPOSComplement = (s) => {
    const expr = s.replace(/^F\s*=\s*/, '').trim();
    const terms = parseSOP(expr);
    const parts = terms.map(term => {
        const sum = term.map(l => (l.n ? l.v : `${l.v}'`)).join(' + ');
        return `(${sum})`;
    });
    return parts.length ? parts.join(' • ') : '1';
};

const ComplementPage = () => {
    const [expr, setExpr] = useState("F = AB + C");
    const [openOrig, setOpenOrig] = useState(false);
    const [openComp, setOpenComp] = useState(false);

    const variables = Array.from(
        new Set(parseSOP(expr.replace(/^F\s*=\s*/, '').trim()).flatMap(t => t.map(l => l.v)))
    );
    const posComplement = toPOSComplement(expr);

    return (
        <ToolLayout title="Complement, Duality & De Morgan" subtitle="Explanation-first walkthrough and circuit experiment">
            <ControlPanel>
                <ControlGroup label="Expression (SOP)">
                    <input
                        type="text"
                        className="control-input"
                        value={expr}
                        onChange={(e) => {
                            const v = e.target.value;
                            setExpr(v);
                        }}
                        placeholder="F = AB + C"
                    />
                </ControlGroup>
            </ControlPanel>

            <ExplanationBlock title="De Morgan’s Law">
                <p className="explanation-intro">
                    For sums and products:
                </p>
                <ul>
                    <li>(X + Y)' = X' • Y'</li>
                    <li>(XY)' = X' + Y'</li>
                </ul>
                <p>
                    Complement of a sum of products becomes a product of sums with each literal complemented.
                </p>
            </ExplanationBlock>

            <ExplanationBlock title="Complement Conversion (SOP → POS)">
                <p className="explanation-intro">
                    Starting expression: <span className="highlight">{expr.replace(/^F\s*=\s*/, '').trim() || '—'}</span>
                </p>
                <p>
                    Complement: <span className="highlight">{posComplement}</span>
                </p>
            </ExplanationBlock>

            <div className="kmap-card" style={{ display: 'grid', gap: 12 }}>
                <button className="kmap-btn kmap-btn-primary" onClick={() => setOpenOrig(true)}>
                    🔌 Experiment: Original Circuit
                </button>
                <button className="kmap-btn kmap-btn-secondary" onClick={() => setOpenComp(true)}>
                    🔌 Experiment: Complement Circuit
                </button>
            </div>

            <CircuitModal open={openOrig} onClose={() => setOpenOrig(false)} expression={expr} variables={variables.length ? variables : ['A', 'B', 'C']} />
            <CircuitModal open={openComp} onClose={() => setOpenComp(false)} expression={`F = ${posComplement}`} variables={variables.length ? variables : ['A', 'B', 'C']} />
        </ToolLayout>
    );
};

export default ComplementPage;
