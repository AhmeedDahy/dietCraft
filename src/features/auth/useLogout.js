import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../../services/apiAuth";

function useLogout() {
  const queryClient = useQueryClient();
  const { isPending, mutate: logout } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.removeQueries(["user"]);
      queryClient.invalidateQueries(["user"]);
      localStorage.removeItem("nutrationsData");
    }
  });
  return { isPending, logout };
}

export default useLogout;
