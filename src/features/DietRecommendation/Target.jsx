import { useTarget } from "../../context/TargetContext";
import { useEffect } from "react";
import useCreateTarget from "./useCreateTarget"; // Import the hook to create target
import useUser from "../auth/useUser";
import useGetTarget from "./useGetTarget";
import Spinner from "../../ui/Spinner";

function Target() {
  const { data } = useTarget();
  const { targetFn } = useCreateTarget();
  const { user } = useUser(); // Destructure from useCreateTarget
  const { getTarget, isPending } = useGetTarget(user.email); // Destructure from useGetTarget

  useEffect(() => {
    // Only call targetFn when data is available
    if (data && typeof data === "object") {
      targetFn({ email: user.email, targetData: data }); // Replace with actual email
    }
  }, [data, targetFn, user]); // Runs when data is updated
  // console.log(data);

  // Use data directly
  const dota = getTarget ? getTarget[0] : 0;
  const displayData = data || dota;
  if (isPending) return <Spinner />;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* BMI Card */}
      <div className="bg-[#f0fdf4] p-5 rounded-lg flex flex-col gap-3">
        <h3 className="font-semibold">BMI</h3>
        <p className="text-[#16a34a] text-4xl font-bold">
          {Math.ceil(displayData?.Bmi?.bmi ?? 0)} {displayData?.Bmi?.unit || ""}
        </p>
        <p className="text-gray-600">{displayData?.Bmi?.bmiStatus || "N/A"}</p>
      </div>

      {/* BMR Card */}
      <div className="bg-[#faf5ff] p-5 rounded-lg flex flex-col gap-3">
        <h3 className="font-semibold">BMR</h3>
        <p className="text-[#9333ea] text-4xl font-bold">
          {Math.ceil(displayData?.Bmr?.BMR.value ?? 0)}{" "}
          {displayData?.Bmr?.unit || ""}
        </p>
        <p className="text-gray-600">Daily Calorie BMR</p>
      </div>

      {/* TDEE Card */}
      <div className="bg-[#eff6ff] p-5 rounded-lg flex flex-col gap-3 md:col-span-2 lg:col-span-1">
        <h3 className="font-semibold">TDEE</h3>
        <p className="text-[#2563eb] text-4xl font-bold">
          {Math.ceil(displayData?.Bmr?.totalDailyCaloricNeeds?.value ?? 0)}{" "}
          {displayData?.Bmr?.totalDailyCaloricNeeds?.unit || ""}
        </p>
        <p className="text-gray-600">Total Daily Energy Expenditure</p>
      </div>
    </div>
  );
}

export default Target;
