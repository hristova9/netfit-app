import { useGetAllUsersQuery } from "../store/usersApi";

const useGetPeople = () => {
  const { data: users, error, isLoading, refetch } = useGetAllUsersQuery();

  if (error) {
    return { users: null, loading: false, error: (error as Error).message };
  }

  return { users, loading: isLoading, error: null, refetch };
};

export default useGetPeople;
