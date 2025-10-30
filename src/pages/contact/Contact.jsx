import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import Logo from "../../assets/Logo.jpg";
import "./Contact.css";

function Contact() {
  return (
    <>
      {/* Navbar */}
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

      {/* Contact Section */}
      <div className="contact-container">
        <div className="contact-box">
          <h1 className="contact-title">GET IN TOUCH</h1>
          <p className="contact-subtitle">
            Have questions, feedback, or ideas? We're here to listen and help.
          </p>

          <form className="contact-form">
            <input type="text" placeholder="Name" className="contact-input" />
            <input type="email" placeholder="Email" className="contact-input" />
            <textarea
              placeholder="Message"
              className="contact-textarea"
            ></textarea>
            <button type="submit" className="contact-button">
              SEND MESSAGE
            </button>
          </form>

          <div className="contact-info">
            <p>
              <FaPhone style={{ marginRight: "8px" }} /> +20 123 456 7890
            </p>
            <p>
              <FaEnvelope style={{ marginRight: "8px" }} /> contact@pyramind.com
            </p>
          </div>
        </div>

        {/* Footer  */}
        <footer className="site-footer">
          &copy; {new Date().getFullYear()} PyraMind. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default Contact;
