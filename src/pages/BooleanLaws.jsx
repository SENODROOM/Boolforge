import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import ExplanationBlock from '../components/ExplanationBlock';
import CircuitModal from '../components/CircuitModal';

const laws = [
    { name: 'Commutative', example: 'A + B = B + A; AB = BA' },
    { name: 'Associative', example: 'A + (B + C) = (A + B) + C' },
    { name: 'Distributive', example: 'A(B + C) = AB + AC' },
    { name: 'Identity', example: 'A + 0 = A; A1 = A' },
    { name: 'Complement', example: 'A + A\' = 1; AA\' = 0' },
    { name: 'Absorption', example: 'A + AB = A; A(A + B) = A' },
    { name: 'De Morgan', example: '(AB)\' = A\' + B\'; (A + B)\' = A\'B\'' }
];

const BooleanLaws = () => {
    const [open, setOpen] = useState(false);
    return (
        <ToolLayout title="Boolean Algebraic Laws" subtitle="Core properties with examples">
            <ExplanationBlock title="Law List">
                <ul>
                    {laws.map(l => (
                        <li key={l.name}><span className="highlight">{l.name}:</span> {l.example}</li>
                    ))}
                </ul>
            </ExplanationBlock>
            <div className="kmap-card">
                <button className="kmap-btn kmap-btn-primary kmap-btn-full" onClick={() => setOpen(true)}>
                    🔌 Visualize Circuit
                </button>
            </div>
            <CircuitModal open={open} onClose={() => setOpen(false)} expression={"F = AB + AC"} variables={['A', 'B', 'C']} />
        </ToolLayout>
    );
};

export default BooleanLaws;
