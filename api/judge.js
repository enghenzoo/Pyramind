import axios from "axios";

// Load the Gemini API key from server environment variables (keeps the key secure)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Base URL for calling the Gemini model, including the API key
const GEMINI_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export default async function handler(req, res) {
  // Ensure that the endpoint only accepts POST requests
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  // Extract the prompt sent from the frontend
  const { prompt } = req.body;

  // Check if the API key exists on the server
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "Server key not configured." });
  }

  // Validate that a prompt was provided
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    // Send a request to the Gemini API with the user's prompt
    const response = await axios.post(GEMINI_MODEL_URL, {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1, // Low randomness for more consistent responses
      },
    });

    // Extract the text response returned by the model
    const judgeResponseText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text
        ?.trim()
        .toUpperCase();

    // Return the processed result (PASS / FAIL) back to the frontend
    res.status(200).json({ verdict: judgeResponseText });
  } catch (error) {
    console.error("Gemini API call failed:", error.message);

    // Return an error response if the API request fails
    res.status(500).json({
      error: "Failed to communicate with the judge.",
      details: error.response?.data || error.message,
    });
  }
}


