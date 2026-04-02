import React from "react";
import { T } from "../styles/theme";

/**
 * AFHDLFieldGroup
 * Wraps a labelled input or control with consistent vertical spacing.
 *
 * Props:
 *   label    — string
 *   children — node
 *   hint     — string? — tiny helper text below children
 */
const AFHDLFieldGroup = ({ label, children, hint }) => (
  <div style={{ marginBottom: "0.9rem" }}>
    {label && (
      <div
        style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: T.textSecond,
          marginBottom: "0.3rem",
        }}
      >
        {label}
      </div>
    )}
    {children}
    {hint && (
      <div
        style={{
          marginTop: "0.2rem",
          fontSize: "0.71rem",
          color: T.textMuted,
          lineHeight: 1.4,
        }}
      >
        {hint}
      </div>
    )}
  </div>
);

export default AFHDLFieldGroup;
