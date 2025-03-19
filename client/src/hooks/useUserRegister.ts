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
  // const [users, setUsers] = useState<UserRegistration[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const usersData = await getAllUsers();
  //       setUsers(usersData);
  //       // console.log(users);

  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     } catch (error) {
  //       console.log("Failed to fetch users.");

  //       throw new Error('Failed to fetch users.');
  //     }
  //   };
  //   fetchUsers();
  // }, []);

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

    // const isRegistered = users.some((u) => u.email === trimmedEmail);

    // if (!isRegistered) {
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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Failed to create user.");
      return false;
    }
    // } else {
    //   setError('User is already registered!');
    // }
  };

  return { registerUser, error };
};
