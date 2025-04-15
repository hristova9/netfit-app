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
  }),
});

export const {
  useGetMessagesByConversationIdQuery,
} = messagesApi;
