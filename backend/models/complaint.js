import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  complaint: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Complaint = mongoose.model("Complaint", ComplaintSchema);
export default Complaint;
