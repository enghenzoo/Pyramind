import React, { useState } from "react";
import { FaHourglassHalf, FaHeart } from "react-icons/fa";
import axios from "axios";
import "./ChallengeModal.css";

// ⚠️ تم حذف مفتاح API من الواجهة الأمامية تمامًا.
// يتم إرسال جميع الطلبات إلى دالة الخادم الوسيط (Proxy) الخاصة بك على Vercel.
const JUDGE_ENDPOINT = '/api/judge'; 


// قائمة اللغات الموسعة (للاختيار فقط)
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
1. **Language Mismatch is an Automatic FAIL:** The code must be written in the language specified in the ### Language tag.
2. Simulate or execute the code exactly as the specified language behaves.
3. Preserve all whitespace, spacing, and newlines in both the output and expected output.
4. If the code would result in any error or incorrect output, the verdict is **FAIL**.
5. Comparison must be **exact character-by-character**.

### Final Response
Respond with only ONE word:
- PASS — if the output matches exactly.
- FAIL — otherwise.
      `.trim();
  };

  // 🟢 دالة الإرسال والتحقق عبر الخادم الوسيط
  const submit = async (retryCount = 0) => {
    const MAX_RETRIES = 3;
    
    if (!userAnswer.trim()) {
        setSubmissionStatus("Please write code.");
        return;
    }
    
    // ⚠️ لا يوجد تحقق من المفتاح هنا، لأن المفتاح مخزن على الخادم
    
    if (retryCount === 0) {
      setIsLoading(true);
      setSubmissionStatus(null);
    }
    
    const promptDetails = challenge;
    const selectedLangName = LANGUAGES.find(l => l.id == selectedLanguage)?.name || "Python 3";
    
    // بناء الـ prompt لإرساله إلى الخادم
    const prompt = buildJudgePrompt(userAnswer, selectedLangName, promptDetails);
    
    try {
        // 1. الاتصال بدالة الخادم الوسيط (Proxy)
        const response = await axios.post(JUDGE_ENDPOINT, {
            // نرسل الـ prompt فقط، والخادم يضيف المفتاح وإعدادات Gemini
            prompt: prompt, 
        });

        // 2. قراءة النتيجة من رد الخادم الوسيط (يفترض أن الخادم يرجع { verdict: "PASS" })
        const judgeResponseText = response.data.verdict; 
        
        if (judgeResponseText === "PASS") {
            setSubmissionStatus("Correct");
            onSolved();
        } else {
            setSubmissionStatus(`Wrong Answer`);
            onWrongAnswer();
        }
        
    } catch (error) {
        
        // 🚨 معالجة أخطاء 5xx العامة للخادم الوسيط
        if (error.response?.status >= 500 && retryCount < MAX_RETRIES) {
            const waitTime = Math.pow(2, retryCount) * 1000;
            setSubmissionStatus(`Server issue, retrying in ${waitTime / 1000}s...`);
            
            await new Promise(resolve => setTimeout(resolve, waitTime));
            return submit(retryCount + 1);
        }

        // 4. معالجة الأخطاء الأخرى
        console.error("Submission failed:", error);
        const errorMessage = error.response?.data?.error || error.message;
        setSubmissionStatus(`API Error! ${errorMessage.substring(0, 50)}...`);
        onWrongAnswer();
        
    } finally {
      setIsLoading(false);
    }
  };

  // 🟢 بناء نص الـ Placeholder
  const defaultPlaceholder =
    `Write your code here (e.g., using print() or console.log())...\n` +
    `\n---\n` +
    (challenge.placeholderExample || `No example provided. Solve the logic.`);

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
