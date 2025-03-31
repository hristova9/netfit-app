import { useEffect, useState } from "react";
import { User, UserEdit } from "../models/User.model";
import { useEditUserMutation } from "../store/usersApi";
import { extractErrorMessage } from "../utils/errorHandler";

export const useUserEdit = (user?: User | null | undefined) => {
  const [formData, setFormData] = useState<UserEdit>({
    firstName: "",
    lastName: "",
    description: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [editUser, { isLoading, error: mutationError }] = useEditUserMutation();

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        description: user.description || "",
      });
    }
  }, [user]);

  const handleChange = (updatedFields: Partial<UserEdit>) => {
    setFormData((prev) => ({ ...prev, ...updatedFields }));
  };

  const updateProfile = async () => {
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
      if (user) {
        const updatedUser = await editUser({
          ...user,
          firstName,
          lastName,
          description,
        }).unwrap();
        return updatedUser;
      } else {
        throw new Error("No user available");
      }
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
    formData,
    handleChange,
    updateProfile,
    error,
    loading: isLoading || loading,
  };
};
