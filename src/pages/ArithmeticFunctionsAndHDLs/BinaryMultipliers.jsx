import React, { useMemo, useState } from "react";
import ToolLayout from "../../components/ToolLayout";
import ControlPanel from "../../components/ControlPanel";
import ControlGroup from "../../components/ControlGroup";

import AFHDLSection   from "./components/AFHDLSection";
import AFHDLCard      from "./components/AFHDLCard";
import AFHDLDivider   from "./components/AFHDLDivider";
import AFHDLDataRow   from "./components/AFHDLDataRow";
import AFHDLStepList  from "./components/AFHDLStepList";
import AFHDLInfoPanel from "./components/AFHDLInfoPanel";

import { T, S } from "./styles/theme";
import { arithmeticDescriptions } from "./utils/arithmeticDescriptions";
import { cleanBin, binaryMultiply } from "../../utils/arithmeticHelpers";

/* ─── helpers ───────────────────────────────────────────────── */
const buildPartials = (a, b) => {
  const cA = cleanBin(a) || "0";
  const cB = cleanBin(b) || "0";
  const partials = [];
  for (let i = cB.length - 1; i >= 0; i--) {
    const bit = cB[i];
    const shift = cB.length - 1 - i;
    if (bit === "1") {
      partials.push({ shifted: cA + "0".repeat(shift), shift });
    } else {
      partials.push({ shifted: "0", shift, zero: true });
    }
  }
  return partials;
};

const EXAMPLES = [
  { label: "3 × 3",  a: "011", b: "011" },
  { label: "5 × 2",  a: "101", b: "010" },
  { label: "7 × 7",  a: "111", b: "111" },
  { label: "4 × 0",  a: "100", b: "000" },
  { label: "15 × 3", a: "1111", b: "0011" },
];

const STEPS = [
  { text: "Write A (multiplicand) and B (multiplier) in binary.", color: T.blue },
  { text: "For each bit of B (right to left): if bit = 1, write A shifted left by the bit's position; if bit = 0, write 0.", color: T.violet },
  { text: "These are your partial products.", color: T.cyan },
  { text: "Add all partial products together using binary addition.", color: T.green },
  { text: "The final sum is the product.", color: T.amber },
];

/* ─── component ─────────────────────────────────────────────── */
const BinaryMultipliers = () => {
  const [a, setA] = useState("101");
  const [b, setB] = useState("011");
  const [showSteps, setShowSteps] = useState(false);
  const [showHDL,   setShowHDL]   = useState(false);

  const cA = cleanBin(a) || "0";
  const cB = cleanBin(b) || "0";

  const product  = useMemo(() => binaryMultiply(cA, cB), [cA, cB]);
  const partials = useMemo(() => buildPartials(cA, cB),  [cA, cB]);
  const aDecimal = parseInt(cA, 2);
  const bDecimal = parseInt(cB, 2);
  const pDecimal = aDecimal * bDecimal;

  return (
    <ToolLayout
      title="Binary Multipliers"
      subtitle="Shift-and-Add Method · Partial Products · Hardware"
    >
      {/* Summary */}
      <AFHDLSection
        title="How binary multiplication works"
        description={arithmeticDescriptions.multiplier}
        accent={T.violet}
      />

      {/* Inputs */}
      <div style={S.sectionTitle}>🎛️ Inputs</div>
      <ControlPanel>
        <ControlGroup label="A — multiplicand (binary)">
          <input
            className="tool-input"
            value={a}
            onChange={(e) => setA(cleanBin(e.target.value) || "0")}
            style={{ fontFamily: T.fontMono, color: T.blue }}
          />
        </ControlGroup>
        <ControlGroup label="B — multiplier (binary)">
          <input
            className="tool-input"
            value={b}
            onChange={(e) => setB(cleanBin(e.target.value) || "0")}
            style={{ fontFamily: T.fontMono, color: T.violet }}
          />
        </ControlGroup>
      </ControlPanel>

      {/* Preset examples */}
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", margin: "0.4rem 0 0.8rem" }}>
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            className="kmap-btn kmap-btn-secondary"
            onClick={() => { setA(ex.a); setB(ex.b); }}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Live result banner */}
      <div style={S.resultBanner}>
        <div style={{ fontSize: "0.72rem", color: T.textMuted, marginBottom: "0.25rem" }}>
          LIVE RESULT
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.45rem", fontSize: "1.05rem" }}>
          <strong style={{ color: T.blue,   fontFamily: T.fontMono }}>{cA}</strong>
          <span   style={{ color: T.textMuted }}>₂ ({aDecimal}₁₀)</span>
          <span   style={{ color: T.textSecond, fontWeight: 700 }}>×</span>
          <strong style={{ color: T.violet, fontFamily: T.fontMono }}>{cB}</strong>
          <span   style={{ color: T.textMuted }}>₂ ({bDecimal}₁₀)</span>
          <span   style={{ color: T.textSecond }}>=</span>
          <strong style={{ color: T.green,  fontFamily: T.fontMono, fontSize: "1.2rem" }}>
            {product}
          </strong>
          <span   style={{ color: T.textMuted }}>₂ ({pDecimal}₁₀)</span>
        </div>
      </div>

      {/* Partial products visual */}
      <div style={S.sectionTitle}>📊 Partial Products</div>
      <AFHDLCard title="Shift-and-add breakdown" accent={T.violet}>
        <div style={{ fontFamily: T.fontMono, fontSize: "0.83rem", lineHeight: 2 }}>
          {/* Header */}
          <div style={{ color: T.textMuted, fontSize: "0.72rem", marginBottom: "0.3rem" }}>
            Multiplicand A = <strong style={{ color: T.blue }}>{cA}</strong> &nbsp;
            Multiplier B = <strong style={{ color: T.violet }}>{cB}</strong>
          </div>

          {/* Each bit of B */}
          {partials.map((p, i) => {
            const bitIdx  = cB.length - 1 - i;
            const bitChar = cB[bitIdx] || "0";
            return (
              <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <span style={{ color: T.textMuted, fontSize: "0.7rem", minWidth: "52px" }}>
                  B[{bitIdx}]={bitChar}  ×2^{p.shift}
                </span>
                <span
                  style={{
                    color: p.zero ? T.textMuted : T.cyan,
                    fontWeight: p.zero ? 400 : 700,
                  }}
                >
                  {p.zero ? "0" : p.shifted}
                </span>
              </div>
            );
          })}

          {/* Divider + result */}
          <div style={{ borderTop: `1px solid ${T.borderMed}`, margin: "0.4rem 0 0.2rem" }} />
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <span style={{ color: T.textMuted, fontSize: "0.7rem", minWidth: "52px" }}>
              Product
            </span>
            <span style={{ color: T.green, fontWeight: 800, fontSize: "1rem" }}>
              {product}
            </span>
            <span style={{ color: T.textMuted, fontSize: "0.75rem" }}>
              = {pDecimal}₁₀
            </span>
          </div>
        </div>
      </AFHDLCard>

      {/* Quick data rows */}
      <div style={{ display: "grid", gap: "0.35rem", marginTop: "0.75rem" }}>
        <AFHDLDataRow label="A (decimal)" value={aDecimal} labelColor={T.blue}   valueColor={T.blue}   />
        <AFHDLDataRow label="B (decimal)" value={bDecimal} labelColor={T.violet} valueColor={T.violet} />
        <AFHDLDataRow label="Product (decimal)" value={pDecimal} labelColor={T.green} valueColor={T.green} />
        <AFHDLDataRow label="Product (binary)"  value={product}  labelColor={T.green} valueColor={T.green} />
        <AFHDLDataRow label="Bit-width of result" value={`${product.length} bits`} mono={false} />
      </div>

      <AFHDLDivider label="Step-by-step guide" />

      {/* Collapsible steps */}
      <button
        className="kmap-btn kmap-btn-secondary"
        style={{ width: "100%", marginBottom: "0.35rem" }}
        onClick={() => setShowSteps((v) => !v)}
      >
        {showSteps ? "▲ Hide" : "▼ Show"} Multiplication steps
      </button>
      {showSteps && (
        <AFHDLCard title="How to multiply by hand" accent={T.cyan}>
          <AFHDLStepList steps={STEPS} />
          <AFHDLInfoPanel
            icon="💡"
            title="Hardware insight"
            content="In silicon, each bit of B drives an AND gate array (creating a masked copy of A). The partial products are fed into a tree of adders — a Wallace tree or Dadda tree — for maximum speed."
            accent={T.cyan}
          />
        </AFHDLCard>
      )}

      {/* HDL code */}
      <button
        className="kmap-btn kmap-btn-secondary"
        style={{ width: "100%", margin: "0.35rem 0" }}
        onClick={() => setShowHDL((v) => !v)}
      >
        {showHDL ? "▲ Hide" : "▼ Show"} Verilog / VHDL Code
      </button>
      {showHDL && (
        <AFHDLCard title="Hardware Description" accent={T.amber}>
          <div style={S.codeBlock}>
            <pre style={{ margin: 0, lineHeight: 1.7 }}>{`// Verilog — simple combinational multiplier
module binary_multiplier #(parameter N = 4) (
  input  [N-1:0] A, B,
  output [2*N-1:0] Product
);
  assign Product = A * B;   // synthesises to Wallace tree
endmodule

-- VHDL equivalent
entity binary_multiplier is
  port (A, B : in  std_logic_vector(3 downto 0);
        P    : out std_logic_vector(7 downto 0));
end binary_multiplier;
architecture rtl of binary_multiplier is
begin
  P <= std_logic_vector(unsigned(A) * unsigned(B));
end rtl;`}</pre>
          </div>
          <AFHDLInfoPanel
            icon="⚡"
            title="Timing note"
            content="For a 32×32 multiplier, a simple shift-and-add loop takes 32 clock cycles. A Booth-encoded Wallace tree cuts this to a single cycle with ~30% fewer partial products."
            accent={T.amber}
          />
        </AFHDLCard>
      )}
    </ToolLayout>
  );
};

export default BinaryMultipliers;
