/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { useTarget } from "../../context/TargetContext";
import { useMemo, useEffect } from "react";
import useUser from "../auth/useUser";
import usePlan from "./usePlan";
import useDiet from "./useDiet";
import Target from "../DietRecommendation/Target";
import SpinnerMini from "../../ui/SpinnerMini";

function DietForm() {
  const { user } = useUser();
  const { plan: plans } = usePlan(user?.email);
  const { getNutritions, isLoading } = useTarget();
  const { dietFn } = useDiet();

  // Memoize details to prevent unnecessary recalculations
  const details = useMemo(
    () => (Array.isArray(plans) ? plans.map((e) => e) : []),
    [plans]
  );

  // Memoize all initial values
  const initialAge = useMemo(
    () => (details.length > 0 ? details[0]?.age : null),
    [details]
  );
  const initialWeight = useMemo(
    () => (details.length > 0 ? details[0]?.weight : null),
    [details]
  );
  const initialHeight = useMemo(
    () => (details.length > 0 ? details[0]?.height : null),
    [details]
  );
  const initialBodyfat = useMemo(
    () => (details.length > 0 ? details[0]?.bodyFat : null),
    [details]
  );
  const initialPlan = useMemo(
    () =>
      details.length > 0 ? details[0]?.plan + " " + details[0]?.rate : null,
    [details]
  );
  const initialGender = useMemo(
    () => (details.length > 0 ? details[0]?.gender : null),
    [details]
  );
  const initialActivity = useMemo(
    () => (details.length > 0 ? details[0]?.activity : null),
    [details]
  );

  // useForm hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Reset form with default values when data is loaded
  useEffect(() => {
    if (details.length > 0) {
      reset({
        height: initialHeight,
        weight: initialWeight,
        bodyFat: initialBodyfat,
        age: initialAge,
        plan: initialPlan,
        gender: initialGender,
        activity: initialActivity,
      });
    }
  }, [
    details,
    initialHeight,
    initialWeight,
    initialBodyfat,
    initialAge,
    initialPlan,
    initialGender,
    initialActivity,
  ]); // <-- Stable dependencies

  // Email and fullName user
  const email = useMemo(() => user?.email || "", [user]);
  const fullName = useMemo(
    () =>
      `${user?.user_metadata?.firstName || ""} ${user?.user_metadata?.lastName || ""}`.trim(),
    [user]
  );

  // handleSubmit
  const onSubmit = (data) => {
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
    dietFn({
      addGuest: { ...data, email, fullName, rate: rate[1], plan: rate[0] },
      email,
    });
    getNutritions(nutrationsGuest);
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Calculate Your Diet Plan
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
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
                min: { value: 13, message: "Age must exceed 100 cm" },
                max: { value: 110, message: "Age must not exceed 250 cm" },
              })}
              className={`w-full p-3 border rounded-lg outline-none ${
                errors.age ? "border-red-500" : "border-gray-300"
              }
                `}
            />
            {errors.age && (
              <p className="text-sm text-red-500">{errors.age.message}</p>
            )}
          </div>

          {/* Other form fields (height, weight, etc.) */}
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
                min: { value: 100, message: "Height must exceed 100 cm" },
                max: { value: 250, message: "Height must not exceed 250 cm" },
              })}
              className={`w-full p-3 border rounded-lg outline-none ${
                errors.height ? "border-red-500" : "border-gray-300"
              }
                `}
            />
            {errors.height && (
              <p className="text-sm text-red-500">{errors.height.message}</p>
            )}
          </div>

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
                min: {
                  value: 60,
                  message: "The minimum allowed weight is 60",
                },
                max: {
                  value: 300,
                  message: "The maximum allowed weight is 300",
                },
              })}
              className={`w-full p-3 border rounded-lg outline-none ${
                errors.weight ? "border-red-500" : "border-gray-300"
              }
                `}
            />
            {errors.weight && (
              <p className="text-sm text-red-500">{errors.weight.message}</p>
            )}
          </div>

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
              className={`w-full p-3 border rounded-lg outline-none ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }
                `}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Gender and Activity fields */}
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
              className={`w-full p-3 border rounded-lg outline-none ${
                errors.plan ? "border-red-500" : "border-gray-300"
              }
            `}
            >
              <option value="gain 0.5">Gain Weight</option>
              <option value="gain 1">Extreme gain weight</option>
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
              className={`w-full p-3 border rounded-lg outline-none ${
                errors.activity ? "border-red-500" : "border-gray-300"
              }
                `}
            >
              <option value="sedentary">Little/no exercise</option>
              <option value="lightlyActive">Light exercise</option>
              <option value="moderateActivity">Moderate exercise</option>
              <option value="active">Active</option>
              <option value="veryActive">Very active & physical job</option>
            </select>
          </div>
        </div>

        <div className="py-4">
          <button
            type="submit"
            className="px-5 py-3 transition text-white text-sm font-medium bg-[#16a34a] rounded-lg w-full hover:bg-green-800 focus:ring-0 focus:outline-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <SpinnerMini />
              </div>
            ) : (
              "Calculate"
            )}
          </button>
        </div>
      </form>
      <Target />
    </div>
  );
}

export default DietForm;
