import React from "react";
import { T } from "../styles/theme";

/**
 * AFHDLSection
 * Collapsible (or always-open) named section within a tool page.
 *
 * Props:
 *   title       — string
 *   description — string? — shown below the title as body copy
 *   children    — node
 *   accent      — string? — left-border accent colour
 */
const AFHDLSection = ({
  title,
  description,
  children,
  accent = T.blue,
}) => (
  <section
    className="arithmetic-tools"
    style={{
      marginBottom: "1.1rem",
      paddingLeft: "0.75rem",
      borderLeft: `2px solid ${accent}30`,
    }}
  >
    {title && (
      <h4
        style={{
          margin: "0 0 0.15rem",
          fontSize: "0.9rem",
          fontWeight: 700,
          color: T.textPrimary,
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h4>
    )}
    {description && (
      <p
        style={{
          margin: "0 0 0.5rem",
          fontSize: "0.86rem",
          color: T.textSecond,
          lineHeight: 1.65,
        }}
      >
        {description}
      </p>
    )}
    {children}
  </section>
);

export default AFHDLSection;
