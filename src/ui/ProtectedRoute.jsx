/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../features/auth/useUser";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [isAuthenticated, navigate, isPending]);

  // Render children only if authenticated
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
