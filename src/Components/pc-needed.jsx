import React, { useState, useEffect } from "react";
import { Monitor } from "lucide-react"; // Monitor icon
import { motion } from "framer-motion"; // For animations
import "./pc-needed.css"; // CSS for warning overlay
import Navbar from "./Navbar"; // Navbar component

const MIN_WIDTH = 700; // Minimum width required to view the site properly

export default function MobileWarning({ children }) {
  const [showWarning, setShowWarning] = useState(false); // State to show/hide warning

  // Check window width and update state on resize
  useEffect(() => {
    const checkWidth = () => {
      setShowWarning(window.innerWidth < MIN_WIDTH);
    };
    checkWidth(); // Initial check
    window.addEventListener("resize", checkWidth); // Listen for window resize
    return () => window.removeEventListener("resize", checkWidth); // Cleanup
  }, []);

  // Set a custom CSS variable for background color
  useEffect(() => {
    document.documentElement.style.setProperty("--Very-Dark-Blue", "#0a1929");
  }, []);

  // Animation for bouncing monitor icon
  const monitorBounce = {
    y: ["-10%", "10%"],
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 1.2,
      ease: "easeInOut",
    },
  };

  // Animation for pulsing dots and warning title
  const dotPulse = {
    opacity: [0.4, 1, 0.4],
    transition: {
      repeat: Infinity,
      duration: 1.5,
    },
  };

  // If window width is less than MIN_WIDTH, show desktop warning overlay
  if (showWarning) {
    return (
      <>
        <Navbar /> {/* Display Navbar above the warning */}
        <div
          className="warning-container"
          style={{ backgroundColor: "var(--Very-Dark-Blue)" }}
        >
          <div className="warning-content">
            {/* Monitor icon with bounce animation */}
            <div className="monitor-wrapper">
              <motion.div animate={monitorBounce}>
                <Monitor className="monitor-icon" strokeWidth={1.5} />
              </motion.div>
            </div>

            {/* Warning title with pulsing effect */}
            <motion.h1 className="warning-title" animate={dotPulse}>
              Desktop Required
            </motion.h1>

            {/* Subtext message */}
            <p className="warning-text">Please switch to a desktop or laptop</p>

            {/* Animated pulsing dots */}
            <div className="dot-container">
              <motion.div
                className="pulse-dot"
                animate={dotPulse}
                transition={{ ...dotPulse.transition, delay: 0.1 }}
              ></motion.div>
              <motion.div
                className="pulse-dot"
                animate={dotPulse}
                transition={{ ...dotPulse.transition, delay: 0.3 }}
              ></motion.div>
              <motion.div
                className="pulse-dot"
                animate={dotPulse}
                transition={{ ...dotPulse.transition, delay: 0.5 }}
              ></motion.div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // If width is sufficient, render the children components normally
  return <>{children}</>;
}
