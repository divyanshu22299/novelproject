import React from "react";
import { Link } from "react-router-dom";

function TrainingHub() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", textAlign: "center" }}>
      <h1>📘 Training & Learning Hub</h1>
      <p>Access SAP training resources, videos, and guides.</p>

      <ul style={{ marginTop: "30px", listStyleType: "none", padding: 0 }}>
        <li><a href="#">SAP FI Basics</a></li>
        <li><a href="#">SAP MM Process Guide</a></li>
        <li><a href="#">ABAP Introduction Video</a></li>
        <li><a href="#">SAP Security Training PDF</a></li>
      </ul>

      <div style={{ marginTop: "40px" }}>
        <Link to="/">
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#555",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TrainingHub;
