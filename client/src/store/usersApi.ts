import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/User.model";

const API_URL = "http://localhost:3000/";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<{ token: string }, Partial<User>>({
      query: (user) => ({
        url: "auth/register",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "auth/login",
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["Auth"],
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    validateToken: builder.query<{message: string}, void>({
      query: () => "auth/validate-token",
      providesTags: ["Auth"],
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => "users",
    }),
    getMyself: builder.query<User, void>({
      query: () => "users/me",
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `users/${id}`,
    }),
    editUser: builder.mutation<User, User>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: "PUT",
        body: user,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useValidateTokenQuery,
  useGetAllUsersQuery,
  useGetMyselfQuery,
  useGetUserByIdQuery,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApi;