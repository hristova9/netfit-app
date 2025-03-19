import React from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import { useUserLogin } from "../hooks/useUserLogin";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { formData, error, handleChange, handleSubmit } = useUserLogin();

  const onSubmit = (ev: React.FormEvent<HTMLElement>) => {
    const user = handleSubmit(ev);
    if (user) {
      console.log(`Hello, ${user.email}`);
      navigate("/");
    }
  };

  return (
    <AuthLayout
      title="Login"
      switchText="Don't have a profile? Register here!"
      switchPath="/register"
    >
      <form onSubmit={onSubmit} className="auth-form">
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email..."
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password..."
        />
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <p className="error-message">&nbsp;</p>
        )}
        <Button type="submit" title="Login" className="auth-button" />
      </form>
    </AuthLayout>
  );
};

export default Login;
