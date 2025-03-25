import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { useFormFields } from "../hooks/useFormFields";
import { useUserRegistration } from "../hooks/useUserRegister";
import { UserRegistration } from "../models/User.model";

const Register: React.FC = () => {

  const { formData, handleChange, setFormData } = useFormFields<UserRegistration>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
  });
  const { registerUser, error } = useUserRegistration();

  const handleSubmit = async (ev: React.FormEvent<HTMLElement>) => {
    ev.preventDefault();
    const success = await registerUser(formData);
    if (success) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repassword: '',
      });
    }
  };
  

  return (
    <AuthLayout
      title="Register"
      switchText="Already have a profile? Login here!"
      switchPath="/login"
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter first name..."
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter last name..."
        />
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
        <Input
          label="Repeat Password"
          type="password"
          name="repassword"
          value={formData.repassword}
          onChange={handleChange}
          placeholder="Repeat password..."
        />
         {error ? <p className="error-message">{error}</p> : <p className="error-message">&nbsp;</p>}
        <Button type="submit" title="Register" className="auth-button" />
      </form>
    </AuthLayout>
  );
};

export default Register;
