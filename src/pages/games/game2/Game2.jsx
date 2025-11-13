import React, { useState, useEffect } from "react";
import Player from "../../Player";
import Obstacle from "../../Obstacle";
import ChallengeModal from "../../ChallengeModal";
import "./Game2.css";
import pyramidImg from "../../../assets/pyramid.png";

function GameTwo() {
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 140 });
  const [isWalking, setIsWalking] = useState(false);
  const [solvedCount, setSolvedCount] = useState(0);
  const [solvedObstacles, setSolvedObstacles] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [timeLeft, setTimeLeft] = useState(300);
  const [finalSolved, setFinalSolved] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);

  const totalObstacles = 5;
  const playerWidth = 100;
  const worldWidth = 4000;
  const viewWidth = window.innerWidth;

  const obstacles = Array.from({ length: totalObstacles }, (_, i) => ({
    id: i,
    x: 300 + i * 600,
    y: 140,
    width: 80,
  }));

  const pyramid = { x: worldWidth - 600, y: 140, width: 200 };

  const challenges = [
    {
      id: 0,
      question: "Return factorial recursively",
      hint: "Use recursion: function calls itself until n=1.",
    },
    {
      id: 1,
      question: "Check if two strings are anagrams",
      hint: "Sort both strings and compare them.",
    },
    {
      id: 2,
      question: "Find the nth Fibonacci number (recursive)",
      hint: "F(n) = F(n-1) + F(n-2)",
    },
    {
      id: 3,
      question: "Return the second largest number in an array",
      hint: "Sort descending and take index 1.",
    },
    {
      id: 4,
      question: "Check if a number is prime",
      hint: "Try dividing by all numbers up to √n.",
    },
  ];

  const finalChallenge = {
    id: 999,
    question: "Final Challenge: Reverse a string without using .reverse()",
    hint: "Loop backward through the string and build the result manually.",
  };

  // 🎮 حركة اللاعب (متتجمد لو في تحدي مفتوح)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFrozen) return; // 🚫 يمنع الحركة أثناء التحدي

      const speed = 10;
      let newX = playerPosition.x;
      if (e.key === "ArrowLeft") {
        newX = Math.max(0, playerPosition.x - speed);
        setIsWalking(true);
      }
      if (e.key === "ArrowRight") {
        newX = Math.min(worldWidth - playerWidth, playerPosition.x + speed);
        setIsWalking(true);
      }
      setPlayerPosition((pos) => ({ ...pos, x: newX }));
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") setIsWalking(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [playerPosition, isFrozen]);

  // ⏱️ عداد الوقت
  useEffect(() => {
    if (!currentChallenge) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentChallenge]);

  useEffect(() => {
    if (timeLeft === 0 && currentChallenge) {
      setCurrentChallenge(null);
      setIsFrozen(false);
      setTimeLeft(300);
    }
  }, [timeLeft, currentChallenge]);

  useEffect(() => {
    if (currentChallenge || isFrozen) return;

    const playerLeft = playerPosition.x;
    const playerRight = playerPosition.x + playerWidth;

    for (let obs of obstacles) {
      const obsLeft = obs.x;
      const obsRight = obs.x + obs.width;

      const touching = playerRight > obsLeft - 20 && playerLeft < obsRight + 20;

      if (touching && !solvedObstacles.includes(obs.id)) {
        setCurrentChallenge(challenges[obs.id]);
        setAttemptsLeft(3);
        setTimeLeft(300);
        setIsFrozen(true);
        return;
      }
    }
  }, [playerPosition, solvedObstacles, currentChallenge, isFrozen]);

  useEffect(() => {
    if (currentChallenge || finalSolved || isFrozen) return;
    if (solvedCount !== totalObstacles) return;

    const playerRight = playerPosition.x + playerWidth;
    const pyramidLeft = pyramid.x;

    if (playerRight >= pyramidLeft - 50) {
      setCurrentChallenge(finalChallenge);
      setIsFrozen(true);
    }
  }, [playerPosition, solvedCount, currentChallenge, finalSolved, isFrozen]);

  const cameraX = Math.min(
    Math.max(playerPosition.x - viewWidth / 2 + playerWidth / 2, 0),
    worldWidth - viewWidth
  );

  return (
    <div className="viewport">
      <div
        className="game2-container"
        style={{ transform: `translateX(-${cameraX}px)` }}
      >
        <Player position={playerPosition} isWalking={isWalking} />

        {obstacles.map(
          (obs) =>
            !solvedObstacles.includes(obs.id) && (
              <Obstacle key={obs.id} position={obs} />
            )
        )}

        <img
          src={pyramidImg}
          alt="Pyramid"
          className={`pyramid ${
            solvedCount === totalObstacles ? "visible" : ""
          }`}
          style={{ left: `${pyramid.x}px`, bottom: `${pyramid.y}px` }}
        />
      </div>

      {currentChallenge && (
        <ChallengeModal
          challenge={currentChallenge}
          timeLeft={timeLeft}
          attemptsLeft={attemptsLeft}
          setAttemptsLeft={setAttemptsLeft}
          onClose={() => {
            setCurrentChallenge(null);
            setIsFrozen(false);
          }}
          onSolved={() => {
            if (currentChallenge.id === 999) {
              setFinalSolved(true);
              alert("🎉 Congratulations! You completed the final challenge!");
            } else {
              setSolvedObstacles([...solvedObstacles, currentChallenge.id]);
              setSolvedCount(solvedCount + 1);
            }
            setAttemptsLeft(3);
            setTimeLeft(300);
            setCurrentChallenge(null);
            setIsFrozen(false);
          }}
          onWrongAnswer={() => {
            if (attemptsLeft - 1 <= 0) {
              setAttemptsLeft(3);
              setTimeLeft(300);
              setPlayerPosition({ x: 50, y: 50 });
              setCurrentChallenge(null);
              setIsFrozen(false);
            } else {
              setAttemptsLeft(attemptsLeft - 1);
            }
          }}
        />
      )}
    </div>
  );
}

export default GameTwo;
