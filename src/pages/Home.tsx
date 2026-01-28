import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const [showAssessment, setShowAssessment] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const assessmentUrl = "https://s.pointerpro.com/ncifkzjp";

  const handleStartAssessment = () => {
    setShowAssessment(true);
    // Scroll to the embedded section
    setTimeout(() => {
      document.getElementById("embedded-assessment")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  return (
    <div className="home-container">
      <Navbar onLogout={handleLogout} />
      <div className="navbar-spacer"></div>

      <main className="home-main">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Welcome{user.name ? `, ${user.name}` : ""}! 👋</h1>
          <p className="subtitle">
            Your personal dashboard for surveys and assessments.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Surveys Section */}
          <section className="dashboard-section">
            <div className="section-header">
              <span className="section-icon">�</span>
              <h2>Surveys</h2>
            </div>

            <div className="cards-grid">
              {/* Survey Card */}
              <div className="assessment-card">
                <div className="assessment-card-header">
                  <span className="assessment-badge">New</span>
                  <span className="assessment-type">Survey</span>
                </div>
                <h3>Skills Assessment Survey</h3>
                <p>Complete this survey to evaluate your current skill level and get personalized recommendations.</p>
                <div className="assessment-meta">
                  <span className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    ~15 min
                  </span>
                  <span className="meta-item">
                    <span className="meta-icon">📊</span>
                    Detailed Report
                  </span>
                </div>
                <button
                  onClick={handleStartAssessment}
                  className="assessment-btn"
                >
                  Start Assessment
                  <span className="btn-arrow">→</span>
                </button>
                <div className="fallback-link">
                  <span>Button not working? </span>
                  <a
                    href={assessmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://s.pointerpro.com/ncifkzjp
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Assessments Section */}
          <section className="dashboard-section">
            <div className="section-header">
              <span className="section-icon">📋</span>
              <h2>Assessments</h2>
            </div>

            <div className="cards-grid">
              {/* Placeholder for future assessments */}
              <div className="empty-state-card">
                <span className="empty-icon">🎯</span>
                <h4>No additional assessments</h4>
                <p>More assessments will appear here when available.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Embedded Assessment Section - Shows on button click */}
        {showAssessment && (
          <section className="embedded-assessment-section" id="embedded-assessment">
            <div className="section-header">
              <span className="section-icon">🖥️</span>
              <h2>Take Assessment Here</h2>
              <button
                className="close-embed-btn"
                onClick={() => setShowAssessment(false)}
              >
                ✕ Close
              </button>
            </div>
            <div className="assessment-embed-container">
              <iframe
                src={assessmentUrl}
                title="Skills Assessment"
                className="assessment-iframe"
                allow="camera; microphone"
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
