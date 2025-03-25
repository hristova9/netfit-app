import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaUsers, FaComments, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.styles.css";
import { useLogout } from "../../hooks/useUserLogout";

const Sidebar: React.FC = () => {
    const location = useLocation(); 

  const isActive = (path: string) => location.pathname === path ? "active-link" : "";

  const logout = useLogout();
  
  return (
    <div className="sidebar">
      <div className="nav-logo">
        <h2>FitNet</h2>
      </div>
      <nav className="nav-links">
        <ul>
          <li>
            <Link to="/" className={`nav-link ${isActive("/")}`}>
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className={`nav-link ${isActive("/profile")}`}>
              <FaUser /> Profile
            </Link>
          </li>
          <li>
            <Link to="/people" className={`nav-link ${isActive("/people")}`}>
              <FaUsers /> People
            </Link>
          </li>
          <li>
            <Link to="/chats" className={`nav-link ${isActive("/chats")}`}>
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
  );
};

export default Sidebar;
