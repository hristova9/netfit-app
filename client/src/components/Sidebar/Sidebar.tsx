import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaUsers, FaComments } from "react-icons/fa";
import "./Sidebar.styles.css";

const Sidebar: React.FC = () => {
    const location = useLocation(); 

  const isActive = (path: string) => location.pathname === path ? "active-link" : "";
  
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
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
