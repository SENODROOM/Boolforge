import React from 'react';

export const KMapDisplay = ({
    grid,
    groups,
    numVariables,
    variables,
    getColumnLabels,
    getRowLabels,
    showGroupingGuide
}) => {
    const getCellKey = (rowIdx, colIdx) => `${rowIdx}-${colIdx}`;

    const getCellGroups = (rowIdx, colIdx) => {
        if (!showGroupingGuide) return [];
        return groups.filter(group =>
            group.cells.some(cell => cell.row === rowIdx && cell.col === colIdx)
        );
    };

    const renderCell = (cell, rowIdx, colIdx) => {
        const cellGroups = getCellGroups(rowIdx, colIdx);
        const isGrouped = cellGroups.length > 0;

        return (
            <td
                key={colIdx}
                className={`kmap-cell ${
                    cell === 1 ? 'kmap-cell-filled' : 'kmap-cell-empty'
                } ${isGrouped ? 'kmap-cell-grouped' : ''}`}
                style={isGrouped ? {
                    backgroundColor: cellGroups[0].color.bg,
                    borderColor: cellGroups[0].color.border,
                    boxShadow: `0 0 20px ${cellGroups[0].color.border}, inset 0 0 20px ${cellGroups[0].color.bg}`,
                    animation: 'groupPulse 2s ease-in-out infinite'
                } : {}}
            >
                <span className="kmap-cell-value">{cell}</span>
                {isGrouped && cellGroups.map((group, idx) => (
                    <div
                        key={group.id}
                        className="kmap-cell-group-indicator"
                        style={{
                            backgroundColor: group.color.border,
                            animationDelay: `${idx * 0.2}s`
                        }}
                    />
                ))}
            </td>
        );
    };

    return (
        <div className="kmap-card">
            <h2 className="kmap-section-title">Karnaugh Map</h2>

            <div className="kmap-wrapper">
                <div className="kmap-grid-container">
                    <table className="kmap-table">
                        <thead>
                            <tr>
                                <th className="kmap-corner">
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        {numVariables === 2
                                            ? variables[0]
                                            : variables.slice(0, 2).join('')} \ {numVariables === 2
                                            ? variables[1]
                                            : (numVariables === 3 ? variables[2] : variables.slice(2).join(''))}
                                    </div>
                                </th>
                                {getColumnLabels().map((label, idx) => (
                                    <th key={idx} className="kmap-header-cell">{label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {grid.map((row, rowIdx) => (
                                <tr key={rowIdx}>
                                    <td className="kmap-row-header">{getRowLabels()[rowIdx]}</td>
                                    {row.map((cell, colIdx) => renderCell(cell, rowIdx, colIdx))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showGroupingGuide && groups.length > 0 && (
                    <div className="kmap-groups-legend">
                        <h3 className="kmap-groups-legend-title">Detected Groups</h3>
                        <div className="kmap-groups-legend-list">
                            {groups.map((group, idx) => (
                                <div key={group.id} className="kmap-group-legend-item">
                                    <div
                                        className="kmap-group-legend-color"
                                        style={{ backgroundColor: group.color.border }}
                                    />
                                    <span>Group {idx + 1}: {group.size} cells (minterms: {group.minterms.join(', ')})</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
