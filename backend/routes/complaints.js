import express from "express";
import Complaint from "../models/complaint.js"; // Ensure .js extension

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, complaint } = req.body;
    const newComplaint = new Complaint({ name, email, complaint });
    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
