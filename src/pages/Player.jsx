import React from "react";
import "./Player.css";
import pharaohIdle from "../assets/pharaoh.webp";
import pharaohWalking from "../assets/ezgif.com-animated-gif-maker.gif";

function Player({ position, isWalking }) {
  const style = {
    left: `${position.x}px`,
    bottom: `${position.y}px`,
  };

  const imageSrc = isWalking ? pharaohWalking : pharaohIdle;

  return <img src={imageSrc} className="player" style={style} alt="Player" />;
}

export default Player;
