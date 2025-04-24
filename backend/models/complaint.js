import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  complaint: { type: String, required: true },
  status: { type: String, default: "Pending", enum: ["Pending", "In Progress", "Resolved"] },
  referenceNumber: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

ComplaintSchema.pre('save', function(next) {
  if (!this.referenceNumber) {
    this.referenceNumber = 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

const Complaint = mongoose.model("Complaint", ComplaintSchema);
export default Complaint;