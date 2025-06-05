import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute = ({ children }) => {
  const { signed, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  return signed ? children : <Navigate to="/" />;
};
