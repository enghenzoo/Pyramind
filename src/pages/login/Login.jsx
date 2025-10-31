import React, { useState } from "react";
import { FaRocket, FaGoogle, FaGithub } from "react-icons/fa";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

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
      <Navbar />

      <div className="register-wrapper">
        <form className="register-box" onSubmit={handleSubmit}>
          <h1>CONTINUE YOUR QUEST</h1>
          <p className="subtitle">Unlock Infinite Code Realms in the PyraMind</p>

          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" placeholder="NeoHacker42" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="•••••••" required />
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

      <Footer />
    </>
  );
}

export default Login;
