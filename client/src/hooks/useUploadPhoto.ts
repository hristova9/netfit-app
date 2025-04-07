import { useState } from "react";
import { User } from "../models/User.model";
import { useEditUserMutation } from "../store/users/usersApi";
import { extractErrorMessage } from "../utils/errorHandler";
import { validateFile } from "../utils/validateImage";

export const useUploadPhoto = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [editUser, { isLoading, error: mutationError }] = useEditUserMutation();

  const uploadPhoto = async (
    user: User,
    file: File,
    fileType: "avatar" | "cover"
  ) => {
    if (!file) {
      setError("Please select a file to upload!");
      return false;
    }

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return false;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "netfit-media");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/netfit/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.secure_url) {
        const updatedUser = {
          ...user,
          [fileType]: data.secure_url,
          fileType,
          mimeType: file.type,
        };

        await editUser(updatedUser).unwrap();
        return true;
      } else {
        throw new Error("Failed to upload image to Cloudinary.");
      }
    } catch (error) {
      const errorMessage = mutationError
        ? extractErrorMessage(mutationError)
        : extractErrorMessage(error) || "Failed to upload photo";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadPhoto,
    error,
    loading: isLoading || loading,
  };
};