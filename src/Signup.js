// Signup.js
import React, { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./loginSignup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const uppercase = /[A-Z]/;
    const number = /[0-9]/;
    return pwd.length >= 6 && uppercase.test(pwd) && number.test(pwd);
  };

  const handleSignUp = async () => {
    setError("");

    if (!email.endsWith("@novelveritas.com")) {
      setError("Only @novelveritas.com emails are allowed");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters, include 1 uppercase letter and 1 number"
      );
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Send verification email
      await sendEmailVerification(userCred.user, {
        url: "https://novelcustom.netlify.app/",
      });

      // Sign out after signup (until verification is done)
      await signOut(auth);

      alert(
        "Signup successful! Please check your email inbox and verify your account before logging in."
      );

      navigate("/login");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <h1 className="login-title">Create Account</h1>

        <label className="input-label">
          Email
          <input
            type="email"
            placeholder="you@novelveritas.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </label>

        <label className="input-label">
          Password
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="password-toggle"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </label>

        <label className="input-label">
          Confirm Password
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
        </label>

        <button onClick={handleSignUp} className="login-button">
          Sign Up
        </button>

        {error && <p className="message error">{error}</p>}

        <p className="toggle-auth">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}
