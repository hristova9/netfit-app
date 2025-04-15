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


  