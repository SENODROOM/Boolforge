import React, { useState } from "react";
import ToolLayout from "../../components/ToolLayout";

import AFHDLSection   from "./components/AFHDLSection";
import AFHDLCard      from "./components/AFHDLCard";
import AFHDLCardGroup from "./components/AFHDLCardGroup";
import AFHDLBadge     from "./components/AFHDLBadge";
import AFHDLInfoPanel from "./components/AFHDLInfoPanel";
import AFHDLDivider   from "./components/AFHDLDivider";
import AFHDLStepList  from "./components/AFHDLStepList";

import { T, S } from "./styles/theme";
import { arithmeticDescriptions } from "./utils/arithmeticDescriptions";

/* ─── static data ────────────────────────────────────────── */
const BUILDING_BLOCKS = [
  {
    title: "Half Adder",
    accent: T.blue,
    tag: "2 gates",
    desc: "Adds two 1-bit inputs. Produces Sum and Carry. Cannot accept carry-in.",
    formula: "S = A⊕B   Cout = A·B",
    uses: ["LSB of ripple adder", "CRC feedback bits"],
  },
  {
    title: "Full Adder",
    accent: T.violet,
    tag: "5 gates",
    desc: "Adds A, B and Carry-In. The universal building block for all multi-bit arithmetic.",
    formula: "S = A⊕B⊕Cin   Cout = AB + Cin(A⊕B)",
    uses: ["Ripple carry adder", "Carry-lookahead adder", "ALU"],
  },
  {
    title: "Adder / Subtractor",
    accent: T.green,
    tag: "N XOR + adder",
    desc: "A single circuit that adds or subtracts by toggling a Mode bit. Mode=0 adds, Mode=1 subtracts via 2's complement.",
    formula: "Result = A + (B⊕M) + M",
    uses: ["ALU arithmetic unit", "Signed integer ops"],
  },
  {
    title: "Multiplier",
    accent: T.amber,
    tag: "shift-and-add",
    desc: "Generates partial products (one per bit of B), shifts each left, then sums them.",
    formula: "P = Σ (B[i] · A · 2^i)",
    uses: ["DSP units", "FPU mantissa multiply", "Address scaling"],
  },
  {
    title: "Magnitude Comparator",
    accent: T.cyan,
    tag: "XOR + priority",
    desc: "Compares A and B bit-by-bit from MSB. Outputs A>B, A=B, A<B signals.",
    formula: "A>B: first i where A[i]=1, B[i]=0",
    uses: ["Branch conditions", "Sort networks", "Arbiters"],
  },
  {
    title: "Parity Generator",
    accent: T.pink,
    tag: "XOR tree",
    desc: "Computes XOR of all bits. Adds a check bit so the total 1-count is even (or odd).",
    formula: "P = A[0]⊕A[1]⊕…⊕A[n-1]",
    uses: ["RAM ECC", "UART frames", "CAN bus"],
  },
];

const ALU_STEPS = [
  { text: "Input registers A and B hold the operands.", color: T.blue },
  { text: "A 3-bit opcode selects the operation: ADD, SUB, MUL, CMP, …", color: T.violet },
  { text: "The adder/subtractor unit computes A ± B using 2's complement.", color: T.green },
  { text: "Flags (Zero, Carry, Overflow, Sign) are latched after each operation.", color: T.amber },
  { text: "The result is written back to a destination register.", color: T.cyan },
  { text: "The comparator drives branch logic: PC ← target if flag condition met.", color: T.pink },
];

const ADVANCED = [
  "Build an ALU pipeline: input registers → adder/subtractor → barrel shifter → comparator → output register.",
  "Implement overflow detection: signed overflow when Cout[MSB-1] ≠ Cout[MSB].",
  "Add a mode-switch for signed/unsigned arithmetic by controlling sign extension.",
  "Use parity generation on each memory word for single-bit error detection (SECDED with Hamming codes detects and corrects).",
  "Cascade 4-bit comparators to compare 16-bit, 32-bit, or wider operands in O(log n) delay.",
];

/* ─── component ──────────────────────────────────────────── */
const DesignApplications = () => {
  const [showChecklist, setShowChecklist] = useState(false);
  const [showALU,       setShowALU]       = useState(false);

  return (
    <ToolLayout
      title="Design Applications"
      subtitle="Using arithmetic building blocks in real digital systems"
    >
      {/* Summary */}
      <AFHDLSection
        title="From theory to silicon"
        description={arithmeticDescriptions.applications}
        accent={T.green}
      />

      <AFHDLInfoPanel
        icon="🏗️"
        title="Everything connects"
        content="Every modern processor — from a tiny microcontroller to a data-centre CPU — is built from exactly these arithmetic primitives. Understanding them unlocks hardware design, compilers, and performance optimisation."
        accent={T.cyan}
      />

      {/* Building blocks grid */}
      <div style={{ ...S.sectionTitle, marginTop: "1.2rem" }}>🧩 Core Building Blocks</div>
      <AFHDLCardGroup>
        {BUILDING_BLOCKS.map((block) => (
          <AFHDLCard key={block.title} title={block.title} accent={block.accent}>
            <div style={{ marginBottom: "0.5rem" }}>
              <AFHDLBadge label={block.tag} color={block.accent} />
            </div>
            <p style={{ ...S.body, margin: "0 0 0.5rem" }}>{block.desc}</p>
            <div style={{ ...S.formula, padding: "0.35rem 0.65rem", margin: "0 0 0.5rem" }}>
              {block.formula}
            </div>
            <div style={{ fontSize: "0.75rem", color: T.textMuted }}>
              Used in: {block.uses.join(" · ")}
            </div>
          </AFHDLCard>
        ))}
      </AFHDLCardGroup>

      <AFHDLDivider label="system architecture" />

      {/* ALU walkthrough */}
      <button
        className="kmap-btn kmap-btn-secondary"
        style={{ width: "100%", marginBottom: "0.35rem" }}
        onClick={() => setShowALU((v) => !v)}
      >
        {showALU ? "▲ Hide" : "▼ Show"} ALU datapath — step by step
      </button>
      {showALU && (
        <AFHDLCard title="How an ALU works end-to-end" accent={T.violet}>
          <AFHDLStepList steps={ALU_STEPS} />
          <AFHDLInfoPanel
            icon="💡"
            title="Flag register"
            content="The four status flags (N, Z, C, V — Negative, Zero, Carry, oVerflow) let the CPU implement all conditional branches with a single comparator wired to the adder output."
            accent={T.amber}
          />
        </AFHDLCard>
      )}

      {/* Advanced checklist */}
      <button
        className="kmap-btn kmap-btn-secondary"
        style={{ width: "100%", margin: "0.35rem 0" }}
        onClick={() => setShowChecklist((v) => !v)}
      >
        {showChecklist ? "▲ Hide" : "▼ Show"} Advanced design challenges
      </button>
      {showChecklist && (
        <AFHDLCard title="Going further" accent={T.green}>
          <AFHDLStepList steps={ADVANCED.map((t) => ({ text: t, color: T.green }))} />
          <AFHDLInfoPanel
            icon="📚"
            title="Recommended study path"
            content="Half adder → Full adder → Ripple-carry → CLA → Barrel shifter → Multiplier → Divider → Floating-point unit. Each step reuses the previous one."
            accent={T.cyan}
          />
        </AFHDLCard>
      )}
    </ToolLayout>
  );
};

export default DesignApplications;
