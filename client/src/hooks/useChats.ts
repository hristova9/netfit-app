// import { useGetConversationsQuery, useStartConversationMutation } from "../store/chats/conversationsApi";
// import { Conversation } from "../models/Conversation.model";

// const useChats = () => {
//   const {
//     data: conversations = [],
//     isLoading: loading,
//     error,
//     refetch,
//   } = useGetConversationsQuery();

//   const [startConversationMutation, { isLoading: creating, error: createError }] =
//     useStartConversationMutation();

//   const createConversation = async (user1Id: string, user2Id: string): Promise<Conversation | null> => {
//     try {
//       const conversation = await startConversationMutation({ user1Id, user2Id }).unwrap();
//       return conversation;
//     } catch (err) {
//       console.error("Failed to create conversation", err);
//       return null;
//     }
//   };

//   return {
//     conversations,
//     loading,
//     error,
//     createConversation,
//     creating,
//     createError,
//     refetch,
//   };
// };

// export default useChats;

import { useSelector, useDispatch } from "react-redux";
import { useGetConversationsQuery } from "../store/chats/conversationsApi";
import { setConversations } from "../store/chats/conversationsSlice";
import { RootState } from "../store/store";
import { useEffect } from "react";

const useGetConversations = () => {
  const dispatch = useDispatch();
  const conversationsFromStore = useSelector(
    (state: RootState) => state.conversations.conversations
  );


  const {
    data: conversations,
    error,
    isLoading,
    refetch,
  } = useGetConversationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log("conversations: ", conversations);
  

  useEffect(() => {
    if (conversations && JSON.stringify(conversations) !== JSON.stringify(conversationsFromStore)) {
      dispatch(setConversations(conversations));
    }
  }, [conversations, conversationsFromStore, dispatch]);

  if (error) {
    return { conversations: null, loading: false, error: (error as Error).message };
  }

  return {
    conversations: conversationsFromStore.length > 0 ? conversationsFromStore : conversations,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  };
};

export default useGetConversations;


  