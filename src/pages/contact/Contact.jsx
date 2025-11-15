import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import bgImage from "../../assets/pyramind-bg.webp";
import "./Contact.css";

function Contact() {
  return (
    <>
      <Navbar />

      <div className="contact-container">
        <div
          className="contact-box"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "darken",
          }}
        >
          <h1 className="contact-title">GET IN TOUCH</h1>
          <p className="contact-subtitle">
            Have questions, feedback, or ideas? We're here to listen and help.
          </p>

          <form className="contact-form">
            <input
              type="text"
              placeholder="Name"
              className="contact-input"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="contact-input"
              required
            />
            <textarea
              placeholder="Message"
              className="contact-textarea"
              required
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
      </div>

      <Footer />
    </>
  );
}

export default Contact;
