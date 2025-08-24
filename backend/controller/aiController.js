import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

// Create Gemini (OpenAI-compatible) client
const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

// Controller function
export const getAIResponse = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ success: false, error: "Query is required" });
    }

    // Call Gemini API
    const response = await client.chat.completions.create({
      model: "gemini-2.5-pro",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: query }
      ]
    });

    // Extract AI response
    const aiMessage = response.choices[0]?.message?.content || "No response";

    res.status(200).json({
      success: true,
      response: aiMessage
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get response from Gemini API"
    });
  }
};
