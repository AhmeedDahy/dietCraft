import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMeal } from "../../services/apiProgress";
import toast from "react-hot-toast";

function useAddMeal() {
  const queryClient = useQueryClient();
  const { mutate: addMealFn, isPending } = useMutation({
    mutationKey: ["progressData"],
    mutationFn: addMeal,
    onSuccess: () => {
      toast.success("Meal added successfully");
      queryClient.invalidateQueries(["progressData"]);
    },
    onError: (error) => {
      toast.error("Failed to add Meal: " + error.message);
    }
  });
  return { addMealFn, isPending };
}

export default useAddMeal;
