import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import geminiRoutes from "./routes/aiRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.use("/api/ai", geminiRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
