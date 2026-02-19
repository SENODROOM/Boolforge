import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import ExplanationBlock from '../components/ExplanationBlock';
import ControlPanel from '../components/ControlPanel';
import ControlGroup from '../components/ControlGroup';
import CircuitModal from '../components/CircuitModal';

const applyDuality = (s) => {
    if (!s) return '';
    const expr = s.replace(/^F\s*=\s*/, '').trim();
    return expr.replace(/\+/g, '•').replace(/\b1\b/g, '0').replace(/•/g, '+').replace(/\b0\b/g, '1');
};

const DualityPrinciple = () => {
    const [expr, setExpr] = useState("F = A + B0");
    const [dual, setDual] = useState(applyDuality("F = A + B0"));
    const [open, setOpen] = useState(false);

    return (
        <ToolLayout title="Duality Principle" subtitle="Swap operators and identity values">
            <ControlPanel>
                <ControlGroup label="Expression">
                    <input
                        type="text"
                        className="control-input"
                        value={expr}
                        onChange={(e) => {
                            const v = e.target.value;
                            setExpr(v);
                            setDual(applyDuality(v));
                        }}
                    />
                </ControlGroup>
            </ControlPanel>

            <ExplanationBlock title="Dual Expression">
                <p className="explanation-intro">
                    Dual: <span className="highlight">{dual}</span>
                </p>
            </ExplanationBlock>

            <div className="kmap-card">
                <button className="kmap-btn kmap-btn-primary kmap-btn-full" onClick={() => setOpen(true)}>
                    🔌 Experiment with Circuit
                </button>
            </div>

            <CircuitModal open={open} onClose={() => setOpen(false)} expression={expr} variables={['A', 'B']} />
        </ToolLayout>
    );
};

export default DualityPrinciple;
