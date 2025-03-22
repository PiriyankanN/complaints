import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComplaintHome from "./ComplaintHome";
import ComplaintProgress from "./ComplaintProgress";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComplaintHome />} />
        <Route path="/track-complaint" element={<ComplaintProgress />} />
      </Routes>
    </Router>
  );
}

export default App;
