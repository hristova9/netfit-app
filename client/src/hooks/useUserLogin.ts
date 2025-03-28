import { useState } from "react";
import { UserLogin } from "../models/User.model";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../utils/validation";
import { loginUserServie } from "../services/userService";

export const useUserLogin = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const loginUser = async (formData: UserLogin) => {
    const { email, password } = formData;
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError("All fields are required!");
      return false;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError("Email is not valid!");
      return false;
    }

    try {
      const data = await loginUserServie(trimmedEmail, password);
      console.log(data);
      
      
      if (data.token) {
        setError("");
        navigate("/");
      } else {
        setError("Invalid email or password");
        return false;
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error occured!");
      }

      return false;
    }
  };

  return {
    loginUser,
    error,
  };
};
