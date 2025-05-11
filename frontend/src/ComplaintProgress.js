import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ComplaintProgress = () => {
  const [refNumber, setRefNumber] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!refNumber.trim()) {
      setError("Please enter a reference number");
      return;
    }

    setLoading(true);
    setError("");
    setComplaint(null);

    try {
      const response = await fetch(`http://localhost:5000/api/complaints/${refNumber}`);
      const data = await response.json();
      
      if (response.ok) {
        setComplaint(data);
      } else {
        setError(data.message || "Complaint not found");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
      console.error("Error fetching complaint:", err);
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (status) => {
    const statusStyles = {
      Pending: { bg: "bg-warning", text: "text-dark" },
      "In Progress": { bg: "bg-info", text: "text-white" },
      Resolved: { bg: "bg-success", text: "text-white" },
      Rejected: { bg: "bg-danger", text: "text-white" }
    };
    
    const style = statusStyles[status] || { bg: "bg-secondary", text: "text-white" };
    
    return (
      <span className={`badge ${style.bg} ${style.text} px-3 py-2`}>
        {status}
      </span>
    );
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
          <h2 className="fw-bold mb-4" style={{ color: "#1e293b" }}>Track Your Complaint</h2>
          <p className="text-muted mb-5">
            Check the status of your submitted complaint and stay updated on its progress.
          </p>
          <img 
            src="https://i.pinimg.com/736x/f6/3e/2b/f63e2b644a9f5bc50470698d1b67fd13.jpg" 
            alt="Search illustration" 
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
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2" style={{ color: "#1e293b" }}>Complaint Status</h2>
            <p className="text-muted">Enter your reference number to check the status</p>
          </div>

          <form onSubmit={handleSearch} className="mb-4">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control py-3"
                placeholder="Enter reference number"
                value={refNumber}
                onChange={(e) => {
                  setRefNumber(e.target.value);
                  if (error) setError("");
                }}
                aria-label="Reference number"
              />
              <button 
                className="btn btn-primary px-4" 
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="alert alert-danger d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <div>{error}</div>
            </div>
          )}

          {complaint && (
            <div className="mt-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom-0 pt-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title mb-0">Complaint Details</h5>
                    {statusBadge(complaint.status)}
                  </div>
                  <div className="d-flex gap-2">
                    <span className="badge bg-light text-dark">
                      Ref: {complaint.referenceNumber}
                    </span>
                    <span className="badge bg-light text-dark">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <h6 className="text-muted mb-1">Submitted By</h6>
                    <p className="mb-0">{complaint.name} ({complaint.email})</p>
                  </div>
                  
                  <div className="mb-3">
                    <h6 className="text-muted mb-1">Category</h6>
                    <p className="mb-0">{complaint.category || "General"}</p>
                  </div>
                  
                  <div>
                    <h6 className="text-muted mb-1">Complaint Details</h6>
                    <p className="mb-0">{complaint.complaint}</p>
                  </div>
                </div>
              </div>

              {complaint.status === "In Progress" && (
                <div className="mt-4">
                  <h6 className="text-muted mb-3">Progress Timeline</h6>
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <p className="fw-semibold mb-1">Complaint Received</p>
                        <small className="text-muted">
                          {new Date(complaint.createdAt).toLocaleString()}
                        </small>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <p className="fw-semibold mb-1">Under Review</p>
                        <small className="text-muted">
                          {complaint.updatedAt ? 
                            new Date(complaint.updatedAt).toLocaleString() : 
                            "Pending"}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintProgress;