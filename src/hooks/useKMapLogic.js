import { useMemo } from 'react';
import { QuineMcCluskey } from '../utils/QuineMcCluskey';
import { detectGroups } from '../utils/GroupDetector';

export const useKMapLogic = (numVariables, variables, minterms) => {
    const mintermArray = useMemo(() => {
        return minterms
            .split(',')
            .map(m => m.trim())
            .filter(m => m !== '')
            .map(m => parseInt(m))
            .filter(m => !isNaN(m) && m >= 0 && m < Math.pow(2, numVariables));
    }, [minterms, numVariables]);

    const grid = useMemo(() => {
        const rows = numVariables <= 2 ? 2 : (numVariables === 3 ? 2 : 4);
        const cols = numVariables <= 2 ? 2 : 4;
        const gridArray = Array(rows).fill(null).map(() => Array(cols).fill(0));

        const grayCode2 = [0, 1]; // For 2 variables: 0, 1
        const grayCode4 = [0, 1, 3, 2]; // For 3-4 variables: 00, 01, 11, 10
        const mintermSet = new Set(mintermArray);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let minterm;
                if (numVariables === 2) {
                    // 2 variables: simple mapping
                    // Row: A, Col: B
                    minterm = i * 2 + j;
                } else if (numVariables === 3) {
                    // 3 variables: Row is A (0,1), Col is BC (00,01,11,10)
                    minterm = i * 4 + grayCode4[j];
                } else {
                    // 4 variables: Row is AB (00,01,11,10), Col is CD (00,01,11,10)
                    const rowCode = grayCode4[i];
                    const colCode = grayCode4[j];
                    minterm = rowCode * 4 + colCode;
                }

                if (mintermSet.has(minterm)) {
                    gridArray[i][j] = 1;
                }
            }
        }

        return gridArray;
    }, [mintermArray, numVariables]);

    const expression = useMemo(() => {
        if (mintermArray.length === 0) return 'F = 0';
        if (mintermArray.length === Math.pow(2, numVariables)) return 'F = 1';

        const qm = new QuineMcCluskey(numVariables, variables);
        return qm.simplify(mintermArray);
    }, [mintermArray, numVariables, variables]);

    const groups = useMemo(() => {
        if (mintermArray.length === 0) return [];
        return detectGroups(grid, numVariables, mintermArray);
    }, [grid, numVariables, mintermArray]);

    const getColumnLabels = () => {
        if (numVariables === 2) return ['0', '1'];
        return ['00', '01', '11', '10'];
    };

    const getRowLabels = () => {
        if (numVariables <= 2) return ['0', '1'];
        if (numVariables === 3) return ['0', '1'];
        return ['00', '01', '11', '10'];
    };

    const getMintermPosition = (minterm) => {
        const grayCode4 = [0, 1, 3, 2];

        if (numVariables === 2) {
            return {
                row: Math.floor(minterm / 2),
                col: minterm % 2
            };
        } else if (numVariables === 3) {
            const row = Math.floor(minterm / 4);
            const colValue = minterm % 4;
            const col = grayCode4.indexOf(colValue);
            return { row, col };
        } else {
            const rowValue = Math.floor(minterm / 4);
            const colValue = minterm % 4;
            const row = grayCode4.indexOf(rowValue);
            const col = grayCode4.indexOf(colValue);
            return { row, col };
        }
    };

    return {
        grid,
        expression,
        groups,
        getColumnLabels,
        getRowLabels,
        getMintermPosition,
        simplifyBoolean: () => expression
    };
};