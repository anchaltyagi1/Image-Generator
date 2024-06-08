import React, { useState, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import PointsContext from "../../context/pointsContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const BACKEND_URL = process.env.BACKEND_URL;

const Login = () => {
  const ctx = useContext(PointsContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        ctx.setIsLoggedIn(true);
        localStorage.setItem("authToken", data.token);
        navigate("/image-generator");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar page="login" />
      <div className="login-container">
        <h2>Login</h2>
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
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
