import React, { useState, useMemo } from 'react';
import ToolLayout from '../components/ToolLayout';
import ExplanationBlock from '../components/ExplanationBlock';
import { generateTruthTable } from '../utils/boolMath';


const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const BooleanAlgebraOverview = () => {
  const [vars, setVars] = useState(['A', 'B']);

  const combinations = Math.pow(2, vars.length);
  const tt = useMemo(() => generateTruthTable(vars), [vars]);



  return (
    <ToolLayout title="Boolean Algebra" subtitle="Variables, literals, terms, and 2ⁿ combinations">


      <ExplanationBlock title="Overview">
        <p className="explanation-intro">
          Boolean Algebra is the language of digital logic. It uses variables that take values 0 or 1, combines them with logical operators, and models circuits and truth tables compactly.
        </p>
        <p>
          For n variables, the truth table has <span className="highlight">{combinations}</span> rows (2ⁿ combinations).
        </p>
      </ExplanationBlock>

      <ExplanationBlock title="Variables & Combinations (2ⁿ)">
        <p className="explanation-intro">
          Variables: <span className="highlight">{vars.join(', ')}</span> • Combinations: <span className="highlight">{combinations}</span>
        </p>
        <div className="var-row" style={{ marginBottom: 12, display: 'flex', gap: 12 }}>
          <button className="btn" type="button" onClick={() => {
            const next = letters[vars.length] || `V${vars.length + 1}`;
            setVars([...vars, next]);
          }}>Add Variable</button>
          <button className="btn" type="button" onClick={() => {
            if (vars.length > 1) setVars(vars.slice(0, -1));
          }}>Remove Variable</button>
        </div>
        <div className="binary-table-container">
          <table className="binary-table">
            <thead className="binary-table-header">
              <tr>
                {tt.headers.map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {tt.rows.map((row, i) => (
                <tr key={i} className="binary-table-row">
                  {row.map((cell, j) => (
                    <td key={j} className="binary-table-cell">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ExplanationBlock>

      <ExplanationBlock title="Literals, Terms, Standard Forms">
        <p className="explanation-intro">
          Literal: a variable or its complement (A or A'). Term: an AND of literals (e.g., AB'C). SOP: OR of product terms (AB' + C). POS: AND of sum terms ((A + B')(C + D)).
        </p>
        <ul>
          <li>Literal examples: A, B', C</li>
          <li>Product term examples: AB', AB'C</li>
          <li>SOP example: AB' + C</li>
          <li>POS example: (A + B')(C + D)</li>
        </ul>
      </ExplanationBlock>

      <ExplanationBlock title="Gate Primer">
        <ul>
          <li>NOT: outputs the complement (A → A')</li>
          <li>AND: outputs 1 only if all inputs are 1 (A • B)</li>
          <li>OR: outputs 1 if any input is 1 (A + B)</li>
          <li>NAND: NOT of AND</li>
          <li>NOR: NOT of OR</li>
          <li>XOR: outputs 1 if inputs differ</li>
          <li>XNOR: outputs 1 if inputs match</li>
        </ul>
      </ExplanationBlock>

      <ExplanationBlock title="Minterms & Maxterms">
        <p className="explanation-intro">
          Minterms: input rows where F=1 (used in SOP). Maxterms: input rows where F=0 (used in POS).
        </p>
      </ExplanationBlock>


    </ToolLayout>
  );
};

export default BooleanAlgebraOverview;
