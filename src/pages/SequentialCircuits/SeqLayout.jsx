import React from "react";
import { Link, useLocation } from "react-router-dom";

const seqPages = [
  { path: "/sequential/intro",             label: "Introduction",                 icon: "📡" },
  { path: "/sequential/latches",           label: "Latches",                      icon: "🔒" },
  { path: "/sequential/flip-flops",        label: "Flip-Flops",                   icon: "🔁" },
  { path: "/sequential/flip-flop-types",   label: "Types of Flip-Flops",          icon: "📋" },
  { path: "/sequential/analysis",          label: "Analysis",                     icon: "🔬" },
  { path: "/sequential/design-procedures", label: "Design Procedures",            icon: "🏗️" },
  { path: "/sequential/state-diagram",     label: "State Diagrams & Tables",      icon: "🗺️" },
  { path: "/sequential/state-reduction",   label: "State Reduction & Excitation", icon: "⚡" },
];

const SeqLayout = ({ children, title, subtitle }) => {
  const location = useLocation();
  const currentIndex = seqPages.findIndex((p) => p.path === location.pathname);
  const prev = seqPages[currentIndex - 1];
  const next = seqPages[currentIndex + 1];

  return (
    <div className="seq-layout">

      {/* ── Top bar ── */}
      <div className="seq-topbar">
        <Link to="/" className="seq-back-home">← Back to Home</Link>
        <span className="seq-category-badge">🔁 Sequential Circuits</span>
        <span className="seq-progress">{currentIndex + 1} / {seqPages.length}</span>
      </div>

      <div className="seq-body">

        {/* ── Sidebar ── */}
        <aside className="seq-sidebar">
          <p className="seq-sidebar-heading">SEQUENTIAL CIRCUITS</p>
          <nav className="seq-sidebar-nav">
            {seqPages.map((p, i) => (
              <Link
                key={p.path}
                to={p.path}
                className={`seq-sidebar-link${location.pathname === p.path ? " active" : ""}${i < currentIndex ? " visited" : ""}`}
              >
                <span className="seq-link-icon">{p.icon}</span>
                <span className="seq-link-label">{p.label}</span>
                {i < currentIndex && <span className="seq-link-check">✓</span>}
              </Link>
            ))}
          </nav>
        </aside>

        {/* ── Main ── */}
        <main className="seq-main">
          <div className="seq-page-header">
            <div className="seq-breadcrumb">
              <Link to="/" className="seq-bc-link">Home</Link>
              <span className="seq-bc-sep"> › </span>
              <span>Sequential Circuits</span>
              <span className="seq-bc-sep"> › </span>
              <span className="seq-bc-active">{title}</span>
            </div>
            <h1 className="seq-page-title">{title}</h1>
            {subtitle && <p className="seq-page-subtitle">{subtitle}</p>}
          </div>

          <div className="seq-content-body">{children}</div>

          {/* ── Prev / Next ── */}
          <div className="seq-pagination">
            {prev ? (
              <Link to={prev.path} className="seq-nav-btn">
                <span className="seq-nav-arrow">←</span>
                <span className="seq-nav-text">
                  <span className="seq-nav-hint">Previous</span>
                  <span className="seq-nav-label">{prev.label}</span>
                </span>
              </Link>
            ) : <span />}
            {next ? (
              <Link to={next.path} className="seq-nav-btn seq-nav-right">
                <span className="seq-nav-text">
                  <span className="seq-nav-hint">Next</span>
                  <span className="seq-nav-label">{next.label}</span>
                </span>
                <span className="seq-nav-arrow">→</span>
              </Link>
            ) : (
              <Link to="/" className="seq-nav-btn seq-nav-right seq-nav-done">
                <span className="seq-nav-text">
                  <span className="seq-nav-hint">All done!</span>
                  <span className="seq-nav-label">Back to Home</span>
                </span>
                <span className="seq-nav-arrow">🏠</span>
              </Link>
            )}
          </div>
        </main>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          All styles are scoped inside this component so they don't leak
      ═══════════════════════════════════════════════════════════════════ */}
      <style>{`
        /* Layout */
        .seq-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: radial-gradient(circle at top left, #0f172a 0, #020617 45%, #000 100%);
          color: #e5e7eb;
          font-family: 'Azeret Mono', monospace;
        }

        /* Top bar */
        .seq-topbar {
          position: sticky; top: 0; z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          padding: .75rem 1.5rem;
          backdrop-filter: blur(16px);
          background: linear-gradient(to bottom, rgba(15,23,42,.97), rgba(15,23,42,.88));
          border-bottom: 1px solid rgba(148,163,184,.2);
        }
        .seq-back-home {
          font-size: .82rem; color: #93c5fd; text-decoration: none;
          padding: .3rem .75rem; border-radius: 999px;
          border: 1px solid rgba(59,130,246,.4); background: rgba(15,23,42,.7);
          transition: all .15s ease;
        }
        .seq-back-home:hover { background: rgba(37,99,235,.2); border-color: rgba(59,130,246,.7); color: #bfdbfe; }
        .seq-category-badge {
          font-size: .75rem; letter-spacing: .1em; text-transform: uppercase;
          color: #818cf8; background: rgba(99,102,241,.12);
          border: 1px solid rgba(99,102,241,.35);
          padding: .3rem .9rem; border-radius: 999px;
        }
        .seq-progress { font-size: .75rem; color: #6b7280; font-variant-numeric: tabular-nums; }

        /* Body */
        .seq-body { display: flex; flex: 1; }

        /* Sidebar */
        .seq-sidebar {
          width: 250px; flex-shrink: 0;
          background: rgba(15,23,42,.55);
          border-right: 1px solid rgba(148,163,184,.12);
          padding: 1.5rem 0 2rem;
          position: sticky; top: 48px;
          height: calc(100vh - 48px); overflow-y: auto;
        }
        .seq-sidebar-heading {
          font-size: .65rem; letter-spacing: .15em; color: #4b5563;
          padding: 0 1.2rem .65rem; margin: 0;
          border-bottom: 1px solid rgba(148,163,184,.08); margin-bottom: .4rem;
        }
        .seq-sidebar-nav { display: flex; flex-direction: column; gap: 2px; padding: 0 .5rem; }
        .seq-sidebar-link {
          display: flex; align-items: center; gap: .55rem;
          padding: .52rem .75rem; font-size: .8rem; color: #9ca3af;
          text-decoration: none; border-radius: .5rem;
          border: 1px solid transparent; transition: all .15s ease;
        }
        .seq-sidebar-link:hover { color: #e5e7eb; background: rgba(37,99,235,.1); border-color: rgba(59,130,246,.2); }
        .seq-sidebar-link.active { color: #bfdbfe; background: rgba(37,99,235,.18); border-color: rgba(59,130,246,.45); font-weight: 600; }
        .seq-sidebar-link.visited { color: #6b7280; }
        .seq-link-icon { font-size: .88rem; flex-shrink: 0; }
        .seq-link-label { flex: 1; line-height: 1.3; }
        .seq-link-check { font-size: .68rem; color: #10b981; flex-shrink: 0; }

        /* Main */
        .seq-main { flex: 1; min-width: 0; padding: 2.5rem 3rem 4rem; max-width: 860px; }

        /* Breadcrumb */
        .seq-breadcrumb {
          display: flex; align-items: center; gap: .35rem;
          font-size: .75rem; color: #6b7280; margin-bottom: .9rem;
        }
        .seq-bc-link { color: #60a5fa; text-decoration: none; }
        .seq-bc-link:hover { text-decoration: underline; }
        .seq-bc-sep { color: #374151; }
        .seq-bc-active { color: #d1d5db; }

        /* Page header */
        .seq-page-header {
          margin-bottom: 2.25rem; padding-bottom: 1.4rem;
          border-bottom: 1px solid rgba(148,163,184,.12);
        }
        .seq-page-title {
          font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 700;
          color: #f9fafb; margin: 0 0 .5rem; letter-spacing: -.02em;
        }
        .seq-page-subtitle { font-size: .9rem; color: #9ca3af; margin: 0; line-height: 1.65; max-width: 600px; }

        /* ─── Content typography ─── */
        .seq-content-body h2 {
          font-size: 1.05rem; font-weight: 600; color: #93c5fd;
          margin: 2rem 0 .7rem; padding-bottom: .4rem;
          border-bottom: 1px solid rgba(59,130,246,.18);
        }
        .seq-content-body h2:first-child { margin-top: 0; }
        .seq-content-body p { font-size: .9rem; line-height: 1.8; color: #9ca3af; margin-bottom: .85rem; }
        .seq-content-body strong { color: #e5e7eb; }
        .seq-content-body em { color: #bfdbfe; font-style: normal; font-weight: 600; }
        .seq-content-body ul, .seq-content-body ol { padding-left: 1.4rem; margin-bottom: 1rem; }
        .seq-content-body li { font-size: .9rem; line-height: 1.75; color: #9ca3af; margin-bottom: .2rem; }
        .seq-content-body li strong { color: #e5e7eb; }

        /* ─── Callout boxes ─── */
        .seq-box {
          border-radius: .75rem; padding: 1rem 1.2rem; margin: 1.25rem 0;
          border: 1px solid rgba(99,102,241,.3); background: rgba(99,102,241,.08);
        }
        .seq-box.info  { border-color: rgba(59,130,246,.35);  background: rgba(37,99,235,.09); }
        .seq-box.warning { border-color: rgba(245,158,11,.4); background: rgba(245,158,11,.07); }
        .seq-box p { margin: 0; font-size: .88rem; }
        .seq-box-title {
          font-size: .68rem !important; letter-spacing: .12em; font-weight: 700 !important;
          text-transform: uppercase; color: #818cf8 !important; margin-bottom: .5rem !important;
        }
        .seq-box.info .seq-box-title    { color: #60a5fa !important; }
        .seq-box.warning .seq-box-title { color: #f59e0b !important; }
        .seq-box.warning p              { color: #fbbf24 !important; }

        /* ─── Tables ─── */
        .seq-table-wrap {
          overflow-x: auto; margin: 1.25rem 0;
          border-radius: .75rem; border: 1px solid rgba(148,163,184,.12);
        }
        .seq-table { width: 100%; border-collapse: collapse; font-size: .8rem; font-family: 'JetBrains Mono','Courier New',monospace; }
        .seq-table th {
          background: rgba(30,41,59,.9); color: #93c5fd;
          padding: .6rem 1rem; text-align: center;
          border-bottom: 1px solid rgba(59,130,246,.25);
          border-right: 1px solid rgba(148,163,184,.08);
          font-size: .72rem; letter-spacing: .05em; white-space: nowrap;
        }
        .seq-table td {
          background: rgba(15,23,42,.45); color: #d1d5db;
          padding: .55rem 1rem; text-align: center;
          border-bottom: 1px solid rgba(148,163,184,.06);
          border-right: 1px solid rgba(148,163,184,.06);
        }
        .seq-table tr:last-child td { border-bottom: none; }
        .seq-table tr:hover td { background: rgba(37,99,235,.07); }

        /* ─── SVG diagram wrapper ─── */
        .seq-diagram {
          background: rgba(15,23,42,.65); border: 1px solid rgba(148,163,184,.14);
          border-radius: .75rem; padding: 1.4rem; margin: 1.25rem 0; text-align: center;
        }
        .seq-diagram svg { max-width: 100%; height: auto; }
        .seq-diagram-caption { font-size: .75rem; color: #6b7280; margin-top: .65rem; font-style: italic; }

        /* ─── Simulator (shared across child pages) ─── */
        .seq-sim, .seq-sim-mini {
          background: rgba(30,41,59,.7); border: 1px solid rgba(148,163,184,.2);
          border-radius: .75rem; padding: 1.2rem 1.4rem; margin: 1.25rem 0;
        }
        .seq-sim-title {
          font-size: .68rem !important; letter-spacing: .12em; text-transform: uppercase;
          color: #60a5fa !important; margin: 0 0 1rem !important;
        }
        .seq-sim-inputs { display: flex; gap: 1.25rem; margin-bottom: 1rem; flex-wrap: wrap; align-items: center; }
        .seq-sim-label { display: flex; align-items: center; gap: .6rem; font-size: .85rem; color: #e5e7eb; cursor: pointer; }
        .seq-sim-toggle {
          width: 44px; height: 26px; border-radius: 6px; border: 2px solid;
          font-size: .82rem; font-weight: 700; cursor: pointer;
          font-family: 'JetBrains Mono',monospace; transition: all .15s ease;
        }
        .seq-sim-toggle.on  { background: rgba(16,185,129,.15); border-color: #10b981; color: #10b981; }
        .seq-sim-toggle.off { background: rgba(55,65,81,.4);    border-color: #374151; color: #6b7280;  }
        .seq-clk-btn {
          padding: .38rem .9rem; background: rgba(37,99,235,.15); border: 2px solid rgba(59,130,246,.5);
          border-radius: 6px; color: #60a5fa; font-size: .8rem; font-weight: 700;
          cursor: pointer; font-family: 'JetBrains Mono',monospace; transition: all .15s ease;
        }
        .seq-clk-btn:hover { background: rgba(37,99,235,.28); }
        .seq-sim-output {
          background: rgba(15,23,42,.6); border-radius: .5rem;
          padding: .8rem 1rem; border: 1px solid rgba(16,185,129,.22);
          display: flex; flex-direction: column; gap: .3rem;
        }
        .seq-sim-output.invalid { border-color: rgba(239,68,68,.4); background: rgba(239,68,68,.06); }
        .seq-out-label { font-size: .8rem; color: #6b7280; margin-right: .4rem; font-family: 'JetBrains Mono',monospace; }
        .seq-out-val   { font-size: .95rem; font-weight: 700; color: #10b981; font-family: 'JetBrains Mono',monospace; }
        .seq-sim-output.invalid .seq-out-val { color: #ef4444; }
        .seq-sim-state {
          margin-top: .35rem; font-size: .7rem; letter-spacing: .08em;
          text-transform: uppercase; color: #60a5fa;
        }
        .seq-sim-output.invalid .seq-sim-state { color: #ef4444; }

        /* ─── Pagination ─── */
        .seq-pagination {
          display: flex; justify-content: space-between; gap: 1rem;
          margin-top: 3rem; padding-top: 1.5rem;
          border-top: 1px solid rgba(148,163,184,.1);
        }
        .seq-nav-btn {
          display: inline-flex; align-items: center; gap: .75rem;
          padding: .7rem 1rem; font-size: .82rem; text-decoration: none;
          border: 1px solid rgba(148,163,184,.22); border-radius: .75rem;
          color: #9ca3af; background: rgba(30,41,59,.55);
          transition: all .15s ease; max-width: 260px;
        }
        .seq-nav-btn:hover { border-color: rgba(59,130,246,.5); color: #bfdbfe; background: rgba(37,99,235,.1); }
        .seq-nav-right { margin-left: auto; }
        .seq-nav-done { border-color: rgba(16,185,129,.3); }
        .seq-nav-done:hover { border-color: rgba(16,185,129,.6); }
        .seq-nav-text { display: flex; flex-direction: column; gap: .12rem; }
        .seq-nav-hint  { font-size: .65rem; letter-spacing: .1em; text-transform: uppercase; color: #4b5563; }
        .seq-nav-label { font-size: .8rem; font-weight: 600; }
        .seq-nav-arrow { font-size: .95rem; color: #4b5563; flex-shrink: 0; }
        .seq-nav-btn:hover .seq-nav-arrow { color: #60a5fa; }

        /* ─── Responsive ─── */
        @media (max-width: 900px) {
          .seq-sidebar { display: none; }
          .seq-main { padding: 1.5rem 1.25rem 3rem; }
        }
        @media (max-width: 480px) {
          .seq-topbar { flex-wrap: wrap; gap: .5rem; }
          .seq-progress { display: none; }
          .seq-page-title { font-size: 1.3rem; }
          .seq-main { padding: 1.2rem 1rem 2.5rem; }
        }
      `}</style>
    </div>
  );
};

export default SeqLayout;
