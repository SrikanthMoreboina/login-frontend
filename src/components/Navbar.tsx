import { useNavigate } from "react-router-dom";
import "./Navbar.css";

interface NavbarProps {
  onLogout?: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="navbar">
      {/* Brand */}
      <div className="navbar-brand">
       
        <h3>Employee App</h3>
      </div>

      {/* Navigation Links */}
      <div className="navbar-nav">
        <a href="#" className="nav-link active">Dashboard</a>
        <a href="#" className="nav-link">Projects</a>
        <a href="#" className="nav-link">Team</a>
      </div>

      {/* User Profile & Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div className="navbar-user">
          <div className="user-avatar">
            {getInitials(user.name)}
          </div>
          <div className="user-info">
            <span className="user-name">{user.name || "User"}</span>
            <span className="user-emp-id">{user.empId || "N/A"}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <span>🚪</span>
          Logout
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="menu-toggle">☰</button>
    </nav>
  );
}
