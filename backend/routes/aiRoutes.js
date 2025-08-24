import express from "express";
import { getAIResponse } from "../controller/aiController.js";

const router = express.Router();

router.post("/query", getAIResponse)

export default router;