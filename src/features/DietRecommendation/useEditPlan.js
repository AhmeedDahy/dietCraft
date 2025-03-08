import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePlan } from "../../services/apiDiet";
import toast from "react-hot-toast";

function useEditPlan(email) {
  const queryClient = useQueryClient();
  const { mutate: editPlan, isPending: isEditing } = useMutation({
    mutationFn: (addGuest) => updatePlan(email, addGuest),
    onSuccess: () => {
      queryClient.invalidateQueries(["plan"]);
      toast.success("Plan updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
  return { editPlan, isEditing };
}

export default useEditPlan;
