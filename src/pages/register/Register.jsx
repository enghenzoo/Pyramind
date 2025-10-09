import React, { useState } from "react";
import { FaRocket, FaGoogle, FaGithub } from "react-icons/fa";
import Logo from "../assets/Logo.jpg"; 
import "./Register.css";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Account Initialized");
  };

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

      {/* Register Form */}
      <div className="register-wrapper">
        <form className="register-box" onSubmit={handleSubmit}>
          <h1>FORGE YOUR DIGITAL IDENTITY</h1>
          <p className="subtitle">Unlock Infinite Code Realms in the PyraMind</p>

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

          <button type="submit" className="submit-btn">
            <FaRocket style={{ color: "#ff00cc", marginRight: "8px" }} />
            Initialize Account
          </button>

          <div className="divider">
            <span>OR SYNC WITH</span>
          </div>

          <div className="d-flex gap-2">
              <button type="button" className="google-btn">
            <FaGoogle /> Google
          </button>
          <button type="button" className="github-btn">
            <FaGithub /> GitHub
          </button>
          </div>

          <p className="subtitle2 mt-3">
            Already in the Grid? <a href="#">Log In</a>
          </p>
        </form>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 text-white">
        &copy; {new Date().getFullYear()} PyraMind. All rights reserved.
      </footer>
    </>
  );
}

export default Register;
