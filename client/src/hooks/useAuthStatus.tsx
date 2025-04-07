import { useValidateTokenQuery } from "../store/users/usersApi";

const useAuthStatus = () => {
  const { data: isValid, isLoading, error } = useValidateTokenQuery();
  if (isLoading) return { isValid: null, isLoading: true }; 
  if (error) return { isValid: false, isLoading: false };

  return { isValid: isValid ?? false, isLoading: false };
};

export default useAuthStatus;
