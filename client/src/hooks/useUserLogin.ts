import { useState } from "react";
import { UserLogin } from "../models/User.model";
import { isValidEmail } from "../utils/validation";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../store/users/usersSlice";
import { useLoginUserMutation } from "../store/users/usersApi";

export const useUserLogin = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const [loginUserMutation] = useLoginUserMutation();
  
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
      const data = await loginUserMutation({
        email: trimmedEmail,
        password,
      }).unwrap();

      if (data.user) {
        dispatch(setLoggedInUser(data.user));
        setError("");
        return true;
      } else {
        setError("Invalid email or password");
        return false;
      }
    } catch (error) {
      if (error && typeof error === "object" && "status" in error && error.status === 401) {
        const err = error as { status: number; data?: { message?: string } };
        setError(err.data?.message || "Wrong email or password!");
      } else {
        setError("Something went wrong. Please try again.");
      }
      return false;
    }
  };

  return {
    loginUser,
    error,
  };
};
