import { useState } from "react";
import { deleteUser } from "../services/userService";

export const useUserDelete = () => {
  //   const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProfile = async (userId: string) => {
      // setLoading(true);
      setError(null);
      console.log("in deleteProfile",userId);
    
    try {
      const response = await deleteUser(userId);

      if (!response.ok) {
        throw new Error("Failed to delete profile");
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError("Error: " + error.message);
      } else {
        setError("Unknown error occured!");
      }

      return false;
    }
  };
  return {
    deleteProfile,
    error,
  };
};
