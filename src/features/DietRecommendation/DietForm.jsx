/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { useTarget } from "../../context/TargetContext";
import { useEffect } from "react";
import useUser from "../auth/useUser";
import usePlan from "./usePlan";
import useDiet from "./useDiet";
import Target from "../DietRecommendation/Target";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import useCreateTarget from "./useCreateTarget";
import useGetTarget from "./useGetTarget";

function DietForm() {
  const { user } = useUser();
  const { plan: plans, isPending: isPlanning } = usePlan(user?.email);
  const { getNutritions, isLoading, data: res } = useTarget();
  const { dietFn } = useDiet();
  const { targetFn } = useCreateTarget();
  const { isPending: isGetting } = useGetTarget(user?.email);

  const isAnyLoading = isGetting || isPlanning;

  const details = Array.isArray(plans) ? plans : [];
  const initialValues = details.length > 0 ? details[0] : null;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (initialValues) {
      reset({
        height: initialValues.height,
        weight: initialValues.weight,
        bodyFat: initialValues.bodyFat,
        age: initialValues.age,
        plan: initialValues.plan + " " + initialValues.rate,
        gender: initialValues.gender,
        activity: initialValues.activity,
      });
    }
  }, [initialValues, reset]);

  const email = user?.email || "";
  const fullName =
    `${user?.user_metadata?.firstName || ""} ${user?.user_metadata?.lastName || ""}`.trim();

  const onSubmit = async (data) => {
    try {
      const rate = data?.plan?.split(" ");
      const nutrationsGuest = {
        ...data,
        height: Number(data.height),
        weight: Number(data.weight),
        bodyFat: Number(data.bodyFat),
        age: Number(data.age),
        rate: rate[1],
        plan: rate[0],
      };
      await dietFn({
        addGuest: { ...data, email, fullName, rate: rate[1], plan: rate[0] },
        email,
      });
      await getNutritions(nutrationsGuest);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (res) targetFn({ email, targetData: res });
  }, [res]);

  if (isAnyLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Calculate Your Diet Plan
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* Age */}
          <div>
            <label
              htmlFor="age"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              {...register("age", {
                required: "Age is required",
                min: { value: 13, message: "Age must be at least 13" },
                max: { value: 110, message: "Age must not exceed 110" },
              })}
              onChange={(e) => {
                if (e.target.value < 0) e.target.value = 0;
              }}
              className={`w-full p-3 border rounded-lg outline-none ${
                errors.age ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.age && (
              <p className="text-sm text-red-500">{errors.age.message}</p>
            )}
          </div>

          {/* Height */}
          <div>
            <label
              htmlFor="height"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              {...register("height", {
                required: "Height is required",
                min: { value: 100, message: "Height must be at least 100 cm" },
                max: { value: 250, message: "Height must not exceed 250 cm" },
              })}
              onChange={(e) => {
                if (e.target.value < 0) e.target.value = 0;
              }}
              className={`w-full p-3 border rounded-lg outline-none ${
                errors.height ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.height && (
              <p className="text-sm text-red-500">{errors.height.message}</p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label
              htmlFor="weight"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              {...register("weight", {
                required: "Weight is required",
                min: { value: 60, message: "Weight must be at least 60 kg" },
                max: { value: 300, message: "Weight must not exceed 300 kg" },
              })}
              onChange={(e) => {
                if (e.target.value < 0) e.target.value = 0;
              }}
              className={`w-full p-3 border rounded-lg outline-none ${
                errors.weight ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.weight && (
              <p className="text-sm text-red-500">{errors.weight.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Gender
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="w-full p-3 border rounded-lg outline-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Plan & Activity */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="plan"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Choose your weight loss plan:
            </label>
            <select
              id="plan"
              {...register("plan")}
              className="w-full p-3 border rounded-lg outline-none"
            >
              <option value="gain 0.5">Gain Weight</option>
              <option value="gain 1">Extreme Gain Weight</option>
              <option value="maintain 0">Maintain</option>
              <option value="loss 0.5">Weight Loss</option>
              <option value="loss 1">Extreme Weight Loss</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="activity"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Activity
            </label>
            <select
              id="activity"
              {...register("activity")}
              className="w-full p-3 border rounded-lg outline-none"
            >
              <option value="sedentary">Little/no exercise</option>
              <option value="lightlyActive">Light exercise</option>
              <option value="moderateActivity">Moderate exercise</option>
              <option value="active">Active</option>
              <option value="veryActive">Very Active & Physical Job</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="py-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-3 text-white bg-green-600 rounded-lg md:w-48 hover:bg-green-700"
          >
            {isLoading ? <SpinnerMini /> : "Calculate"}
          </button>
        </div>
      </form>
      <Target />
    </div>
  );
}

export default DietForm;
