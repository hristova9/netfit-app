import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Conversation } from "../../models/Conversation.model";

const API_URL = "http://localhost:3000/"; 

export const conversationsApi = createApi({
  reducerPath: "conversationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Conversations"],
  endpoints: (builder) => ({
    getConversations: builder.query<Conversation[], void>({
      query: () => "conversations",
      providesTags: ["Conversations"],
    }),
    startConversation: builder.mutation<Conversation, { user1Id: string; user2Id: string }>({
      query: ({ user1Id, user2Id }) => ({
        url: "conversations",
        method: "POST",
        body: { user1Id, user2Id },
      }),
      invalidatesTags: ["Conversations"],
    }),
    getConversationById: builder.query<Conversation, string>({
      query: (id) => `conversations/${id}`,
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useStartConversationMutation,
  useGetConversationByIdQuery,
} = conversationsApi;
