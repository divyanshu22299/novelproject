import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import "./loginSignup.css";

export default function Signup({ onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (pwd) => {
    const uppercase = /[A-Z]/;
    const number = /[0-9]/;
    return pwd.length >= 6 && uppercase.test(pwd) && number.test(pwd);
  };

  // Optional: check if email actually exists using free API
  const verifyEmailExists = async (email) => {
    try {
      const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=YOUR_API_KEY&email=${email}`);
      const data = await response.json();
      return data.deliverability === "DELIVERABLE"; // true if real email
    } catch (err) {
      console.error(err);
      return false; // fail-safe: assume invalid if API fails
    }
  };

  const handleSignUp = async () => {
    setError("");
    setSuccessMessage("");

    if (!email.endsWith("@novelveritas.com")) {
      setError("Only @novelveritas.com emails are allowed");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters, include 1 uppercase letter and 1 number");
      return;
    }

    // Check if email exists
    const isRealEmail = await verifyEmailExists(email);
    if (!isRealEmail) {
      setError("This email does not exist or cannot receive emails");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // Send email verification
      await sendEmailVerification(userCred.user);
      setSuccessMessage(
        "Signup successful! Verification email sent. Please verify your email before login."
      );

      onSignup(userCred.user);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
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
        <button onClick={() => setShowPassword(prev => !prev)}>
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
}
