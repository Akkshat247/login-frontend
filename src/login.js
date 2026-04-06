import React, { useState } from "react";
import "./App.css";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://16.52.121.213:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        onLoginSuccess();
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch {
      setError("Unable to connect to the server. Check your network.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="container">
      <div className="page-bg" />

      {/* Wordmark */}
      <div className="wordmark">
        <div className="wordmark-icon">∑</div>
        <div className="wordmark-text">Calc<span>Pro</span></div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Welcome back</h2>
          <p>Sign in to access your calculator</p>
        </div>

        {error && (
          <div className="error-msg">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}

        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            autoComplete="username"
            onChange={(e) => { setUsername(e.target.value); setError(""); }}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
        </div>

        <div className="field" style={{ position: "relative" }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            onKeyDown={handleKeyDown}
            disabled={loading}
            style={{ paddingRight: "42px" }}
          />
          <button
            type="button"
            onClick={() => setShowPass((s) => !s)}
            style={{
              position: "absolute",
              right: "12px",
              bottom: "12px",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: "var(--text-dim)",
              display: "flex",
              alignItems: "center",
              width: "auto",
              margin: 0,
              boxShadow: "none",
            }}
            tabIndex={-1}
          >
            {showPass ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>

        <button className="btn-primary" onClick={handleLogin} disabled={loading}>
          {loading && <span className="spinner" />}
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </div>

      <p style={{ marginTop: "24px", fontSize: "12px", color: "var(--text-dim)" }}>
        © {new Date().getFullYear()} CalcPro — All rights reserved
      </p>
    </div>
  );
}

export default Login;