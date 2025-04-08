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
    return result;
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
