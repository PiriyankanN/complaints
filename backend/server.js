import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();


app.use(express.json());
app.use(cors({ origin: "*" })); 


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); 
  }
};

connectDB();

const ComplaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  complaint: String,
  referenceNumber: String,
  status: { type: String, default: "Pending" }
});

const Complaint = mongoose.model("Complaint", ComplaintSchema);


const generateRefNumber = () => "REF" + Math.floor(100000 + Math.random() * 900000);


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
    const complaints = await Complaint.find();
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


app.listen(5000, () => console.log("Server running on port 5000"));