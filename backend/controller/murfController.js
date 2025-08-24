// murfController.js
import axios from "axios";

export const getMurfAudio = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, error: "Text is required" });
    }

    // 1️⃣ Generate speech via Murf
    const generateRes = await axios.post(
      "https://api.murf.ai/v1/speech/generate",
      {
        voiceId: "en-US-1", // Example: choose a valid voice ID
        format: "mp3",
        text
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.MURF_API_KEY,
        }
      }
    );

    const audioUrl = generateRes.data.audioFile;
    if (!audioUrl) {
      console.error("No audioFile in Murf response:", generateRes.data);
      return res.status(500).json({ success: false, error: "No audio file generated" });
    }

    // 2️⃣ Retrieve the audio from the URL
    const audioRes = await axios.get(audioUrl, { responseType: "arraybuffer" });

    // 3️⃣ Stream MP3 back to frontend
    res.set("Content-Type", "audio/mpeg");
    return res.send(audioRes.data);

  } catch (err) {
    console.error("Murf API error:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: "Failed to get audio from Murf" });
  }
};
