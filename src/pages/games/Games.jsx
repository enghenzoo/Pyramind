import React from "react";
import { FaTrophy, FaCode, FaBolt } from "react-icons/fa";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import "./Games.css";
import game1Img from "../../assets/game1.png";
import game2Img from "../../assets/game2.png";

/* Game card component */
const GameCard = ({ title, subtitle, img, difficultyDots = 2, progress = 60 }) => {
  return (
    <div className="pm-games-card" role="article" aria-label={title}>
      <div
        className="pm-games-image"
        style={{ backgroundImage: `url(${img})` }}
        aria-hidden="true"
      />
      <div className="pm-games-body">
        <h3 className="pm-games-title">{title}</h3>
        <p className="pm-games-muted muted">{subtitle}</p>

        <div className="pm-games-meta-row">
          <div className="pm-games-label">DIFFICULTY</div>
          <div className="pm-games-dots">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={"pm-games-dot " + (i < difficultyDots ? "active" : "")}
              />
            ))}
          </div>
        </div>

        <div className="pm-games-progress-row">
          <div className="pm-games-label">PROGRESS</div>
          <div className="pm-games-progress">
            <div className="pm-games-progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="pm-games-card-actions">
          <button className="pm-games-play-btn">Play</button>
        </div>
      </div>
    </div>
  );
};

/* Sidebar component */
const Sidebar = () => (
  <aside className="pm-games-sidebar" aria-label="Sidebar">
    <div className="pm-games-profile pm-games-side-card pm-games-hover-glow">
      <div className="pm-games-profile-top">
        <div className="pm-games-avatar">S</div>
        <div>
          <div className="pm-games-name">SYNTHIA</div>
          <div className="pm-games-sub pm-games-muted">Level 12 Codebreaker</div>
        </div>
      </div>
      <div className="pm-games-profile-stats">
        <div>
          <span className="pm-games-stat-title">Code Credits</span>
          <span className="pm-games-stat-value">2,847</span>
        </div>
        <div>
          <span className="pm-games-stat-title">Global Rank</span>
          <span className="pm-games-stat-value">#1,337</span>
        </div>
      </div>
    </div>

    <div className="pm-games-achievements pm-games-side-card">
      <h4>ACHIEVEMENTS</h4>
      <div className="pm-games-ach-grid">
        <div className="pm-games-ach"><FaTrophy /></div>
        <div className="pm-games-ach"><FaCode /></div>
        <div className="pm-games-ach"><FaBolt /></div>
      </div>
    </div>

    <div className="pm-games-top-coders pm-games-side-card pm-games-hover-glow">
      <h4>TOP CODERS</h4>
      <ol className="pm-games-rank-list">
        <li>
          <span className="pm-games-rank">#1</span> QuantumHack3r{" "}
          <span className="pm-games-tiny">15,847</span>
        </li>
        <li>
          <span className="pm-games-rank">#2</span> DataNinja{" "}
          <span className="pm-games-tiny">12,394</span>
        </li>
        <li>
          <span className="pm-games-rank">#3</span> CyberMage{" "}
          <span className="pm-games-tiny">9,876</span>
        </li>
      </ol>
    </div>
  </aside>
);

/* Main Games component */
export default function Games() {
  return (
    <div className="pm-app-root">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="pm-games-site-main">
        <section className="pm-games-hero">
          <div className="pm-games-hero-inner">
            <h1 className="pm-games-hero-title">
              Navigate digital realms and conquer Problem Solving challenges
            </h1>
            <p className="pm-games-hero-sub">
              Play interactive problem solving games that teach real skills.
            </p>
            {/* <div className="pm-games-hero-actions">
              <button className="pm-games-cta">Start Playing</button>
            </div> */}
          </div>
        </section>

        {/* Content */}
        <div className="pm-games-content">
          <section className="pm-games-left-col">
            <div className="pm-games-levels-grid" id="games">
              <GameCard
                title="Game 1: CODE RED"
                subtitle="A high-stakes coding thriller where every bug is a ticking bomb."
                img={game1Img}
                difficultyDots={1}
                progress={45}
              />
              <GameCard
                title="LEVEL 2: CURSE OF THE PHARAOH"
                subtitle="A fast-paced puzzle adventure where every chamber is a race against death."
                img={game2Img}
                difficultyDots={3}
                progress={20}
              />
            </div>
          </section>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
