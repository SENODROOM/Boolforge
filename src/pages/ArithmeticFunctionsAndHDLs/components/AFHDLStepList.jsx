import React from "react";
import { T } from "../styles/theme";

/**
 * AFHDLStepList
 * Numbered step list with colour-coded bubbles.
 *
 * Props:
 *   steps  — string[] | { text: string, color?: string }[]
 *   accent — string? — bubble colour when steps are plain strings
 */
const AFHDLStepList = ({ steps, accent = T.blue }) => (
  <ol
    style={{
      listStyle: "none",
      padding: 0,
      margin: "0.5rem 0",
      display: "grid",
      gap: "0.5rem",
    }}
  >
    {steps.map((step, idx) => {
      const text  = typeof step === "string" ? step : step.text;
      const color = typeof step === "string" ? accent : (step.color || accent);
      return (
        <li
          key={idx}
          style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}
        >
          {/* Numbered bubble */}
          <span
            style={{
              minWidth: "24px",
              height: "24px",
              borderRadius: "50%",
              background: `${color}1a`,
              border: `1px solid ${color}45`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color,
              fontWeight: 800,
              fontSize: "0.72rem",
              flexShrink: 0,
              marginTop: "2px",
            }}
          >
            {idx + 1}
          </span>
          <span
            style={{
              fontSize: "0.87rem",
              color: T.textSecond,
              lineHeight: 1.65,
              paddingTop: "2px",
            }}
          >
            {text}
          </span>
        </li>
      );
    })}
  </ol>
);

export default AFHDLStepList;
