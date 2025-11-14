import React, { useState } from "react";
import { FaHourglassHalf, FaHeart } from "react-icons/fa";
import "./ChallengeModal.css"; 

function QuestionHeader({ challenge }) {
  return <h2 className="gametwo-question-header">{challenge.question}</h2>;
}

function ChallengeModal({
  challenge,
  onClose,
  onSolved,
  onWrongAnswer,
  timeLeft,
  attemptsLeft,
  setAttemptsLeft
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [hintVisible, setHintVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const checkAnswer = () => {
    try {
      const funcStr = userAnswer.trim();
      let correct = false;

      switch (challenge.id) {
        case 0: {
          const factorialFunc = new Function(funcStr + "; return factorial;")();
          correct = factorialFunc(5) === 120;
          break;
        }
        case 1:
          correct = new Function("a", "b", funcStr + "; return isAnagram(a,b);")("listen", "silent") === true;
          break;
        case 2:
          correct = new Function("n", funcStr + "; return fib(n);")(7) === 13;
          break;
        case 3:
          correct = new Function("arr", funcStr + "; return secondLargest(arr);")([5, 1, 9, 7, 9]) === 7;
          break;
        case 4:
          correct = new Function("n", funcStr + "; return isPrime(n);")(7) === true &&
                    new Function("n", funcStr + "; return isPrime(n);")(8) === false;
          break;
        case 5:
          correct = new Function("s", funcStr + "; return longestUniqueSubstring(s);")("abcabcbb") === 3;
          break;
        case 6:
          correct = JSON.stringify(
            new Function("arr", funcStr + "; return flatten(arr);")([1,[2,[3,4]],5])
          ) === JSON.stringify([1,2,3,4,5]);
          break;
        case 7:
          correct = JSON.stringify(
            new Function("arr,target", funcStr + "; return findPairs(arr,target);")([1,2,3,4,5],5)
          ) === JSON.stringify([[2,3],[1,4]]);
          break;
        case 8:
          correct = new Function("sentence", funcStr + "; return reverseWords(sentence);")("Hello world") === "olleH dlrow";
          break;
        case 9: {
          const debounced = new Function("func,delay", funcStr + "; return debounce(func,delay);")(() => "ok", 100);
          correct = typeof debounced === "function";
          break;
        }
        default:
          correct = false;
      }
      return correct;
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    if (checkAnswer()) {
      setErrorMessage("");
      onSolved();
      onClose();
    } else {
      setErrorMessage("Incorrect");
      onWrongAnswer();
      setAttemptsLeft(prev => (prev - 1 === 0 ? 3 : prev - 1));
    }
  };

  return (
    <div className="gametwo-challenge-overlay"> 
      <div className="gametwo-challenge-modal"> 
        <QuestionHeader challenge={challenge} />

        <textarea
          className="gametwo-textarea" 
          placeholder="Write your code here..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />

        <div className="gametwo-modal-controls"> 
          <button className="gametwo-submit-btn" onClick={handleSubmit}>Submit</button> 
          <button className="gametwo-hint-btn" onClick={() => setHintVisible(!hintVisible)}>Hint</button> 
        </div>

        {hintVisible && <p className="gametwo-hint">{challenge.hint}</p>} 
        {errorMessage && <p className="gametwo-error">{errorMessage}</p>} 

        <div className="gametwo-timer"> 
          <FaHourglassHalf size={20} color="var(--light-gold-text)" /> {timeLeft}s |{" "}
          {Array.from({ length: attemptsLeft }).map((_, i) => (
            <FaHeart key={i} size={20} color="var(--light-gold-text)" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChallengeModal;