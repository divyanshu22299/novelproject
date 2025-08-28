import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CloudPage.css";
import { auth } from "./firebase";

export default function CloudPage() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState("grid");
  const [selectedClient, setSelectedClient] = useState(null);
  const [editingClient, setEditingClient] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
    } catch {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    try { localStorage.setItem("theme", darkMode ? "dark" : "light"); } catch {}
  }, [darkMode]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get("https://novelproject.onrender.com/api/clients");
        const clientsWithEnv = res.data.map(c => ({ ...c, currentEnv: "prd" }));
        setClients(clientsWithEnv);
        setFilteredClients(clientsWithEnv);
      } catch (err) {
        console.error("Error fetching clients:", err);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const filtered = clients.filter(c => {
      const q = search.toLowerCase();
      const matchSearch = c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
    setFilteredClients(filtered);
  }, [search, statusFilter, clients]);

  const handleEditClick = (client) => {
    const pwd = prompt("Enter password to edit:");
    if (pwd === "admin123") setEditingClient({ ...client });
    else if (pwd !== null) alert("Incorrect password!");
  };

  const saveEditedCredentials = async () => {
    try {
      await axios.put(`https://novelproject.onrender.com/api/clients/${editingClient._id}`, editingClient);
      setClients(prev => prev.map(c => c._id === editingClient._id ? editingClient : c));
      setEditingClient(null);
    } catch (err) {
      console.error("Error updating client:", err);
      alert("Failed to update client.");
    }
  };

  const totalCount = clients.length;
  const activeCount = clients.filter(c => c.status === "active").length;
  const pendingCount = clients.filter(c => c.status === "pending").length;
  const inactiveCount = clients.filter(c => c.status === "inactive").length;

  return (
    <div className={`cloud-container ${darkMode ? "dark" : "light"}`}>
      {/* Header */}
      <div className="cloud-header">
        <div>
          <h1>Cloud Clients Vault</h1>
          <p>Secure management of client access credentials</p>
        </div>
        <div className="stats">
          <div className="stat-item"><div className="stat-number">{totalCount}</div><div className="stat-label">Total</div></div>
          <div className="stat-item"><div className="stat-number">{activeCount}</div><div className="stat-label">Active</div></div>
          <div className="stat-item"><div className="stat-number">{pendingCount}</div><div className="stat-label">Pending</div></div>
          <div className="stat-item"><div className="stat-number">{inactiveCount}</div><div className="stat-label">Inactive</div></div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <div className="search-container">
          <i className="search-icon">🔍</i>
          <input className="search-input" placeholder="Search clients..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>

        <div className="middle-controls">
          <div className="filter-buttons">
            {["all","active","inactive","pending"].map(s => (
              <button key={s} className={`filter-btn ${statusFilter===s?"active":""}`} onClick={()=>setStatusFilter(s)}>
                {s.charAt(0).toUpperCase()+s.slice(1)}
              </button>
            ))}
          </div>

          <div className="theme-toggle" onClick={() => setDarkMode(d => !d)}>
            <div className={`toggle-ball ${darkMode ? "dark" : "light"}`}>{darkMode ? "🌙" : "☀️"}</div>
          </div>

          <div className="view-toggle">
            {["grid","list"].map(v => (
              <button key={v} className={`view-btn ${view===v?"active":""}`} onClick={()=>setView(v)}>
                {v.charAt(0).toUpperCase()+v.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clients */}
      <div className={`clients-container ${view==="grid"?"clients-grid":"clients-list"}`}>
        {filteredClients.map(c => (
          <div key={c._id} className="client-card">
            <div className="client-logo"><img src={c.logo} alt={c.name}/></div>
            <div className="client-name">{c.name}</div>
            <div className="client-industry">{c.industry}</div>
            <div className="client-meta">
              <div className="meta-item">🗂 {c.credentials} creds</div>
              <div className="meta-item">👥 {c.teamSize} team</div>
            </div>
            <div className={`client-status status-${c.status}`}>{c.status}</div>
            <div className="client-actions">
              <button className="action-btn" onClick={() => setSelectedClient(c)}>View</button>
              <button className="action-btn" onClick={() => handleEditClick(c)}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {selectedClient && (
        <div className="modal-overlay" onClick={() => setSelectedClient(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedClient.name}</h3>
              <button className="modal-close" onClick={() => setSelectedClient(null)}>×</button>
            </div>
            <div className="env-blocks">
              {["prd","quality","development100","development80"].map(env => (
                <div className="env-block" key={env}>
                  <h4>{env.toUpperCase()}</h4>
                  {["id","password","link"].map(field => (
                    <div className="modal-field" key={field}>
                      <label>{field.toUpperCase()}</label>
                      <input readOnly value={selectedClient[env]?.[field] || ""} 
                        onClick={() => navigator.clipboard.writeText(selectedClient[env]?.[field] || "")} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button className="modal-btn modal-btn-primary" onClick={() => setSelectedClient(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingClient && (
        <div className="modal-overlay" onClick={() => setEditingClient(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit {editingClient.name}</h3>
              <button className="modal-close" onClick={() => setEditingClient(null)}>×</button>
            </div>
            <div className="env-blocks">
              {["prd","quality","development100","development80"].map(env => (
                <div className="env-block" key={env}>
                  <h4>{env.toUpperCase()}</h4>
                  {["id","password","link"].map(field => (
                    <div className="modal-field" key={field}>
                      <label>{field.toUpperCase()}</label>
                      <input value={editingClient[env]?.[field] || ""} 
                        onChange={e => setEditingClient(prev => ({ ...prev, [env]: {...prev[env], [field]: e.target.value} }))} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="modal-field">
              <label>Status</label>
              <select value={editingClient.status} onChange={e => setEditingClient({...editingClient, status:e.target.value})}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="modal-field">
              <label>Industry</label>
              <input value={editingClient.industry} onChange={e=>setEditingClient({...editingClient, industry:e.target.value})} />
            </div>
            <div className="modal-field">
              <label>Team Size</label>
              <input value={editingClient.teamSize} onChange={e=>setEditingClient({...editingClient, teamSize:e.target.value})} />
            </div>
            <div className="modal-field">
              <label>Credentials</label>
              <input value={editingClient.credentials} onChange={e=>setEditingClient({...editingClient, credentials:e.target.value})} />
            </div>
            <div className="modal-field">
              <label>Description</label>
              <input value={editingClient.description} onChange={e=>setEditingClient({...editingClient, description:e.target.value})} />
            </div>
            <button className="modal-btn modal-btn-secondary" onClick={() => setEditingClient(null)}>Cancel</button>
            <button className="modal-btn modal-btn-primary" onClick={saveEditedCredentials}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}