import express from "express";
import Complaint from "../models/Complaints.js"; 

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

router.put("/:referenceNumber", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { referenceNumber: req.params.referenceNumber },
      { status },
      { new: true }
    );
    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/:referenceNumber", async (req, res) => {
  try {
    const deletedComplaint = await Complaint.findOneAndDelete({
      referenceNumber: req.params.referenceNumber,
    });
    if (!deletedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;