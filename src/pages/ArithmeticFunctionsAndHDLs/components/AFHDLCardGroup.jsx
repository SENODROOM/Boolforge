import React from "react";
import { T } from "../styles/theme";

/**
 * AFHDLCardGroup
 * Responsive grid wrapper for a collection of AFHDLCard components.
 *
 * Props:
 *   children — node
 *   columns  — number? — min column count (default: auto-fit, min 240px)
 */
const AFHDLCardGroup = ({ children, columns }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: columns
        ? `repeat(${columns}, 1fr)`
        : "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "0.75rem",
      margin: "0.75rem 0",
    }}
  >
    {children}
  </div>
);

export default AFHDLCardGroup;
