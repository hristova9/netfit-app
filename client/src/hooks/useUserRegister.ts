import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isValidEmail,
  passwordValidation,
  arePasswordsMatching,
} from "../utils/validation";
import { UserRegistration } from "../models/User.model";
import { createUser } from "../services/userService";

export const useUserRegistration = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const registerUser = async (formData: UserRegistration) => {
    const { firstName, lastName, email, password, repassword } = formData;
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();

    if (
      !trimmedFirstName ||
      !trimmedLastName ||
      !trimmedEmail ||
      !password ||
      !repassword
    ) {
      setError("All fields are required!");
      return false;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError("Email is not valid!");
      return false;
    }
    if (!passwordValidation(password)) {
      setError(
        "Password should consist of at least 8 characters, number, uppercase and lowercase letter!"
      );
      return false;
    }
    if (!arePasswordsMatching(password, repassword)) {
      setError("Passwords do not match!");
      return false;
    }

    try {
      await createUser(
        trimmedFirstName,
        trimmedLastName,
        trimmedEmail,
        password
      );
      setError("");
      navigate("/login");
      console.log(`${trimmedFirstName} ${trimmedLastName} created`);
      return true;

    } catch (error) {
      if(error instanceof Error){
        setError("Failed to login user.");
      } else(
        setError("Unknown error occured!")
      )
      return false;
    }
  };

  return { registerUser, error };
};
