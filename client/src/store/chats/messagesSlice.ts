import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../models/Message.model";

interface MessageState {
  messages: Record<string, Message[]>; // conversationId -> messages
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  messages: {},
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessagesForConversation: (
      state,
      action: PayloadAction<{ conversationId: string; messages: Message[] }>
    ) => {
      state.messages[action.payload.conversationId] = action.payload.messages;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const { conversationId } = action.payload;
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }
      state.messages[conversationId].push(action.payload);
    },
    setMessageLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMessageError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearMessages: (state) => {
      state.messages = {};
      state.error = null;
    },
  },
});

export const {
  setMessagesForConversation,
  addMessage,
  setMessageLoading,
  setMessageError,
  clearMessages,
} = messageSlice.actions;

export default messageSlice.reducer;
