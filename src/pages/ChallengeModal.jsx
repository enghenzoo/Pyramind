import React, { useState } from "react";
import { FaHourglassHalf, FaHeart } from "react-icons/fa";
import axios from "axios";
import "./ChallengeModal.css";

// Proxy endpoint on your Vercel backend (API key is NOT stored in frontend)
const JUDGE_ENDPOINT = '/api/judge'; 

// List of supported programming languages
const LANGUAGES = [
  { id: 71, name: "Python 3" },
  { id: 63, name: "JavaScript (Node.js)" },
  { id: 49, name: "C (GCC)" },
  { id: 50, name: "C++ (GCC)" },
  { id: 60, name: "Go" },
];

// Component that displays the question title
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
  // User's submitted code
  const [userAnswer, setUserAnswer] = useState("");

  // Selected programming language
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0].id);

  // Controls visibility of the hint text
  const [hintVisible, setHintVisible] = useState(false);

  // Loading state while sending request
  const [isLoading, setIsLoading] = useState(false);

  // Stores submission result such as “Correct” or “Wrong Answer”
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Toggle hint on/off
  const handleHint = () => {
    setHintVisible(!hintVisible);
  };
  
  // Builds the judging prompt that is sent to the backend (AI Judge)
  const buildJudgePrompt = (code, langName, details) => {
      const testInput = details.testCase?.input || "";
      const expectedOutput = details.testCase?.expected || "";
      
      return `
You are an automated coding judge. Your task is to simulate the provided code and decide if the output matches the expected output exactly.

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
1. Language mismatch = automatic FAIL.
2. Simulate the code exactly as the language behaves.
3. Preserve whitespace and newlines.
4. Any error → FAIL.
5. Compare output character-by-character.

### Final Response
Return **only one word**:
PASS or FAIL.
      `.trim();
  };

  // Submits the code to the backend judge with retry logic
  const submit = async (retryCount = 0) => {
    const MAX_RETRIES = 3;
    
    // Ensure code is not empty
    if (!userAnswer.trim()) {
        setSubmissionStatus("Please write code.");
        return;
    }
    
    // Initial state setup on first attempt
    if (retryCount === 0) {
      setIsLoading(true);
      setSubmissionStatus(null);
    }
    
    const promptDetails = challenge;
    const selectedLangName = LANGUAGES.find(l => l.id == selectedLanguage)?.name || "Python 3";
    
    // Build the AI judge prompt
    const prompt = buildJudgePrompt(userAnswer, selectedLangName, promptDetails);
    
    try {
        // Send the prompt to your backend proxy
        const response = await axios.post(JUDGE_ENDPOINT, {
            prompt: prompt, 
        });

        // Backend returns a simple verdict: PASS or FAIL
        const judgeResponseText = response.data.verdict; 
        
        if (judgeResponseText === "PASS") {
            setSubmissionStatus("Correct");
            onSolved();
        } else {
            setSubmissionStatus("Wrong Answer");
            onWrongAnswer();
        }
        
    } catch (error) {

        // Automatic retry for server errors (status 500+)
        if (error.response?.status >= 500 && retryCount < MAX_RETRIES) {
            const waitTime = Math.pow(2, retryCount) * 1000;
            setSubmissionStatus(`Server issue, retrying in ${waitTime / 1000}s...`);
            
            await new Promise(resolve => setTimeout(resolve, waitTime));
            return submit(retryCount + 1);
        }

        // Handle general API errors
        console.error("Submission failed:", error);
        const errorMessage = error.response?.data?.error || error.message;
        setSubmissionStatus(`API Error! ${errorMessage.substring(0, 50)}...`);
        onWrongAnswer();
        
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder text displayed inside the textarea
  const defaultPlaceholder =
    `Write your code here (e.g., using print() or console.log())...\n` +
    `\n---\n` +
    (challenge.placeholderExample || `No example provided. Solve the logic.`);

  return (
    <div className="gametwo-challenge-overlay">
      <div className="gametwo-challenge-modal">

        {/* Question Title */}
        <QuestionHeader challenge={challenge} />

        {/* Language Selector Dropdown */}
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

        {/* Code Input Area */}
        <textarea
          className="gametwo-textarea"
          placeholder={defaultPlaceholder}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={isLoading}
        />

        {/* Submission Status (Correct / Wrong / Errors) */}
        {submissionStatus && (
          <p
            className={`gametwo-status ${
              submissionStatus.includes("Correct") ? "correct" : "wrong"
            }`}
          >
            {submissionStatus}
          </p>
        )}

        {/* Submit + Hint Buttons */}
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

        {/* Hint Text */}
        {hintVisible && <p className="gametwo-hint">{challenge.hint}</p>}

        {/* Timer + Attempts Display */}
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
