import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

// Complaint Schema & Model
const ComplaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  complaint: String,
  referenceNumber: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});
const Complaint = mongoose.model("Complaint", ComplaintSchema);

// Admin Complaint Schema & Model
const AdminComplaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  complaint: String,
  referenceNumber: String,
  status: { type: String, default: "Pending", enum: ["Pending", "In Progress", "Resolved"] },
  createdAt: { type: Date, default: Date.now },
});
const AdminComplaint = mongoose.model("AdminComplaint", AdminComplaintSchema);

// Feedback Schema & Model
const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});
const Feedback = mongoose.model("Feedback", FeedbackSchema);

const generateRefNumber = (prefix = "REF") => prefix + Math.floor(100000 + Math.random() * 900000);

// Complaint Routes
app.post("/api/complaints", async (req, res) => {
  const referenceNumber = generateRefNumber();
  const newComplaint = new Complaint({ ...req.body, referenceNumber });

  try {
    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted!", referenceNumber });
  } catch (error) {
    res.status(500).json({ message: "Error submitting complaint" });
  }
});

app.get("/api/complaints/:refNumber", async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ referenceNumber: req.params.refNumber });
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/complaints/:refNumber", async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { referenceNumber: req.params.refNumber },
      { status: req.body.status },
      { new: true }
    );
    if (!updatedComplaint) return res.status(404).json({ message: "Complaint not found" });
    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/complaints/:refNumber", async (req, res) => {
  try {
    const deletedComplaint = await Complaint.findOneAndDelete({ referenceNumber: req.params.refNumber });
    if (!deletedComplaint) return res.status(404).json({ message: "Complaint not found" });
    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete complaint" });
  }
});

// Admin Complaint Routes
app.post("/api/admincomplaints", async (req, res) => {
  const referenceNumber = generateRefNumber("ADMIN-REF");
  const newAdminComplaint = new AdminComplaint({ ...req.body, referenceNumber });

  try {
    await newAdminComplaint.save();
    res.status(201).json({ message: "Admin complaint submitted!", referenceNumber });
  } catch (error) {
    res.status(500).json({ message: "Error submitting admin complaint" });
  }
});

app.get("/api/admincomplaints", async (req, res) => {
  try {
    const adminComplaints = await AdminComplaint.find().sort({ createdAt: -1 });
    res.json(adminComplaints);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/admincomplaints/:refNumber", async (req, res) => {
  try {
    const adminComplaint = await AdminComplaint.findOne({ referenceNumber: req.params.refNumber });
    if (!adminComplaint) return res.status(404).json({ message: "Admin complaint not found" });
    res.json(adminComplaint);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/admincomplaints/:refNumber", async (req, res) => {
  try {
    const updatedAdminComplaint = await AdminComplaint.findOneAndUpdate(
      { referenceNumber: req.params.refNumber },
      { status: req.body.status },
      { new: true }
    );
    if (!updatedAdminComplaint) return res.status(404).json({ message: "Admin complaint not found" });
    res.json(updatedAdminComplaint);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/admincomplaints/:refNumber", async (req, res) => {
  try {
    const deletedAdminComplaint = await AdminComplaint.findOneAndDelete({ 
      referenceNumber: req.params.refNumber 
    });
    if (!deletedAdminComplaint) return res.status(404).json({ message: "Admin complaint not found" });
    res.json({ message: "Admin complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete admin complaint" });
  }
});

// Feedback Routes
app.post("/api/feedback", async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.message) {
    return res.status(400).json({ message: "Missing required fields: name, email, message" });
  }

  const feedback = new Feedback(req.body);
  try {
    await feedback.save();
    console.log('Feedback saved:', feedback);  // Log the saved feedback
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
});


app.get("/api/feedbacks", async (req, res) => {
  try {
    const allFeedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(allFeedback);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feedback data" });
  }
});

// ✅ New feedbacks endpoint (plural)
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedbacks" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
