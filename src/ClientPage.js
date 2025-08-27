import React from "react";
import { useParams, Link } from "react-router-dom";

const credentials = {
  PRD: { link: "https://prd-link.com", id: "prd_user", password: "prd_pass" },
  QA: { link: "https://qa-link.com", id: "qa_user", password: "qa_pass" },
  DEV: { link: "https://dev-link.com", id: "dev_user", password: "dev_pass" },
};

function ClientPage() {
  const { clientName } = useParams();

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>{clientName.toUpperCase()} Credentials</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "30px", flexWrap: "wrap" }}>
        {Object.keys(credentials).map((env) => (
          <div key={env} style={cardStyle}>
            <h2>{env}</h2>
            <p><strong>Link:</strong> <a href={credentials[env].link}>{credentials[env].link}</a></p>
            <p><strong>ID:</strong> {credentials[env].id}</p>
            <p><strong>Password:</strong> {credentials[env].password}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <Link to="/vault/cloud">
          <button style={backButton}>Back to Cloud Clients</button>
        </Link>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  width: "250px",
  textAlign: "center",
};

const backButton = {
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#555",
  color: "#fff",
  cursor: "pointer",
};

export default ClientPage;
