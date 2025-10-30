import React from "react";
import {
  FaLaptopCode,
  FaServer,
  FaPuzzlePiece,
  FaUsers,
  FaBolt,
} from "react-icons/fa";
import Logo from "../../assets/Logo.jpg";
import "./About.css";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-transparent py-3 px-4">
    <div className="container-fluid">
      <a
        className="navbar-brand d-flex align-items-center fw-bold brand-text"
        href="#"
      >
        <img src={Logo} alt="Pyramind Logo" className="Logo me-2" />
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

const Footer = () => (
  <footer className="footer text-center py-3 text-light mt-5">
    <p>&copy; {new Date().getFullYear()} PyraMind. All rights reserved.</p>
  </footer>
);

const About = () => {
  return (
    <main className="home-page text-light">
      <Navbar />
      {}
      <div className="container">
        {/* Landing Section */}
        <div className="landing-container">
          <h1 className="about-title">PyraMind</h1>
          <h2 className="about-subtitle">
            Solve puzzles, beat the clock, and uncover hidden mysteries.
          </h2>
        </div>

        {/* Game Description */}
        <section id="description" className="about-section">
          <h3 className="about-section-title">GAME DESCRIPTION</h3>
          <p>
            <strong>PyraMind</strong> is an immersive puzzle game designed to
            challenge your mind and sharpen your problem-solving skills. <br />
            Each level brings new challenges, hidden mysteries, and exciting
            puzzles that push players to think critically and creatively.
          </p>
        </section>

        {/* Vision */}
        <section className="about-section">
          <h3 className="about-section-title">VISION</h3>
          <p>
            Our goal is to create a game that’s not only fun but also
            intellectually stimulating a game that helps players improve their
            logical thinking, strategy planning, and cognitive skills while
            enjoying every moment.
          </p>
        </section>

        {/* Key Features */}
        <section id="features" className="about-section">
          <h3 className="about-section-title">KEY FEATURES</h3>
          <div className="about-cards">
            <div className="card cyan" key="puzzle-card">
              <FaPuzzlePiece size={28} color="white" />
              <h4>Challenging Puzzles</h4>
              <p>
                Engage with unique puzzles that test your creativity and
                problem-solving abilities.
              </p>
            </div>
            <div className="card pink" key="challenges-card">
              <FaBolt size={28} color="white" />
              <h4>Time-based Challenges</h4>
              <p>
                Race against the clock to complete levels and achieve the
                highest score.
              </p>
            </div>
            <div className="card cyan" key="community-card">
              <FaUsers size={28} color="white" />
              <h4>Community Play</h4>
              <p>
                Compete with friends and players worldwide for top leaderboard
                positions.
              </p>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="about-section">
          <h3 className="about-section-title">TECHNOLOGY</h3>
          <div className="about-cards">
            <div className="card cyan" key="frontend-card">
              <FaLaptopCode size={28} color="white" />
              <h4>FRONT-END</h4>
              <p>
                Built with <strong>React</strong> for a dynamic, responsive, and
                smooth gaming experience.
              </p>
            </div>
            <div className="card pink" key="backend-card">
              <FaServer size={28} color="white" />
              <h4>BACK-END</h4>
              <p>
                Powered by <strong>.NET</strong> to handle game logic, APIs, and
                data securely and efficiently.
              </p>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="about-section">
          <h3 className="about-section-title">TARGET AUDIENCE</h3>
          <p>
            PyraMind is designed for puzzle lovers, gamers looking for mental
            challenges, and anyone who enjoys problem-solving games from casual
            players to dedicated strategists.
          </p>
        </section>

        {/* Call To Action (CTA) */}
        <div className="buttons">
          <button className="btn cyan" type="button">
            START YOUR JOURNEY
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default About;
