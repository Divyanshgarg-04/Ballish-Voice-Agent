import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import geminiRoutes from "./routes/gemini.js";
import murfRoutes from "./routes/murf.js";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.use("/auth", authRoutes);
app.use("/gemini", geminiRoutes);
app.use("/murf", murfRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
