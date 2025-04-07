import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User.model";

interface UserState {
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  users: [],
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
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    updateUserInList: (state, action: PayloadAction<User>) => {
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
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

export const {
  setUser,
  setUsers,
  updateUserInList,
  setUserLoading,
  setUserError,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
