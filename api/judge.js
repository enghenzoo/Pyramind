import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { prompt } = req.body; // نستقبل الـ prompt من الواجهة الأمامية

  // تحقق من وجود المفتاح
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "Server key not configured." });
  }

  // تحقق من وجود الـ prompt
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    // 3. الاتصال بـ Gemini API باستخدام المفتاح الآمن
    const response = await axios.post(GEMINI_MODEL_URL, {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
      },
    });

    // 4. استخلاص الإجابة وإعادتها مباشرةً إلى الواجهة الأمامية
    const judgeResponseText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text
        ?.trim()
        .toUpperCase();

    // إرجاع الإجابة (PASS/FAIL) مع كود 200
    res.status(200).json({ verdict: judgeResponseText });
  } catch (error) {
    console.error("Gemini API call failed:", error.message);
    // إرجاع خطأ إلى الواجهة الأمامية
    res.status(500).json({
      error: "Failed to communicate with the judge.",
      details: error.response?.data || error.message,
    });
  }
}
