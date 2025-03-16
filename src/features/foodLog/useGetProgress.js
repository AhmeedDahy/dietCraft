import { useQuery } from "@tanstack/react-query";
import { getProgress } from "../../services/apiProgress";

function useGetProgress(email) {
  const { data: progressData, isPending } = useQuery({
    queryKey: ["progressData"], // Unique query key
    queryFn: () => getProgress(email), // Pass email directly
    enabled: !!email // Only run the query if email is provided
  });

  return { progressData, isPending };
}

export default useGetProgress;
