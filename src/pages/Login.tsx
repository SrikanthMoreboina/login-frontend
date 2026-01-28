import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post("https://login-backned-n20k.onrender.com", {
        empId,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/home");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue </p>
        </div>

        {/* Form */}
        <div className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <label htmlFor="empId">Employee ID</label>
            <div style={{ position: "relative" }}>
              <span className="input-icon">👤</span>
              <input
                id="empId"
                className="login-input"
                placeholder="Enter your Employee ID"
                value={empId}
                onChange={e => setEmpId(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: "relative" }}>
              <span className="input-icon">🔒</span>
              <input
                id="password"
                className="login-input"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          {/* <div className="remember-row">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div> */}

          <button
            className={`login-btn ${isLoading ? 'loading' : ''}`}
            onClick={handleLogin}
            disabled={isLoading}
          >
            <span className="btn-text">
              Sign In
              <span>→</span>
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p>
            Credntials not working?
            <a href="#">Contact Admin</a>
            <p>admin@contact.in</p>
          </p>
        </div>
      </div>
    </div>
  );
}
