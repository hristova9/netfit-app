import { useState } from "react";

export const useAuthForm = (initialState = { email: "", password: "", name: "" }) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return {
    formData,
    handleChange,
  };
};

