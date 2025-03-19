import { useState, ChangeEvent } from "react";
import { UserRegistration } from "../models/User.model";

export const useFormFields = (initialState: UserRegistration) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return { formData, handleChange, setFormData };
};
