import { useState } from "react";
import { extractErrorMessage } from "../utils/errorHandler";
import { Post } from "../models/Post.model";
import { validateFile } from "../utils/validateImage";
import { useEditPostMutation } from "../store/posts/postsApi";

interface EditPostFormData {
  description: string;
  photo?: File;
}

export const usePostEdit= () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [updatePostMutation, { isLoading: isUpdating }] = useEditPostMutation();

  const editPost = async (post: Post, formData: EditPostFormData) => {
      const { description: rawDescription, photo } = formData;
      const description = rawDescription.trim();

    if (!description) {
      setError("Description is required!");
      return false;
    }

    setLoading(true);
    setError("");

    try {
      let photoUrl: string | undefined;

      if (photo instanceof File) {
        const validationError = validateFile(photo);
        
        if (validationError) {
          setError(validationError);
          return false;
        }

        const uploadDataImage = new FormData();
        uploadDataImage.append("file", photo);
        uploadDataImage.append("upload_preset", "netfit-posts");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/netfit/image/upload`,
          {
            method: "POST",
            body: uploadDataImage,
          }
        );
        const data = await response.json();

        if (!data.secure_url) {
          throw new Error("Failed to upload image to Cloudinary.");
        }

        photoUrl = data.secure_url;
      }

      const updatedPost: Post = {
        ...post,
        description,
        photo: photoUrl ?? null,
      };
      const result = await updatePostMutation(updatedPost).unwrap();

      return result;
    } catch (error) {
      if (error instanceof Error) {
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
    editPost,
    error,
    loading: isUpdating || loading,
  };
};
