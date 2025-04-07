import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../models/Post.model";

const API_URL = "http://localhost:3000/";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Posts"], // Cache tag for automatic updates
  endpoints: (builder) => ({
    getAllPosts: builder.query<Post[], void>({
      query: () => "posts",
      providesTags: ["Posts"], // Refresh when posts change
    }),
    getPostById: builder.query<Post, string>({
      query: (id) => `posts/${id}`,
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (post) => ({
        url: "posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Posts"], // Refresh posts list after adding
    }),
    editPost: builder.mutation<Post, Post>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Posts"], // Refresh post data
    }),
    deletePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"], // Refresh posts list after deletion
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
} = postsApi;
