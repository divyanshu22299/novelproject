import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import "./loginSignup.css";

export default function Signup() {
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

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // Send verification email
      await sendEmailVerification(userCred.user, {
        url: "https://yourapp.com/login", // redirect after verification
      });

      // Sign out immediately so user can't access home without verification
      await signOut(auth);

      setSuccessMessage(
        "Signup successful! Please check your email and verify your account before logging in."
      );

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
        <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
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
