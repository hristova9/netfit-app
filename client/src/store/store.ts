import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./users/usersApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import usersReducer from "./users/usersSlice";
import { postsApi } from "./posts/postsApi";
import postsReducer from "./posts/postsSlice";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    users: usersReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, postsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
