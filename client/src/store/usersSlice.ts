import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/User.model";

interface UserState {
  user: User | null; 
  loading: boolean; 
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.error = null;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null; 
      state.error = null;
    },
  },
});

export const { setUser, setUserLoading, setUserError, clearUser } = userSlice.actions;

export default userSlice.reducer;
