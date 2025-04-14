// hooks/useConversation.ts
import { useGetConversationByIdQuery } from "../store/chats/conversationsApi";
import { useParams } from "react-router-dom";
import { useSendMessageMutation } from "../store/chats/messagesApi";

const useConversation = () => {
  const { id: conversationId } = useParams<{ id: string }>();
  const { data: conversation, error, isLoading } = useGetConversationByIdQuery(conversationId!);

  const [sendMessageMutation, { isLoading: isSending }] = useSendMessageMutation();

  const sendMessage = async (text: string) => {
    console.log(text);
    console.log(conversationId);
    
    if (!conversationId) return;
    try {
      const response = await sendMessageMutation({
        conversationId,
        text
      }).unwrap();
      return response;
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return {
    conversation,
    isLoading,
    error,
    sendMessage,
    isSending,
  };
};

export default useConversation;

