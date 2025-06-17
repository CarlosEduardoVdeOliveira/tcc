import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "./LoadingSpinner";

export const PrivateRoute = ({ children }) => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner message="Verificando autenticação..." size="large" />
      </div>
    );
  }

  return signed ? children : <Navigate to="/" />;
};
