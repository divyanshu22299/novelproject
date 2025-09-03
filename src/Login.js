// Login.js
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom"; // 👈 added
import "./loginSignup.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState(() => localStorage.getItem("userEmail") || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem("userEmail"));
  const [resetMessage, setResetMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  

  useEffect(() => {
    setError("");
    setResetMessage("");
  }, [email, password]);

  const handleLogin = async () => {
    setError("");
    setResetMessage("");
    if (!email.endsWith("@novelveritas.com")) {
      setError("Only @novelveritas.com emails are allowed");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setIsLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      if (!userCred.user.emailVerified) {
        setError("Please verify your email before logging in.");
        await auth.signOut();
        setIsLoading(false);
        return;
      }

      if (rememberMe) {
        localStorage.setItem("userEmail", email);
      } else {
        localStorage.removeItem("userEmail");
      }

      onLogin(userCred.user);
    } catch (err) {
      setError("Invalid email or password");
    }
    setIsLoading(false);
  };

  const handlePasswordReset = async () => {
    setError("");
    setResetMessage("");
    if (!email) {
      setError("Please enter your email to reset password");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="login-page" aria-label="Login form">
      <section className="login-card" tabIndex={-1} aria-live="polite">
        <h1 className="login-title">Welcome Back</h1>

        <label htmlFor="email" className="input-label">
          Email
          <input
            id="email"
            type="email"
            placeholder="you@novelveritas.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
            className="input-field"
          />
        </label>

        <label htmlFor="password" className="input-label password-label">
          Password
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="input-field"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="password-toggle"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </label>

        <div className="remember-forgot">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe((v) => !v)}
            />
            Remember me
          </label>

          <button
            type="button"
            className="forgot-password"
            onClick={handlePasswordReset}
          >
            Forgot password?
          </button>
        </div>

        <button
          type="button"
          className="login-button"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>

        {(error || resetMessage) && (
          <p className={`message ${error ? "error" : "success"}`}>
            {error || resetMessage}
          </p>
        )}

        {/* Sign up option */}
        <p className="toggle-auth">
          Don’t have an account?{" "}
          <Link to="/signup" className="signup-button">
            Sign Up
          </Link>
        </p>
      </section>
    </main>
  );
}
