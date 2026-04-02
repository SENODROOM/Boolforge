import React, { useMemo, useState } from "react";
import ToolLayout from "../../components/ToolLayout";
import ControlPanel from "../../components/ControlPanel";
import ControlGroup from "../../components/ControlGroup";

import AFHDLSection   from "./components/AFHDLSection";
import AFHDLCard      from "./components/AFHDLCard";
import AFHDLDataRow   from "./components/AFHDLDataRow";
import AFHDLInfoPanel from "./components/AFHDLInfoPanel";
import AFHDLDivider   from "./components/AFHDLDivider";
import AFHDLStepList  from "./components/AFHDLStepList";

import { T, S } from "./styles/theme";
import { arithmeticDescriptions } from "./utils/arithmeticDescriptions";
import { cleanBin } from "../../utils/arithmeticHelpers";

/* ─── helpers ─────────────────────────────────────────────── */
const onesComplement  = (bin) => bin.split("").map((b) => (b === "1" ? "0" : "1")).join("");
const twosComplement  = (bin) => {
  const ones = onesComplement(bin);
  const val  = (parseInt(ones || "0", 2) + 1).toString(2);
  return val.padStart(bin.length, "0").slice(-bin.length);
};

const EXAMPLES = [
  { label: "5  (0101)", value: "0101" },
  { label: "-3 (1011)", value: "1011" },
  { label: "7  (0111)", value: "0111" },
  { label: "8  (1000)", value: "1000" },
];

const ONES_STEPS = [
  { text: "Write the binary number.", color: T.blue },
  { text: "Flip every bit: replace each 0 with 1 and each 1 with 0.", color: T.violet },
  { text: "The result is the 1's complement.", color: T.cyan },
];

const TWOS_STEPS = [
  { text: "Find the 1's complement (flip all bits).", color: T.blue },
  { text: "Add binary 1 to the 1's complement.", color: T.amber },
  { text: "Discard any carry beyond the original bit-width.", color: T.green },
  { text: "The result is the 2's complement — the binary encoding of the negative value.", color: T.green },
];

/* ─── component ──────────────────────────────────────────── */
const Complements = () => {
  const [value,    setValue]    = useState("1011");
  const [showOnes, setShowOnes] = useState(false);
  const [showTwos, setShowTwos] = useState(false);
  const [showHDL,  setShowHDL]  = useState(false);

  const bin  = cleanBin(value) || "0";
  const ones = useMemo(() => onesComplement(bin), [bin]);
  const twos = useMemo(() => twosComplement(bin), [bin]);

  const dec         = parseInt(bin, 2);
  const signedTwos  = bin[0] === "1"
    ? -(2 ** bin.length - parseInt(twos, 2) - 1) - 1
    : dec;
  // true signed value from 2's complement
  const trueSigned  = bin[0] === "1"
    ? parseInt(bin, 2) - (1 << bin.length)
    : dec;

  /* bit-by-bit flip table */
  const flipTable = bin.split("").map((bit, i) => ({
    pos:  bin.length - 1 - i,
    orig: bit,
    flip: bit === "1" ? "0" : "1",
  }));

  return (
    <ToolLayout
      title="1's and 2's Complements"
      subtitle="Foundations of signed number representation"
    >
      {/* Summary */}
      <AFHDLSection
        title="Why complements matter"
        description={arithmeticDescriptions.complements}
        accent={T.violet}
      />

      <AFHDLInfoPanel
        icon="💡"
        title="Key insight"
        content="2's complement is the universal standard because subtraction becomes addition: A − B = A + (2's complement of B). Modern CPUs need no separate subtract hardware."
        accent={T.cyan}
      />

      {/* Input */}
      <div style={{ ...S.sectionTitle, marginTop: "1.2rem" }}>🎛️ Binary Input</div>
      <ControlPanel>
        <ControlGroup label="Binary value">
          <input
            className="tool-input"
            value={value}
            onChange={(e) => setValue(cleanBin(e.target.value) || "0")}
            style={{ fontFamily: T.fontMono, color: T.blue }}
          />
        </ControlGroup>
      </ControlPanel>

      {/* Presets */}
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", margin: "0.4rem 0 0.8rem" }}>
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            className="kmap-btn kmap-btn-secondary"
            onClick={() => setValue(ex.value)}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div style={S.sectionTitle}>📊 Results</div>
      <div style={{ display: "grid", gap: "0.35rem" }}>
        <AFHDLDataRow label="Original binary"    value={bin}  labelColor={T.blue}   valueColor={T.blue}   />
        <AFHDLDataRow label="Unsigned decimal"   value={dec}  labelColor={T.textSecond} valueColor={T.textPrimary} mono={false} />
        <AFHDLDataRow label="1's complement"     value={ones} labelColor={T.violet} valueColor={T.violet} />
        <AFHDLDataRow label="2's complement"     value={twos} labelColor={T.green}  valueColor={T.green}  />
        <AFHDLDataRow
          label="Signed value (2's complement interpretation)"
          value={trueSigned}
          labelColor={trueSigned < 0 ? T.red : T.green}
          valueColor={trueSigned  < 0 ? T.red : T.green}
          mono={false}
        />
      </div>

      {/* Bit-flip visualiser */}
      <div style={{ ...S.sectionTitle, marginTop: "1rem" }}>🔁 Bit-by-Bit Flip (1's Complement)</div>
      <AFHDLCard title="Each bit inverted" accent={T.violet}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(bin.length, 8)}, 1fr)`,
            gap: "0.4rem",
          }}
        >
          {flipTable.map(({ pos, orig, flip }) => (
            <div
              key={pos}
              style={{
                background: T.bgSurface,
                border: `1px solid ${T.borderMed}`,
                borderRadius: T.radSm,
                padding: "0.45rem 0.3rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.65rem", color: T.textMuted, marginBottom: "0.15rem" }}>
                bit {pos}
              </div>
              <div style={{ fontFamily: T.fontMono, fontWeight: 800, color: T.blue }}>
                {orig}
              </div>
              <div style={{ fontSize: "0.6rem", color: T.textMuted }}>↓</div>
              <div style={{ fontFamily: T.fontMono, fontWeight: 800, color: T.violet }}>
                {flip}
              </div>
            </div>
          ))}
        </div>
      </AFHDLCard>

      <AFHDLDivider label="Learn more" />

      {/* 1's complement steps */}
      <button
        className="kmap-btn kmap-btn-secondary"
        style={{ width: "100%", marginBottom: "0.35rem" }}
        onClick={() => setShowOnes((v) => !v)}
      >
        {showOnes ? "▲ Hide" : "▼ Show"} 1's Complement — step by step
      </button>
      {showOnes && (
        <AFHDLCard title="How to find the 1's complement" accent={T.violet}>
          <AFHDLStepList steps={ONES_STEPS} accent={T.violet} />
          <div style={{ ...S.formula, marginTop: "0.5rem" }}>
            Original:       {bin}{"\n"}
            1's complement: {ones}
          </div>
          <AFHDLInfoPanel
            icon="⚠️"
            title="Limitation"
            content="1's complement has two representations of zero (+0 = 00…0 and −0 = 11…1). This complicates hardware. 2's complement fixes this."
            accent={T.amber}
          />
        </AFHDLCard>
      )}

      {/* 2's complement steps */}
      <button
        className="kmap-btn kmap-btn-secondary"
        style={{ width: "100%", margin: "0.35rem 0" }}
        onClick={() => setShowTwos((v) => !v)}
      >
        {showTwos ? "▲ Hide" : "▼ Show"} 2's Complement — step by step
      </button>
      {showTwos && (
        <AFHDLCard title="How to find the 2's complement" accent={T.green}>
          <AFHDLStepList steps={TWOS_STEPS} accent={T.green} />
          <div style={{ ...S.formula, marginTop: "0.5rem" }}>
            Original:       {bin}{"\n"}
            1's complement: {ones}{"\n"}
            2's complement: {twos}   (add 1)
          </div>
          <AFHDLInfoPanel
            icon="✅"
            title="Why 2's complement wins"
            content={`Only one zero. Range for ${bin.length} bits: −${2 ** (bin.length - 1)} to +${2 ** (bin.length - 1) - 1}. Addition and subtraction use identical circuits.`}
            accent={T.green}
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
            <pre style={{ margin: 0, lineHeight: 1.7 }}>{`// Verilog — 1's and 2's complement
module complements #(parameter N = 4) (
  input  [N-1:0] A,
  output [N-1:0] ones_comp,
  output [N-1:0] twos_comp
);
  assign ones_comp = ~A;
  assign twos_comp = ~A + 1'b1;   // or -A in synthesis
endmodule

-- VHDL equivalent
entity complements is
  port (A         : in  std_logic_vector(3 downto 0);
        ones_comp : out std_logic_vector(3 downto 0);
        twos_comp : out std_logic_vector(3 downto 0));
end complements;
architecture rtl of complements is
begin
  ones_comp <= not A;
  twos_comp <= std_logic_vector(-signed(A));
end rtl;`}</pre>
          </div>
        </AFHDLCard>
      )}
    </ToolLayout>
  );
};

export default Complements;
