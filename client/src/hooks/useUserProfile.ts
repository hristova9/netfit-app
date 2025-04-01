import { useLocation } from "react-router-dom";
import { useGetMyselfQuery, useGetUserByIdQuery } from "../store/usersApi";

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
    data: userData,
    error: userError,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useGetUserByIdQuery(id as string, {
    skip: !id || id === "me",
    refetchOnMountOrArgChange: true,
  });

  const isMe = id === "me";
  const user = isMe ? currentUserData : userData; 
  const error = currentUserError || userError;
  const loading = currentUserLoading || userLoading;
  const refetch = isMe ? refetchCurrentUser : refetchUser;
  const isOwnProfile = user && currentUserData && user.id === currentUserData.id;

  if (error) {
    return { user: null, loading: false, error: (error as Error).message, isOwnProfile: false };
  }

  return { user, loading, error: null, refetch, isOwnProfile: isOwnProfile ?? false };
};

export default useUserProfile;