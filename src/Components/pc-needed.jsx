import React, { useState, useEffect } from "react";
import { Monitor } from "lucide-react";
import { motion } from "framer-motion";
import "./pc-needed.css";
import Navbar from "./Navbar";
const MIN_WIDTH = 700;

export default function MobileWarning({ children }) {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setShowWarning(window.innerWidth < MIN_WIDTH);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--Very-Dark-Blue", "#0a1929");
  }, []);

  const monitorBounce = {
    y: ["-10%", "10%"],
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 1.2,
      ease: "easeInOut",
    },
  };

  const dotPulse = {
    opacity: [0.4, 1, 0.4],
    transition: {
      repeat: Infinity,
      duration: 1.5,
    },
  };

  if (showWarning) {
    return (
      <>
        <Navbar />
        <div
          className="warning-container"
          style={{ backgroundColor: "var(--Very-Dark-Blue)" }}
        >
          <div className="warning-content">
            <div className="monitor-wrapper">
              <motion.div animate={monitorBounce}>
                <Monitor className="monitor-icon" strokeWidth={1.5} />
              </motion.div>
            </div>

            <motion.h1 className="warning-title" animate={dotPulse}>
              Desktop Required
            </motion.h1>

            <p className="warning-text">Please switch to a desktop or laptop</p>

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

  return <>{children}</>;
}
