import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetUserByIdQuery } from "../store/users/usersApi";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../store/users/usersSlice";

const useUserProfile = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const dispatch = useDispatch();

  const loggedInUser = useSelector(
    (state: RootState) => state.users.loggedInUser
  );

  const isMe = id === "me";

  const {
    data: currentUser,
  } = useGetUserByIdQuery(id as string, {
    skip: isMe,
  });

  dispatch(setCurrentUser(currentUser ?? null));

  const user = isMe ? loggedInUser : currentUser;
  const isOwnProfile = isMe;
  const loading = !user;

  return { user, loading, isOwnProfile };
};

export default useUserProfile;
