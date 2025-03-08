// hooks/useEmails.js
import { useQuery } from "@tanstack/react-query";
import { getEmails } from "../../services/apiDiet";
import toast from "react-hot-toast";

function useEmails() {
  const { data: emails, isPending } = useQuery({
    queryKey: ["emails"], // Unique query key
    queryFn: getEmails,
    onError: (error) => {
      toast.error(error.message || "Failed to fetch emails.");
    }
  });

  return { emails: emails || [], isPending }; // Default value for emails
}

export default useEmails;
