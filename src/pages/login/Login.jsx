import React, { useState } from "react";
import { FaRocket, FaGoogle, FaGithub } from "react-icons/fa";
import Logo from "../assets/Logo.jpg"; 
import "./Login.css";

function Login() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    setMessage(`Welcome back, ${username}!`);
    setTimeout(() => setMessage(""), 3000);
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
        <button
  className="btn-up sign-up-btn ms-4 px-4 py-2 fw-bold"
  style={{ border: "2px solid Deep-Pink", borderRadius: "8px" }}
>
  Sign Up
</button>

          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="register-wrapper">
        <form className="register-box" onSubmit={handleSubmit}>
          <h1>CONTINUE YOUR QUEST</h1>
          <p className="subtitle">Unlock Infinite Code Realms in the PyraMind</p>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="NeoHacker42"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="•••••••"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            <FaRocket style={{ color: "#ff00cc", marginRight: "8px" }} />
            Log In
          </button>

          {message && <p className="message">{message}</p>}

          <div className="divider">
            <span>OR SYNC WITH</span>
          </div>

          <div className="social-register">
            <button type="button" className="google-btn">
              <FaGoogle /> Google
            </button>
            <button type="button" className="github-btn">
              <FaGithub /> GitHub
            </button>
          </div>

          <p className="subtitle2">
            Don’t have an account? <a href="#">Create Account</a>
          </p>
        </form>
      </div>

      {/*  Footer */ }
      <footer className="text-center py-3 text-white">
        &copy; {new Date().getFullYear()} PyraMind. All rights reserved.
      </footer>
    </>
  );
}

export default Login;
