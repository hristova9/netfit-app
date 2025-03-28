import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../store/usersApi";

export const useLogout = () => {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation(); 

  const logout = async () => {
    try {
      await logoutUser().unwrap()
        navigate("/login");
    } catch (error) {
      if(error instanceof Error){
        console.log("Logout failed:", error);
        throw new Error("Error:" + error.message);
      }
      throw new Error("Unknown error during logout");
    }
  };

  return logout;
};
