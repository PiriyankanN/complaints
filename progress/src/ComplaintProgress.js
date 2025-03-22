import React, { useState } from "react";

const ComplaintProgress = () => {
  const [refNumber, setRefNumber] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setComplaint(null);

    try {
      const response = await fetch(`http://localhost:5000/api/complaints/${refNumber}`);
      const data = await response.json();
      if (response.ok) {
        setComplaint(data);
      } else {
        setError("Complaint not found");
      }
    } catch (err) {
      setError("Server error, try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Left Side: Lottie Animation */}
      <div style={{ width: "50%", height: "100%" }}>
        <iframe
          src="https://lottie.host/embed/f9e3c88f-83ff-4df0-bf72-29fafda70927/Rqa26J9RmU.lottie"
          title="Background Animation"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        ></iframe>
      </div>

      {/* Right Side: Complaint Tracking Card */}
      <div
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "400px",
            padding: "20px",
            borderRadius: "10px",
            background: "rgba(111, 66, 113, 0.9)",
            boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#FFFFFF" }}>Track Your Complaint</h2>

          <input
            type="text"
            placeholder="Enter Reference Number"
            value={refNumber}
            onChange={(e) => setRefNumber(e.target.value)}
            style={{
              width: "75%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              width: "50%",
              padding: "10px",
              backgroundColor: "rgba(44, 38, 59, 0.73)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Find
          </button>

          {loading && <p style={{ color: "#007bff", marginTop: "10px" }}>🔍 Finding complaint...</p>}

          {/* Show Lottie Animation if the reference number is invalid */}
          {error && (
            <iframe
              src="https://lottie.host/embed/908cea93-59dc-4afc-b957-b9cb47cfebc5/P8gue7JA4N.lottie"
              title="Error Animation"
              style={{
                width: "100%",
                height: "100px",
                border: "none",
                marginTop: "10px",
              }}
            ></iframe>
          )}

          {complaint && (
            <div style={{ marginTop: "15px", textAlign: "left", background: "rgba(255, 255, 255, 0.7)", padding: "10px", borderRadius: "5px" }}>
              <p><strong>Name:</strong> {complaint.name}</p>
              <p><strong>Email:</strong> {complaint.email}</p>
              <p><strong>Complaint:</strong> {complaint.complaint}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintProgress;
