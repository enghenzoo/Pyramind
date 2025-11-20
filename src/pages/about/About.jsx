import React from "react";
import Navbar from "../../Components/Navbar"; // Navbar component
import Footer from "../../Components/Footer"; // Footer component

// Import icons from react-icons
import {
  FaLaptopCode,
  FaServer,
  FaPuzzlePiece,
  FaUsers,
  FaBolt,
} from "react-icons/fa";
import "./About.css"; // About page styles
import { Link } from "react-router-dom"; // Link component for navigation

const About = () => {
  return (
    <main className="home-page text-light">
      <Navbar /> {/* Display Navbar */}

      <div className="container">
        {/* Landing Section with game name and tagline */}
        <div className="landing-container">
          <h1 className="about-title">PyraMind</h1>
          <h2 className="about-subtitle">
            Solve puzzles, beat the clock, and uncover hidden mysteries.
          </h2>
        </div>

        {/* Game Description Section */}
        <section id="description" className="about-section">
          <h3 className="about-section-title">GAME DESCRIPTION</h3>
          <p>
            <strong>PyraMind</strong> is an immersive puzzle game designed to
            challenge your mind and sharpen your problem-solving skills. <br />
            Each level brings new challenges, hidden mysteries, and exciting
            puzzles that push players to think critically and creatively.
          </p>
        </section>

        {/* Vision Section */}
        <section className="about-section">
          <h3 className="about-section-title">VISION</h3>
          <p>
            Our goal is to create a game that’s not only fun but also
            intellectually stimulating—a game that helps players improve their
            logical thinking, strategy planning, and cognitive skills while
            enjoying every moment.
          </p>
        </section>

        {/* Key Features Section */}
        <section id="features" className="about-section">
          <h3 className="about-section-title">KEY FEATURES</h3>
          <div className="about-cards">
            {/* Puzzle feature card */}
            <div className="card cyan" key="puzzle-card">
              <FaPuzzlePiece size={28} color="white" />
              <h4>Challenging Puzzles</h4>
              <p>
                Engage with unique puzzles that test your creativity and
                problem-solving abilities.
              </p>
            </div>

            {/* Time challenge feature card */}
            <div className="card pink" key="challenges-card">
              <FaBolt size={28} color="white" />
              <h4>Time-based Challenges</h4>
              <p>
                Race against the clock to complete levels and achieve the
                highest score.
              </p>
            </div>

            {/* Community play feature card */}
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

        {/* Technology Section */}
        <section className="about-section">
          <h3 className="about-section-title">TECHNOLOGY</h3>
          <div className="about-cards">
            {/* Frontend card */}
            <div className="card cyan" key="frontend-card">
              <FaLaptopCode size={28} color="white" />
              <h4>FRONT-END</h4>
              <p>
                Built with <strong>React</strong> for a dynamic, responsive, and
                smooth gaming experience.
              </p>
            </div>

            {/* Backend card is commented out for now */}
            {/* <div className="card pink" key="backend-card">
              <FaServer size={28} color="white" />
              <h4>BACK-END</h4>
              <p>
                Powered by <strong>.NET</strong> to handle game logic, APIs, and
                data securely and efficiently.
              </p>
            </div> */}
          </div>
        </section>

        {/* Target Audience Section */}
        <section className="about-section">
          <h3 className="about-section-title">TARGET AUDIENCE</h3>
          <p>
            PyraMind is designed for puzzle lovers, gamers looking for mental
            challenges, and anyone who enjoys problem-solving games — from
            casual players to dedicated strategists.
          </p>
        </section>

        {/* Call To Action (CTA) */}
        <div className="about-button">
          <Link className="btn cyan" to="/games">
            START YOUR JOURNEY
          </Link>
        </div>
      </div>

      <Footer /> {/* Display Footer */}
    </main>
  );
};

export default About;
