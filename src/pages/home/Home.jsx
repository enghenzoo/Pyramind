import React from "react";
import {
  FaPlay,
  FaInfoCircle,
  FaDiscord,
  FaTwitter,
  FaPuzzlePiece,
  FaCode,
  FaTrophy,
} from "react-icons/fa";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";


import "./Home.css";

export default function Home() {
  return (
    <div className="home-page text-light">
      <Navbar />

      {/* Hero Section */}
      <div className="hero d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="fw-bold display-3">HACK THE PYRAMIND</h1>
        <h2 className="fw-semibold mt-3">
          Code Your Way Through Worlds of Chaos and Conquest
        </h2>
        <p className="mt-4 w-75">
          Immerse yourself in story-driven coding challenges where every line of
          code shapes your destiny. Battle through cyberpunk realms, solve
          algorithmic puzzles, and become the ultimate digital architect.
        </p>

        <div className="mt-5 d-flex gap-4">
          <button className="btn enter-btn px-4 py-2 fw-bold">
            <FaPlay className="me-2" /> ENTER THE GRID
          </button>

          <a
            href="#features"
            className="btn learn-btn px-4 py-2 fw-bold d-flex align-items-center"
          >
            <FaInfoCircle className="me-2" /> LEARN MORE
          </a>
        </div>
      </div>

      {/* About / Features Section */}
      <section id="features" className="features-section py-5 text-center">
        <h2 className="section-title mb-4">What is PyraMind?</h2>
        <div className="features-container d-flex justify-content-center flex-wrap gap-4">
          <div className="feature-card p-4">
            <FaPuzzlePiece className="feature-icon mb-3" />
            <h5>Story-Driven Coding Challenges</h5>
            <p>
              Immerse yourself in challenges tied to an exciting story, where
              every line of code shapes your destiny.
            </p>
          </div>
          <div className="feature-card p-4">
            <FaCode className="feature-icon mb-3" />
            <h5>Multi-Language Support</h5>
            <p>
              Test your skills in languages like Python, JavaScript, and C++.
            </p>
          </div>
          <div className="feature-card p-4">
            <FaTrophy className="feature-icon mb-3" />
            <h5>Competitive Leaderboards</h5>
            <p>Compete with other programmers and climb the global rankings.</p>
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section id="audience" className="audience-section py-5 text-center">
        <h2 className="section-title mb-4">Who is this platform for?</h2>
        <div className="audience-cards d-flex justify-content-center flex-wrap gap-4">
          <div className="audience-card p-4">
            <h5>Students & Beginners</h5>
            <p>
              A fun and engaging way to learn the basics of algorithms and
              problem-solving.
            </p>
          </div>
          <div className="audience-card p-4">
            <h5>Professional Developers</h5>
            <p>
              A competitive environment to sharpen your skills and prepare for
              technical interviews.
            </p>
          </div>
          <div className="audience-card p-4">
            <h5>Game & Puzzle Enthusiasts</h5>
            <p>
              A unique experience that blends the fun of gaming with mental
              challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="community-section py-5 text-center">
        <h2 className="section-title mb-4">Join the Community</h2>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button className="btn d-flex align-items-center gap-2 px-4 py-2">
            <FaDiscord /> Discord
          </button>
          <button className="btn d-flex align-items-center gap-2 px-4 py-2">
            <FaTwitter /> Twitter
          </button>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="final-cta py-5 text-center">
        <h2 className="section-title mb-4">
          Are you ready to hack the PyraMind?
        </h2>
        <div className="d-flex justify-content-center gap-4 flex-wrap">
          <button className="btn enter-btn px-4 py-2 fw-bold">
            <FaPlay className="me-2" /> ENTER THE GRID
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
