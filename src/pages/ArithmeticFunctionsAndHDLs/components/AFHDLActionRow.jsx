import React from "react";
import { T } from "../styles/theme";

/**
 * AFHDLActionRow
 * Horizontal flex row for action buttons / example presets.
 *
 * Props:
 *   children — node
 *   align    — "start" | "center" | "end" | "between" (default: "start")
 */
const AFHDLActionRow = ({ children, align = "start" }) => {
  const justifyMap = {
    start:   "flex-start",
    center:  "center",
    end:     "flex-end",
    between: "space-between",
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.45rem",
        margin: "0.75rem 0",
        justifyContent: justifyMap[align] || "flex-start",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export default AFHDLActionRow;
