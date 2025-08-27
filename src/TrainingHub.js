import React from "react";
import { Link } from "react-router-dom";

function TrainingHub() {
  const handleClick = (title) => {
    alert(`${title} clicked!`);
    // Or you can navigate using react-router instead
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", textAlign: "center" }}>
      <h1>📘 Training & Learning Hub</h1>
      <p>Access SAP training resources, videos, and guides.</p>

      <ul style={{ marginTop: "30px", listStyleType: "none", padding: 0 }}>
        <li>
          <button
            onClick={() => handleClick("SAP FI Basics")}
            style={{ border: "none", background: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}
          >
            SAP FI Basics
          </button>
        </li>
        <li>
          <button
            onClick={() => handleClick("SAP MM Process Guide")}
            style={{ border: "none", background: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}
          >
            SAP MM Process Guide
          </button>
        </li>
        <li>
          <button
            onClick={() => handleClick("ABAP Introduction Video")}
            style={{ border: "none", background: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}
          >
            ABAP Introduction Video
          </button>
        </li>
        <li>
          <button
            onClick={() => handleClick("SAP Security Training PDF")}
            style={{ border: "none", background: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}
          >
            SAP Security Training PDF
          </button>
        </li>
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
