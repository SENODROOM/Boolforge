import React from "react";
import { T } from "../styles/theme";

/**
 * AFHDLCard
 * A polished surface for grouping related content.
 *
 * Props:
 *   title    — string  — bold heading at the top
 *   subtitle — string? — lighter sub-line below the title
 *   accent   — string? — hex colour that tints the top border (default: T.blue)
 *   children — node
 */
const AFHDLCard = ({ title, subtitle, accent = T.blue, children }) => (
  <div
    className="arithmetic-card"
    style={{
      background: T.bgRaised,
      border: `1px solid ${T.borderMed}`,
      borderTop: `2px solid ${accent}`,
      borderRadius: T.radMd,
      padding: "1rem 1.1rem",
      marginTop: "0.6rem",
      boxShadow: T.shadowSm,
    }}
  >
    {title && (
      <h3
        style={{
          margin: "0 0 0.2rem",
          fontSize: "0.95rem",
          fontWeight: 700,
          color: T.textPrimary,
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h3>
    )}
    {subtitle && (
      <p
        style={{
          margin: "0 0 0.6rem",
          fontSize: "0.8rem",
          color: T.textSecond,
          lineHeight: 1.5,
        }}
      >
        {subtitle}
      </p>
    )}
    <div>{children}</div>
  </div>
);

export default AFHDLCard;
