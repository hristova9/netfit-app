import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../../models/Conversation.model";

interface ConversationState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  loading: boolean;
  error: string | null;
}

const initialState: ConversationState = {
  conversations: [],
  currentConversation: null,
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
    setCurrentConversation: (state, action: PayloadAction<Conversation>) => {
      state.currentConversation = action.payload;
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
  setCurrentConversation,
  addConversation,
  setConversationLoading,
  setConversationError,
  clearConversations,
} = conversationSlice.actions;

export default conversationSlice.reducer;
