import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMeal } from "../../services/apiProgress";
import toast from "react-hot-toast";

function useDeleteIngredients() {
  const queryClient = useQueryClient();
  const { mutate: deleteIngredients, isPending } = useMutation({
    mutationFn: (id) => deleteMeal(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["progressData"]);
      toast.success("Ingredients deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete ingredients: " + error.message);
    }
  });
  return { deleteIngredients, isPending };
}
export default useDeleteIngredients;
