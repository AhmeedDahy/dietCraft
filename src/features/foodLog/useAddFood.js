import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMeal } from "../../services/apiMeals";
import toast from "react-hot-toast";

function useAddFood() {
  const queryClient = useQueryClient();
  const { mutate: addFoodFn, isPending } = useMutation({
    mutationKey: ["foodData"],
    mutationFn: addMeal,
    onSuccess: () => {
      toast.success("Food added successfully");
      queryClient.invalidateQueries(["foodData"]);
    },
    onError: (error) => {
      toast.error("Failed to add Food: " + error.message);
    },
  });
  return { addFoodFn, isPending };
}

export default useAddFood;
