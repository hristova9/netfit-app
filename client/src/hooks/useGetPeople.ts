import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../store/users/usersApi";
import { setUsers } from "../store/users/usersSlice";
import { useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";

const useGetPeople = () => {
  const dispatch = useDispatch();
  const usersFromStore = useSelector((state: RootState) => state.users.users);
  const {
    data: users,
    error,
    isLoading,
    refetch,
  } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (users && JSON.stringify(users) !== JSON.stringify(usersFromStore)) {
      dispatch(setUsers(users)); 
    }
  }, [users, usersFromStore, dispatch]);

  if (error) {
    return { users: null, loading: false, error: (error as Error).message };
  }

  return {
    users: usersFromStore.length > 0 ? usersFromStore : users,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  };
};

export default useGetPeople;
