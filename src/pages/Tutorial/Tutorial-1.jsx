import React, { useState } from "react";
import { Navigate } from "react-router-dom"; // For programmatic navigation
import Navbar from "../../Components/Navbar"; // Navbar component
import Footer from "../../Components/Footer"; // Footer component
import step1Img from "../../assets/tutorial-1-1.png";
import step2Img from "../../assets/tutorial-2-1.png";
import step3Img from "../../assets/tutorial-3-1.png";
import step4Img from "../../assets/tutorial-4-1.png";
import step5Img from "../../assets/tutorial-5-1.png";
import "./Tutorial-1.css";

export default function TutorialOne() {
  // Array of tutorial steps with associated images
  const steps = [
    { image: step1Img },
    { image: step2Img },
    { image: step3Img },
    { image: step4Img },
    { image: step5Img },
  ];

  const [currentStep, setCurrentStep] = useState(0); // Track current step
  const [shouldRedirect, setShouldRedirect] = useState(false); // State for redirecting after last step

  // Go to the next step or trigger redirect if last step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // When reaching last step, enable redirect
      setShouldRedirect(true);
    }
  };

  // Go to previous step
  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  // If redirect state is true, navigate to the game page
  if (shouldRedirect) {
    return <Navigate to="/game1" />;
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

        {/* Navigation buttons for tutorial steps */}
        <div className="tutorial-controls">
          <button onClick={handlePrev} disabled={currentStep === 0}>Previous</button>
          <button onClick={handleNext}>
            {/* Change text on last step */}
            {currentStep === steps.length - 1 ? "Start Game " : "Next "}
          </button>
        </div>
      </div> 
      <Footer /> {/* Display Footer */}
    </>
  );
}
