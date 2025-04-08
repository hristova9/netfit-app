import { useState } from "react";
import { useDeletePostMutation } from "../store/posts/postsApi"; // Assuming you have a delete mutation in your API slice
import { extractErrorMessage } from "../utils/errorHandler"; // For error handling

export const usePostDelete = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [deletePostMutation, { isLoading: isDeleting }] = useDeletePostMutation(); // Assuming you have a delete mutation

  const deletePost = async (postId: string) => {
    setLoading(true);
    setError("");

    try {
      const result = await deletePostMutation(postId).unwrap();
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
    deletePost,
    error,
    loading: isDeleting || loading,
  };
};
