import React, { useEffect, useState } from "react";

const AdminC = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchAdminComplaints();
  }, []);

  const fetchAdminComplaints = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/complaints");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setComplaints(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch complaints: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (referenceNumber, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/complaints/${referenceNumber}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      
      if (!response.ok) throw new Error("Failed to update status");
      
      const updatedComplaint = await response.json();
      setComplaints(complaints.map(complaint => 
        complaint.referenceNumber === updatedComplaint.referenceNumber 
          ? updatedComplaint 
          : complaint
      ));
      setSuccessMessage("Status updated successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteAdminComplaint = async (referenceNumber) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    
    try {
      const response = await fetch(
        `http://localhost:5000/api/complaints/${referenceNumber}`,
        {
          method: "DELETE",
        }
      );
      
      if (!response.ok) throw new Error("Failed to delete complaint");
      
      setComplaints(complaints.filter(
        complaint => complaint.referenceNumber !== referenceNumber
      ));
      setSuccessMessage("Complaint deleted successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div style={{ textAlign: "center", padding: "15px" }}>Loading complaints...</div>;

  if (error) return (
    <div style={{ textAlign: "center", padding: "15px", color: "red" }}>
      <p>{error}</p>
      <button style={{ padding: "6px 12px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }} onClick={fetchAdminComplaints}>Retry</button>
    </div>
  );

  return (
    <div style={{ padding: "15px", maxWidth: "100%", margin: "0 auto", fontSize: "14px" }}>
      <h2 style={{ marginBottom: "15px", color: "#333", fontSize: "18px" }}>Complaint Management</h2>
      {successMessage && <div style={{ padding: "8px", backgroundColor: "#4CAF50", color: "white", marginBottom: "15px", borderRadius: "3px", textAlign: "center", fontSize: "13px" }}>{successMessage}</div>}
      {complaints.length === 0 ? (
        <div style={{ textAlign: "center", padding: "15px" }}>
          <p>No complaints found.</p>
          <button style={{ padding: "6px 12px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }} onClick={fetchAdminComplaints}>Refresh</button>
        </div>
      ) : (
        <div style={{ overflowX: "auto", marginTop: "15px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: "#f2f2f2", border: "1px solid #ddd", padding: "8px 10px", textAlign: "left", fontWeight: "600" }}>Ref#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Details</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.referenceNumber} style={{ backgroundColor: complaint.status === "Resolved" ? "#e8f5e9" : "inherit" }}>
                  <td>{complaint.referenceNumber}</td>
                  <td>{complaint.name}</td>
                  <td>{complaint.email}</td>
                  <td style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{complaint.complaint}</td>
                  <td style={{ padding: "3px 8px", borderRadius: "3px", color: "white", fontWeight: "500", display: "inline-block", minWidth: "70px", textAlign: "center", backgroundColor: complaint.status === "Pending" ? "#ff9800" : complaint.status === "In Progress" ? "#2196F3" : "#4CAF50" }}>{complaint.status}</td>
                  <td>
                    <select style={{ padding: "5px", borderRadius: "3px", border: "1px solid #ddd", marginRight: "8px", cursor: "pointer", outline: "none", fontSize: "13px" }} value={complaint.status} onChange={(e) => updateStatus(complaint.referenceNumber, e.target.value)}>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                    <button style={{ padding: "5px 10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "3px", cursor: "pointer", fontSize: "13px" }} onClick={() => deleteAdminComplaint(complaint.referenceNumber)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminC;
