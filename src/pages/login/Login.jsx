import { FaRocket } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import React, { useState } from "react";
import "../register/Register.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    alert("Account Initialized");
  };

  return (
    <div className="register-wrapper">
      <form className="register-box" onSubmit={handleSubmit}>
        <h1>CONTINUE YOUR QUEST</h1>
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
          <label>Password</label>
          <input
            type="password"
            placeholder="•••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          <FaRocket style={{ color: "#ff00cc", marginRight: "8px" }} />
          Log In
        </button>

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
          Don't have an account? <a href="#">Create Account</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
