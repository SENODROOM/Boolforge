import React from "react";
import { T } from "../styles/theme";

/**
 * AFHDLDataRow
 * A single label → value row inside a card or signal panel.
 *
 * Props:
 *   label     — string
 *   value     — string | number
 *   labelColor — string? — override label colour
 *   valueColor — string? — override value colour (default: T.textPrimary)
 *   mono      — bool?   — render value in monospace (default: true)
 *   note      — string? — tiny annotation after the value
 */
const AFHDLDataRow = ({
  label,
  value,
  labelColor = T.blue,
  valueColor = T.textPrimary,
  mono = true,
  note,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: T.bgSurface,
      borderRadius: "6px",
      padding: "0.42rem 0.75rem",
      border: `1px solid ${T.borderFaint}`,
      fontSize: "0.84rem",
    }}
  >
    <span style={{ color: labelColor, fontWeight: 500 }}>{label}</span>
    <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
      <strong
        style={{
          color: valueColor,
          fontFamily: mono ? T.fontMono : T.fontUI,
          fontWeight: 700,
        }}
      >
        {value}
      </strong>
      {note && (
        <span style={{ fontSize: "0.72rem", color: T.textMuted }}>{note}</span>
      )}
    </span>
  </div>
);

export default AFHDLDataRow;
