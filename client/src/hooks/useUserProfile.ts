import { useGetMyselfQuery } from "../store/usersApi";

const useUserProfile = () => {
  const { data: user, error, isLoading, refetch } = useGetMyselfQuery();

  if (error) {
    return { user: null, loading: false, error: (error as Error).message };
  }

  return { user, loading: isLoading, error: null, refetch };
};

export default useUserProfile;
