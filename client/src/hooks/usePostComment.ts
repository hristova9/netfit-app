// hooks/usePostComments.ts
import React, { useState } from "react";
import {
  useAddCommentMutation,
  useDeleteCommentMutation
} from "../store/posts/postsApi";
import { extractErrorMessage } from "../utils/errorHandler";

export const usePostComments = (postId: string) => {
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAddComment = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!text.trim()) return;
    setError("");
    try {
      await addComment({ postId, text }).unwrap();

      setText("");
    } catch (err) {
      setError(extractErrorMessage(err) || "Failed to add comment.");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setError("");
    try {
      await deleteComment(commentId).unwrap();
    } catch (err) {
      setError(extractErrorMessage(err) || "Failed to delete comment.");
    }
  };

  return {
    handleAddComment,
    handleDeleteComment,
    error,
    text,
    setText,
  };
};
