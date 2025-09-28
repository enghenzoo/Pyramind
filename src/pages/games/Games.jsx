import { FaTrophy, FaCode, FaBolt } from "react-icons/fa";
import React from "react";
import "./Games.css";

/* Game card component */
const GameCard = ({
  title,
  subtitle,
  img,
  difficultyDots = 2,
  progress = 60,
}) => {
  return (
    <div className="game-card" role="article" aria-label={title}>
      <div
        className="game-image"
        style={{ backgroundImage: `url(${img})` }}
        aria-hidden="true"
      />
      <div className="game-body">
        <h3 className="game-title">{title}</h3>
        <p className="muted">{subtitle}</p>

        <div className="meta-row">
          <div className="label">DIFFICULTY</div>
          <div className="dots">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={"dot " + (i < difficultyDots ? "active" : "")}
              />
            ))}
          </div>
        </div>

        <div className="progress-row">
          <div className="label">PROGRESS</div>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="card-actions">
          <button className="play-btn">Play</button>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => (
  <aside className="sidebar" aria-label="Sidebar">
    <div className="profile card hover-glow">
      <div className="profile-top">
        <div className="avatar">S</div>
        <div>
          <div className="name">SYNTHIA</div>
          <div className="sub muted">Level 12 Codebreaker</div>
        </div>
      </div>
      <div className="profile-stats">
        <div>
          <span className="stat-title">Code Credits</span>
          <span className="stat-value">2,847</span>
        </div>
        <div>
          <span className="stat-title">Global Rank</span>
          <span className="stat-value">#1,337</span>
        </div>
      </div>
    </div>
    <div className="achievements card">
      <h4>ACHIEVEMENTS</h4>
      <div className="ach-grid">
        <div className="ach">
          <FaTrophy />
        </div>
        <div className="ach">
          <FaCode />
        </div>
        <div className="ach">
          <FaBolt />
        </div>
      </div>
    </div>
    <div className="top-coders card hover-glow">
      <h4>TOP CODERS</h4>
      <ol className="rank-list">
        <li>
          <span className="rank">#1</span> QuantumHack3r{" "}
          <span className="tiny">15,847</span>
        </li>
        <li>
          <span className="rank">#2</span> DataNinja{" "}
          <span className="tiny">12,394</span>
        </li>
        <li>
          <span className="rank">#3</span> CyberMage{" "}
          <span className="tiny">9,876</span>
        </li>
      </ol>
    </div>
  </aside>
);

export default function Games() {
  // Use images from public folder (exact filenames)
  const game1Img = "/game1.png";
  const game2Img = "/game2.png";

  return (
    <div className="app-root">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <img src="/logo.jpg" alt="PyraMind Logo" className="logo" />
            <span className="brand-text">PyraMind</span>
          </div>
          <nav className="main-nav">
            <a href="#games">Games</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <section className="hero">
          <div className="hero-inner">
            <h1 className="hero-title neon-glow">
              Navigate digital realms and conquer Problem Solving challenges
            </h1>

            <p className="hero-sub">
              Play interactive problem solving games that teach real skills.
            </p>
            <div className="hero-actions">
              <button className="cta">Start Playing</button>
            </div>
          </div>
        </section>

        <div className="content">
          <section className="left-col">
            <div className="levels-grid" id="games">
              <GameCard
                title="Game 1: CODE RED"
                subtitle="A high-stakes coding thriller where every bug is a ticking bomb. Race against a relentless countdown as you crack puzzles, hack systems, and defuse disasters using nothing but logic and code. One wrong move costs precious seconds—too many mistakes, and it all blows up."
                img={game1Img}
                difficultyDots={1}
                progress={45}
              />
              <GameCard
                title="LEVEL 2: CURSE OF THE PHARAOH"
                subtitle="a fast-paced puzzle adventure where every chamber is a race against death. Solve riddles and coded locks before the ceiling crashes down or sand fills the room. With each level, the puzzles grow harder, the traps deadlier, and the mystery of the Pharaoh’s tomb closer to being revealed."
                img={game2Img}
                difficultyDots={3}
                progress={20}
              />
            </div>
          </section>

          <Sidebar />
        </div>
      </main>

      <footer className="site-footer">
        <div>
          &copy; {new Date().getFullYear()} PyraMind. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
