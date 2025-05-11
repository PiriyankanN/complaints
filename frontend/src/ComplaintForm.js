import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    complaint: "",
    category: "General",
    urgency: "Medium"
  });
  
  const [referenceNumber, setReferenceNumber] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message) setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage("Complaint submitted successfully!");
        setReferenceNumber(data.referenceNumber);
        setFormData({ name: "", email: "", complaint: "", category: "General", urgency: "Medium" });
        setSubmitted(true);
      } else {
        throw new Error(data.message || "Failed to submit complaint");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex" style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      backgroundColor: "#f8fafc"
    }}>
      {/* Visual Section - Hidden on mobile */}
      <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5" style={{
        background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(59, 130, 246, 0.1)",
          zIndex: 1
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(59, 130, 246, 0.1)",
          zIndex: 1
        }}></div>
        
        <div className="position-relative z-2 text-center" style={{ maxWidth: "600px" }}>
          <h2 className="fw-bold mb-4" style={{ color: "#1e293b" }}>Report Your Concern</h2>
          <p className="text-muted mb-5">
            Our team is ready to assist you with any issues you're experiencing. 
            Please provide detailed information to help us resolve your concern quickly.
          </p>
          <img 
            src="https://i.pinimg.com/736x/71/43/b9/7143b9da70320d96322a671dd48c0185.jpg" 
            alt="Complaint illustration" 
            className="img-fluid"
            style={{ maxHeight: "300px" }}
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-lg-5">
        <div className="shadow-lg rounded-4 p-4 p-lg-5" style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "white",
          border: "1px solid rgba(203, 213, 225, 0.3)"
        }}>
          {submitted ? (
            <div className="text-center py-4">
              <div className="mb-4">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12L11 15L16 9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="fw-bold mb-3" style={{ color: "#10B981" }}>Complaint Submitted</h3>
              <p className="text-muted mb-4">
                Thank you for bringing this to our attention. We'll address your concern promptly.
              </p>
              
              <div className="alert alert-info text-start">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V12" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16H12.01" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <strong>Reference Number:</strong>
                </div>
                <code className="d-block p-2 bg-light rounded-2 text-center fw-bold fs-5">
                  {referenceNumber}
                </code>
                <small className="text-muted d-block mt-2">
                  Please save this number to track your complaint status.
                </small>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-5">
                <h2 className="fw-bold mb-2" style={{ color: "#1e293b" }}>File a Complaint</h2>
                <p className="text-muted">Please fill out the form below to submit your complaint</p>
              </div>

              {message && (
                <div className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"} mb-4`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label fw-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control py-3"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="form-label fw-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control py-3"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="form-label fw-medium">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select py-3"
                    required
                  >
                    <option value="General">General Issue</option>
                    <option value="Maintenance">Maintenance Request</option>
                    <option value="Payment">Payment Problem</option>
                    <option value="Neighbor">Neighbor Concern</option>
                    <option value="Safety">Safety Issue</option>
                  </select>
                </div>

                <div>
                  <label className="form-label fw-medium">Urgency Level</label>
                  <div className="d-flex gap-3">
                    {["Low", "Medium", "High"].map(level => (
                      <div key={level} className="form-check flex-grow-1">
                        <input
                          type="radio"
                          name="urgency"
                          id={`urgency-${level}`}
                          value={level}
                          checked={formData.urgency === level}
                          onChange={handleChange}
                          className="form-check-input"
                          required
                        />
                        <label htmlFor={`urgency-${level}`} className="form-check-label">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="form-label fw-medium">Complaint Details</label>
                  <textarea
                    name="complaint"
                    value={formData.complaint}
                    onChange={handleChange}
                    className="form-control py-3"
                    rows="4"
                    placeholder="Please describe your complaint in detail..."
                    required
                    style={{ resize: "none" }}
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-3 fw-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      "Submit Complaint"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;