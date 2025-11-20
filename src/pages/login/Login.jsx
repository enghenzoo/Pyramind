import React, { useState } from "react"; // Import React and useState hook
import { FaRocket, FaGoogle, FaGithub } from "react-icons/fa"; // Import icons from react-icons
import Navbar from "../../Components/Navbar"; // Import Navbar component
import Footer from "../../Components/Footer"; // Import Footer component

import "./Login.css"; // Import Login-specific CSS

function Login() {
  // State to display a temporary welcome message
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const username = e.target.username.value; // Get the username from the input
    setMessage(`Welcome back, ${username}!`); // Set welcome message
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  return (
    <>
      {/* Navbar component at the top */}
      <Navbar />

      {/* Wrapper for the login form */}
      <div className="register-wrapper">
        <form className="register-box" onSubmit={handleSubmit}>
          {/* Form Heading */}
          <h1>CONTINUE YOUR QUEST</h1>
          <p className="subtitle">Unlock Infinite Code Realms in the PyraMind</p>

          {/* Username input */}
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" placeholder="NeoHacker42" required />
          </div>

          {/* Password input */}
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="•••••••" required />
          </div>

          {/* Submit button with rocket icon */}
          <button type="submit" className="submit-btn">
            <FaRocket style={{ color: "#ff00cc", marginRight: "8px" }} />
            Log In
          </button>

          {/* Display welcome message if exists */}
          {message && <p className="message">{message}</p>}

          {/* Divider between form and social login */}
          <div className="divider">
            <span>OR SYNC WITH</span>
          </div>

          {/* Social login buttons */}
          <div className="social-register">
            <button type="button" className="google-btn">
              <FaGoogle /> Google
            </button>
            <button type="button" className="github-btn">
              <FaGithub /> GitHub
            </button>
          </div>

          {/* Link to register page */}
          <p className="subtitle2">
            Don’t have an account? <a href="#">Create Account</a>
          </p>
        </form>
      </div>

      {/* Footer component at the bottom */}
      <Footer />
    </>
  );
}

// Export the Login component as default
export default Login;
