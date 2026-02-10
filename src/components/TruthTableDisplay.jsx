import React from 'react';

export const TruthTableDisplay = ({ numVariables, variables, minterms }) => {
    const mintermSet = new Set(
        minterms
            .split(',')
            .map(m => m.trim())
            .filter(m => m !== '')
            .map(m => parseInt(m))
    );

    return (
        <div className="kmap-card">
            <h2 className="kmap-section-title">Truth Table</h2>
            <table className="kmap-truth-table">
                <thead>
                    <tr>
                        <th>Minterm</th>
                        {variables.map((v, idx) => (
                            <th key={idx}>{v}</th>
                        ))}
                        <th>F</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: Math.pow(2, numVariables) }, (_, i) => {
                        const binary = i.toString(2).padStart(numVariables, '0');
                        const output = mintermSet.has(i) ? 1 : 0;

                        return (
                            <tr key={i}>
                                <td className="minterm-cell">m{i}</td>
                                {binary.split('').map((bit, idx) => (
                                    <td key={idx}>{bit}</td>
                                ))}
                                <td className={output === 1 ? 'output-1' : 'output-0'}>
                                    {output}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
