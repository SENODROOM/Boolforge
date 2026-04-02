import React from "react";
import { T } from "../styles/theme";

/**
 * AFHDLInput
 * A labelled binary-input field.
 *
 * Props:
 *   label     — string
 *   value     — string
 *   onChange  — function
 *   accent    — string? — focus ring colour (default: T.blue)
 *   hint      — string? — small helper text below the input
 */
const AFHDLInput = ({
  label,
  value,
  onChange,
  accent = T.blue,
  hint,
}) => (
  <div style={{ marginBottom: "0.9rem" }}>
    <label
      style={{
        display: "block",
        color: T.textSecond,
        fontSize: "0.79rem",
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        marginBottom: "0.3rem",
      }}
    >
      {label}
    </label>
    <input
      className="tool-input"
      value={value}
      onChange={onChange}
      spellCheck={false}
      autoComplete="off"
      style={{
        width: "100%",
        boxSizing: "border-box",
        background: T.bgSurface,
        border: `1.5px solid ${T.borderMed}`,
        borderRadius: T.radSm,
        color: accent,
        fontFamily: T.fontMono,
        fontSize: "0.92rem",
        fontWeight: 600,
        padding: "0.42rem 0.65rem",
        outline: "none",
        transition: T.transSnap,
        /* focus ring via CSS class; override border on focus with JS if needed */
      }}
    />
    {hint && (
      <span
        style={{
          display: "block",
          marginTop: "0.2rem",
          fontSize: "0.72rem",
          color: T.textMuted,
        }}
      >
        {hint}
      </span>
    )}
  </div>
);

export default AFHDLInput;
