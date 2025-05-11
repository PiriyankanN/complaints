import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage"; // New home page
import ComplaintHome from "./ComplaintHome";
import ComplaintProgress from "./ComplaintProgress";
import ComplaintForm from "./ComplaintForm"; 
import AdminComplaints from "./AdminC";
import Feedback from "./Feedback"; // Assuming you will create this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Main Landing Page */}
        <Route path="/complaint-home" element={<ComplaintHome />} />
        <Route path="/track-complaint" element={<ComplaintProgress />} />
        <Route path="/file-complaint" element={<ComplaintForm />} />
        <Route path="/admin" element={<AdminComplaints />} />
        <Route path="/feedback" element={<Feedback />} /> {/* Feedback Page */}
      </Routes>
    </Router>
  );
}

export default App;
