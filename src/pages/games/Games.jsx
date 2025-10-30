import React from "react";
import { FaTrophy, FaCode, FaBolt } from "react-icons/fa";
import "./Games.css";

// assets
import game1Img from "../../assets/game1.png";
import game2Img from "../../assets/game2.png";
import logoImg from "../../assets/Logo.jpg";

/* Navbar component */
const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-transparent py-3 px-4">
    <div className="container-fluid">
      <a
        className="navbar-brand d-flex align-items-center fw-bold brand-text"
        href="#"
      >
        <img src={logoImg} alt="Pyramind Logo" className="Logo me-2" />
        PYRAMIND
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav gap-4">
          {}
          <li className="nav-item">
            <a className="nav-link" href="#description">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#features">
              Games
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#community">
              Community
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#contact">
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#login">
              Login
            </a>
          </li>
        </ul>
        <button className="btn sign-up-btn ms-4 px-4 py-2 fw-bold">
          Sign Up
        </button>
      </div>
    </div>
  </nav>
);

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

/* Sidebar component */
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

/* Main Games component */
export default function Games() {
  return (
    <div className="app-root">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
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

        {/* Content */}
        <div className="content">
          <section className="left-col">
            <div className="levels-grid" id="games">
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
      <footer className="site-footer">
        &copy; {new Date().getFullYear()} PyraMind. All rights reserved.
      </footer>
    </div>
  );
}
