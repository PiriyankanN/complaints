import React from "react";
import { useNavigate } from "react-router-dom";

const ComplaintHome = () => {
  const navigate = useNavigate(); // Navigation setup

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundImage: 'url("https://source.unsplash.com/1600x900/?technology,abstract")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
      }}
    >
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
      
      <h1 style={{ color: "white", fontSize: "2.5rem", marginBottom: "20px", textShadow: "2px 2px 10px rgba(0,0,0,0.5)" }}>
        Complaint Management System
      </h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <button
          style={{
            padding: "15px 25px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#ff6b6b",
            color: "white",
            cursor: "pointer",
            boxShadow: "3px 3px 10px rgba(0,0,0,0.2)",
          }}
          onClick={() => alert("Redirecting to File Complaint Page...")}
        >
          📄 File a New Complaint
        </button>

        <button
          style={{
            padding: "15px 25px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#1dd1a1",
            color: "white",
            cursor: "pointer",
            boxShadow: "3px 3px 10px rgba(0,0,0,0.2)",
          }}
          onClick={() => navigate("/track-complaint")}
        >
          🔍 Track Your Complaint
        </button>
      </div>
    </div>
  );
};

export default ComplaintHome;
