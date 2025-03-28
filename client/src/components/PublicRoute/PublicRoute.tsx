import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../../hooks/useAuthStatus";

const PublicRoute = () => {
    const { isValid, isLoading } = useAuthStatus();

    if (isLoading) return <div>Loading...</div>;
  return isValid ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
