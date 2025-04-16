import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../../models/Post.model";
import { Comment } from "../../models/Comments.model";

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
  tagTypes: ["Posts", "Comments"],
  endpoints: (builder) => ({
    getAllPosts: builder.query<Post[], void>({
      query: () => "posts",
      providesTags: ["Posts"],
    }),
    getPostById: builder.query<Post, string>({
      query: (id) => `posts/${id}`,
      providesTags: ["Posts"],
    }),
    getPostsByUserId: builder.query<Post[], string>({
      query: (userId) => `posts/user/${userId}`,
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (post) => ({
        url: "posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    editPost: builder.mutation<Post, Post>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
    likePost: builder.mutation<{ message: string }, string>({
      query: (postId) => ({
        url: `posts/${postId}/like`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Posts"],
    }),
    unlikePost: builder.mutation<{ message: string }, string>({
      query: (postId) => ({
        url: `posts/${postId}/like`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Posts"],
    }),
    addComment: builder.mutation<Comment, Partial<Comment>>({
      query: ({ postId, text }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["Posts"],
    }),
    deleteComment: builder.mutation<void, string>({
      query: (commentId: string) => ({
        url: `/posts/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = postsApi;
