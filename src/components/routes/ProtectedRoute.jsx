import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        // Use a simple spinner/loading text here
        return <div className="text-center py-20 text-primary-green">Loading...</div>;
    }

    if (user) {
        return children;
    }

    // Unauthenticated: Redirect to Login, storing the intended location
    toast.error("You must log in to view this page.");
    return <Navigate to="/login" state={location.pathname} replace />;
};

export default ProtectedRoute;