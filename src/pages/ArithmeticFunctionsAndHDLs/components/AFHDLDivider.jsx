import React from "react";
import { T } from "../styles/theme";

/**
 * AFHDLDivider
 * A subtle horizontal rule with optional centre label.
 *
 * Props:
 *   label — string? — text shown centred on the line
 */
const AFHDLDivider = ({ label }) => {
  if (!label) {
    return (
      <hr
        style={{
          border: "none",
          borderTop: `1px solid ${T.borderFaint}`,
          margin: "1.2rem 0",
        }}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        margin: "1.2rem 0",
      }}
    >
      <span
        style={{
          flex: 1,
          height: "1px",
          background: T.borderFaint,
        }}
      />
      <span
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: T.textMuted,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span
        style={{
          flex: 1,
          height: "1px",
          background: T.borderFaint,
        }}
      />
    </div>
  );
};

export default AFHDLDivider;
