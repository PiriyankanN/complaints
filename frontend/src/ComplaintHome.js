import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ComplaintHome = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      {/* Text Content - 75% width */}
      <div
        style={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px",
          color: "#2d3748",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            lineHeight: "1.2",
            color: "#1a365d",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Complaint Management System
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.8",
            marginBottom: "2.5rem",
            color: "#4a5568",
          }}
        >
          The Complaint Management System in the RentNest application is designed
          to provide users with a seamless and efficient way to report any issues
          or concerns they encounter during their rental experience.
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            className="btn btn-lg"
            onClick={() => navigate("/file-complaint")}
            style={{
              padding: "15px 30px",
              borderRadius: "8px",
              fontSize: "1.1rem",
              border: "none",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              fontWeight: "600",
              transition: "all 0.3s ease",
              backgroundColor: "#4299e1",
              color: "white",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "none";
              e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
            aria-label="File a new complaint"
          >
            File a Complaint
          </button>
          <button
            className="btn btn-lg"
            onClick={() => navigate("/track-complaint")}
            style={{
              padding: "15px 30px",
              borderRadius: "8px",
              fontSize: "1.1rem",
              border: "none",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              fontWeight: "600",
              transition: "all 0.3s ease",
              backgroundColor: "#ed8936",
              color: "white",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "none";
              e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
            aria-label="Track an existing complaint"
          >
            Track Complaint
          </button>
        </div>
      </div>

      {/* Animation - 25% width */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ebf8ff",
          padding: "40px",
        }}
      >
        <iframe
          src="https://lottie.host/embed/099218a2-e882-40f4-b60e-aa69bf765837/4lVaBRXTy6.lottie"
          title="Complaint Animation"
          aria-label="Animated illustration of complaint management"
          style={{
            width: "100%",
            height: "100%",
            minHeight: "400px",
            border: "none",
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default ComplaintHome;