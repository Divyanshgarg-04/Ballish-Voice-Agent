import axios from "axios";

export const getMurfAudio = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, error: "Text is required" });
    }

    // 1️⃣ Call Murf API to generate audio
    const generateRes = await axios.post(
      "https://api.murf.ai/v1/speech/generate",
      {
        voiceId: "en-US-terrell",  // pick valid Murf voiceId
        text
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": process.env.MURF_API_KEY,
        },
      }
    );

    const audioUrl = generateRes.data.audioFile;
    if (!audioUrl) {
      console.error("Murf response:", generateRes.data);
      return res.status(500).json({ success: false, error: "No audio file generated" });
    }

    // 2️⃣ Download the audio file
    const audioRes = await axios.get(audioUrl, { responseType: "arraybuffer" });

    // 3️⃣ Send audio back as MP3
    res.set("Content-Type", "audio/mpeg");
    res.send(audioRes.data);

  } catch (err) {
    console.error("Murf API error:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: "Murf request failed" });
  }
};
