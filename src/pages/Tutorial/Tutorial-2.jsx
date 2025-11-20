import React, { useState } from "react";
import { Navigate } from "react-router-dom"; // For programmatic navigation
import Navbar from "../../Components/Navbar"; // Navbar component
import Footer from "../../Components/Footer"; // Footer component
import step1Img from "../../assets/tutorial-1-2.png";
import step2Img from "../../assets/tutorial-2-2.png";
import step3Img from "../../assets/tutorial-3-2.png";
import step4Img from "../../assets/tutorial-4-2.png";
import "./Tutorial-2.css";

export default function TutorialTwo() {
  // Array of tutorial steps with corresponding images
  const steps = [
    { image: step1Img },
    { image: step2Img },
    { image: step3Img },
    { image: step4Img },
  ];

  const [currentStep, setCurrentStep] = useState(0); // Track current step
  const [shouldRedirect, setShouldRedirect] = useState(false); // State for redirect after last step

  // Move to the next step or redirect if at the last step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShouldRedirect(true); // Enable redirect to game
    }
  };

  // Move to the previous step
  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  // Redirect to the corresponding game if redirect state is true
  if (shouldRedirect) {
    return <Navigate to="/game2" />;
  }

  // Get the current step image
  const { image } = steps[currentStep];

  return (
    <>
      <Navbar /> {/* Display Navbar */}
      <div className="tutorial-page">
        <div className="tutorial-content">
          <div className="tutorial-image-container">
            <img src={image} alt="Tutorial step" className="tutorial-image" />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="tutorial-controls">
          <button onClick={handlePrev} disabled={currentStep === 0}>
            Previous
          </button>

          <button onClick={handleNext}>
            {/* Change text on last step */}
            {currentStep === steps.length - 1 ? "Start Game" : "Next"}
          </button>
        </div>
      </div>
      <Footer /> {/* Display Footer */}
    </>
  );
}
