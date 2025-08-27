// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import VaultPage from "./VaultPage";
import TrainingHub from "./TrainingHub";
import CloudPage from "./CloudPage";
import ClientPage from "./ClientPage";
import Login from "./Login";
import Signup from "./Signup";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";
import "./loginSignup.css"; // Import the login/signup CSS

// Home Component
function Home({ darkMode }) {
  return (
    <div className={`home-container ${darkMode ? "dark" : "light"}`}>
      <header className="home-header">
        <h1>NOVEL SAP Portal</h1>
        <p>Secure client management & continuous learning in one place</p>
      </header>

      <div className="tiles-grid">
        <div className="tile vault">
          <h2>🔐 Client Credentials Vault</h2>
          <p>Securely store and manage all client SAP IDs, passwords, and system links.</p>
          <Link to="/vault"><button>Go to Vault</button></Link>
        </div>

        <div className="tile training">
          <h2>📘 Training & Learning Hub</h2>
          <p>Access SAP training resources, videos, and guides for continuous learning.</p>
          <Link to="/training"><button>Go to Training</button></Link>
        </div>
      </div>

      <footer className="home-footer">
        &copy; 2025 SAP Provider Office. All rights reserved dev @ Divyanshu Singh Chouhan.
      </footer>
    </div>
  );
}

// Theme Toggle Component
function ThemeToggle({ darkMode, toggleTheme }) {
  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <div className={`toggle-ball ${darkMode ? "dark" : "light"}`}>
        {darkMode ? "🌙" : "☀️"}
      </div>
    </div>
  );
}

// App Wrapper with authentication and theme
function AppWrapper() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
    } catch {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup

  useEffect(() => {
    try { localStorage.setItem("theme", darkMode ? "dark" : "light"); } catch {}
  }, [darkMode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => setDarkMode(prev => !prev);

  const showToggle = location.pathname === "/" || location.pathname === "/vault";

  // Show Login or Signup if not logged in
  if (!user) {
    return (
      <div className={`auth-page ${darkMode ? "dark" : "light"}`}>
        <div className="auth-forms">
          {isLogin ? (
            <div className="auth-container">
              <Login onLogin={setUser} />
              <p className="toggle-auth">
                Don’t have an account?
                <button onClick={() => setIsLogin(false)}>Sign Up</button>
              </p>
            </div>
          ) : (
            <div className="auth-container">
              <Signup onSignup={setUser} />
              <p className="toggle-auth">
                Already have an account?
                <button onClick={() => setIsLogin(true)}>Login</button>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Logged-in view
  return (
    <div className={darkMode ? "dark" : "light"}>
      <button className="logout-btn" onClick={() => signOut(auth)}>Logout</button>
      {showToggle && <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />}

      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/vault" element={<VaultPage darkMode={darkMode} />} />
        <Route path="/vault/cloud" element={<CloudPage />} />
        <Route path="/vault/cloud/:clientName" element={<ClientPage />} />
        <Route path="/training" element={<TrainingHub />} />
      </Routes>
    </div>
  );
}

// Main App
function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
