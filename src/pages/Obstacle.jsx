import React from 'react';
import './Obstacle.css';

// Obstacle component represents an in-game obstacle
// It receives position (x, y) and an optional onClick handler
function Obstacle({ position, onClick }) {
  
  // Inline style used to position the obstacle on screen
  const style = {
    left: `${position.x}px`,   // Horizontal position
    bottom: `${position.y}px`, // Vertical position
  };

  // Render the obstacle as a div with dynamic style
  // onClick is optional, can be used to trigger events (like starting a challenge)
  return <div className="obstacle" style={style} onClick={onClick}></div>;
}

export default Obstacle;
