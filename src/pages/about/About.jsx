import React from "react";
import "./About.css";
import { FaLaptopCode } from "react-icons/fa";
import { FaServer } from "react-icons/fa";

const About = () => {
  return (
    <div className="landing-container">
      <h1 className="about-title">PyraMind</h1>
      <h2 className="about-subtitle">
        Solve puzzles, beat the clock, and uncover hidden mysteries.
      </h2>

      {/* About */}
      <section className="about-section">
        <h3 className="about-section-title">ABOUT PYRAMIND</h3>
        <p>
          PyraMind is a fully interactive puzzle game designed to challenge
          players’ problem-solving and logical thinking skills through a series
          of progressive levels.
        </p>
      </section>

      {/* Engaging Design */}
      <section className="about-section">
        <h3 className="about-section-title">ENGAGING DESIGN</h3>
        <p>
          The game combines an engaging design with a smooth functionality,
          offering unique experiences. Solve key challenges as levels progress,
          ensuring gameplay remains mentally stimulating.
        </p>
      </section>

      {/* Technology */}
      <section className="about-section">
        <h3 className="about-section-title">TECHNOLOGY</h3>
        <div className="about-cards">
          <div className="card cyan">
            <FaLaptopCode size={28} />
            <h4>FRONT-END</h4>
            <p>Modern React interface for a dynamic responsive UI.</p>
          </div>
          <div className="card pink">
            <FaServer size={28} />
            <h4>MEET YOUR ALLIED HINTS</h4>
            <p>Powerful .Net for APIs, game logic, and data.</p>
          </div>
        </div>
      </section>

      {/* More Than Entertainment */}
      <section className="about-section">
        <h3 className="about-section-title">MORE THAN ENTERTAINMENT</h3>
        <p>
          This game delivers more than just entertainment—it’s designed to
          enhance cognitive skills, encourage strategic thinking, and provide
          timeless fun for anyone looking for quick challenges or deep puzzle
          journeys.
        </p>
      </section>

      {/* Buttons */}
      <div className="buttons">
        <button className="btn cyan">ENTER THE GRID</button>
        <button className="btn pink">LEARN MORE</button>
      </div>
    </div>
  );
};

export default About;
