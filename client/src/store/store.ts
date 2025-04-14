import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./users/usersApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import usersReducer from "./users/usersSlice";
import { postsApi } from "./posts/postsApi";
import postsReducer from "./posts/postsSlice";
import { conversationsApi } from "./chats/conversationsApi";
import { messagesApi } from "./chats/messagesApi";
import conversationsReducer from "./chats/conversationsSlice";
import messagesReducer from "./chats/messagesSlice";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [conversationsApi.reducerPath]: conversationsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    users: usersReducer,
    posts: postsReducer,
    conversations: conversationsReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      postsApi.middleware,
      conversationsApi.middleware,
      messagesApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
