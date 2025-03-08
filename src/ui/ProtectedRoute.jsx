/* eslint-disable react/prop-types */
import useUser from "../features/auth/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";

function ProtectRoute({ children }) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [isAuthenticated, navigate, isPending]);

  if (isPending)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Spinner />
      </div>
    );

  if (isAuthenticated) return children;
}

export default ProtectRoute;
