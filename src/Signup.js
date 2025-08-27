import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./loginSignup.css";

export default function Signup({ onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (!email.endsWith("@novelveritas.com")) {
      setError("Only @novelveritas.com emails are allowed");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      onSignup(userCred.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email (only @novelveritas.com)"
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="password-field">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
  