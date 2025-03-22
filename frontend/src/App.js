import React, { useState } from "react";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    complaint: "",
  });

  const [referenceNumber, setReferenceNumber] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage("Complaint submitted successfully!");
      setReferenceNumber(data.referenceNumber);
      setFormData({ name: "", email: "", complaint: "" });
      setSubmitted(true);
    } else {
      setMessage("Failed to submit complaint.");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Lottie Background Animation */}
      <iframe
        src="https://lottie.host/embed/47a5d9bf-b323-4d36-9c8f-46756c8a49f3/2PUCgU8sWL.lottie"
        title="Background Animation"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          border: "none",
        }}
      ></iframe>

      <div
        style={{
          width: "400px",
          padding: "20px",
          borderRadius: "10px",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "5px 5px 15px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#333", fontWeight: "bold" }}>File a Complaint</h2>

        {submitted ? (
          <div>
            <iframe
              src="https://lottie.host/embed/1cfd34a7-c436-4d25-8499-0da207923d5f/x6YS60TWRt.lottie"
              title="Success Animation"
              style={{
                width: "100%",
                height: "200px",
                border: "none",
                marginBottom: "10px",
              }}
            ></iframe>
            <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>
            <p><strong>Reference Number:</strong> {referenceNumber}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <textarea
              name="complaint"
              placeholder="Enter your complaint"
              value={formData.complaint}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                resize: "none",
                height: "80px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#6f4271",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              File Complaint
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ComplaintForm;
