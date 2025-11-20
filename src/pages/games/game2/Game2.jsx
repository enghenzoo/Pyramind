import React, { useState, useEffect, useMemo, useRef } from "react";
import Player from "../../Player";
import Obstacle from "../../Obstacle";
import ChallengeModal from "../../ChallengeModal";
import "./Game2.css";
import pyramidImg from "../../../assets/pyramid.png";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import backgroundMusic from "../../../assets/desert-storm-ii-114904.mp3";

function GameTwo() {
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 140 });
  const [isWalking, setIsWalking] = useState(false);
  const [solvedCount, setSolvedCount] = useState(0);
  const [solvedObstacles, setSolvedObstacles] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isFrozen, setIsFrozen] = useState(false);
  const finalSolved = false;
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(backgroundMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log("Autoplay prevented, user must interact to play audio");
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const totalObstacles = 4;
  const playerWidth = 100;
  const worldWidth = 3000;
  const viewWidth = window.innerWidth;

  const obstacles = useMemo(
    () =>
      Array.from({ length: totalObstacles }, (_, i) => ({
        id: i,
        x: 300 + i * 350,
        y: 140,
        width: 80,
      })),
    [totalObstacles]
  );

  const pyramid = useMemo(
    () => ({ x: worldWidth - 600, y: 120, width: 200 }),
    [worldWidth]
  );

  const challenges = useMemo(
    () => [
      {
        id: 0,
        question:
          "Q1: Given two numbers A, B and a comparison symbol S. Determine if A S B is Right or Wrong.",
        hint: "Implement logic to check if (A > B), (A < B), or (A = B) is true.",
        testCase: { input: "5 > 4", expected: "Right" },
        placeholderExample: `Example:\nInput: 5 > 4\nOutput: Right`,
      },
      {
        id: 1,
        question:
          "Q2: Given X, determine the interval: [0,25], (25,50], (50,75], (75,100].",
        hint: "Use nested if/else statements and carefully check boundary conditions (e.g., > 25, <= 50).",
        testCase: { input: "25.1", expected: "Interval (25,50]" },
        placeholderExample: `Example:\nInput: 25.1\nOutput: Interval (25,50]`,
      },
      {
        id: 2,
        question: "Q3: Convert letter case (Upper to Lower or Lower to Upper).",
        hint: "Check if the character is lowercase/uppercase, then use ASCII value +/- 32 to convert.",
        testCase: { input: "a", expected: "A" },
        placeholderExample: `Example:\nInput: a\nOutput: A`,
      },
      {
        id: 3,
        question: "Q4: Check if X is Digit or Alphabet (Capital/Small).",
        hint: "Use ASCII ranges to check. Output must be multiline.",
        testCase: { input: "A", expected: "ALPHA\nIS CAPITAL" },
        placeholderExample: `Example:\nInput: A\nOutput: ALPHA\n        IS CAPITAL`,
      },
    ],
    []
  );

  const finalChallenge = useMemo(
    () => ({
      id: 999,
      question: "Final Challenge: Reverse a string without reverse()",
      hint: "Loop backward and build result.",
      testCase: { input: "Hello World", expected: "dlroW olleH" },
      placeholderExample: `Example:\nInput: Hello\nOutput: olleH`,
    }),
    []
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFrozen) return;
      const speed = 10;
      let newX = playerPosition.x;
      let moved = false;

      if (e.key === "ArrowLeft") {
        newX = Math.max(0, playerPosition.x - speed);
        moved = true;
      }
      if (e.key === "ArrowRight") {
        newX = Math.min(worldWidth - playerWidth, playerPosition.x + speed);
        moved = true;
      }

      if (moved) setPlayerPosition((pos) => ({ ...pos, x: newX }));
      setIsWalking(moved);
    };

    const stopWalk = () => setIsWalking(false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", stopWalk);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", stopWalk);
    };
  }, [playerPosition, isFrozen]);

  useEffect(() => {
    if (!currentChallenge) return;
    const timer = setInterval(
      () => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)),
      1000
    );
    return () => clearInterval(timer);
  }, [currentChallenge]);

  useEffect(() => {
    if (timeLeft === 0 && currentChallenge) {
      alert("Time is up, Game Over.");
      navigate("/games");
    }
  }, [timeLeft, currentChallenge, navigate]);

  useEffect(() => {
    if (currentChallenge || isFrozen) return;
    const playerLeft = playerPosition.x;
    const playerRight = playerPosition.x + playerWidth;

    for (let obs of obstacles) {
      const obsLeft = obs.x;
      const obsRight = obs.x + obs.width;
      const touching = playerRight > obsLeft - 20 && playerLeft < obsRight + 20;

      if (touching && !solvedObstacles.includes(obs.id)) {
        const challengeToUse = challenges.find((c) => c.id === obs.id);
        if (challengeToUse) {
          setCurrentChallenge(challengeToUse);
          setAttemptsLeft(3);
          setTimeLeft(300);
          setIsFrozen(true);
        }
        return;
      }
    }
  }, [
    playerPosition,
    solvedObstacles,
    currentChallenge,
    isFrozen,
    obstacles,
    challenges,
  ]);

  useEffect(() => {
    if (currentChallenge || finalSolved || isFrozen) return;
    if (solvedCount !== totalObstacles) return;

    const playerRight = playerPosition.x + playerWidth;
    const pyramidLeft = pyramid.x;

    if (playerRight >= pyramidLeft - 50) {
      setCurrentChallenge(finalChallenge);
      setIsFrozen(true);
    }
  }, [
    playerPosition,
    solvedCount,
    finalSolved,
    currentChallenge,
    isFrozen,
    pyramid.x,
    finalChallenge,
  ]);

  const cameraX = Math.min(
    Math.max(playerPosition.x - viewWidth / 2 + playerWidth / 2, 0),
    worldWidth - viewWidth
  );

  return (
    <>
      <div className="back-arrow" onClick={() => navigate("/games")}>
        <FaArrowLeft />
      </div>

      <div className="controls-instruction">
        Use Arrows to move {"->"} {"<-"}
      </div>

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
            onClose={() => setIsFrozen(false)}
            onSolved={() => {
              if (currentChallenge.id === 999) {
                alert("Congratulations, You completed ALL challenges");
                navigate("/games");
              }
              setCurrentChallenge(null);
              setSolvedObstacles([...solvedObstacles, currentChallenge.id]);
              setSolvedCount(solvedCount + 1);
              setAttemptsLeft(3);
              setTimeLeft(300);
              setIsFrozen(false);
            }}
            onWrongAnswer={() => {
              if (attemptsLeft - 1 <= 0) {
                alert("Game Over");
                window.location.reload();
              } else setAttemptsLeft(attemptsLeft - 1);
            }}
          />
        )}
      </div>
    </>
  );
}

export default GameTwo;
