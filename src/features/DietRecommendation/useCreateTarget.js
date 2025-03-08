import { useMutation } from "@tanstack/react-query";
import { addTarget } from "../../services/apiTarget";
import toast from "react-hot-toast";

function useCreateTarget() {
  const { mutate: targetFn, isPending } = useMutation({
    mutationKey: ["targetData"],
    mutationFn: ({ email, targetData }) => addTarget(email, targetData),
    onError: (error) => {
      toast.error("Failed to save target data: " + error.message);
    },
  });

  return { targetFn, isPending };
}

export default useCreateTarget;
