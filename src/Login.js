import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import "./loginSignup.css";

export default function Login({ onLogin }) {
  // Initialize email and rememberMe from localStorage
  const [email, setEmail] = useState(() => localStorage.getItem("userEmail") || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem("userEmail"));
  const [resetMessage, setResetMessage] = useState(""); // For password reset

  // Login function
  const handleLogin = async () => {
    if (!email.endsWith("@novelveritas.com")) {
      setError("Only @novelveritas.com emails are allowed");
      return;
    }
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      
      // Handle Remember Me
      if (rememberMe) {
        localStorage.setItem("userEmail", email);
      } else {
        localStorage.removeItem("userEmail");
      }
      
      onLogin(userCred.user);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  // Password reset function
  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email to reset password");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent! Check your inbox.");
      setError(""); // Clear previous errors
    } catch (err) {
      setError(err.message);
      setResetMessage("");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email (only @novelveritas.com)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="password-field">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      <div className="remember-me">
        <input
          type="checkbox"
          id="remember"
          checked={rememberMe}
          onChange={() => setRememberMe((prev) => !prev)}
        />
        <label htmlFor="remember">Remember Me</label>
      </div>

      <button onClick={handleLogin}>Login</button>

      {/* Forgot Password */}
      <p
        className="forgot-password"
        onClick={handlePasswordReset}
        style={{ cursor: "pointer", color: "#0a84ff" }}
      >
        Forgot Password?
      </p>
    
      {/* Display messages */}
      {error && <p className="error">{error}</p>}
      {resetMessage && <p className="success">{resetMessage}</p>}
    </div>
  );
}
