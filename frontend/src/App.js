import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComplaintHome from "./ComplaintHome";
import ComplaintProgress from "./ComplaintProgress";
import ComplaintForm from "./ComplaintForm"; 
import AdminComplaints from "./AdminC"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComplaintHome />} />
        <Route path="/track-complaint" element={<ComplaintProgress />} />
        <Route path="/file-complaint" element={<ComplaintForm />} />
        <Route path="/admin" element={<AdminComplaints />} />
      </Routes>
    </Router>
  );
}

export default App;
