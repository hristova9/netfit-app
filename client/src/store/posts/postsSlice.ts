import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../models/Post.model";

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.error = null;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload); // Add new post to the top
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    setPostLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPostError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearPosts: (state) => {
      state.posts = [];
      state.error = null;
    },
  },
});

export const {
  setPosts,
  addPost,
  updatePost,
  deletePost,
  setPostLoading,
  setPostError,
  clearPosts,
} = postSlice.actions;

export default postSlice.reducer;
