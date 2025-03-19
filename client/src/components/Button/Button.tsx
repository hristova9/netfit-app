import React from "react";
import "./Button.styles.css";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  title: string;
  className: string;
}

const Button: React.FC<ButtonProps> = ({ type, title, className }) => {
  return <button type={type} className={`${className} button`}>{title}</button>;
};

export default Button;
