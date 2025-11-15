import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import step1Img from "../../assets/tutorial-1-2.png";
import step2Img from "../../assets/tutorial-2-2.png";
import step3Img from "../../assets/tutorial-3-2.png";
import step4Img from "../../assets/tutorial-4-2.png";
import "./Tutorial-2.css";

export default function TutorialTwo() {

  const steps = [
    { image: step1Img },
    { image: step2Img },
    { image: step3Img },
    { image: step4Img },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShouldRedirect(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  if (shouldRedirect) {
    return <Navigate to="/game2" />;
  }

  const { image } = steps[currentStep];

  return (
    <>
      <Navbar />
      <div className="tutorial-page">
        <div className="tutorial-content">
          <div className="tutorial-image-container">
            <img src={image} alt="Tutorial step" className="tutorial-image" />
          </div>
        </div>

        <div className="tutorial-controls">
          <button onClick={handlePrev} disabled={currentStep === 0}>
            Previous
          </button>

          <button onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Start Game" : "Next"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
