import React from "react";
import { T } from "../styles/theme";

/**
 * AFHDLChart
 * Renders a vertical bar chart for simple binary metric data.
 *
 * Props:
 *   data   — { label: string, value: number | string }[]
 *   title  — string?
 *   accent — string? — bar fill colour (default: T.blue)
 */
const AFHDLChart = ({ data = [], title = "Binary Metrics", accent = T.blue }) => {
  const numericValues = data.map((d) => Number(d.value)).filter(isFinite);
  const max = numericValues.length ? Math.max(...numericValues) : 1;

  return (
    <div
      className="arithmetic-card"
      style={{
        background: T.bgRaised,
        border: `1px solid ${T.borderMed}`,
        borderRadius: T.radMd,
        padding: "0.9rem 1rem",
        marginTop: "0.5rem",
      }}
    >
      {title && (
        <div
          style={{
            fontSize: "0.76rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: T.textMuted,
            marginBottom: "0.75rem",
          }}
        >
          {title}
        </div>
      )}

      <div style={{ display: "grid", gap: "0.55rem" }}>
        {data.map((item, idx) => {
          const num    = Number(item.value);
          const isNum  = isFinite(num) && max > 0;
          const pct    = isNum ? Math.round((num / max) * 100) : 0;

          return (
            <div key={idx}>
              {/* Label row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.2rem",
                  fontSize: "0.81rem",
                }}
              >
                <span style={{ color: T.textSecond, fontWeight: 500 }}>
                  {item.label}
                </span>
                <strong
                  style={{
                    color: T.textPrimary,
                    fontFamily: T.fontMono,
                    fontSize: "0.83rem",
                  }}
                >
                  {item.value}
                </strong>
              </div>

              {/* Bar (only for numeric values) */}
              {isNum && (
                <div
                  style={{
                    height: "6px",
                    background: T.borderFaint,
                    borderRadius: T.radPill,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: accent,
                      borderRadius: T.radPill,
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AFHDLChart;
