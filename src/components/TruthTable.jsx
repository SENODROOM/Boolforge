export function TruthTableGenerator({ truthTable }) {

    return (
        (truthTable.headers ? truthTable.headers.length > 0 : false) && (
            <>
                <h2 style={{ marginTop: '20px' }}>Truth Table</h2>
                <table>
                    <thead>
                        <tr>
                            {truthTable.headers.map((header, i) => (
                                <th key={i}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {truthTable.rows.map((row, i) => (
                            <tr key={i}>
                                {row.map((cell, j) => (
                                    <td key={j}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        )
    );
};
