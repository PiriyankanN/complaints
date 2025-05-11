import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// POST: Submit Feedback
router.post("/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
});

// GET: Retrieve All Feedback (Admin Access)
router.get("/feedbacks", async (req, res) => {
  try {
    const allFeedback = await Feedback.find().sort({ createdAt: -1 }); // Newest first
    res.json(allFeedback);
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    res.status(500).json({ error: "Failed to fetch feedback data" });
  }
});

export default router;
