import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMeal } from "../../services/apiMeals";
import toast from "react-hot-toast";

function useDeleteFood() {
  const queryClient = useQueryClient();
  const { mutate: deleteFood, isPending } = useMutation({
    mutationFn: (id) => deleteMeal(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["foodData"]);
      toast.success("Food deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete Food: " + error.message);
    },
  });
  return { deleteFood, isPending };
}
export default useDeleteFood;
