import { useState } from "react";
import { User, UserEdit } from "../models/User.model";
import { useEditUserMutation } from "../store/usersApi";
import { extractErrorMessage } from "../utils/errorHandler";

export const useUserEdit = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [editUser, { isLoading, error: mutationError }] = useEditUserMutation();

  const updateProfile = async (user: User, formData: UserEdit) => {
    let { firstName, lastName, description } = formData;
    firstName = firstName.trim();
    lastName = lastName.trim();
    description = description.trim();

    if (!firstName || !lastName) {
      setError("Name fields are required!");
      return false;
    }

    setLoading(true);
    setError("");

    try {
      await editUser({ ...user, firstName, lastName, description }).unwrap();

      return true;
    } catch (error) {
      if (mutationError) {
        setError(extractErrorMessage(mutationError));
      } else if (error instanceof Error) {
        setError(extractErrorMessage(error) || "An unknown error occurred");
      } else {
        setError("An unknown error occurred");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    error,
    loading: isLoading || loading,
  };
};
