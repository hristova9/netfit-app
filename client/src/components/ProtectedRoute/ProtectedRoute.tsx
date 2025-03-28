import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus  from "../../hooks/useAuthStatus";

const ProtectedRoute = () => {
    const { isValid, isLoading } = useAuthStatus();

    if (isLoading) return <div>Loading...</div>;

    return isValid ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
