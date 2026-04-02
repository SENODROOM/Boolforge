import React from "react";
import { T } from "../styles/theme";

/**
 * AFHDLBadge
 * Small pill label with a tinted background that matches the text colour.
 *
 * Props:
 *   label — string
 *   color — string? — hex accent (default: T.blue)
 */
const AFHDLBadge = ({ label, color = T.blue }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      background: `${color}16`,
      color,
      border: `1px solid ${color}38`,
      borderRadius: T.radPill,
      padding: "0.18rem 0.72rem",
      fontSize: "0.73rem",
      fontWeight: 700,
      letterSpacing: "0.04em",
      marginRight: "0.35rem",
      lineHeight: 1.4,
    }}
  >
    {label}
  </span>
);

export default AFHDLBadge;
