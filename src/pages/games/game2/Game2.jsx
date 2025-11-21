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
  /* PLAYER & GAME STATE */
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 140 }); // Player starting position
  const [isWalking, setIsWalking] = useState(false); // Animation control
  const [solvedCount, setSolvedCount] = useState(0); // Number of solved challenges
  const [solvedObstacles, setSolvedObstacles] = useState([]); // Track solved obstacles by ID
  const [currentChallenge, setCurrentChallenge] = useState(null); // Active challenge modal
  const [attemptsLeft, setAttemptsLeft] = useState(3); // Attempts per challenge
  const [timeLeft, setTimeLeft] = useState(300); // Timer per challenge
  const [isFrozen, setIsFrozen] = useState(false); // Freeze movement during challenge

  const finalSolved = false;
  const navigate = useNavigate();
  const audioRef = useRef(null);

  /* BACKGROUND MUSIC (LOOP + AUTOPLAY FIX) */
  useEffect(() => {
    audioRef.current = new Audio(backgroundMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log("Autoplay prevented. Audio will start after user interaction.");
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  /*GAME WORLD DIMENSIONS */
  const totalObstacles = 4;
  const playerWidth = 100;
  const worldWidth = 3000;        // Horizontal world size
  const viewWidth = window.innerWidth; // Camera width

  /*OBSTACLES GENERATION */
  const obstacles = useMemo(
    () =>
      Array.from({ length: totalObstacles }, (_, i) => ({
        id: i,
        x: 300 + i * 350, // Spacing between obstacles
        y: 140,
        width: 80,
      })),
    [totalObstacles]
  );

  /* PYRAMID (FINAL AREA) */
  const pyramid = useMemo(
    () => ({ x: worldWidth - 600, y: 120, width: 200 }),
    [worldWidth]
  );

  /* CHALLENGE DATA FOR EACH OBSTACLE*/
  const challenges = useMemo(
    () => [
      {
        id: 0,
        question:
          "Q1: Given two numbers A, B and a comparison symbol S. Determine if A S B is Right or Wrong.",
        hint: "Check if the condition is true (>, <, =).",
        testCase: { input: "5 > 4", expected: "Right" },
        placeholderExample: `Example:\nInput: 5 > 4\nOutput: Right`,
      },
      {
        id: 1,
        question:
          "Q2: Determine the interval of X: [0,25], (25,50], (50,75], (75,100].",
        hint: "Check boundaries carefully.",
        testCase: { input: "25.1", expected: "Interval (25,50]" },
        placeholderExample: `Example:\nInput: 25.1\nOutput: Interval (25,50]`,
      },
      {
        id: 2,
        question: "Q3: Convert letter case (Upper <-> Lower).",
        hint: "Check ASCII and flip +/- 32.",
        testCase: { input: "a", expected: "A" },
        placeholderExample: `Example:\nInput: a\nOutput: A`,
      },
      {
        id: 3,
        question: "Q4: Check if X is Digit or Alphabet.",
        hint: "Use ASCII ranges. Output is multiline.",
        testCase: { input: "A", expected: "ALPHA\nIS CAPITAL" },
        placeholderExample: `Example:\nInput: A\nOutput: ALPHA\n        IS CAPITAL`,
      },
    ],
    []
  );

  /* FINAL CHALLENGE (AFTER PYRAMID)*/
  const finalChallenge = useMemo(
    () => ({
      id: 999,
      question: "Final Challenge: Reverse a string manually.",
      hint: "Loop backward and build result.",
      testCase: { input: "Hello World", expected: "dlroW olleH" },
      placeholderExample: `Example:\nInput: Hello\nOutput: olleH`,
    }),
    []
  );

  /*PLAYER MOVEMENT (ARROW KEYS)*/
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

      if (moved) {
        setPlayerPosition((pos) => ({ ...pos, x: newX }));
      }
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

  /* CHALLENGE TIMER */
  useEffect(() => {
    if (!currentChallenge) return;

    const timer = setInterval(
      () => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)),
      1000
    );

    return () => clearInterval(timer);
  }, [currentChallenge]);

  /*TIMER REACHES ZERO -> GAME OVER */
  useEffect(() => {
    if (timeLeft === 0 && currentChallenge) {
      alert("Time is up, Game Over.");
      navigate("/games");
    }
  }, [timeLeft, currentChallenge, navigate]);

  /* DETECT PLAYER HITTING AN OBSTACLE */
  useEffect(() => {
    if (currentChallenge || isFrozen) return;

    const playerLeft = playerPosition.x;
    const playerRight = playerPosition.x + playerWidth;

    for (let obs of obstacles) {
      const obsLeft = obs.x;
      const obsRight = obs.x + obs.width;

      // Simple collision check
      const touching = playerRight > obsLeft - 20 && playerLeft < obsRight + 20;

      if (touching && !solvedObstacles.includes(obs.id)) {
        const challengeToUse = challenges.find((c) => c.id === obs.id);
        if (challengeToUse) {
          setCurrentChallenge(challengeToUse);
          setAttemptsLeft(3);
          setTimeLeft(300);
          setIsFrozen(true); // Freeze movement
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

  /* DETECT FINAL PYRAMID CHALLENGE */
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

  /* CAMERA FOLLOW PLAYER */
  const cameraX = Math.min(
    Math.max(playerPosition.x - viewWidth / 2 + playerWidth / 2, 0),
    worldWidth - viewWidth
  );

  /* RENDER UI + WORLD + MODALS*/
  return (
    <>
      {/* Back Button */}
      <div className="back-arrow" onClick={() => navigate("/games")}>
        <FaArrowLeft />
      </div>

      {/* Controls Instruction */}
      <div className="controls-instruction">Use Arrows to move → ←</div>

      <div className="viewport">
        <div
          className="game2-container"
          style={{ transform: `translateX(-${cameraX}px)` }}
        >
          {/* Player */}
          <Player position={playerPosition} isWalking={isWalking} />

          {/* Obstacles */}
          {obstacles.map(
            (obs) =>
              !solvedObstacles.includes(obs.id) && (
                <Obstacle key={obs.id} position={obs} />
              )
          )}

          {/* Pyramid (final area) */}
          <img
            src={pyramidImg}
            alt="Pyramid"
            className={`pyramid ${
              solvedCount === totalObstacles ? "visible" : ""
            }`}
            style={{ left: `${pyramid.x}px`, bottom: `${pyramid.y}px` }}
          />
        </div>

        {/* Challenge Modal */}
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
