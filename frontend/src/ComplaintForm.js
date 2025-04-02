import React, { useState } from "react";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", complaint: "" });
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
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <div style={{ flex: 3, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <iframe
          src="https://lottie.host/embed/47a5d9bf-b323-4d36-9c8f-46756c8a49f3/2PUCgU8sWL.lottie"
          title="Background Animation"
          style={{ width: "100%", height: "100%", border: "none" }}
        ></iframe>
      </div>

      <div style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0, 0, 0, 0)", padding: "20px" }}>
        <div style={{ width: "350px", padding: "20px", borderRadius: "10px", boxShadow: "25px 25px 50px rgb(0, 0, 0)", textAlign: "center", backgroundColor: "rgb(43, 86, 134)" }}>
          <h2 style={{ color: "white", fontWeight: "bold" }}>File a Complaint</h2>

          {submitted ? (
            <div>
              
              <iframe
                src="https://lottie.host/embed/1cfd34a7-c436-4d25-8499-0da207923d5f/x6YS60TWRt.lottie"
                title="Success Animation"
                style={{ width: "100%", height: "200px", border: "none", marginBottom: "10px" }}
              ></iframe>

              <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>

              <p><strong>Reference Number:</strong> {referenceNumber}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} 
              required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />

              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} 
              required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />

              <textarea name="complaint" placeholder="Enter your complaint" value={formData.complaint} onChange={handleChange} 
              required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", resize: "none", height: "80px" }} />

              <button type="submit" style={{ padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#6f4271", color: "white", fontWeight: "bold", cursor: "pointer" }}>
                File Complaint
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
