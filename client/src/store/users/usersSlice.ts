import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User.model";

interface UserState {
  loggedInUser: User | null;
  currentUser: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  loggedInUser: null,
  currentUser: null,
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<User | null>) => {
      console.log("logged in:" , action.payload);
      
      state.loggedInUser = action.payload;
      state.error = null;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      console.log("current:" , action.payload);

      state.currentUser = action.payload;
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
    clearLoggedInUser: (state) => {
      state.loggedInUser = null;
      state.error = null;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  setLoggedInUser,
  setCurrentUser,
  setUsers,
  updateUserInList,
  setUserLoading,
  setUserError,
  clearLoggedInUser,
  clearCurrentUser

} = userSlice.actions;

export default userSlice.reducer;
