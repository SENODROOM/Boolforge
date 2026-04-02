import React, { useState } from "react";
import { T, S } from "../styles/theme";

/**
 * AFHDLQuiz
 * Self-contained quiz widget. Eliminates the duplicated quiz block
 * that previously lived inside every page component.
 *
 * Props:
 *   questions — { q: string, opts: string[], ans: number }[]
 *   accent    — string? — progress bar + score colour (default: T.blue)
 *   thresholds — { excellent: number, good: number }? — score thresholds
 */
const AFHDLQuiz = ({
  questions = [],
  accent = T.blue,
  thresholds = { excellent: 0.8, good: 0.5 },
}) => {
  const [active,  setActive]  = useState(false);
  const [idx,     setIdx]     = useState(0);
  const [answer,  setAnswer]  = useState(null);   // selected option index
  const [score,   setScore]   = useState(0);
  const [done,    setDone]    = useState(false);

  const reset = () => {
    setIdx(0);
    setAnswer(null);
    setScore(0);
    setDone(false);
  };

  const handleAnswer = (i) => {
    if (answer !== null) return;
    setAnswer(i);
    if (i === questions[idx].ans) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setAnswer(null);
    }
  };

  const pct = questions.length ? (idx / questions.length) * 100 : 0;
  const ratio = questions.length ? score / questions.length : 0;

  /* ── Not started ─────────────────────────────────────────── */
  if (!active) {
    return (
      <button
        className="kmap-btn"
        onClick={() => { reset(); setActive(true); }}
        style={{ marginTop: "0.5rem" }}
      >
        Start Quiz ({questions.length} questions)
      </button>
    );
  }

  /* ── Results ─────────────────────────────────────────────── */
  if (done) {
    const emoji =
      ratio >= thresholds.excellent ? "🎉" :
      ratio >= thresholds.good      ? "👍" : "📚";
    const label =
      ratio >= thresholds.excellent ? "Excellent!" :
      ratio >= thresholds.good      ? "Good job!"  : "Keep practising!";

    return (
      <div style={S.card}>
        {/* Score header */}
        <div
          style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: T.green,
            marginBottom: "0.3rem",
          }}
        >
          {emoji} {label}
        </div>
        <p style={{ color: T.textSecond, margin: "0 0 0.6rem" }}>
          Score:{" "}
          <strong style={{ color: T.green }}>
            {score} / {questions.length}
          </strong>
        </p>

        {/* Score bar */}
        <div style={S.progressTrack}>
          <div
            style={S.progressFill(
              Math.round((score / questions.length) * 100),
              ratio >= thresholds.excellent ? T.green :
              ratio >= thresholds.good      ? T.amber : T.red
            )}
          />
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.6rem" }}>
          <button
            className="kmap-btn"
            onClick={() => { reset(); setActive(true); }}
          >
            Try again
          </button>
          <button
            className="kmap-btn kmap-btn-secondary"
            onClick={() => { reset(); setActive(false); }}
          >
            Exit quiz
          </button>
        </div>
      </div>
    );
  }

  /* ── Active question ─────────────────────────────────────── */
  const q = questions[idx];

  return (
    <div style={S.card}>
      {/* Progress header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.4rem",
          fontSize: "0.78rem",
        }}
      >
        <span style={{ color: T.textSecond }}>
          Question {idx + 1} / {questions.length}
        </span>
        <span style={{ color: T.green, fontWeight: 700 }}>
          Score: {score}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ ...S.progressTrack, marginBottom: "0.9rem" }}>
        <div style={S.progressFill(pct, accent)} />
      </div>

      {/* Question text */}
      <div
        style={{
          color: T.textPrimary,
          fontWeight: 600,
          fontSize: "0.92rem",
          lineHeight: 1.55,
          marginBottom: "0.75rem",
        }}
      >
        {q.q}
      </div>

      {/* Options */}
      <div style={{ display: "grid", gap: "0.42rem" }}>
        {q.opts.map((opt, i) => {
          const isCorrect = i === q.ans;
          const selected  = answer === i;
          let state = "idle";
          if (answer !== null) {
            if (isCorrect)        state = "correct";
            else if (selected)    state = "wrong";
          }

          return (
            <button
              key={i}
              disabled={answer !== null}
              onClick={() => handleAnswer(i)}
              style={S.quizOption(state)}
            >
              {answer !== null && (
                <span style={{ marginRight: "0.35rem" }}>
                  {isCorrect ? "✅" : selected ? "❌" : ""}
                </span>
              )}
              {opt}
            </button>
          );
        })}
      </div>

      {/* Next / results button */}
      {answer !== null && (
        <button
          className="kmap-btn"
          style={{ marginTop: "0.75rem", width: "100%" }}
          onClick={next}
        >
          {idx + 1 >= questions.length ? "See Results →" : "Next →"}
        </button>
      )}
    </div>
  );
};

export default AFHDLQuiz;
