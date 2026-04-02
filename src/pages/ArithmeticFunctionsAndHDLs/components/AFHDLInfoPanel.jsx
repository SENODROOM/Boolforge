import React from "react";
import { T } from "../styles/theme";

/**
 * AFHDLInfoPanel
 * A callout panel for definitions, tips, or contextual notes.
 *
 * Props:
 *   title   — string
 *   content — string | node
 *   accent  — string? — colour used for left border & title (default: T.cyan)
 *   icon    — string? — single emoji displayed before the title
 */
const AFHDLInfoPanel = ({
  title,
  content,
  accent = T.cyan,
  icon,
}) => (
  <div
    className="arithmetic-card"
    style={{
      background: `${accent}07`,
      border: `1px solid ${accent}28`,
      borderLeft: `3px solid ${accent}`,
      borderRadius: T.radSm,
      padding: "0.7rem 0.9rem",
      marginTop: "0.5rem",
    }}
  >
    {title && (
      <h4
        style={{
          margin: "0 0 0.3rem",
          fontSize: "0.82rem",
          fontWeight: 700,
          color: accent,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
        }}
      >
        {icon && <span>{icon}</span>}
        {title}
      </h4>
    )}
    <div
      style={{
        fontSize: "0.87rem",
        color: T.textSecond,
        lineHeight: 1.65,
        margin: 0,
      }}
    >
      {content}
    </div>
  </div>
);

export default AFHDLInfoPanel;
