import React from 'react';
import './Obstacle.css';

function Obstacle({ position, onClick }) {
  const style = {
    left: `${position.x}px`,
    bottom: `${position.y}px`,
  };

  return <div className="obstacle" style={style} onClick={onClick}></div>;
}

export default Obstacle;