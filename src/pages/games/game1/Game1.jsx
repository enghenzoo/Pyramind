import React, { useState, useEffect, useRef } from "react"; // React hooks: useState, useEffect, useRef
import axios from "axios"; // HTTP requests
import "./Game1.css"; // Game CSS
import Navbar from "../../../Components/Navbar"; // Navbar component
import Footer from "../../../Components/Footer"; // Footer component
import cheerSound from "../../../assets/sound-cheer.wav"; // Success sound
import bombSound from "../../../assets/bomb-sound.wav"; // Explosion sound
import clockSound from "../../../assets/clock.mp3"; // Timer ticking sound
import bombImg from "../../../assets/bomb.webp"; // Bomb image
import explosionImg from "../../../assets/explosion.webp"; // Explosion image

const JUDGE_ENDPOINT = "/api/judge"; // API endpoint for code judging

// Available programming languages
const LANGUAGES = [
  { id: 71, name: "Python 3" },
  { id: 63, name: "JavaScript (Node.js)" },
  { id: 50, name: "C++ (GCC)" },
  { id: 51, name: "C# (Mono)" },
  { id: 62, name: "Java (OpenJDK)" },
  { id: 60, name: "Go" },
];

export default function GameOne() {
  // --- State variables ---
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[1].id); // Default JS
  const [currentChallenge, setCurrentChallenge] = useState(0); // Index of current challenge
  const [userAnswer, setUserAnswer] = useState(""); // Code input by user
  const [time, setTime] = useState(90); // Countdown timer
  const [isFrozen, setIsFrozen] = useState(false); // Freeze timer
  const [isCorrect, setIsCorrect] = useState(null); // Track correctness
  const [log, setLog] = useState("System initialized. Waiting for code..."); // System log
  const [isExploding, setIsExploding] = useState(false); // Explosion effect active
  const [isWarning, setIsWarning] = useState(false); // Timer warning (last 10s)
  const [usedHint, setUsedHint] = useState(false); // Track hint usage
  const [isCelebrating, setIsCelebrating] = useState(false); // Celebration effect active
  const [isLoading, setIsLoading] = useState(false); // API request in progress

  // --- Audio instances ---
  const cheerAudio = new Audio(cheerSound); // Success sound
  const bombAudio = new Audio(bombSound); // Explosion sound
  const clockAudioRef = useRef(new Audio(clockSound)); // Timer ticking sound (useRef to persist)

  // --- Setup clock audio on mount ---
  useEffect(() => {
    clockAudioRef.current.loop = true; // Loop the ticking sound
    clockAudioRef.current.volume = 0.5; // Optional volume

    return () => {
      // Cleanup on unmount
      clockAudioRef.current.pause();
      clockAudioRef.current.currentTime = 0;
    };
  }, []);

  // --- Play/pause clock based on game state ---
  useEffect(() => {
    const isTimerActive =
      time > 0 && !isFrozen && !isExploding && !isCelebrating && !isLoading;

    if (isTimerActive) {
      clockAudioRef.current
        .play()
        .catch((e) => console.warn("Audio play blocked:", e));
    } else {
      clockAudioRef.current.pause();
    }
  }, [time, isFrozen, isExploding, isCelebrating, isLoading]);

  // --- Challenges data ---
  const challenges = [
    {
      question: "Write a function that returns the factorial of n.",
      hint: "Use recursion or a loop. Factorial of 5 is 120.",
      testCase: { input: "n = 5", expected: "120" },
    },
    {
      question: "Check if two strings are anagrams (return boolean).",
      hint: "Sort both strings and compare them.",
      testCase: { input: '("listen", "silent")', expected: "true" },
    },
    {
      question: "Find the nth Fibonacci number.",
      hint: "F(n) = F(n-1) + F(n-2). Start with 0, 1.",
      testCase: { input: "n = 7", expected: "13" },
    },
    {
      question: "Return the second largest number in an array.",
      hint: "Sort the array in descending order and pick index 1.",
      testCase: { input: "[10, 5, 20, 8]", expected: "10" },
    },
    {
      question: "Check if a number is prime (return boolean).",
      hint: "Loop from 2 to sqrt(n).",
      testCase: { input: "7", expected: "true" },
    },
    {
      question:
        "Find the length of the longest substring without repeating characters.",
      hint: "Use a sliding window technique.",
      testCase: { input: '"abcabcbb"', expected: "3" },
    },
    {
      question: "Flatten a nested array.",
      hint: "Use recursion or built-in flat methods if available.",
      testCase: { input: "[1, [2, [3, 4], 5]]", expected: "[1, 2, 3, 4, 5]" },
    },
    {
      question: "Filter an array to return only even numbers.",
      hint: "Use the modulo operator % 2 === 0.",
      testCase: { input: "[1, 2, 3, 4, 5, 6]", expected: "[2, 4, 6]" },
    },
    {
      question: "Reverse words in a sentence maintaining word order.",
      hint: "Split by space, reverse each word, join by space.",
      testCase: { input: '"Hello World"', expected: '"olleH dlroW"' },
    },
  ];

  // --- Explosion logic ---
  useEffect(() => {
    if (isExploding) {
      setIsFrozen(true); // Freeze game
      const timer = setTimeout(() => {
        setIsExploding(false); // Stop explosion after 3s
        document.body.style.backgroundColor = "";
        if (time > 0) {
          setIsFrozen(false); // Unfreeze if time remains
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isExploding, time]);

  // --- Countdown timer logic ---
  useEffect(() => {
    if (isFrozen || isExploding || isCelebrating || isLoading) return;

    if (time > 0) {
      if (time <= 10) setIsWarning(true); // Last 10s warning
      else setIsWarning(false);

      const timer = setTimeout(() => setTime((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Time's up
      if (!isExploding) {
        setIsCorrect(false);
        setLog("Time's up! System Failure.");
        setIsExploding(true);
        bombAudio.play();
      }
    }
  }, [time, isFrozen, isExploding, isCelebrating, isLoading]);

  // --- Format timer display ---
  const formatTime = (t) => `00:${t.toString().padStart(2, "0")}`;

  // --- Build AI judge prompt ---
  const buildJudgePrompt = (code, langName, details) => {
    return `
You are an automated coding judge. Your task is to mentally execute or rigorously simulate the provided code based on the given test case and determine whether the final output exactly matches the expected output.

### Challenge
${details.question}

### Language
${langName}

### User Code
\`\`\`
${code}
\`\`\`

### Test Case Input
\`\`\`
${details.testCase.input}
\`\`\`

### Expected Output
\`\`\`
${details.testCase.expected}
\`\`\`

### JUDGING RULES
1. **Language Mismatch is an Automatic FAIL:** The code must be written in the language specified in the ### Language tag.
2. Simulate or execute the code exactly as the specified language behaves.
3. If the code would result in any error or incorrect output, the verdict is **FAIL**.
4. Comparison must be logical and exact.

### Final Response
Respond with only ONE word:
- PASS — if the output matches correctly.
- FAIL — otherwise.
    `.trim();
  };

  // --- Retry logic for API requests ---
  const fetchVerdictWithRetry = async (prompt, retries = 3, delay = 1000) => {
    try {
      const response = await axios.post(JUDGE_ENDPOINT, { prompt });
      return response.data.verdict;
    } catch (error) {
      if (retries > 0 && (!error.response || error.response.status >= 500)) {
        setLog(`Server busy. Retrying in ${delay / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchVerdictWithRetry(prompt, retries - 1, delay * 2);
      }
      throw error;
    }
  };

  // --- Handle code submission ---
  const handleSubmit = async () => {
    if (time === 0 || isExploding || isCelebrating || isLoading) return; // Prevent submission
    if (!userAnswer.trim()) {
      setLog("Please write some code first.");
      return;
    }

    setIsLoading(true);
    setLog("Analyzing code...");
    setIsCorrect(null);

    try {
      const currentChallengeData = challenges[currentChallenge];
      const selectedLangName =
        LANGUAGES.find((l) => l.id == selectedLanguage)?.name || "Unknown";

      const prompt = buildJudgePrompt(
        userAnswer,
        selectedLangName,
        currentChallengeData
      );
      const verdict = await fetchVerdictWithRetry(prompt);

      setIsLoading(false);

      if (verdict && verdict.includes("PASS")) {
        setIsCorrect(true);
        setLog("Access Granted! Code Valid.");
        cheerAudio.play();

        // Load next challenge or celebrate
        setTimeout(() => {
          const next = currentChallenge + 1;
          if (next < challenges.length) {
            setCurrentChallenge(next);
            setTime(90);
            setUserAnswer("");
            setIsCorrect(null);
            setLog("Next challenge loaded...");
            setIsExploding(false);
            setUsedHint(false);
            document.body.style.backgroundColor = "";
          } else {
            setLog("Mission Accomplished! System Secured.");
            setIsCelebrating(true);
            document.body.style.backgroundColor = "var(--Green)";
            cheerAudio.play();
          }
        }, 1500);
      } else {
        throw new Error("Wrong Answer");
      }
    } catch (error) {
      setIsLoading(false);
      if (error.message === "Wrong Answer") {
        setIsCorrect(false);
        setLog("Access Denied! Logic Incorrect.");
      } else {
        setLog("Connection Lost. System Overload.");
        console.error("Submission error:", error);
      }
      setIsExploding(true);
      document.body.style.backgroundColor = "var(--Red)";
      bombAudio.play();
    }
  };

  // --- Restart the game ---
  const handleRestart = () => {
    // Stop all audio
    bombAudio.pause();
    bombAudio.currentTime = 0;
    cheerAudio.pause();
    cheerAudio.currentTime = 0;
    clockAudioRef.current.pause();
    clockAudioRef.current.currentTime = 0;

    // Reset state
    setTime(90);
    setIsFrozen(false);
    setUserAnswer("");
    setIsCorrect(null);
    setLog("System Rebooted.");
    document.body.style.backgroundColor = "";
    setIsExploding(false);
    setIsWarning(false);
    setUsedHint(false);
    setIsCelebrating(false);
    setIsLoading(false);
    setCurrentChallenge(0);
  };

  // --- JSX Rendering ---
  return (
    <>
      <Navbar />
      <div className={`game-page ${isExploding ? "explode" : ""}`}>
        {/* Timer */}
        <div className={`timer ${isWarning ? "warning" : ""}`}>
          {formatTime(time)}
        </div>

        {/* Main Layout */}
        <div className="game-layout">
          {/* Console Panel */}
          <div className="console">
            <div className="console-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h3>CODING CHALLENGE</h3>
            </div>

            {/* Language Selector */}
            <div>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                disabled={isLoading || isExploding}
                style={{ background: "#222", color: "var(--Cyan)", border: "1px solid var(--Cyan)", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontFamily: "monospace" }}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Challenge Question */}
            <pre className="challenge">
              {challenges[currentChallenge].question}
              <div style={{ marginTop: "10px", fontSize: "0.8em", color: "#aaa" }}>
                Input: {challenges[currentChallenge].testCase.input} | Expected: {challenges[currentChallenge].testCase.expected}
              </div>
            </pre>

            {/* User Code Input */}
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={`// Write your ${LANGUAGES.find((l) => l.id == selectedLanguage)?.name} solution here...`}
              disabled={isLoading || isExploding || isCelebrating}
              style={{ opacity: isLoading ? 0.7 : 1 }}
            />

            {/* Submit Button */}
            <div className="buttons">
              <button onClick={handleSubmit} className="btn-correct" disabled={time === 0 || isExploding || isCelebrating || isLoading} style={{ opacity: time === 0 || isExploding || isCelebrating || isLoading ? 0.5 : 1, cursor: time === 0 || isExploding || isCelebrating || isLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                {isLoading ? "Analyzing..." : "Submit Solution"}
                {isLoading && <div className="spinner" style={{ width: "12px", height: "12px", border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>}
              </button>
            </div>

            {/* Result */}
            {isCorrect !== null && !isLoading && (
              <p style={{ color: isCorrect ? "var(--Green)" : "var(--Red)", fontWeight: "bold", marginTop: "10px" }}>
                {isCorrect ? "PASSED" : "FAILED"}
              </p>
            )}
          </div>

          {/* Bomb/Explosion Animation */}
          <div className="animation">
            <img src={isExploding ? explosionImg : bombImg} alt="bomb" className={`bomb-image ${isExploding ? "explode" : ""}`} />
          </div>

          {/* System Status Panel */}
          <div className="status">
            <h3>SYSTEM STATUS</h3>
            <div className="log">
              <span className="warning">Log:</span>
              <p>{log}</p>
            </div>

            {/* Hint Button */}
            <button className="btn-hint" disabled={isLoading || isExploding} onClick={() => { if (!usedHint) { setUsedHint(true); setTime((t) => Math.max(t - 20, 0)); } }}>
              Show Hint (-20s)
            </button>

            {/* Hint Text */}
            {usedHint && (
              <p className="hint-text" style={{ color: "var(--Purple)", marginTop: "5px", fontSize: "0.9rem", marginBottom: "10px", borderBottom: "1px solid #444", paddingBottom: "5px" }}>
                {challenges[currentChallenge].hint}
              </p>
            )}

            {/* Freeze Button */}
            <button className="btn-freeze" disabled={isLoading || isExploding} onClick={() => setIsFrozen(!isFrozen)}>
              {isFrozen ? "Unfreeze" : "Freeze Time"}
            </button>

            {/* Restart Button */}
            <button className="btn-restart" onClick={handleRestart}>
              Restart System
            </button>
          </div>
        </div>

        {/* Stage Bar */}
        <div className="stage-bar">
          {challenges.map((_, idx) => (
            <span key={idx} style={{ color: idx <= currentChallenge ? "var(--Cyan)" : "var(--White)" }}>
              Stage {idx + 1}
            </span>
          ))}
        </div>

        {/* Celebration Overlay */}
        {isCelebrating && (
          <div className="blur-overlay">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="confetti" style={{ left: `${Math.random() * 100}%`, backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, width: `${5 + Math.random() * 10}px`, height: `${5 + Math.random() * 10}px`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${2 + Math.random() * 3}s` }}></div>
            ))}
            <h1>Congratulations! Threat Neutralized.</h1>
          </div>
        )}
      </div>
      <Footer />
      {/* Spinner animation */}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

