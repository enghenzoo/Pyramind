import React, { useState } from "react";
import { FaHourglassHalf, FaHeart } from "react-icons/fa";
import axios from "axios";
import "./ChallengeModal.css";

// ⚠️ 1. إعداد ثابتات Gemini API (لـ Vite)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// قائمة اللغات الموسعة
const LANGUAGES = [
  { id: 71, name: "Python 3" },
  { id: 63, name: "JavaScript (Node.js)" },
  { id: 49, name: "C (GCC)" },
  { id: 50, name: "C++ (GCC)" },
  { id: 60, name: "Go" },
];

function QuestionHeader({ challenge }) {
  return <h2 className="gametwo-question-header">{challenge.question}</h2>;
}

function ChallengeModal({
  challenge,
  onSolved,
  onWrongAnswer,
  timeLeft,
  attemptsLeft,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0].id);
  const [hintVisible, setHintVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleHint = () => {
    setHintVisible(!hintVisible);
  };

  // 🟢 دالة بناء الموجّه (The AI Prompt)
  const buildJudgePrompt = (code, langName, details) => {
    const testInput = details.testCase?.input || "";
    const expectedOutput = details.testCase?.expected || "";

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

### Test Case Input (stdin)
\`\`\`
${testInput}
\`\`\`

### Expected Output (stdout)
\`\`\`
${expectedOutput}
\`\`\`

### JUDGING RULES
1. **Language Mismatch is an Automatic FAIL:** The code must be written in the language specified in the ### Language tag (e.g., if the tag says "Python 3," the code MUST be valid Python 3). If the submitted code is in a different language (e.g., C++), the verdict is **FAIL** immediately, even if it could execute successfully in another environment.
2. Simulate or execute the code exactly as the specified language behaves.
3. Preserve all whitespace, spacing, and newlines in both the output and expected output.
4. If the code would result in:
  - syntax/compilation error (in the specified language)
  - runtime error (in the specified language)
  - infinite loop
  - incorrect output
  then the verdict is **FAIL**.
5. Comparison must be **exact character-by-character**.

### Final Response
Respond with only ONE word:
- PASS — if the output matches exactly.
- FAIL — otherwise.
  `.trim();
  };

  // 🟢 دالة الإرسال والتحقق عبر Gemini مع دعم إعادة المحاولة
  const submit = async (retryCount = 0) => {
    const MAX_RETRIES = 3;

    if (!userAnswer.trim() || !GEMINI_API_KEY) {
      setSubmissionStatus(
        "Please write code and ensure VITE_GEMINI_API_KEY is properly set."
      );
      return;
    }

    if (retryCount === 0) {
      setIsLoading(true);
      setSubmissionStatus(null);
    }

    const promptDetails = challenge;
    const selectedLangName =
      LANGUAGES.find((l) => l.id == selectedLanguage)?.name || "Python 3";
    const prompt = buildJudgePrompt(
      userAnswer,
      selectedLangName,
      promptDetails
    );

    try {
      const response = await axios.post(GEMINI_MODEL_URL, {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
        },
      });

      const judgeResponseText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text
          ?.trim()
          .toUpperCase();

      if (judgeResponseText === "PASS") {
        setSubmissionStatus("Correct!");
        console.log("Judge Response:", judgeResponseText);
        onSolved();
      } else {
        setSubmissionStatus(`Wrong Answer`);
        console.log("Judge Response:", judgeResponseText);
        onWrongAnswer();
      }
    } catch (error) {
      if (error.response?.status === 503 && retryCount < MAX_RETRIES) {
        const waitTime = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        console.log(
          `Model overloaded, retrying in ${waitTime / 1000}s... (Attempt ${
            retryCount + 1
          }/${MAX_RETRIES})`
        );

        await new Promise((resolve) => setTimeout(resolve, waitTime));
        return submit(retryCount + 1);
      }

      console.error("Gemini API Submission failed:", error);
      const errorMessage =
        error.response?.data?.error?.message || error.message;
      setSubmissionStatus(`API Error! ${errorMessage.substring(0, 50)}...`);
      onWrongAnswer();
    } finally {
      setIsLoading(false);
    }
  };

  const defaultPlaceholder =
    challenge.placeholderExample || `No example provided. Solve the logic.`;

  return (
    <div className="gametwo-challenge-overlay">
      <div className="gametwo-challenge-modal">
        <QuestionHeader challenge={challenge} />

        <div className="gametwo-language-selector">
          <label htmlFor="language-select">Select Language:</label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            disabled={isLoading}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          className="gametwo-textarea"
          placeholder={defaultPlaceholder}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={isLoading}
        />

        {submissionStatus && (
          <p
            className={`gametwo-status ${
              submissionStatus.includes("Correct") ? "correct" : "wrong"
            }`}
          >
            {submissionStatus}
          </p>
        )}

        <div className="gametwo-modal-controls">
          <button
            className="gametwo-submit-btn"
            onClick={() => submit()}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <button
            className="gametwo-hint-btn"
            onClick={handleHint}
            disabled={isLoading}
          >
            Hint
          </button>
        </div>

        {hintVisible && <p className="gametwo-hint">{challenge.hint}</p>}

        <div className="gametwo-timer">
          <FaHourglassHalf size={20} /> {timeLeft}s &nbsp;
          {Array.from({ length: attemptsLeft }).map((_, i) => (
            <FaHeart key={i} size={20} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChallengeModal;
