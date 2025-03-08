import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useEmails from "./useEmails";

function useLogin() {
  const { emails } = useEmails();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      if (!user?.user) return;

      // Ensure emails is an array before using .find()
      const isEmail = emails?.length
        ? emails.find((e) => e.email === user.user.email)
        : null;
      // Update query cache properly
      queryClient.setQueryData(["user"], (prev) => ({ ...prev, ...user.user }));

      // Navigate based on whether email exists
      const destination = isEmail ? "/" : "/getData";
      navigate(destination, { replace: true });
    },

    onError: () => {
      toast.error("Check Your Email or Password");
    }
  });

  return { login, isPending };
}

export default useLogin;
