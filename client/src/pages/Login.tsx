import React from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import AuthLayout from "../layouts/AuthLayout";
// import { useNavigate } from "react-router-dom";
// import { useUserLogin } from "../hooks/useUserLogin";
import { useFormFields } from "../hooks/useFormFields";
import { useUserLogin } from "../hooks/useUserLogin";
import { UserLogin } from "../models/User.model";

const Login: React.FC = () => {
  const { formData, handleChange, setFormData } = useFormFields<UserLogin>({
      email: "",
      password: ""
    });
    const { loginUser, error } = useUserLogin();
  
    const handleSubmit = async (ev: React.FormEvent<HTMLElement>) => {
      ev.preventDefault();
      const success = await loginUser(formData);
      if (success) {
        setFormData({
          email: '',
          password: '',
        });
      }
    };

  return (
    <AuthLayout
      title="Login"
      switchText="Don't have a profile? Register here!"
      switchPath="/register"
    >
      <form onSubmit={handleSubmit} className="auth-form">
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
