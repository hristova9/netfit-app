import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Message } from "../../models/Message.model";

const API_URL = "http://localhost:3000/";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getMessagesByConversationId: builder.query<Message[], string>({
      query: (conversationId) => `messages/${conversationId}`,
      providesTags: (_result, _err, id) => [{ type: "Messages", id }],
    }),
    sendMessage: builder.mutation<Message, { conversationId: string; text: string }>({
      query: ({ conversationId, text }) => ({
        url: `messages/${conversationId}`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: (_result, _err, { conversationId }) => [
        { type: "Messages", id: conversationId },
      ],
    }),
  }),
});

export const {
  useGetMessagesByConversationIdQuery,
  useSendMessageMutation,
} = messagesApi;
