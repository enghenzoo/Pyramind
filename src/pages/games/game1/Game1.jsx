import React, { useState, useEffect, useCallback } from "react";
import "./Game1.css";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import cheerSound from "../../../assets/sound-cheer.wav";
import bombSound from "../../../assets/bomb-sound.wav";
import bombImg from "../../../assets/bomb.webp";
import explosionImg from "../../../assets/explosion.webp";

export default function GameOne() {
  const [language, setLanguage] = useState("JavaScript"); // القيمة الافتراضية للغة
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
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل أثناء الاتصال بالـ API

  const cheerAudio = new Audio(cheerSound);
  const bombAudio = new Audio(bombSound);

  // 💥 تحديث هيكل التحديات لإضافة placeholderExample ومعرفات وهمية للـ API
  const challenges = [
    {
      id: 101, // معرف وهمي للـ API
      question: "Return factorial recursively",
      hint: "Use recursion: function calls itself until n=1.",
      placeholderExample: "Example:\nfunction factorial(5) returns 120",
      testCase: { input: "5", expected: "120" },
    },
    {
      id: 102,
      question: "Check if two strings are anagrams",
      hint: "Sort both strings and compare them.",
      placeholderExample:
        "Example:\nisAnagram('listen', 'silent') returns true",
      testCase: { input: "'listen', 'silent'", expected: "true" },
    },
    // ... يمكن إضافة باقي التحديات بنفس الهيكلية
    {
      id: 103,
      question: "Find the nth Fibonacci number (recursive)",
      hint: "F(n) = F(n-1) + F(n-2)",
      placeholderExample: "Example:\nfibonacci(7) returns 13",
      testCase: { input: "7", expected: "13" },
    },
    {
      id: 104,
      question: "Return the second largest number in an array",
      hint: "Sort descending and take index 1.",
      placeholderExample: "Example:\nsecondLargest([5, 1, 9, 7, 9]) returns 7",
      testCase: { input: "[5, 1, 9, 7, 9]", expected: "7" },
    },
    // ... إلخ (بفرض أنك ستكمل باقي الـ 10 تحديات بنفس النمط)
  ];

  // 🌐 دالة محاكاة للـ API (لإلغاء المنطق المحلي)
  const checkCodeAgainstAPI = useCallback(async (code, challengeId, lang) => {
    // 💡 هنا يجب أن يكون لديك اتصال fetch/axios إلى نقطة نهاية (Endpoint) تتحقق من الكود
    console.log(`Submitting code for Challenge ID: ${challengeId} in ${lang}`);

    // محاكاة تأخير الشبكة
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // *** للمحاكاة فقط: نعود بنتيجة عشوائية ***
    // يمكن هنا إضافة منطق لتحديد نسبة النجاح بناءً على لغة أو تحدي معين إذا أردت محاكاة أكثر دقة
    const isCorrect = Math.random() > 0.4; // 60% chance of success (للتجربة)

    return {
      isCorrect,
      message: isCorrect
        ? "Test passed successfully."
        : "Test failed due to incorrect output.",
    };
  }, []);

  // ⏱️ تأثير عداد الوقت (محتفظ به)
  useEffect(() => {
    if (isFrozen || isExploding || isCelebrating || isLoading) return; // توقف المؤقت أثناء التحميل
    if (time > 0) {
      if (time <= 10) setIsWarning(true);
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsCorrect(false);
      setLog("Time's up");
      setIsExploding(true);
      bombAudio.play();
      document.body.style.backgroundColor = "var(--Red)";
    }
  }, [time, isFrozen, isExploding, isCelebrating, isLoading, bombAudio]);

  const formatTime = (t) => `00:${t.toString().padStart(2, "0")}`;

  // 📝 دالة إرسال الكود للمعالجة عبر API
  const handleSubmit = async () => {
    if (isLoading || isFrozen || isExploding || isCelebrating) return;

    setIsLoading(true);
    setIsCorrect(null);
    setLog("Submitting code to the judge via API...");

    try {
      const challengeData = challenges[currentChallenge];

      const response = await checkCodeAgainstAPI(
        userAnswer,
        challengeData.id, // استخدام الـ ID الوهمي
        language
      );

      const correct = response.isCorrect;

      setIsCorrect(correct);
      setLog(correct ? "✅ Correct!" : `❌ Incorrect! ${response.message}`);

      if (correct) {
        cheerAudio.play();
        setTimeout(() => {
          const next = currentChallenge + 1;
          if (next < challenges.length) {
            // تحدي جديد
            setCurrentChallenge(next);
            setTime(90);
            setUserAnswer("");
            setIsCorrect(null);
            setLog("Next challenge...");
            setIsExploding(false);
            setUsedHint(false);
            setIsWarning(false);
            document.body.style.backgroundColor = "";
          } else {
            // نهاية اللعبة
            setLog(
              "🥳 Congratulations, Explosion of Victory, All Challenges Neutralized"
            );
            setIsCelebrating(true);
            document.body.style.backgroundColor = "var(--Green)";
            cheerAudio.play();
          }
        }, 1000);
      } else {
        // إجابة خاطئة
        setIsExploding(true);
        document.body.style.backgroundColor = "var(--Red)";
        bombAudio.play();
      }
    } catch (error) {
      setIsCorrect(false);
      setLog(`Error during submission: ${error.message}`);
      setIsExploding(true);
      document.body.style.backgroundColor = "var(--Red)";
      bombAudio.play();
    } finally {
      setIsLoading(false);
    }
  };

  // 🗑️ تم إلغاء صفحة اختيار اللغة الأولى

  return (
    <>
      <Navbar />
      <div className={`game-page ${isExploding ? "explode" : ""}`}>
        <div className={`timer ${isWarning ? "warning" : ""}`}>
          {formatTime(time)}
        </div>

        <div className="game-layout">
          <div className="console">
            {/* 🎯 دمج اختيار اللغة في الواجهة الرئيسية */}
            <div className="console-header">
              <h3>ADVANCED CODING CHALLENGE</h3>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={isLoading || isFrozen || isExploding}
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  marginLeft: "20px",
                }}
              >
                <option value="JavaScript">JavaScript</option>
                <option value="C++">C++</option>
                <option value="Python">Python</option>
              </select>
            </div>

            <pre className="challenge">
              {challenges[currentChallenge].question}
            </pre>

            {/* 🎯 استخدام خاصية placeholderExample */}
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={
                challenges[currentChallenge].placeholderExample +
                "\n\nWrite your function here..."
              }
              disabled={isLoading || isFrozen || isExploding || isCelebrating}
            />

            <div className="buttons">
              <button
                onClick={handleSubmit}
                className="btn-correct"
                disabled={
                  isLoading ||
                  isFrozen ||
                  isExploding ||
                  isCelebrating ||
                  userAnswer.trim() === ""
                }
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>

            {/* ... عرض التلميح والنتيجة */}
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

            {/* ... أزرار التحكم */}
            <button
              className="btn-hint"
              onClick={() => {
                if (!usedHint && !isFrozen && !isExploding && !isCelebrating) {
                  setUsedHint(true);
                  setTime((t) => Math.max(t - 20, 0));
                }
              }}
              disabled={usedHint || isFrozen || isExploding || isCelebrating}
            >
              Show Hint (-20s)
            </button>

            <button
              className="btn-freeze"
              onClick={() => setIsFrozen(!isFrozen)}
              disabled={isExploding || isCelebrating}
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
                setCurrentChallenge(0); // إعادة التحدي إلى البداية
                setIsWarning(false);
              }}
            >
              Restart
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
              <div key={i} className="confetti"></div>
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
