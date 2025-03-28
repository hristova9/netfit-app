// import { User } from "../models/User.model";
import { apiFetch } from "../utils/apiFetch";

const API_URL = "http://localhost:3000/";

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(API_URL + "auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to register!");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during register:", error);
    throw error;
  }
};

export const loginUserServie = async (email: string, password: string) => {
  try {
    const response = await fetch(API_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      let errorMessage = "Failed to login!";

      try {
        const errorData = await response.json();
        console.error("Error response from backend:", errorData.error);
        errorMessage = errorData.error || errorMessage;
      } catch (err) {
        console.error("Failed to parse error response:", err);
      }

      throw new Error(errorMessage);
    }

    const result = await response.json();
    if (result.token) {
      return result;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const logoutUserService = async () => {
  try {
    const response = await fetch(API_URL + "auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      return true;
    } else {
      console.log("Failed to log out, status:", response.status);
    }
  } catch (error) {
    console.log("Error during logout: ", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  const result = await apiFetch(API_URL + "users", {
    method: "GET",
    credentials: "include",
  });
  return result;
};

export const getMyself = async () => {
  const result = await apiFetch(API_URL + "users/me", {
    method: "GET",
    credentials: "include",
  });
  return await result;
};

// export const editUser = async (user: User) => {
//   const result = await apiFetch(API_URL + `users/${user.id}`, {
//     method: "PUT",
//     credentials: "include",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(user),
//   });
//   return await result;
// };

// export const deleteUser = async (userId: string) => {
//   console.log(userId);
  
//   const result = await apiFetch(API_URL + `users/${userId}`, {
//     method: "DELETE",
//     credentials: "include",
//     headers: { "Content-Type": "application/json" }
//   });
//   return await result;
// };
