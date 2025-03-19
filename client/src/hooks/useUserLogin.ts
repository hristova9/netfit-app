import { useState } from "react";
// import { getAllUsers } from "../services/userService";
import { UserLogin } from "../models/User.model";
// import { handleError } from "../utils/errorHandler";
// import { FormDataSignIn } from "../../models/FormData";

export const useUserLogin = () => {
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });
  // const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  // Fetch users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersData = await getAllUsers();
//         setUsers(usersData);
//       } catch (error) {
//         handleError(error, setError);
//       }
//     };
//     fetchUsers();
//   }, []);

  // Handle input changes
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (ev: React.FormEvent<HTMLElement>) => {
    ev.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

    return formData;
    // const user = users.find((u) => u.email === email);

    // if (user && user.password === password) {
    //   setError("");
    //   return user; // Return the found user for further processing
    // } else {
    //   setError("Wrong email or password!");
    //   return null;
    // }
  };

  return {
    formData,
    error,
    handleChange,
    handleSubmit,
  };
};
