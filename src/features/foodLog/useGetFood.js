import { useQuery } from "@tanstack/react-query";
import { getMeals } from "../../services/apiMeals";

function useGetFood(email) {
  const { data: foodData, isPending } = useQuery({
    queryKey: ["foodData"], // Unique query key
    queryFn: () => getMeals(email), // Pass email directly
    enabled: !!email, // Only run the query if email is provided
  });

  return { foodData, isPending };
}

export default useGetFood;
