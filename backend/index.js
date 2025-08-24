import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import geminiRoutes from "./routes/aiRoutes.js";
import murfRoutes from "./routes/murf.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.use("/api/ai", geminiRoutes);
app.use("/api/murf", murfRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
