import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: editUser, isPending } = useMutation({
    mutationFn: ({ firstName, lastName, password, avatar }) =>
      updateUser({ firstName, lastName, password, avatar }),

    onSuccess: () => {
      toast.success("User updated successfully!");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the user."
      );
    }
  });

  return { editUser, isPending };
}
export default useUpdateUser;
