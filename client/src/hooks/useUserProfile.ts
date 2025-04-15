import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetUserByIdQuery } from "../store/users/usersApi";
import { useDispatch } from "react-redux";
import { setCurrentUser, setLoggedInUser } from "../store/users/usersSlice";
import { useEffect } from "react";

const useUserProfile = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();

  const {
    data: currentUserData,
    error: currentUserError,
    isLoading: currentUserLoading,
    refetch: refetchCurrentUser,
  } = useGetMyselfQuery();

  const {
    data: currentUser,
    refetch,
    isLoading
  } = useGetUserByIdQuery(id as string, {
    // skip: isMe,
  });
  console.log(currentUser);
  
  useEffect(() => {
    if (!isMe && currentUser) {
      dispatch(setCurrentUser(currentUser));
    }
  }, [currentUser, dispatch, isMe]);

  useEffect(() => {
    if (isMe && currentUser) {
      dispatch(setLoggedInUser(currentUser));
    }
  }, [currentUser, dispatch, isMe]);

  const user = isMe ? loggedInUser : currentUser;
  const isOwnProfile = isMe;
  const loading = !user;

  return { user, loading, isOwnProfile, refetch };
};

export default useUserProfile;