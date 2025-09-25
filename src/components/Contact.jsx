import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import "./Contact.css";
function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-box">
        <h1 className="contact-title">GET IN TOUCH</h1>
        <p className="contact-subtitle">
          Have questions, feedback, or ideas? We're here to listen and help!
        </p>
        <form className="contact-form">
          <input type="text" placeholder="Name" className="contact-input" />
          <input type="email" placeholder="Email" className="contact-input" />
          <textarea placeholder="Message" className="contact-textarea"></textarea>
          <button type="submit" className="contact-button">SEND MESSAGE</button>
        </form>
        <div className="contact-info">
          <p><FaPhone style={{ marginRight: "8px"}} /> +20 123 456 7890</p>
          <p><FaEnvelope style={{ marginRight: "8px" }} /> contact@pyramind.com</p>
        </div>
      </div>
    </div>
  );
}
export default Contact;