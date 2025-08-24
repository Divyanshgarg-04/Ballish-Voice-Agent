import express from "express";
// import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  const { text } = req.body;
  try {
    const response = await fetch("https://api.murf.ai/v1/speech/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.MURF_API_KEY,
      },
      body: JSON.stringify({ text, voice: "en-US-male" }),
    });
    const audioBuffer = await response.arrayBuffer();
    res.send(Buffer.from(audioBuffer));
  } catch (err) {
    res.status(500).json({ error: "MURF API failed" });
  }
});

export default router;
