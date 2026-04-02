import React from "react";
import { T } from "../styles/theme";

/**
 * AFHDLToggle
 * A styled checkbox toggle.
 *
 * Props:
 *   checked  — bool
 *   label    — string
 *   onChange — function
 *   accent   — string? — checked state colour (default: T.blue)
 */
const AFHDLToggle = ({ checked, label, onChange, accent = T.blue }) => (
  <label
    className="arithmetic-toggle"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.55rem",
      cursor: "pointer",
      userSelect: "none",
      fontSize: "0.87rem",
      color: checked ? T.textPrimary : T.textSecond,
      fontWeight: checked ? 600 : 400,
      transition: T.transSnap,
    }}
  >
    {/* Hidden native checkbox */}
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
    />

    {/* Custom visual toggle track */}
    <span
      style={{
        position: "relative",
        display: "inline-block",
        width: "36px",
        height: "20px",
        borderRadius: T.radPill,
        background: checked ? accent : T.bgRaised,
        border: `1.5px solid ${checked ? accent : T.borderMed}`,
        transition: T.transSoft,
        flexShrink: 0,
      }}
    >
      {/* Thumb */}
      <span
        style={{
          position: "absolute",
          top: "2px",
          left: checked ? "18px" : "2px",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: checked ? "#fff" : T.textMuted,
          transition: T.transSoft,
          boxShadow: T.shadowSm,
        }}
      />
    </span>

    {label}
  </label>
);

export default AFHDLToggle;
