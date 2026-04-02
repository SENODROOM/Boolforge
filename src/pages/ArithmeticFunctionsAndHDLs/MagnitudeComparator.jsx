import React, { useMemo, useState } from "react";
import ToolLayout from "../../components/ToolLayout";
import ControlPanel from "../../components/ControlPanel";
import ControlGroup from "../../components/ControlGroup";

import AFHDLSection   from "./components/AFHDLSection";
import AFHDLCard      from "./components/AFHDLCard";
import AFHDLDataRow   from "./components/AFHDLDataRow";
import AFHDLInfoPanel from "./components/AFHDLInfoPanel";
import AFHDLDivider   from "./components/AFHDLDivider";
import AFHDLBadge     from "./components/AFHDLBadge";

import { T, S } from "./styles/theme";
import { arithmeticDescriptions } from "./utils/arithmeticDescriptions";
import { cleanBin, compareMagnitude } from "../../utils/arithmeticHelpers";

/* ─── helpers ─────────────────────────────────────────────── */
const pad = (a, b) => {
  const len = Math.max(a.length, b.length, 1);
  return [a.padStart(len, "0"), b.padStart(len, "0")];
};

const toggleBit = (bin, idx) => {
  const arr = bin.split("");
  arr[idx] = arr[idx] === "0" ? "1" : "0";
  return arr.join("");
};

/** Returns per-bit comparison: "eq", "a_gt", "b_gt" */
const bitCompare = (a, b) => {
  const [pa, pb] = pad(a, b);
  return pa.split("").map((aBit, i) => {
    const bBit = pb[i];
    if (aBit === bBit)        return "eq";
    if (aBit === "1")         return "a_gt";
    return "b_gt";
  });
};

const EXAMPLES = [
  { label: "A > B", a: "1100", b: "1010" },
  { label: "A < B", a: "0011", b: "1100" },
  { label: "A = B", a: "1010", b: "1010" },
  { label: "MSB diff", a: "1000", b: "0111" },
];

/* ─── component ──────────────────────────────────────────── */
const MagnitudeComparator = () => {
  const [a, setA] = useState("1100");
  const [b, setB] = useState("1010");
  const [showDetail, setShowDetail] = useState(false);
  const [showHDL,    setShowHDL]    = useState(false);

  const cA    = cleanBin(a) || "0";
  const cB    = cleanBin(b) || "0";
  const [pA, pB] = pad(cA, cB);

  const status  = compareMagnitude(cA, cB);
  const aDecimal = parseInt(cA, 2);
  const bDecimal = parseInt(cB, 2);

  const bits    = useMemo(() => bitCompare(cA, cB), [cA, cB]);
  // Find first decisive bit
  const decisiveIdx = bits.findIndex((r) => r !== "eq");

  const resultColor =
    status.includes(">") ? T.blue :
    status.includes("<") ? T.red  : T.green;

  const resultLabel =
    status.includes(">") ? "A > B" :
    status.includes("<") ? "A < B" : "A = B";

  return (
    <ToolLayout
      title="Magnitude Comparator"
      subtitle="Compare A and B · MSB-First Cascade · Hardware Logic"
    >
      {/* Summary */}
      <AFHDLSection
        title="How comparators work"
        description={arithmeticDescriptions.comparator}
        accent={T.cyan}
      />

      <AFHDLInfoPanel
        icon="🔍"
        title="MSB-first rule"
        content="Start from the most-significant bit. The first position where A and B differ decides the result. If all bits are equal, A = B."
        accent={T.cyan}
      />

      {/* Inputs */}
      <div style={{ ...S.sectionTitle, marginTop: "1.1rem" }}>🎛️ Inputs</div>
      <div style={{ display: "grid", gap: "0.7rem", margin: "0.5rem 0" }}>
        {[
          { label: "A", padded: pA, raw: a, setRaw: setA, color: T.blue },
          { label: "B", padded: pB, raw: b, setRaw: setB, color: T.violet },
        ].map(({ label, padded, raw, setRaw, color }) => (
          <div key={label}>
            <div style={{ fontSize: "0.81rem", color: T.textSecond, marginBottom: "0.25rem" }}>
              {label}: &nbsp;
              <strong style={{ color, fontFamily: T.fontMono }}>{padded}</strong>
              <span style={{ color: T.textMuted }}> = {parseInt(padded, 2)}₁₀</span>
            </div>
            {/* Clickable bit buttons */}
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "0.3rem" }}>
              {padded.split("").map((bit, i) => (
                <button
                  key={i}
                  onClick={() => setRaw(toggleBit(padded, i))}
                  style={S.bitBtn(bit, color)}
                  title="Click to flip"
                >
                  {bit}
                </button>
              ))}
            </div>
            <input
              className="tool-input"
              value={raw}
              onChange={(e) => setRaw(cleanBin(e.target.value) || "0")}
              style={{ fontFamily: T.fontMono, color }}
            />
          </div>
        ))}
      </div>

      {/* Presets */}
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

      {/* Result banner */}
      <div style={{ ...S.resultBanner, borderColor: `${resultColor}45`, background: `${resultColor}09` }}>
        <div style={{ fontSize: "0.72rem", color: T.textMuted, marginBottom: "0.25rem" }}>
          COMPARISON RESULT
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
          <strong style={{ color: T.blue,   fontFamily: T.fontMono }}>{pA}</strong>
          <span   style={{ color: T.textMuted }}>({aDecimal}₁₀)</span>
          <strong style={{ color: resultColor, fontSize: "1.5rem" }}>
            {status.includes(">") ? ">" : status.includes("<") ? "<" : "="}
          </strong>
          <strong style={{ color: T.violet, fontFamily: T.fontMono }}>{pB}</strong>
          <span   style={{ color: T.textMuted }}>({bDecimal}₁₀)</span>
          <AFHDLBadge label={resultLabel} color={resultColor} />
        </div>
      </div>

      {/* Bit-by-bit comparison */}
      <div style={S.sectionTitle}>🔬 Bit-by-Bit Comparison</div>
      <AFHDLCard title="MSB → LSB cascade" accent={T.blue}>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {bits.map((result, i) => {
            const isDecisive = i === decisiveIdx;
            const color =
              result === "eq"   ? T.textMuted :
              result === "a_gt" ? T.blue      : T.violet;
            const label =
              result === "eq"   ? "=" :
              result === "a_gt" ? "A>B" : "B>A";

            return (
              <div
                key={i}
                style={{
                  background: isDecisive ? `${color}18` : T.bgSurface,
                  border: `1px solid ${isDecisive ? color : T.borderFaint}`,
                  borderTop: isDecisive ? `2px solid ${color}` : `1px solid ${T.borderFaint}`,
                  borderRadius: T.radSm,
                  padding: "0.45rem 0.5rem",
                  minWidth: "54px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.6rem", color: T.textMuted }}>bit {pA.length - 1 - i}</div>
                <div style={{ fontFamily: T.fontMono, fontWeight: 700, color: T.blue }}>{pA[i]}</div>
                <div style={{ fontFamily: T.fontMono, fontWeight: 700, color: T.violet }}>{pB[i]}</div>
                <div style={{ fontSize: "0.65rem", fontWeight: isDecisive ? 800 : 400, color }}>
                  {label}
                </div>
                {isDecisive && (
                  <div style={{ fontSize: "0.55rem", color, marginTop: "2px" }}>← decides</div>
                )}
              </div>
            );
          })}
        </div>
        {decisiveIdx === -1 && (
          <AFHDLInfoPanel
            title="All bits equal"
            content="Every bit position matches — A and B are identical."
            accent={T.green}
          />
        )}
      </AFHDLCard>

      {/* Data summary */}
      <div style={{ display: "grid", gap: "0.35rem", marginTop: "0.75rem" }}>
        <AFHDLDataRow label="A (decimal)" value={aDecimal} labelColor={T.blue}   valueColor={T.blue}   mono={false} />
        <AFHDLDataRow label="B (decimal)" value={bDecimal} labelColor={T.violet} valueColor={T.violet} mono={false} />
        <AFHDLDataRow label="A − B"       value={aDecimal - bDecimal} labelColor={T.textSecond} valueColor={aDecimal - bDecimal >= 0 ? T.green : T.red} mono={false} />
        <AFHDLDataRow label="Result"      value={resultLabel} labelColor={resultColor} valueColor={resultColor} mono={false} />
      </div>

      <AFHDLDivider label="theory & hardware" />

      {/* Theory toggle */}
      <button
        className="kmap-btn kmap-btn-secondary"
        style={{ width: "100%", marginBottom: "0.35rem" }}
        onClick={() => setShowDetail((v) => !v)}
      >
        {showDetail ? "▲ Hide" : "▼ Show"} Comparator theory
      </button>
      {showDetail && (
        <AFHDLCard title="How the hardware works" accent={T.cyan}>
          <div style={{ ...S.formula }}>
            {"A = B  when  ∀i: A[i] XNOR B[i]  (all bits equal)\n"}
            {"A > B  when  MSB difference: A[i]=1, B[i]=0\n"}
            {"A < B  when  MSB difference: A[i]=0, B[i]=1\n\n"}
            {"Generate: G[i] = A[i] · B̄[i]    (A has 1, B has 0)\n"}
            {"Equal:    E[i] = A[i] XNOR B[i]  (bits match)\n"}
            {"Final A>B = G[n-1] | (E[n-1]·G[n-2]) | …"}
          </div>
          <AFHDLInfoPanel
            icon="⚡"
            title="Cascaded comparators"
            content="For wide buses (64+ bits), build a tree: compare groups of 4 bits in parallel, then compare those group results. This reduces delay from O(n) to O(log n)."
            accent={T.cyan}
          />
        </AFHDLCard>
      )}

      {/* HDL */}
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
            <pre style={{ margin: 0, lineHeight: 1.7 }}>{`// Verilog — 4-bit magnitude comparator
module comparator #(parameter N = 4) (
  input  [N-1:0] A, B,
  output         A_gt_B,   // A > B
  output         A_eq_B,   // A = B
  output         A_lt_B    // A < B
);
  assign A_gt_B = (A > B);
  assign A_eq_B = (A == B);
  assign A_lt_B = (A < B);
endmodule

-- VHDL equivalent
entity comparator is
  port (A, B    : in  std_logic_vector(3 downto 0);
        A_gt_B,
        A_eq_B,
        A_lt_B  : out std_logic);
end comparator;
architecture rtl of comparator is
begin
  A_gt_B <= '1' when unsigned(A) > unsigned(B) else '0';
  A_eq_B <= '1' when A = B                     else '0';
  A_lt_B <= '1' when unsigned(A) < unsigned(B) else '0';
end rtl;`}</pre>
          </div>
        </AFHDLCard>
      )}
    </ToolLayout>
  );
};

export default MagnitudeComparator;
