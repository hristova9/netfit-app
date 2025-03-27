import React from "react";
import "./Button.styles.css";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  title: string;
  className: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, title, className, onClick }) => {
  return <button type={type} className={`${className} button`} onClick={onClick}>{title}</button>;
};

export default Button;
