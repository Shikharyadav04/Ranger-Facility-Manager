import express from "express";
import { addFeedback, getFeedbackByRequest } from "../controller/feedback.controller.js";

const router = express.Router();

router.post("/add", addFeedback);
router.get("/:request_id", getFeedbackByRequest);

export default router;
