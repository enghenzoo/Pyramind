import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa"; // Import icons for phone and email
import Navbar from "../../Components/Navbar"; // Navbar component
import Footer from "../../Components/Footer"; // Footer component
import bgImage from "../../assets/pyramind-bg.webp"; // Background image
import "./Contact.css"; // Styles for Contact page

function Contact() {
  return (
    <>
      <Navbar /> {/* Display Navbar */}

      {/* Main contact section */}
      <div className="contact-container">
        <div
          className="contact-box"
          style={{
            backgroundImage: `url(${bgImage})`, // Set background image
            backgroundSize: "cover", // Cover the container
            backgroundPosition: "center center", // Center the image
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay color for contrast
            backgroundBlendMode: "darken", // Darken the background image
          }}
        >
          {/* Contact section title */}
          <h1 className="contact-title">GET IN TOUCH</h1>
          <p className="contact-subtitle">
            Have questions, feedback, or ideas? We're here to listen and help.
          </p>

          {/* Contact form */}
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

          {/* Contact information (phone & email) */}
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

      <Footer /> {/* Display Footer */}
    </>
  );
}

export default Contact;
