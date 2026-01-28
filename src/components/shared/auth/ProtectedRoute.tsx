import { Navigate, useLocation } from "react-router";
import useAuthStore from "@stores/auth.store";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { token } = useAuthStore();
    const location = useLocation();

    if (!token) {
        // Redirect to login but save the current location to redirect back after login
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
