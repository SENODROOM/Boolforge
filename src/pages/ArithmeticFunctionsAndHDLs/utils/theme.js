/**
 * BoolForge — Arithmetic & HDL Module
 * Central Design Token System
 *
 * Import this wherever you previously used local `S` objects or
 * scattered inline style literals.
 *
 * Usage:
 *   import { T, S } from "../styles/theme";
 *   <div style={S.card}>…</div>
 *   <span style={{ color: T.blue }}>…</span>
 */

/* ─────────────────────────────────────────────
   TOKEN PALETTE
   A dark, circuit-board-inspired palette with
   electric accent colours and crisp contrast.
───────────────────────────────────────────── */
export const T = {
  /* Backgrounds */
  bgBase:    "#080d14",          // page canvas
  bgSurface: "#0f1825",          // card, panel
  bgRaised:  "#16212e",          // elevated widget
  bgSubtle:  "rgba(22,33,46,0.7)",
  bgGlass:   "rgba(15,24,37,0.55)",

  /* Borders */
  borderFaint:  "rgba(148,163,184,0.10)",
  borderMed:    "rgba(148,163,184,0.18)",
  borderStrong: "rgba(148,163,184,0.32)",

  /* Text */
  textPrimary:  "#e8edf5",
  textSecond:   "#94a3b8",
  textMuted:    "#4f6272",
  textCode:     "#a5c3ff",

  /* Accent palette — electric */
  blue:    "#4f9eff",   // primary interactive / A operand
  violet:  "#a78bfa",   // secondary / B operand
  green:   "#34d399",   // success / sum / result
  amber:   "#fbbf24",   // carry / warning
  red:     "#f87171",   // error / borrow / negative
  cyan:    "#22d3ee",   // info / CLA
  pink:    "#f472b6",   // highlight / XOR

  /* Accent alpha variants (for backgrounds) */
  blueAlpha:   "rgba(79,158,255,0.10)",
  violetAlpha: "rgba(167,139,250,0.10)",
  greenAlpha:  "rgba(52,211,153,0.10)",
  amberAlpha:  "rgba(251,191,36,0.10)",
  redAlpha:    "rgba(248,113,113,0.10)",
  cyanAlpha:   "rgba(34,211,238,0.10)",

  /* Typography */
  fontMono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  fontUI:   "'IBM Plex Sans', 'DM Sans', system-ui, sans-serif",

  /* Radii */
  radSm:  "6px",
  radMd:  "10px",
  radLg:  "16px",
  radXl:  "22px",
  radPill:"999px",

  /* Shadows */
  shadowSm: "0 1px 3px rgba(0,0,0,0.5)",
  shadowMd: "0 4px 16px rgba(0,0,0,0.45)",
  shadowLg: "0 8px 32px rgba(0,0,0,0.6)",

  /* Transitions */
  transSnap: "all 0.12s ease",
  transSoft: "all 0.22s ease",
};

/* ─────────────────────────────────────────────
   SHARED STYLE OBJECTS
   These replace the scattered `S` objects that
   previously lived inside each page component.
───────────────────────────────────────────── */
export const S = {
  /* ── Layout ── */
  page: {
    fontFamily: T.fontUI,
    color: T.textPrimary,
    lineHeight: 1.6,
  },

  /* ── Section heading ── */
  sectionTitle: {
    fontSize: "0.82rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: T.textSecond,
    margin: "1.4rem 0 0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },

  /* ── Body copy ── */
  body: {
    color: T.textSecond,
    fontSize: "0.88rem",
    lineHeight: 1.7,
    margin: "0.25rem 0",
  },

  /* ── Cards ── */
  card: {
    background: T.bgRaised,
    border: `1px solid ${T.borderMed}`,
    borderRadius: T.radMd,
    padding: "1rem 1.1rem",
    marginTop: "0.5rem",
    boxShadow: T.shadowSm,
  },

  cardGlow: (color) => ({
    background: T.bgRaised,
    border: `1px solid ${color}35`,
    borderRadius: T.radMd,
    padding: "1rem 1.1rem",
    marginTop: "0.5rem",
    boxShadow: `0 0 0 1px ${color}18, ${T.shadowSm}`,
  }),

  /* ── Result banner ── */
  resultBanner: {
    background: "rgba(79,158,255,0.07)",
    border: `1px solid rgba(79,158,255,0.28)`,
    borderRadius: T.radMd,
    padding: "0.8rem 1.1rem",
    margin: "0.75rem 0",
    boxShadow: "inset 0 1px 0 rgba(79,158,255,0.08)",
  },

  /* ── Formula / monospace block ── */
  formula: {
    background: "rgba(8,13,20,0.85)",
    border: `1px solid ${T.borderMed}`,
    borderLeft: `3px solid ${T.blue}`,
    borderRadius: T.radSm,
    padding: "0.6rem 0.9rem",
    fontFamily: T.fontMono,
    fontSize: "0.82rem",
    color: T.textCode,
    margin: "0.5rem 0",
    lineHeight: 1.9,
  },

  /* ── Code block ── */
  codeBlock: {
    background: "#060b11",
    border: `1px solid ${T.borderFaint}`,
    borderRadius: T.radSm,
    padding: "0.85rem 1rem",
    overflowX: "auto",
    fontFamily: T.fontMono,
    fontSize: "0.78rem",
    color: "#c8d8f0",
    lineHeight: 1.7,
  },

  /* ── Tab panel ── */
  tabPanel: {
    background: T.bgSurface,
    border: `1px solid ${T.borderMed}`,
    borderRadius: `0 ${T.radMd} ${T.radMd} ${T.radMd}`,
    padding: "1.1rem",
    minHeight: "190px",
  },

  /* ── Signal box (single datum display) ── */
  signalBox: (color) => ({
    background: `${color}0d`,
    border: `1px solid ${color}28`,
    borderRadius: T.radSm,
    padding: "0.55rem 0.5rem",
    textAlign: "center",
  }),

  /* ── Concept / selector card ── */
  conceptCard: (color, active = false) => ({
    background: active ? `${color}15` : `${color}08`,
    border: `1px solid ${color}${active ? "50" : "22"}`,
    borderLeft: `3px solid ${color}`,
    borderRadius: T.radSm,
    padding: "0.65rem 0.8rem",
    cursor: "pointer",
    transition: T.transSoft,
    transform: active ? "scale(1.02)" : "scale(1)",
    boxShadow: active ? `0 0 0 2px ${color}30, ${T.shadowSm}` : "none",
  }),

  /* ── Note / callout ── */
  note: (color) => ({
    background: `${color}0e`,
    border: `1px solid ${color}30`,
    borderLeft: `3px solid ${color}`,
    borderRadius: T.radSm,
    padding: "0.55rem 0.8rem",
    fontSize: "0.83rem",
    color: T.textPrimary,
    lineHeight: 1.6,
  }),

  /* ── Interactive bit button ── */
  bitBtn: (bit, color) => ({
    width: "34px",
    height: "34px",
    borderRadius: T.radSm,
    border: `1.5px solid ${bit === "1" ? color : T.borderFaint}`,
    background: bit === "1" ? `${color}18` : T.bgSurface,
    color: bit === "1" ? color : T.textMuted,
    fontWeight: 800,
    fontSize: "0.9rem",
    fontFamily: T.fontMono,
    cursor: "pointer",
    transition: T.transSnap,
    lineHeight: 1,
  }),

  /* ── Tab button ── */
  tabBtn: (active, color) => ({
    padding: "0.42rem 0.9rem",
    borderRadius: `${T.radSm} ${T.radSm} 0 0`,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.78rem",
    letterSpacing: "0.02em",
    background: active ? color : T.bgSurface,
    color: active ? "#fff" : T.textSecond,
    transition: T.transSoft,
    boxShadow: active ? T.shadowSm : "none",
  }),

  /* ── Data row (label / value pair) ── */
  dataRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: T.bgSurface,
    borderRadius: T.radSm,
    padding: "0.42rem 0.75rem",
    border: `1px solid ${T.borderFaint}`,
    fontSize: "0.84rem",
  },

  /* ── Table header row ── */
  tableHead: {
    display: "grid",
    background: "rgba(79,158,255,0.10)",
    borderRadius: T.radSm,
    padding: "0.35rem 0.5rem",
    fontSize: "0.71rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: T.blue,
    textAlign: "center",
  },

  /* ── Table body row ── */
  tableRow: (highlight = false) => ({
    display: "grid",
    background: highlight ? "rgba(99,102,241,0.14)" : T.bgSurface,
    border: `1px solid ${highlight ? "#6366f1" : "transparent"}`,
    borderRadius: "4px",
    padding: "0.3rem 0.5rem",
    fontSize: "0.82rem",
    textAlign: "center",
    color: T.textPrimary,
    transition: T.transSnap,
  }),

  /* ── Quiz option button ── */
  quizOption: (state) => {
    // state: "idle" | "correct" | "wrong" | "missed"
    const map = {
      idle:    { bg: T.bgSurface,                border: T.borderFaint },
      correct: { bg: "rgba(52,211,153,0.12)",    border: T.green },
      wrong:   { bg: "rgba(248,113,113,0.12)",   border: T.red },
      missed:  { bg: "rgba(52,211,153,0.07)",    border: `${T.green}60` },
    };
    const { bg, border } = map[state] || map.idle;
    return {
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: T.radSm,
      padding: "0.55rem 0.9rem",
      color: T.textPrimary,
      textAlign: "left",
      cursor: state === "idle" ? "pointer" : "default",
      fontSize: "0.87rem",
      transition: T.transSoft,
      width: "100%",
    };
  },

  /* ── Badge ── */
  badge: (color) => ({
    display: "inline-block",
    background: `${color}18`,
    color,
    border: `1px solid ${color}40`,
    borderRadius: T.radPill,
    padding: "0.18rem 0.7rem",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.03em",
  }),

  /* ── Progress bar track ── */
  progressTrack: {
    height: "5px",
    background: T.borderFaint,
    borderRadius: T.radPill,
    overflow: "hidden",
    margin: "0.5rem 0 0.9rem",
  },

  /* ── Progress bar fill ── */
  progressFill: (pct, color = T.blue) => ({
    height: "100%",
    width: `${pct}%`,
    background: color,
    borderRadius: T.radPill,
    transition: "width 0.35s ease",
  }),

  /* ── Step number bubble ── */
  stepBubble: (color) => ({
    minWidth: "26px",
    height: "26px",
    borderRadius: "50%",
    background: `${color}20`,
    border: `1px solid ${color}50`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color,
    fontWeight: 800,
    fontSize: "0.75rem",
    flexShrink: 0,
  }),

  /* ── Overflow / carry pill ── */
  overflowPill: {
    background: "rgba(251,191,36,0.12)",
    border: `1px solid ${T.amber}`,
    borderRadius: T.radPill,
    padding: "2px 10px",
    fontSize: "0.72rem",
    color: T.amber,
    fontWeight: 700,
  },

  /* ── Full-width toggle expand button ── */
  expandBtn: {
    width: "100%",
    margin: "0.35rem 0",
    padding: "0.5rem",
    background: T.bgSurface,
    border: `1px solid ${T.borderMed}`,
    borderRadius: T.radSm,
    color: T.textSecond,
    fontSize: "0.83rem",
    cursor: "pointer",
    transition: T.transSoft,
    textAlign: "center",
  },
};
