import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaUsers,
  FaComments,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import "./Sidebar.styles.css";
import { useLogout } from "../../hooks/useUserLogout";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const logout = useLogout();

  const isActive = (path: string) =>
    location.pathname === path ? "active-link" : "";

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      <button className="menu-toggle" onClick={toggleSidebar}>
        <FaBars className="burger-menu-button" />
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="nav-logo">
          <h2>NetFit</h2>
        </div>
        <nav className="nav-links">
          <ul>
            <li>
              <Link
                to="/"
                className={`nav-link ${isActive("/")}`}
                onClick={handleLinkClick}
              >
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/profile/me"
                className={`nav-link ${isActive("/profile/me")}`}
                onClick={handleLinkClick}
              >
                <FaUser /> Profile
              </Link>
            </li>
            <li>
              <Link
                to="/people"
                className={`nav-link ${isActive("/people")}`}
                onClick={handleLinkClick}
              >
                <FaUsers /> People
              </Link>
            </li>
            <li>
              <Link
                to="/chats"
                className={`nav-link ${isActive("/chats")}`}
                onClick={handleLinkClick}
              >
                <FaComments /> Chats
              </Link>
            </li>
            <li>
              <Link to="/" onClick={logout} className="nav-link">
                <FaSignOutAlt /> Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
