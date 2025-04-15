import { useState } from "react";
import { Conversation } from "../models/Conversation.model";
import { extractErrorMessage } from "../utils/errorHandler"; // Optional if you use custom error parsing
import { useStartConversationMutation } from "../store/chats/conversationsApi";

export const useCreateConversation = () => {
  const [startConversationMutation, { isLoading }] = useStartConversationMutation();
  const [error, setError] = useState<string | null>(null);

  const startConversation = async (user2Id: string): Promise<Conversation | false> => {
    setError(null);
    if (!user2Id) {
      setError("Missing user ID.");
      return false;
    }

    try {
      const response = await startConversationMutation({ user2Id }).unwrap();
      const conversation = response.data;
      console.log(conversation);
      return conversation;
    } catch (err) {
      const message = extractErrorMessage(err) || "Failed to start conversation.";
      setError(message);
      return false;
    }
  };

  return {
    startConversation,
    error,
    loading: isLoading,
  };
};
