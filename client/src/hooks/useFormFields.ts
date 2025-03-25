import { useState, ChangeEvent } from "react";

export const useFormFields = <T extends object>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return { formData, handleChange, setFormData };
};
