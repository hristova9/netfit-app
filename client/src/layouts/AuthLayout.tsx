import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./AuthLayout.styles.css";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  switchText: string;
  switchPath: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  switchText,
  switchPath,
}) => {
  return (
    <div className="auth-container">
      <div className="auth-page">
        <div className="guest-left-container">
          <div className="auth-form-container">
            <h2 className="auth-title">{title}</h2>
            {children}
          </div>
        </div>
        <div className="guest-right-container">
          <div className="right-container-text">
            <h1>Welcome to FitNet!</h1>
            <p>Join our fitness community and stay connected!</p>
          </div>
          <Link to={switchPath} className="switch-auth-link">
            {switchText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
