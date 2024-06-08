import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./SignUp.css";

const BACKEND_URL = process.env.BACKEND_URL;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    if (!email || !password) {
      setMessage("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Sign-up successful!");
      } else {
        setMessage(data.message || "Sign-up failed.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar page="signup" />
      <div className="signup-container">
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button onClick={signUp} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        {message && <p className={message.includes('successful') ? 'success-message' : 'error-message'}>{message}</p>}
      </div>
    </div>
  );
};

export default SignUp;
