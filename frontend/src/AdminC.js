import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const API_BASE_URL = "http://localhost:5000/api";
const STATUS_OPTIONS = ["Pending", "In Progress", "Resolved"];
const STATUS_COLORS = {
  Pending: "#FFA500", 
  "In Progress": "#4169E1",
  Resolved: "#2E8B57" 
};


const styles = {
  container: {
    padding: "32px",
    maxWidth: "1400px",
    margin: "0 auto",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: "#1a1a1a",
    backgroundColor: "#f8fafc",
    minHeight: "100vh"
  },
  header: {
    marginBottom: "40px",
    color: "#1e293b",
    fontSize: "28px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  section: {
    marginBottom: "48px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
    padding: "28px",
    border: "1px solid #e2e8f0",
    transition: "box-shadow 0.3s ease",
    ":hover": {
      boxShadow: "0 6px 24px rgba(0,0,0,0.08)"
    }
  },
  sectionHeader: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#334155",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingBottom: "16px",
    borderBottom: "1px solid #f1f5f9"
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
    fontSize: "15px",
    borderRadius: "10px",
    overflow: "hidden"
  },
  tableHeader: {
    backgroundColor: "#f1f5f9",
    color: "#475569",
    fontWeight: "600",
    textAlign: "left",
    padding: "16px 20px",
    borderBottom: "1px solid #e2e8f0",
    position: "sticky",
    top: 0,
    zIndex: 10
  },
  tableCell: {
    padding: "16px 20px",
    borderBottom: "1px solid #f1f5f9",
    verticalAlign: "middle",
    transition: "background-color 0.2s ease"
  },
  tableRow: {
    ":hover": {
      backgroundColor: "#f8fafc"
    }
  },
  statusBadge: (status) => ({
    backgroundColor: STATUS_COLORS[status] || "#64748b",
    color: "white",
    borderRadius: "20px",
    padding: "6px 14px",
    fontSize: "13px",
    fontWeight: "500",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    textTransform: "capitalize",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
  }),
  select: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    fontSize: "14px",
    marginRight: "10px",
    minWidth: "140px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    ":focus": {
      outline: "none",
      borderColor: "#93c5fd",
      boxShadow: "0 0 0 3px rgba(147, 197, 253, 0.3)"
    },
    ":disabled": {
      backgroundColor: "#f8fafc",
      cursor: "not-allowed"
    }
  },
  button: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
  },
  primaryButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    ":hover": {
      backgroundColor: "#2563eb",
      transform: "translateY(-1px)"
    },
    ":active": {
      transform: "translateY(0)"
    }
  },
  dangerButton: {
    backgroundColor: "#ef4444",
    color: "white",
    ":hover": {
      backgroundColor: "#dc2626",
      transform: "translateY(-1px)"
    },
    ":active": {
      transform: "translateY(0)"
    }
  },
  disabledButton: {
    backgroundColor: "#e2e8f0",
    color: "#94a3b8",
    cursor: "not-allowed",
    boxShadow: "none",
    ":hover": {
      transform: "none",
      backgroundColor: "#e2e8f0"
    }
  },
  notification: (isError = false) => ({
    padding: "16px 24px",
    backgroundColor: isError ? "#ef4444" : "#10b981",
    color: "white",
    borderRadius: "8px",
    position: "fixed",
    top: "24px",
    right: "24px",
    animation: "slideIn 0.3s ease, fadeOut 0.5s ease 2.5s forwards",
    zIndex: 1000,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: "500"
  }),
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    backdropFilter: "blur(4px)",
    animation: "fadeIn 0.3s ease"
  },
  modalContent: {
    backgroundColor: "white",
    padding: "32px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "600px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    transform: "scale(0.95)",
    animation: "scaleIn 0.2s ease forwards",
    border: "1px solid #e2e8f0"
  },
  loadingIndicator: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px",
    flexDirection: "column",
    gap: "20px"
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#64748b"
  },
  emptyStateIcon: {
    width: "64px",
    height: "64px",
    marginBottom: "16px",
    opacity: 0.7
  },
  icon: {
    width: "20px",
    height: "20px",
    flexShrink: 0
  },
  actionButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap"
  },
  ratingStars: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "#f8fafc",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "500"
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px"
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1e293b",
    margin: 0
  },
  modalCloseButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "50%",
    transition: "background-color 0.2s ease",
    ":hover": {
      backgroundColor: "#f1f5f9"
    }
  },
  feedbackContent: {
    backgroundColor: "#f8fafc",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "24px",
    lineHeight: "1.7",
    fontSize: "15px"
  },
  statsContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "32px",
    flexWrap: "wrap"
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    flex: "1",
    minWidth: "200px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
    transition: "transform 0.2s ease",
    ":hover": {
      transform: "translateY(-3px)"
    }
  },
  statTitle: {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "500",
    marginBottom: "8px"
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1e293b"
  }
};

const StatusBadge = ({ status }) => {
  const getStatusIcon = () => {
    switch(status) {
      case "Pending":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
          </svg>
        );
      case "In Progress":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
          </svg>
        );
      case "Resolved":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <span style={styles.statusBadge(status)}>
      {getStatusIcon()}
      {status}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired
};

const AdminC = () => {
  const [complaints, setComplaints] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState({
    complaints: true,
    feedbacks: true
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    fetchAdminComplaints();
    fetchFeedbacks();
  }, []);

  const fetchAdminComplaints = async () => {
    try {
      setLoading(prev => ({ ...prev, complaints: true }));
      const response = await fetch(`${API_BASE_URL}/complaints`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setComplaints(data);
    } catch (err) {
      setError("Failed to fetch complaints: " + err.message);
    } finally {
      setLoading(prev => ({ ...prev, complaints: false }));
    }
  };

  const fetchFeedbacks = async () => {
    try {
      setLoading(prev => ({ ...prev, feedbacks: true }));
      const res = await fetch(`${API_BASE_URL}/feedbacks`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      setError("Failed to fetch feedbacks: " + err.message);
    } finally {
      setLoading(prev => ({ ...prev, feedbacks: false }));
    }
  };

  const updateStatus = async (referenceNumber, status) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/complaints/${referenceNumber}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const updatedComplaint = await response.json();
      setComplaints(prev =>
        prev.map(complaint =>
          complaint.referenceNumber === referenceNumber
            ? updatedComplaint
            : complaint
        )
      );
      showSuccessMessage("Status updated successfully");
    } catch (err) {
      showErrorMessage(err.message);
    }
  };

  const deleteAdminComplaint = async (referenceNumber) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/complaints/${referenceNumber}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      setComplaints(prev =>
        prev.filter(complaint => complaint.referenceNumber !== referenceNumber)
      );
      showSuccessMessage("Complaint deleted successfully");
    } catch (err) {
      showErrorMessage(err.message);
    }
  };

  const deleteFeedback = async (feedbackId) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/feedbacks/${feedbackId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      setFeedbacks(prev => prev.filter(f => f._id !== feedbackId));
      showSuccessMessage("Feedback deleted successfully");
    } catch (err) {
      showErrorMessage(err.message);
    }
  };

  const showSuccessMessage = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const showErrorMessage = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 3000);
  };

  const renderNotification = (message, isError = false) => (
    <div style={styles.notification(isError)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 16 16"
        style={styles.icon}
      >
        {isError ? (
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        ) : (
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        )}
      </svg>
      {message}
    </div>
  );

  const complaintStats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === "Pending").length,
    inProgress: complaints.filter(c => c.status === "In Progress").length,
    resolved: complaints.filter(c => c.status === "Resolved").length
  };

  const feedbackStats = {
    total: feedbacks.length,
    averageRating: feedbacks.length > 0 
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length)
      : 0
  };
  
  if (loading.complaints && loading.feedbacks) {
    return (
      <div style={styles.loadingIndicator}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="#3b82f6"
          viewBox="0 0 16 16"
          style={{ animation: "spin 1s linear infinite" }}
        >
          <path d="M8 0a8 8 0 0 0-8 8h1.5a6.5 6.5 0 1 1 6.5 6.5H0v1.5a8 8 0 1 0 8-8z"/>
        </svg>
        <span style={{ color: "#64748b", fontWeight: "500" }}>Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#3b82f6" viewBox="0 0 16 16">
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
        </svg>
        Admin Dashboard
      </h1>

      {successMessage && renderNotification(successMessage)}
      {error && renderNotification(error, true)}

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statTitle}>Total Complaints</div>
          <div style={styles.statValue}>{complaintStats.total}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statTitle}>Pending</div>
          <div style={styles.statValue}>{complaintStats.pending}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statTitle}>In Progress</div>
          <div style={styles.statValue}>{complaintStats.inProgress}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statTitle}>Resolved</div>
          <div style={styles.statValue}>{complaintStats.resolved}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statTitle}>Total Feedbacks</div>
          <div style={styles.statValue}>{feedbackStats.total}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statTitle}>Avg. Rating</div>
          <div style={styles.statValue}>
            {feedbackStats.total > 0 ? feedbackStats.averageRating.toFixed(1) : "0.0"}
          </div>
        </div>
      </div>

      <section style={styles.section} aria-labelledby="complaints-heading">
        <h2 id="complaints-heading" style={styles.sectionHeader}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#3b82f6"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
          </svg>
          Complaint Management
        </h2>
        
        {loading.complaints ? (
          <div style={styles.loadingIndicator}>
            <span>Loading complaints...</span>
          </div>
        ) : complaints.length === 0 ? (
          <div style={styles.emptyState}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              fill="#94a3b8"
              viewBox="0 0 16 16"
              style={styles.emptyStateIcon}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            <p style={{ fontSize: "16px", marginTop: "8px" }}>No complaints found</p>
            <button 
              style={{ 
                ...styles.button, 
                ...styles.primaryButton,
                marginTop: "16px"
              }}
              onClick={fetchAdminComplaints}
            >
              Refresh
            </button>
          </div>
        ) : (
          <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Ref#</th>
                  <th style={styles.tableHeader}>Name</th>
                  <th style={styles.tableHeader}>Email</th>
                  <th style={styles.tableHeader}>Details</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr key={c.referenceNumber} style={styles.tableRow}>
                    <td style={styles.tableCell}>
                      <span style={{ fontWeight: "500", color: "#1e293b" }}>{c.referenceNumber}</span>
                    </td>
                    <td style={styles.tableCell}>{c.name}</td>
                    <td style={styles.tableCell}>
                      <a href={`mailto:${c.email}`} style={{ color: "#3b82f6", textDecoration: "none" }}>
                        {c.email}
                      </a>
                    </td>
                    <td style={{ ...styles.tableCell, maxWidth: "250px" }}>
                      <div style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontWeight: "400"
                      }}>
                        {c.complaint}
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <StatusBadge status={c.status} />
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionButtons}>
                        <select
                          value={c.status}
                          onChange={(e) => updateStatus(c.referenceNumber, e.target.value)}
                          disabled={c.status === "Resolved"}
                          style={{
                            ...styles.select,
                            cursor: c.status === "Resolved" ? "not-allowed" : "pointer",
                            opacity: c.status === "Resolved" ? 0.7 : 1
                          }}
                        >
                          {STATUS_OPTIONS.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>

                        <button
                          onClick={() => deleteAdminComplaint(c.referenceNumber)}
                          disabled={c.status === "Resolved"}
                          style={{
                            ...styles.button,
                            ...styles.dangerButton,
                            ...(c.status === "Resolved" && styles.disabledButton)
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            style={styles.icon}
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section style={styles.section} aria-labelledby="feedbacks-heading">
        <h2 id="feedbacks-heading" style={styles.sectionHeader}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#3b82f6"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
          </svg>
          User Feedbacks
        </h2>
        
        {loading.feedbacks ? (
          <div style={styles.loadingIndicator}>
            <span>Loading feedbacks...</span>
          </div>
        ) : feedbacks.length === 0 ? (
          <div style={styles.emptyState}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              fill="#94a3b8"
              viewBox="0 0 16 16"
              style={styles.emptyStateIcon}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            <p style={{ fontSize: "16px", marginTop: "8px" }}>No feedbacks submitted yet</p>
            <button 
              style={{ 
                ...styles.button, 
                ...styles.primaryButton,
                marginTop: "16px"
              }}
              onClick={fetchFeedbacks}
            >
              Refresh
            </button>
          </div>
        ) : (
          <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Name</th>
                  <th style={styles.tableHeader}>Email</th>
                  <th style={styles.tableHeader}>Rating</th>
                  <th style={styles.tableHeader}>Message</th>
                  <th style={styles.tableHeader}>Date</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((f) => (
                  <tr key={f._id} style={styles.tableRow}>
                    <td style={styles.tableCell}>
                      <span style={{ fontWeight: "500" }}>{f.name}</span>
                    </td>
                    <td style={styles.tableCell}>
                      <a href={`mailto:${f.email}`} style={{ color: "#3b82f6", textDecoration: "none" }}>
                        {f.email}
                      </a>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.ratingStars}>
                        {f.rating}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#FFD700"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                      </div>
                    </td>
                    <td style={{ ...styles.tableCell, maxWidth: "250px" }}>
                      <div style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontWeight: "400"
                      }}>
                        {f.message}
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      {new Date(f.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionButtons}>
                        <button
                          onClick={() => {
                            setSelectedFeedback(f);
                            setShowFeedbackModal(true);
                          }}
                          style={{
                            ...styles.button,
                            ...styles.primaryButton
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            style={styles.icon}
                          >
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                          </svg>
                          View
                        </button>

                        <button
                          onClick={() => deleteFeedback(f._id)}
                          style={{
                            ...styles.button,
                            ...styles.dangerButton
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            style={styles.icon}
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showFeedbackModal && selectedFeedback && (
        <div 
          role="dialog"
          aria-labelledby="feedback-modal-title"
          aria-modal="true"
          style={styles.modalOverlay}
          onClick={() => setShowFeedbackModal(false)}
        >
          <div 
            style={styles.modalContent}
            onClick={e => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <h3 id="feedback-modal-title" style={styles.modalTitle}>
                Feedback from {selectedFeedback.name}
              </h3>
              <button 
                style={styles.modalCloseButton}
                onClick={() => setShowFeedbackModal(false)}
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#64748b" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "12px",
              marginBottom: "20px"
            }}>
              <div style={styles.statusBadge(`${selectedFeedback.rating} Stars`)}>
                {selectedFeedback.rating} ⭐
              </div>
              <div style={{ color: "#64748b", fontSize: "14px" }}>
                <div style={{ fontWeight: "500" }}>{selectedFeedback.email}</div>
                <div>
                  {new Date(selectedFeedback.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
            
            <div style={styles.feedbackContent}>
              <p style={{ margin: 0 }}>{selectedFeedback.message}</p>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowFeedbackModal(false)}
                style={{
                  ...styles.button,
                  ...styles.primaryButton
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes scaleIn {
            0% { transform: scale(0.95); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          body {
            margin: 0;
            background-color: #f8fafc;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `}
      </style>
    </div>
  );
};

export default AdminC;