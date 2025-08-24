import express from "express";
import { getMurfAudio } from "../controller/murfController.js";

const router = express.Router();

router.post("/speech", getMurfAudio);

export default router;
