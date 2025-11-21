import React from "react";
import "./Player.css";
import pharaohIdle from "../assets/pharaoh.webp";
import pharaohWalking from "../assets/ezgif.com-animated-gif-maker.gif";

// Player component represents the main character on the screen
// It receives position (x, y) and a boolean indicating if the player is walking
function Player({ position, isWalking }) {
  
  // Inline style used to position the player on screen
  const style = {
    left: `${position.x}px`,   // Horizontal position
    bottom: `${position.y}px`, // Vertical position
  };

  // Choose the correct sprite depending on movement state
  const imageSrc = isWalking ? pharaohWalking : pharaohIdle;

  // Render the character as an image with dynamic style
  return <img src={imageSrc} className="player" style={style} alt="Player" />;
}

export default Player;
