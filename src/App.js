import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import Loader from "./Loader";
import VaultPage from "./VaultPage";
import TrainingHub from "./TrainingHub";
import CloudPage from "./CloudPage";
import ClientPage from "./ClientPage";
import Login from "./Login";
import Signup from "./Signup";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";
import "./loginSignup.css";

// Home Component
function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>NOVEL SAP Portal</h1>
        <p>Secure client management & continuous learning in one place</p>
      </header>

      <div className="tiles-grid">
        <div className="tile vault">
          <h2>🔐 Client Credentials Vault</h2>
          <p>
            Securely store and manage all client SAP IDs, passwords, and system
            links.
          </p>
          <Link to="/vault">
            <button>Go to Vault</button>
          </Link>
        </div>

        <div className="tile training">
          <h2>📘 Training & Learning Hub</h2>
          <p>
            Access SAP training resources, videos, and guides for continuous
            learning.
          </p>
          <Link to="/training">
            <button>Go to Training</button>
          </Link>
        </div>
      </div>

      <footer className="home-footer">
        &copy; 2025 SAP Provider Office. All rights reserved dev @ Divyanshu
        Singh Chouhan.
      </footer>
    </div>
  );
}

// Theme Toggle Component
function ThemeToggle({ darkMode, toggleTheme }) {
  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <div className="toggle-ball">{darkMode ? "🌙" : "☀️"}</div>
    </div>
  );
}

// App Wrapper with authentication and theme
function AppWrapper() {
  const location = useLocation();
  const [loading, setLoading] = useState(true); // NEW
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
    } catch {}
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  

  const [user, setUser] = useState(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    } catch {}
  }, [darkMode]);

  // ✅ Single onAuthStateChanged with loading fix
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.emailVerified) {
        setUser(currentUser);
        setUnverifiedEmail("");
      } else {
        setUser(null);
        if (currentUser) setUnverifiedEmail(currentUser.email);
      }
      setLoading(false); // ✅ finish loading once Firebase responds
    });
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => setDarkMode((prev) => !prev);
  const showToggle = location.pathname === "/" || location.pathname === "/vault";

  if (loading) {
  return <Loader />;
}

  // ✅ First handle loading
  if (loading) {
    return <div className="loading">Loading...</div>; // spinner/loader
  }

  // Unauthenticated view (login/signup)
  if (!user) {
    return (
      <div className={`auth-page ${darkMode ? "theme-dark" : "theme-light"}`}>
        <div className="auth-forms">
          <Routes>
            <Route path="/login" element={<Login onLogin={setUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>

          {unverifiedEmail && (
            <p className="error" style={{ marginTop: "10px" }}>
              Your email <b>{unverifiedEmail}</b> is not verified. Please check
              your inbox.
            </p>
          )}
        </div>
      </div>
    );
  }

  // Logged-in view
  return (
    <div className={darkMode ? "theme-dark" : "theme-light"}>
      {showToggle && (
        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
      )}
      <button className="logout-btn" onClick={() => signOut(auth)}>
        Logout
      </button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vault" element={<VaultPage darkMode={darkMode} />} />
        <Route path="/vault/cloud" element={<CloudPage darkMode={darkMode} />} />
        <Route path="/vault/cloud/:clientName" element={<ClientPage />} />
        <Route path="/training" element={<TrainingHub />} />
        {/* fallback to Home if logged in */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}
// Main App
export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
