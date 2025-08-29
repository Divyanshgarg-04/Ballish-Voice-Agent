import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import geminiRoutes from "./routes/aiRoutes.js";
import murfRoutes from "./routes/murf.js";
dotenv.config();
const Frontend_URL = process.env.FRONTEND_URL;
const app = express();
app.use(cors({
    origin : Frontend_URL
}));
app.use(bodyParser.json());


app.use("/api/ai", geminiRoutes);
app.use("/api/murf", murfRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
