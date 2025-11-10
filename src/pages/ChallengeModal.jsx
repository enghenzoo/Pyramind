import React, { useState } from "react";
import { FaHourglassHalf, FaHeart } from "react-icons/fa";
// تم تحديث اسم ملف CSS
import "./ChallengeModal.css"; 

function QuestionHeader({ challenge }) {
  // تم تحديث الكلاس لـ gametwo-question-header
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
    // تم تحديث الكلاس لـ gametwo-challenge-overlay
    <div className="gametwo-challenge-overlay"> 
      {/* تم تحديث الكلاس لـ gametwo-challenge-modal */}
      <div className="gametwo-challenge-modal"> 
        <QuestionHeader challenge={challenge} />

        <textarea
          // تم تحديث الكلاس لـ gametwo-textarea
          className="gametwo-textarea" 
          placeholder="Write your code here..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />

        {/* تم تحديث الكلاس لـ gametwo-modal-controls */}
        <div className="gametwo-modal-controls"> 
          {/* تم تحديث الكلاس لـ gametwo-submit-btn */}
          <button className="gametwo-submit-btn" onClick={handleSubmit}>Submit</button> 
          {/* تم تحديث الكلاس لـ gametwo-hint-btn */}
          <button className="gametwo-hint-btn" onClick={() => setHintVisible(!hintVisible)}>Hint</button> 
        </div>

        {/* تم تحديث الكلاس لـ gametwo-hint */}
        {hintVisible && <p className="gametwo-hint">{challenge.hint}</p>} 
        {/* تم تحديث الكلاس لـ gametwo-error */}
        {errorMessage && <p className="gametwo-error">{errorMessage}</p>} 

        {/* تم تحديث الكلاس لـ gametwo-timer */}
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