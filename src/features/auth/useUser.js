import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useUser() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser
  });

  return { isPending, user, isAuthenticated: user?.role === "authenticated" };
}

export default useUser;
