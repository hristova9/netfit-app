import { RxStomp } from "@stomp/rx-stomp";
import {
  conversationsApi,
  useGetConversationByIdQuery,
} from "../store/chats/conversationsApi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import store from "../store/store";

const useConversation = ({
  rxStomp,
  loggedInUserId,
}: {
  rxStomp: RxStomp | null;
  loggedInUserId: string | undefined;
}) => {
  const { id: conversationId } = useParams<{ id: string }>();
  const dispatch = useDispatch<typeof store.dispatch>();
  const {
    data: conversation,
    error,
    isLoading,
    refetch
  } = useGetConversationByIdQuery(conversationId!);

  if (!conversation) return { conversation: null, isLoading, error, sendMessage: null, refetch };

  const recipientId =
    conversation.user1Id === loggedInUserId
      ? conversation.user2Id
      : conversation.user1Id;

  const sendMessage = (message: string, type: "text" | "typing") => {
    if (!rxStomp || !conversationId) return;
    const body = {
      senderId: loggedInUserId,
      recipientId,
      text: message,
      conversationId,
    };

    dispatch(
      conversationsApi.util.updateQueryData(
        "getConversationById", // The endpoint name
        conversationId, // The unique key for the query
        (draft) => {
          // Callback to modify the draft
          if (draft && draft.messages) {
            draft.messages.push({
              senderId: loggedInUserId!,
              recipientId,
              text: message,
              conversationId: conversationId!,
            });
          }
        }
      )
    );
    console.log(body);
    const stringifiedBody = JSON.stringify({
      ...body,
      text: type === "text" ? message : undefined,
      type,
    });

    rxStomp.publish({
      destination: `/queue/messages`,
      body: stringifiedBody,
    });
    return body;
  };
  // };
  return {
    conversation,
    isLoading,
    error,
    sendMessage,
    refetch
    // isSending,
  };
};

export default useConversation;
