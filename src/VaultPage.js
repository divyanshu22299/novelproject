import React from "react";
import { Link } from "react-router-dom";
import "./VaultPage.css";

function VaultPage({ darkMode }) {
  return (
    <div className={`vault-container ${darkMode ? "dark" : "light"}`}>
      <header className="vault-header">
        <h1>Client Credentials Vault</h1>
        <p>Select the system you want to access:</p>
      </header>

      <div className="tiles-grid">
        <div className="tile vault">
          <h2>☁️ Cloud</h2>
          <p>Access SAP Cloud credentials securely.</p>
          <Link to="/vault/cloud"><button>Open Cloud</button></Link>
        </div>

        <div className="tile training disabled">
          <h2>🗄 HANA</h2>
          <p>On-premise system credentials (Coming Soon).</p>
          <button disabled>Coming Soon</button>
        </div>
      </div>

      <footer className="vault-footer">
        <Link to="/"><button className="back-btn">← Back to Home</button></Link>
      </footer>
    </div>
  );
}

export default VaultPage;
