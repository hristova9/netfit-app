import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../../models/Conversation.model";

interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
  error: null,
};

const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
      state.error = null;
    },
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.unshift(action.payload);
    },
    setConversationLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setConversationError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearConversations: (state) => {
      state.conversations = [];
      state.error = null;
    },
  },
});

export const {
  setConversations,
  addConversation,
  setConversationLoading,
  setConversationError,
  clearConversations,
} = conversationSlice.actions;

export default conversationSlice.reducer;
