import { useNavigate } from "react-router-dom";
import { logoutUserService } from "../services/userService";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const success = await logoutUserService();
      if (success) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return logout;
};
