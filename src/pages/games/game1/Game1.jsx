import React, { useState, useEffect } from "react";
import "./Game1.css";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import cheerSound from "../../../assets/sound-cheer.wav";
import bombSound from "../../../assets/bomb-sound.wav";
import bombImg from "../../../assets/bomb.png";
import explosionImg from "../../../assets/explosion.png";

export default function GameOne() {
  const [language, setLanguage] = useState("");
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [time, setTime] = useState(90);
  const [isFrozen, setIsFrozen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [log, setLog] = useState("Initializing...");
  const [isExploding, setIsExploding] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const cheerAudio = new Audio(cheerSound);
  const bombAudio = new Audio(bombSound);

  const challenges = [
    {
      question: "Return factorial recursively",
      answer: "function factorial(n){return n<=1?1:n*factorial(n-1);}",
      hint: "Use recursion: function calls itself until n=1.",
    },
    {
      question: "Check if two strings are anagrams",
      answer:
        "function isAnagram(a,b){return a.split('').sort().join('')===b.split('').sort().join('');}",
      hint: "Sort both strings and compare them.",
    },
    {
      question: "Find the nth Fibonacci number (recursive)",
      answer:
        "function fibonacci(n){return n<=1?n:fibonacci(n-1)+fibonacci(n-2);}",
      hint: "F(n) = F(n-1) + F(n-2",
    },
    {
      question: "Return the second largest number in an array",
      answer:
        "function secondLargest(arr){return [...new Set(arr)].sort((a,b)=>b-a)[1];}",
      hint: "Sort descending and take index 1.",
    },
    {
      question: "Check if a number is prime",
      answer:
        "function isPrime(n){if(n<2)return false;for(let i=2;i<=Math.sqrt(n);i++){if(n%i===0)return false;}return true;}",
      hint: "Try dividing by all numbers up to √n.",
    },
    {
      question: "Find longest substring without repeating characters",
      answer:
        "function longestUniqueSubstring(s){let set=new Set(),l=0,maxLen=0;for(let r=0;r<s.length;r++){while(set.has(s[r])){set.delete(s[l]);l++;}set.add(s[r]);maxLen=Math.max(maxLen,r-l+1);}return maxLen;}",
      hint: "Use a sliding window and a set to track unique characters.",
    },
    {
      question: "Flatten a nested array recursively",
      answer:
        "function flatten(arr){return arr.reduce((acc,e)=>acc.concat(Array.isArray(e)?flatten(e):e),[]);}",
      hint: "Use recursion and reduce to merge nested arrays.",
    },
    {
      question: "Find all even numbers in an array",
      answer:
        "function findEvenNumbers(array){return array.filter(num => num % 2 === 0);}",
      hint: "Use the filter() method to get even numbers.",
    },
    {
      question: "Reverse words in a sentence but keep word order",
      answer:
        "function reverseWords(sentence){return sentence.split(' ').map(w=>w.split('').reverse().join('')).join(' ');}",
      hint: "Split sentence by spaces, reverse each word, then join.",
    },
    {
      question: "Implement debounce function",
      answer:
        "function debounce(func,delay){let timeoutId;return function(...args){clearTimeout(timeoutId);setTimeout(()=>func.apply(this,args),delay);};}",
      hint: "Use setTimeout and clearTimeout to delay execution.",
    },
  ];

  useEffect(() => {
    if (isFrozen || isExploding || isCelebrating) return;
    if (time > 0) {
      if (time <= 10) setIsWarning(true);
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsCorrect(false);
      setLog("Time's up 💣");
      setIsExploding(true);
      bombAudio.play();
    }
  }, [time, isFrozen, isExploding, isCelebrating]);

  const formatTime = (t) => `00:${t.toString().padStart(2, "0")}`;

  const handleSubmit = () => {
    try {
      let correct = false;
      const funcStr = userAnswer;

      switch (currentChallenge) {
        case 0: {
          // factorial
          const testFunc = new Function("return " + funcStr)();
          correct = testFunc(5) === 120 && testFunc(0) === 1;
          break;
        }
        case 1: {
          // anagram
          const testFunc = new Function("return " + funcStr)();
          correct =
            testFunc("listen", "silent") === true &&
            testFunc("hello", "world") === false;
          break;
        }
        case 2: {
          // fibonacci
          const testFunc = new Function("return " + funcStr)();
          correct =
            testFunc(7) === 13 && testFunc(0) === 0 && testFunc(1) === 1;
          break;
        }
        case 3: {
          // second largest
          const testFunc = new Function("return " + funcStr)();
          correct = testFunc([5, 1, 9, 7, 9]) === 7;
          break;
        }
        case 4: {
          // prime
          const testFunc = new Function("return " + funcStr)();
          correct =
            testFunc(7) === true &&
            testFunc(8) === false &&
            testFunc(2) === true;
          break;
        }
        case 5: {
          // longest unique substring
          const testFunc = new Function("return " + funcStr)();
          correct = testFunc("abcabcbb") === 3 && testFunc("bbbbb") === 1;
          break;
        }
        case 6: {
          // flatten
          const testFunc = new Function("return " + funcStr)();
          correct =
            JSON.stringify(testFunc([1, [2, [3, 4]], 5])) ===
            JSON.stringify([1, 2, 3, 4, 5]);
          break;
        }
        case 7: {
          // even numbers
          const testFunc = new Function("return " + funcStr)();
          correct =
            JSON.stringify(testFunc([1, 2, 3, 4, 5, 6])) ===
            JSON.stringify([2, 4, 6]);
          break;
        }
        case 8: {
          // reverse words
          const testFunc = new Function("return " + funcStr)();
          correct = testFunc("Hello world") === "olleH dlrow";
          break;
        }
        case 9: {
          // debounce
          const testFunc = new Function("return " + funcStr)();
          const debounced = testFunc(() => "ok", 100);
          correct = typeof debounced === "function";
          break;
        }
        default:
          correct = false;
      }

      setIsCorrect(correct);
      setLog(correct ? " Correct!" : " Incorrect!");

      if (correct) {
        cheerAudio.play();
        setTimeout(() => {
          const next = currentChallenge + 1;
          if (next < challenges.length) {
            setCurrentChallenge(next);
            setTime(90);
            setUserAnswer("");
            setIsCorrect(null);
            setLog("Next challenge...");
            setIsExploding(false);
            setUsedHint(false);
            document.body.style.backgroundColor = "";
          } else {
            setLog(
              " Congratulations, Explosion of Victory, All Challenges Neutralized"
            );
            setIsCelebrating(true);
            document.body.style.backgroundColor = "var(--Green)";
            cheerAudio.play();
          }
        }, 1000);
      } else {
        setIsExploding(true);
        document.body.style.backgroundColor = "var(--Red)";
        bombAudio.play();
      }
    } catch {
      setIsCorrect(false);
      setLog("Error in your code");
      setIsExploding(true);
      document.body.style.backgroundColor = "var(--Red)";
      bombAudio.play();
    }
  };

  if (!language) {
    return (
      <>
        <Navbar />
        <div className="choose-language">
          <h2>Choose the challenge language</h2>
          <button onClick={() => setLanguage("C++")}>C++</button>
          <button onClick={() => setLanguage("JavaScript")}>JavaScript</button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={`game-page ${isExploding ? "explode" : ""}`}>
        <div className={`timer ${isWarning ? "warning" : ""}`}>
          {formatTime(time)}
        </div>

        <div className="game-layout">
          <div className="console">
            <h3>ADVANCED CODING CHALLENGE ({language})</h3>
            <pre className="challenge">
              {challenges[currentChallenge].question}
            </pre>

            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Write your answer here..."
            />

            <div className="buttons">
              <button onClick={handleSubmit} className="btn-correct">
                Submit
              </button>
            </div>

            {usedHint && (
              <p
                className="hint-text"
                style={{ color: "var(--Purple)", marginTop: "10px" }}
              >
                {challenges[currentChallenge].hint}
              </p>
            )}

            {isCorrect !== null && (
              <p style={{ color: isCorrect ? "var(--Green)" : "var(--Red)" }}>
                {isCorrect ? "Correct" : "Incorrect"}
              </p>
            )}
          </div>

          <div className="animation">
            <img
              src={isExploding ? explosionImg : bombImg}
              alt="bomb"
              className={`bomb-image ${isExploding ? "explode" : ""}`}
            />
          </div>

          <div className="status">
            <h3>SYSTEM STATUS</h3>
            <div className="log">
              <span className="warning">Log:</span>
              <p>{log}</p>
            </div>

            <button
              className="btn-hint"
              onClick={() => {
                if (!usedHint) {
                  setUsedHint(true);
                  setTime((t) => Math.max(t - 20, 0));
                }
              }}
            >
              Show Hint (-20s)
            </button>

            <button
              className="btn-freeze"
              onClick={() => setIsFrozen(!isFrozen)}
            >
              {isFrozen ? "Unfreeze" : "Freeze Time"}
            </button>

            <button
              className="btn-restart"
              onClick={() => {
                setTime(90);
                setIsFrozen(false);
                setUserAnswer("");
                setIsCorrect(null);
                setLog("Retry the challenge...");
                document.body.style.backgroundColor = "";
                setIsExploding(false);
                setUsedHint(false);
                setIsCelebrating(false);
              }}
            >
              Restart
            </button>

            <button className="btn-back" onClick={() => setLanguage("")}>
              Change Language
            </button>
          </div>
        </div>

        <div className="stage-bar">
          {challenges.map((_, idx) => (
            <span
              key={idx}
              style={{
                color: idx <= currentChallenge ? "var(--Cyan)" : "var(--White)",
              }}
            >
              Stage {idx + 1}
            </span>
          ))}
        </div>

        {isCelebrating && (
          <div className="blur-overlay">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  width: `${5 + Math.random() * 10}px`,
                  height: `${5 + Math.random() * 10}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              ></div>
            ))}
            <h1>
              {" "}
              Congratulations, Explosion of Victory, All Challenges Neutralized.
            </h1>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
