import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ComplaintHome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundColor: "rgba(152, 195, 213, 0.68)",
        padding: "20px",
      }}
    >
      <div
        className="d-flex w-75 rounded-4 shadow-lg overflow-hidden"
        style={{
          backgroundColor: "white",
          maxWidth: "1100px",
        }}
      >
        <div
          className="d-flex flex-column justify-content-center p-5"
          style={{
            backgroundColor: "rgba(84, 22, 5, 0.95)",
            color: "white",
            flex: 1.5,
          }}
        >
          <h1 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
            Complaint Management System
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: "1.6",
              maxWidth: "700px",
            }}
          >
            <br></br>The Complaint Management System in the RentNest application is designed to provide users with a seamless and efficient way to report any issues or concerns they encounter during their rental experience. RentNest's Complaint Management System includes features such as complaint categorization, priority setting, and real-time updates on the status of the complaint. Users are also assigned a unique reference number for each complaint, allowing them to track the resolution process. The system is designed to enhance tenant satisfaction by ensuring transparency, quick response times, and effective issue resolution. Additionally, landlords and property managers can use the system to monitor and resolve complaints efficiently, improving the overall quality of service within the RentNest platform.
          </p>

          
          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-lg"
              onClick={() => navigate("/file-complaint")}
              style={{
                backgroundColor: "rgba(25, 225, 52, 0.61)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "50px",
                fontSize: "1rem",
                border: "none",
                boxShadow: "3px 3px 25px rgb(0, 0, 0)",
              }}
            >
              File a Complaint
            </button>
            <button
              className="btn btn-lg"
              onClick={() => navigate("/track-complaint")}
              style={{
                backgroundColor: "rgba(190, 22, 89, 0.73)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "50px",
                fontSize: "1rem",
                border: "none",
                boxShadow: "3px 3px 25px rgb(0, 0, 0)",
              }}
            >
              Track Complaint
            </button>
          </div>
        </div>

        <div
          className="d-flex align-items-center justify-content-center"
          style={{ flex: 1, backgroundColor: "rgba(84, 22, 5, 0.95)", padding: "30px" }}
        >
          <iframe
            src="https://lottie.host/embed/099218a2-e882-40f4-b60e-aa69bf765837/4lVaBRXTy6.lottie"
            title="Complaint Animation"
            style={{ width: "100%", height: "100%", border: "none" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ComplaintHome;
