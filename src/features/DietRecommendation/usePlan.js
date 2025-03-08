import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDataByEmail } from "../../services/apiDiet";
import toast from "react-hot-toast";

function usePlan(email) {
  const queryClient = useQueryClient();

  const {
    data: plan,
    isPending,
    isFetched
  } = useQuery({
    queryKey: ["plan", email],
    queryFn: () => fetchDataByEmail(email),
    enabled: !!email,
    onSuccess: (data) => {
      queryClient.setQueryData(["plan", email], data || []);
      toast.success("Fetched plan successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to fetch plan.");
    }
  });

  return { plan: plan || [], isPending, isFetched }; // Ensure plan is always an array
}

export default usePlan;
