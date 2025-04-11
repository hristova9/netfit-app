import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isValidEmail,
  passwordValidation,
  arePasswordsMatching,
} from "../utils/validation";
import { UserRegistration } from "../models/User.model";
import { useRegisterUserMutation } from "../store/users/usersApi";

export const useUserRegistration = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [registerUserMutation] = useRegisterUserMutation();

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
      await registerUserMutation({
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        email: trimmedEmail,
        password,
      }).unwrap(); 

      setError("");
      navigate("/login");

      return true;
    } catch (error) {
      if (error && typeof error === "object" && "status" in error && error.status === 400) {
        const err = error as { status: number; data?: { message?: string } };
        setError(err.data?.message || "This email is already registered. Try logging in.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      return false;
    }
  };

  return { registerUser, error };
};
