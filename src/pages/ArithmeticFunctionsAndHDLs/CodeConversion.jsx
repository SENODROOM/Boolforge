import React, { useMemo, useState } from "react";
import ToolLayout from "../../components/ToolLayout";
import ControlPanel from "../../components/ControlPanel";
import ControlGroup from "../../components/ControlGroup";

import AFHDLSection   from "./components/AFHDLSection";
import AFHDLCard      from "./components/AFHDLCard";
import AFHDLDataRow   from "./components/AFHDLDataRow";
import AFHDLInfoPanel from "./components/AFHDLInfoPanel";
import AFHDLDivider   from "./components/AFHDLDivider";

import { T, S } from "./styles/theme";
import { arithmeticDescriptions } from "./utils/arithmeticDescriptions";
import { cleanBin } from "../../utils/arithmeticHelpers";

/* ─── helpers ─────────────────────────────────────────────── */
const HEX_NIBBLE = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];

const toNibbles = (bin) => {
  // pad to multiple of 4
  const padded = bin.padStart(Math.ceil(bin.length / 4) * 4, "0");
  const groups = [];
  for (let i = 0; i < padded.length; i += 4) {
    const chunk = padded.slice(i, i + 4);
    groups.push({ bits: chunk, hex: HEX_NIBBLE[parseInt(chunk, 2)] });
  }
  return groups;
};

const EXAMPLES = [
  { label: "45₁₀",  bin: "101101" },
  { label: "255₁₀", bin: "11111111" },
  { label: "16₁₀",  bin: "10000" },
  { label: "42₁₀",  bin: "101010" },
];

/* ─── component ──────────────────────────────────────────── */
const CodeConversion = () => {
  const [bin, setBin]       = useState("101101");
  const [showExplain, setShowExplain] = useState(false);

  const cBin   = cleanBin(bin) || "0";
  const dec    = parseInt(cBin, 2);
  const hex    = dec.toString(16).toUpperCase();
  const oct    = dec.toString(8);
  const nibbles = useMemo(() => toNibbles(cBin), [cBin]);

  /* positional weights table */
  const weights = cBin.split("").map((bit, i) => {
    const power = cBin.length - 1 - i;
    return { bit, power, value: parseInt(bit) * 2 ** power };
  });

  return (
    <ToolLayout
      title="Code Conversion"
      subtitle="Binary ↔ Decimal ↔ Hexadecimal ↔ Octal"
    >
      {/* Summary */}
      <AFHDLSection
        title="Number base conversions"
        description={arithmeticDescriptions.conversion}
        accent={T.cyan}
      />

      {/* Input */}
      <div style={S.sectionTitle}>🎛️ Binary Input</div>
      <ControlPanel>
        <ControlGroup label="Binary number (0s and 1s only)">
          <input
            className="tool-input"
            value={bin}
            onChange={(e) => setBin(cleanBin(e.target.value) || "0")}
            style={{ fontFamily: T.fontMono, color: T.blue, letterSpacing: "0.1em" }}
          />
        </ControlGroup>
      </ControlPanel>

      {/* Presets */}
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", margin: "0.4rem 0 0.8rem" }}>
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            className="kmap-btn kmap-btn-secondary"
            onClick={() => setBin(ex.bin)}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Conversion results */}
      <div style={S.sectionTitle}>📊 All Bases at a Glance</div>
      <div style={{ display: "grid", gap: "0.35rem" }}>
        <AFHDLDataRow label="Binary (base 2)"      value={cBin} labelColor={T.blue}   valueColor={T.blue}   />
        <AFHDLDataRow label="Decimal (base 10)"    value={dec}  labelColor={T.green}  valueColor={T.green}  mono={false} />
        <AFHDLDataRow label="Hexadecimal (base 16)"value={`0x${hex}`} labelColor={T.amber}  valueColor={T.amber}  />
        <AFHDLDataRow label="Octal (base 8)"       value={`0o${oct}`} labelColor={T.violet} valueColor={T.violet} />
      </div>

      {/* Hex nibble grouping */}
      <div style={{ ...S.sectionTitle, marginTop: "1rem" }}>🔡 Hex Nibble Groups</div>
      <AFHDLCard title="Group 4 bits → 1 hex digit" accent={T.amber}>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {nibbles.map((n, i) => (
            <div
              key={i}
              style={{
                background: T.bgSurface,
                border: `1px solid ${T.amber}30`,
                borderTop: `2px solid ${T.amber}`,
                borderRadius: T.radSm,
                padding: "0.5rem 0.65rem",
                textAlign: "center",
                minWidth: "58px",
              }}
            >
              <div style={{ fontFamily: T.fontMono, fontSize: "0.82rem", color: T.textSecond, letterSpacing: "0.1em" }}>
                {n.bits}
              </div>
              <div style={{ fontSize: "0.65rem", color: T.textMuted, margin: "0.1rem 0" }}>↓</div>
              <div style={{ fontFamily: T.fontMono, fontWeight: 800, fontSize: "1.1rem", color: T.amber }}>
                {n.hex}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "0.5rem", fontSize: "0.78rem", color: T.textMuted }}>
          Hex: <strong style={{ color: T.amber, fontFamily: T.fontMono }}>{hex}</strong>
          &nbsp; = &nbsp;
          {nibbles.map((n) => n.hex).join("")}
        </div>
      </AFHDLCard>

      {/* Positional weight table */}
      <AFHDLDivider label="how decimal is computed" />
      <button
        className="kmap-btn kmap-btn-secondary"
        style={{ width: "100%", marginBottom: "0.35rem" }}
        onClick={() => setShowExplain((v) => !v)}
      >
        {showExplain ? "▲ Hide" : "▼ Show"} Positional weight breakdown
      </button>
      {showExplain && (
        <AFHDLCard title={`Binary → Decimal: ${cBin}₂ = ${dec}₁₀`} accent={T.green}>
          {/* Column headers */}
          <div
            style={{
              ...S.tableHead,
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              marginBottom: "0.3rem",
            }}
          >
            <span>Bit</span>
            <span>Position</span>
            <span>Weight (2ⁿ)</span>
            <span>Contribution</span>
          </div>

          {/* Weight rows */}
          <div style={{ display: "grid", gap: "2px" }}>
            {weights.map(({ bit, power, value }) => (
              <div
                key={power}
                style={{
                  ...S.tableRow(bit === "1"),
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                }}
              >
                <span style={{ fontFamily: T.fontMono, color: bit === "1" ? T.blue : T.textMuted, fontWeight: bit === "1" ? 800 : 400 }}>
                  {bit}
                </span>
                <span style={{ color: T.textSecond }}>{power}</span>
                <span style={{ color: T.textSecond }}>2^{power} = {2 ** power}</span>
                <span style={{ color: bit === "1" ? T.green : T.textMuted, fontWeight: bit === "1" ? 700 : 400 }}>
                  {bit === "1" ? `+${value}` : "0"}
                </span>
              </div>
            ))}
          </div>

          {/* Sum */}
          <div
            style={{
              borderTop: `1px solid ${T.borderMed}`,
              marginTop: "0.5rem",
              paddingTop: "0.4rem",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.88rem",
            }}
          >
            <span style={{ color: T.textSecond }}>Sum of all contributions</span>
            <strong style={{ color: T.green, fontFamily: T.fontMono }}>{dec}</strong>
          </div>

          <AFHDLInfoPanel
            icon="📐"
            title="Formula"
            content={`decimal = Σ ( bit[i] × 2^i )  where i counts from 0 at the rightmost bit.`}
            accent={T.cyan}
          />
        </AFHDLCard>
      )}
    </ToolLayout>
  );
};

export default CodeConversion;
