import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import axios from "axios";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: "5",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/feedback", formData);
      console.log("Feedback saved:", response.data);

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "", rating: "5" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError(error.response?.data?.message || "Failed to submit feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const ratingOptions = [
    { value: "5", label: "🌟🌟🌟🌟🌟 Excellent" },
    { value: "4", label: "🌟🌟🌟🌟 Very Good" },
    { value: "3", label: "🌟🌟🌟 Good" },
    { value: "2", label: "🌟🌟 Fair" },
    { value: "1", label: "🌟 Poor" }
  ];

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div
            className="shadow-lg p-4 p-md-5 rounded-4 animate__animated animate__fadeIn"
            style={{
              background: "linear-gradient(to bottom, #ffffff, #f8fafc)",
              border: "1px solid rgba(203, 213, 225, 0.3)",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            }}
          >
            <div className="text-center mb-5">
              <div className="mb-3">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9H9.01" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9H15.01" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="fw-bold mb-3" style={{ color: "#1E293B", fontSize: "2rem" }}>
                Share Your Experience
              </h2>
              <p className="text-muted" style={{ maxWidth: "500px", margin: "0 auto" }}>
                Your feedback helps us improve our services and create a better experience for everyone.
              </p>
            </div>

            {submitted && (
              <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle-fill flex-shrink-0 me-2" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <div>
                  Thank you for your valuable feedback! We appreciate your time.
                </div>
              </div>
            )}

            {error && (
              <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <div>{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-medium mb-2" style={{ color: "#334155" }}>Full Name</label>
                <input
                  type="text"
                  className="form-control py-3"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  style={{ 
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    backgroundColor: "#F8FAFC"
                  }}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-medium mb-2" style={{ color: "#334155" }}>Email Address</label>
                <input
                  type="email"
                  className="form-control py-3"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={{ 
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    backgroundColor: "#F8FAFC"
                  }}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-medium mb-2" style={{ color: "#334155" }}>Your Rating</label>
                <select
                  className="form-select py-3"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  style={{ 
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    backgroundColor: "#F8FAFC"
                  }}
                >
                  {ratingOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label fw-medium mb-2" style={{ color: "#334155" }}>Feedback</label>
                <textarea
                  className="form-control py-3"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your experience..."
                  style={{ 
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    backgroundColor: "#F8FAFC",
                    resize: "none"
                  }}
                  required
                ></textarea>
              </div>

              <div className="text-center mt-5">
                <button
                  type="submit"
                  className="btn btn-primary px-5 py-3 fw-semibold"
                  style={{
                    borderRadius: "8px",
                    backgroundColor: "#3B82F6",
                    border: "none",
                    minWidth: "200px",
                    transition: "all 0.2s ease",
                    position: "relative"
                  }}
                  disabled={isLoading}
                  onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = "#2563EB")}
                  onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = "#3B82F6")}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;