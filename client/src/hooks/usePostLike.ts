// hooks/usePostLike.ts
import { useState } from "react";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../store/posts/postsApi";
import { extractErrorMessage } from "../utils/errorHandler";

export const usePostLike = () => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [error, setError] = useState("");

  const handleLike = async (postId: string) => {
    setError("");
    try {
      await likePost(postId).unwrap();
    } catch (err) {
        setError(extractErrorMessage(err) || "Failed to like post.");
    }
  };

  const handleUnlike = async (postId: string) => {
    setError("");
    try {
      await unlikePost(postId).unwrap();
    } catch (err) {
        setError(extractErrorMessage(err) || "Failed to unlike post.");
    }
  };

  return { handleLike, handleUnlike, error };
};
