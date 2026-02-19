import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page calculator-container">
      <div className="grid-background" />
      <header className="home-header">
        <div className="home-header-inner">
          <div className="home-brand">
            <span className="home-logo">𝔅</span>
            <div>
              <h1 className="home-title">Boolforge</h1>
              <p className="home-tagline">Your digital logic playground</p>
            </div>
          </div>

          <nav className="home-nav">
            <Link to="/boolforge" className="home-nav-link">Circuit Forge</Link>
            <Link to="/numbersystemcalculator" className="home-nav-link">Number Calculator</Link>
            <Link to="/numberconversation" className="home-nav-link">Base Converter</Link>
            <Link to="/binaryrepresentation" className="home-nav-link">Binary Visualizer</Link>
            <Link to="/significant-digits" className="home-nav-link">Significant Digits</Link>
            <Link to="/bcd-notation" className="home-nav-link">BCD</Link>
            <Link to="/ascii-notation" className="home-nav-link">ASCII</Link>
            <Link to="/bit-extension" className="home-nav-link">Bit Extension</Link>
            <Link to="/kmapgenerator" className="home-nav-link">K‑Map Studio</Link>
            <Link to="/book" className="home-nav-link">Book Problems</Link>
          </nav>
        </div>
      </header>

      <main className="home-main">
        <section className="home-hero" id="top">
          <div className="home-hero-content">
            <h2>Explore, visualize and master digital logic.</h2>
            <p>
              Jump into interactive tools for circuits, Karnaugh maps, number systems,
              and binary arithmetic — all in one smooth experience.
            </p>
            <div className="home-hero-actions">
              <Link to="/boolforge" className="home-primary-btn">
                Start Building Circuits
              </Link>
              <Link to="/numbersystemcalculator" className="home-secondary-btn">
                Try Number Calculator
              </Link>
            </div>
          </div>
        </section>

        <section className="home-grid">
          <article className="home-card">
            <h3>Circuit Forge</h3>
            <p>
              Drag‑and‑drop logic gates, connect wires, and instantly see truth tables and outputs.
            </p>
            <Link to="/boolforge" className="home-card-link">
              Open Circuit Forge →
            </Link>
          </article>

          <article className="home-card">
            <h3>K‑Map Generator</h3>
            <p>
              Generate and simplify boolean expressions visually using interactive Karnaugh maps.
            </p>
            <Link to="/kmapgenerator" className="home-card-link">
              Go to K‑Maps →
            </Link>
          </article>

          <article className="home-card">
            <h3>Number System Tools</h3>
            <p>
              Convert between bases and run detailed step‑by‑step operations across number systems.
            </p>
            <div className="home-card-links">
              <Link to="/numberconversation" className="home-card-link">
                Base Converter
              </Link>
              <Link to="/numbersystemcalculator" className="home-card-link">
                System Calculator
              </Link>
            </div>
          </article>

          <article className="home-card">
            <h3>Binary & Parity</h3>
            <p>
              Visualize binary representations and explore parity bits for error detection.
            </p>
            <div className="home-card-links">
              <Link to="/binaryrepresentation" className="home-card-link">
                Binary Visualizer
              </Link>
              <Link to="/paritybitcalculator" className="home-card-link">
                Parity Calculator
              </Link>
            </div>
          </article>

          <article className="home-card">
            <h3>Bit Converter & Extension</h3>
            <p>
              Inspect, flip, convert and extend bit patterns to different word sizes.
            </p>
            <div className="home-card-links">
              <Link to="/bitconvertor" className="home-card-link">
                Bit Converter
              </Link>
              <Link to="/bit-extension" className="home-card-link">
                Bit Extension
              </Link>
            </div>
          </article>

          <article className="home-card">
            <h3>Number Precision & Codes</h3>
            <p>
              Explore significant digits, BCD, ASCII and how data is encoded numerically.
            </p>
            <div className="home-card-links">
              <Link to="/significant-digits" className="home-card-link">
                Significant Digits
              </Link>
              <Link to="/bcd-notation" className="home-card-link">
                BCD Notation
              </Link>
              <Link to="/ascii-notation" className="home-card-link">
                ASCII Codes
              </Link>
            </div>
          </article>

          <article className="home-card">
            <h3>Book Problem Solver</h3>
            <p>
              Work through curated chapter problems with interactive helpers and visual explanations.
            </p>
            <Link to="/book" className="home-card-link">
              Go to Problems →
            </Link>
          </article>
        </section>
      </main>

      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Boolforge. Built for learning digital logic.</p>
      </footer>
    </div>
  );
};

export default Home;

