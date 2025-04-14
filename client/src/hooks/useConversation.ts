import { useGetConversationByIdQuery } from "../store/chats/conversationsApi";
import { useParams } from "react-router-dom";

const useConversation = ({
  rxStomp,
  loggedInUserId,
}: {
  rxStomp: any;
  loggedInUserId: string | undefined;
}) => {
  const { id: conversationId } = useParams<{ id: string }>();
  const {
    data: conversation,
    error,
    isLoading,
  } = useGetConversationByIdQuery(conversationId!);

  const recipientId = conversation?.user1Id === loggedInUserId ? conversation?.user2Id : conversation?.user1Id;
  const sendMessage = (message: string) => {
    if (!rxStomp || !conversationId) return;
    const body = JSON.stringify({
      senderId: loggedInUserId,
      recipientId,
      text: message,
      conversationId,
    });
    console.log(body);
    
    rxStomp.publish({
      destination: `/queue/messages`,
      type: "message",
      userId: loggedInUserId,
      body,
    });
    return body;
  };

  return {
    conversation,
    isLoading,
    error,
    sendMessage,
    // isSending,
  };
};

export default useConversation;
