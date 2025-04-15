import { RxStomp } from "@stomp/rx-stomp";
import { useGetConversationByIdQuery } from "../store/chats/conversationsApi";
import { useParams } from "react-router-dom";

const useConversation = ({
  rxStomp,
  loggedInUserId,
}: {
  rxStomp: RxStomp | null;
  loggedInUserId: string | undefined;
}) => {
  const { id: conversationId } = useParams<{ id: string }>();
  const {
    data: conversation,
    error,
    isLoading,
  } = useGetConversationByIdQuery(conversationId!);

  const recipientId =
    conversation?.user1Id === loggedInUserId
      ? conversation?.user2Id
      : conversation?.user1Id;
  const sendMessage = (message: string, type: 'text' | 'typing') => {
    if (!rxStomp || !conversationId) return;
    const body = {
      senderId: loggedInUserId,
      recipientId,
      text: message,
      conversationId,
    };
    console.log(body);
    const stringifiedBody = JSON.stringify({...body, text: type === 'text' ? message : undefined, type});

    rxStomp.publish({
      destination: `/queue/messages`,
      body: stringifiedBody
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
