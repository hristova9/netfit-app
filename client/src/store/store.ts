import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./usersApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import usersReducer from "./usersSlice";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    users: usersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
