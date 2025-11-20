import React, { useState } from "react";
import { FaRocket, FaGoogle, FaGithub } from "react-icons/fa"; // Icons for buttons
import Navbar from "../../Components/Navbar"; // Top navigation bar
import Footer from "../../Components/Footer"; // Page footer

import "./Register.css"; // Styles for register page

function Register() {
  // State variables to store form input values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Account Initialized"); // Temporary feedback for demo
  };

  return (
    <>
      <Navbar /> {/* Navbar at the top */}

      {/* Register Form Wrapper */}
      <div className="register-wrapper">
        <form className="register-box" onSubmit={handleSubmit}>
          {/* Form heading */}
          <h1>FORGE YOUR DIGITAL IDENTITY</h1>
          <p className="subtitle">
            Unlock Infinite Code Realms in the PyraMind
          </p>

          {/* Username input */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="NeoHacker42"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email input */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="hacker@PyraMind.dev"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="•••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm password input */}
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="•••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="submit-btn">
            <FaRocket style={{ color: "#ff00cc", marginRight: "8px" }} />
            Initialize Account
          </button>

          {/* Divider between form and social login */}
          <div className="divider">
            <span>OR SYNC WITH</span>
          </div>

          {/* Social login buttons */}
          <div className="d-flex gap-2 justify-content-center">
            <button type="button" className="google-btn">
              <FaGoogle /> Google
            </button>
            <button type="button" className="github-btn">
              <FaGithub /> GitHub
            </button>
          </div>

          {/* Link to login page */}
          <p className="subtitle2 mt-3">
            Already in the Grid? <a href="#">Log In</a>
          </p>
        </form>
      </div>

      <Footer /> {/* Footer at the bottom */}
    </>
  );
}

export default Register;

