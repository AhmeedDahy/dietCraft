import { useQuery } from "@tanstack/react-query";
import { getTargetData } from "../../services/apiTarget";

function useGetTarget(email) {
  const { data: getTarget, isPending } = useQuery({
    queryKey: ["target", email], // Unique query key
    queryFn: () => getTargetData(email), // Pass email directly
    enabled: !!email, // Only run the query if email is provided
  });

  return { getTarget, isPending };
}

export default useGetTarget;
