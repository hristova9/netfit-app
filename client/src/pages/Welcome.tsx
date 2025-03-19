import React, { JSX, useState } from "react";
import Login from "./Login";
// import Button from "../components/Button/Button";
// import Register from "./Register";
// import { useNavigate } from "react-router-dom";
import "./Welcome.styles.css";
import { Link, useNavigate } from "react-router-dom";
import Register from "./Register";

const Welcome: React.FC = () => {
  //   const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  // const location = useLocation();
  const navigate = useNavigate();

  // Toggle between SignUp and Login
  const toggleForm = () => {
    if (isLogin) {
      setIsLogin(false);
      navigate("/register"); // Navigate to /register
    } else {
      setIsLogin(true);
      navigate("/login"); // Navigate to /login
    }
  };

  const switchLink = (path: string, actionText: string): JSX.Element => {
    return (
      <Link to={path} className="switch-auth-link">
        {actionText}
      </Link>
    );
  };

  return (
    <div className="welcome-container">
      <div className="welcome-page">
        <div className="guest-left-container">
          {isLogin ? <Login /> : <Register />}
        </div>
        <div className="guest-right-container">
          <div className="right-container-text">
            <h1>Welcome to FitNet!</h1>
            <p onClick={toggleForm}>
              Join our fitness community and stay connected!
            </p>
          </div>
          {isLogin
            ? switchLink("/register", "Don't have a profile? Register here!")
            : switchLink("/login", "Already have a profile? Login here!")}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
