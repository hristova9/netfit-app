import { useLogoutUserMutation } from "../store/users/usersApi";

export const useLogout = () => {
  const [logoutUser] = useLogoutUserMutation();

  const logout = async () => {
    try {
      await logoutUser().unwrap();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error:" + error.message);
      }
      throw new Error("Unknown error during logout");
    }
  };

  return logout;
};
