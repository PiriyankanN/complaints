import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ComplaintHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{
      fontFamily: "'Inter', sans-serif",
      background: "linear-gradient(135deg, #eef2f7 0%, #f8fafc 100%)",
      padding: "2rem"
    }}>
      <div className="container">
        <div className="row g-0 shadow rounded-4 overflow-hidden bg-white">
          
          {/* Text Section */}
          <div className="col-lg-7 col-12 p-5 d-flex flex-column justify-content-center">
            <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold mb-4 px-3 py-2">
              Complaint Portal
            </span>

            <h1 className="display-5 fw-bold mb-3" style={{ color: "#1e293b" }}>
              Streamlined Complaint Resolution
            </h1>

            <p className="lead text-muted mb-5" style={{ fontSize: "1.15rem" }}>
              Our advanced complaint management system ensures your concerns are handled quickly and transparently with real-time updates.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3">
              <button
                onClick={() => navigate("/file-complaint")}
                className="btn btn-primary btn-lg px-4 py-3 rounded-3 shadow-sm"
                style={{ minWidth: "200px", transition: "transform 0.3s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                File New Complaint
              </button>
              <button
                onClick={() => navigate("/track-complaint")}
                className="btn btn-outline-secondary btn-lg px-4 py-3 rounded-3"
                style={{ minWidth: "200px", transition: "transform 0.3s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                Track Complaint
              </button>
            </div>

            <div className="mt-5 pt-4 border-top">
              <div className="d-flex flex-wrap gap-4">
                {["24/7 Support", "Real-time Updates", "Secure Platform"].map((feature, index) => (
                  <div key={index} className="d-flex align-items-center text-muted">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="me-2 text-success">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <small>{feature}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-lg-5 d-none d-lg-flex align-items-center justify-content-center" style={{
            background: "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)",
            padding: "2rem"
          }}>
            <img
              src="https://media.istockphoto.com/vectors/complaint-concept-isometric-concept-clipboard-and-pencil-vector-id1316005057?k=6&m=1316005057&s=612x612&w=0&h=WzwEmMhoMTz2d1KmSkxmc2R3QH6cM3LraeofaWlTGRI="
              alt="Complaint management"
              className="img-fluid"
              style={{ maxHeight: "80%", objectFit: "contain" }}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ComplaintHome;
