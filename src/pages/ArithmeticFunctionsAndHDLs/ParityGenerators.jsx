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
import { cleanBin, parity } from "../../utils/arithmeticHelpers";

/* ─── helpers ─────────────────────────────────────────────── */
const EXAMPLES = [
  { label: "101001", bits: "101001" },
  { label: "11110000", bits: "11110000" },
  { label: "1010101", bits: "1010101" },
  { label: "00000000", bits: "00000000" },
];

const toggleBit = (bin, idx) => {
  const arr = bin.split("");
  arr[idx] = arr[idx] === "0" ? "1" : "0";
  return arr.join("");
};

/* ─── component ──────────────────────────────────────────── */
const ParityGenerators = () => {
  const [bits, setBits]     = useState("101001");
  const [showHelp, setShowHelp] = useState(false);
  const [showHDL,  setShowHDL]  = useState(false);
  const [flip, setFlip]         = useState(null); // index of simulated error bit

  const cBits = cleanBin(bits) || "0";

  // Apply simulated flip
  const testBits = flip !== null && flip < cBits.length
    ? toggleBit(cBits, flip)
    : cBits;

  const evenOrig  = useMemo(() => parity(cBits,    "even"), [cBits]);
  const oddOrig   = useMemo(() => parity(cBits,    "odd"),  [cBits]);
  const evenTest  = useMemo(() => parity(testBits, "even"), [testBits]);
  const oddTest   = useMemo(() => parity(testBits, "odd"),  [testBits]);

  const oneCount  = cBits.split("").filter((b) => b === "1").length;
  const isEven    = oneCount % 2 === 0;

  const evenBit   = isEven ? "0" : "1"; // bit to add to make even parity
  const oddBit    = isEven ? "1" : "0"; // bit to add to make odd parity

  return (
    <ToolLayout
      title="Parity Generators / Checkers"
      subtitle="Single-bit Error Detection · Even & Odd Parity"
    >
      {/* Summary */}
      <AFHDLSection
        title="What is parity?"
        description={arithmeticDescriptions.parity}
        accent={T.pink}
      />

      <AFHDLInfoPanel
        icon="🛡️"
        title="Where parity is used"
        content="RAM modules (ECC memory), UART serial links, CAN bus frames, and storage checksums all use parity as a first line of defence against single-bit errors."
        accent={T.cyan}
      />

      {/* Inputs */}
      <div style={{ ...S.sectionTitle, marginTop: "1.1rem" }}>🎛️ Bit String</div>
      <ControlPanel>
        <ControlGroup label="Enter a binary string">
          <input
            className="tool-input"
            value={bits}
            onChange={(e) => { setBits(cleanBin(e.target.value) || "0"); setFlip(null); }}
            style={{ fontFamily: T.fontMono, color: T.pink, letterSpacing: "0.1em" }}
          />
        </ControlGroup>
      </ControlPanel>

      {/* Clickable bits */}
      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", margin: "0.4rem 0" }}>
        {cBits.split("").map((bit, i) => (
          <button
            key={i}
            onClick={() => { setBits(toggleBit(cBits, i)); setFlip(null); }}
            style={S.bitBtn(bit, T.pink)}
            title="Click to flip this bit"
          >
            {bit}
          </button>
        ))}
      </div>

      {/* Presets */}
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", margin: "0.4rem 0 0.8rem" }}>
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            className="kmap-btn kmap-btn-secondary"
            onClick={() => { setBits(ex.bits); setFlip(null); }}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Parity results */}
      <div style={S.sectionTitle}>📊 Parity Analysis</div>
      <div style={{ display: "grid", gap: "0.35rem" }}>
        <AFHDLDataRow label="Bit string"       value={cBits}   labelColor={T.pink}  valueColor={T.pink}  />
        <AFHDLDataRow label="Count of 1s"      value={oneCount} labelColor={T.textSecond} valueColor={T.textPrimary} mono={false} />
        <AFHDLDataRow label="Parity (even/odd)" value={isEven ? "Even" : "Odd"} labelColor={T.textSecond} valueColor={isEven ? T.green : T.amber} mono={false} />
        <AFHDLDataRow label="Even parity check bit" value={evenBit} labelColor={T.green}  valueColor={T.green}  />
        <AFHDLDataRow label="Odd parity check bit"  value={oddBit}  labelColor={T.amber}  valueColor={T.amber}  />
      </div>

      {/* Status badges */}
      <div style={{ display: "flex", gap: "0.5rem", margin: "0.75rem 0", flexWrap: "wrap" }}>
        <AFHDLBadge label={`Even parity: ${evenOrig}`} color={T.green} />
        <AFHDLBadge label={`Odd parity: ${oddOrig}`}  color={T.amber} />
        <AFHDLBadge label={`${oneCount} ones`}          color={T.pink}  />
      </div>

      {/* Error simulator */}
      <AFHDLDivider label="error simulator" />
      <div style={S.sectionTitle}>🧪 Simulate a Bit Error</div>
      <p style={S.body}>
        Click a bit below to inject a single-bit error and see how parity detects it:
      </p>

      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", margin: "0.4rem 0" }}>
        {cBits.split("").map((bit, i) => {
          const flippedBit = flip === i;
          return (
            <button
              key={i}
              onClick={() => setFlip(flip === i ? null : i)}
              style={{
                ...S.bitBtn(flippedBit ? (bit === "1" ? "0" : "1") : bit, flippedBit ? T.red : T.textMuted),
                outline: flippedBit ? `2px solid ${T.red}` : "none",
              }}
              title={flippedBit ? "Click to remove error" : "Click to inject error here"}
            >
              {flippedBit ? (bit === "1" ? "0" : "1") : bit}
            </button>
          );
        })}
      </div>

      {flip !== null && (
        <AFHDLCard title="Error detection result" accent={T.red}>
          <div style={{ display: "grid", gap: "0.35rem" }}>
            <AFHDLDataRow label="Original bits"   value={cBits}    labelColor={T.textSecond} valueColor={T.pink}   />
            <AFHDLDataRow label="With error (bit {flip})" value={testBits} labelColor={T.red}        valueColor={T.red}    />
            <AFHDLDataRow
              label="Even parity — detected?"
              value={evenTest !== evenOrig ? "✅ ERROR CAUGHT" : "❌ Not detected"}
              labelColor={T.green}
              valueColor={evenTest !== evenOrig ? T.green : T.red}
              mono={false}
            />
            <AFHDLDataRow
              label="Odd parity — detected?"
              value={oddTest !== oddOrig ? "✅ ERROR CAUGHT" : "❌ Not detected"}
              labelColor={T.amber}
              valueColor={oddTest !== oddOrig ? T.green : T.red}
              mono={false}
            />
          </div>
          <AFHDLInfoPanel
            icon="ℹ️"
            title="Why parity works"
            content="Any single flipped bit changes the count of 1s from even to odd (or vice versa). The receiver re-computes parity and compares — a mismatch flags an error. Two flipped bits cancel out and go undetected (use CRC for stronger protection)."
            accent={T.cyan}
          />
        </AFHDLCard>
      )}

      <AFHDLDivider label="reference" />

      {/* Usage example */}
      <button
        className="kmap-btn kmap-btn-secondary"
        style={{ width: "100%", marginBottom: "0.35rem" }}
        onClick={() => setShowHelp((v) => !v)}
      >
        {showHelp ? "▲ Hide" : "▼ Show"} Usage example — UART frame
      </button>
      {showHelp && (
        <AFHDLCard title="UART with Even Parity" accent={T.cyan}>
          <p style={S.body}>
            Suppose we transmit the byte <strong style={{ fontFamily: T.fontMono, color: T.blue }}>10110010</strong> (4 ones — even count).
          </p>
          <div style={{ ...S.formula }}>
            {"Data:        1 0 1 1 0 0 1 0  →  four 1s (even)\n"}
            {"Parity bit:  0   (no extra 1 needed to keep count even)\n"}
            {"Transmitted: 1 0 1 1 0 0 1 0 | P=0\n\n"}
            {"If one bit flips in transit (5 ones — odd):\n"}
            {"Receiver sees: odd count → parity error → NACK / re-transmit"}
          </div>
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
            <pre style={{ margin: 0, lineHeight: 1.7 }}>{`// Verilog — parity generator / checker
module parity_gen #(parameter N = 8) (
  input  [N-1:0] data,
  output         even_parity,   // 0 = even, 1 = odd — add to make even
  output         odd_parity     // add to make odd
);
  assign even_parity = ^data;          // XOR reduction
  assign odd_parity  = ~(^data);       // invert
endmodule

// Checker: re-compute over received data + parity bit
module parity_check #(parameter N = 8) (
  input  [N-1:0] data,
  input          parity_bit,
  output         error          // 1 = error detected
);
  assign error = ^{data, parity_bit};  // should be 0 if no error
endmodule`}</pre>
          </div>
        </AFHDLCard>
      )}
    </ToolLayout>
  );
};

export default ParityGenerators;
