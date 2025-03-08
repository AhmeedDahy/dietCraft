/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import useEditPlan from "../features/DietRecommendation/useEditPlan";

function PlanForm({ planItem, email }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      height: planItem.height || "",
      weight: planItem.weight || ""
    }
  });

  const { editPlan, isEditing } = useEditPlan(email);

  const onSubmit = (data) => {
    editPlan(data);
  };

  return (
    <form className="flex flex-col mb-6" onSubmit={handleSubmit(onSubmit)}>
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
          max: { value: 250, message: "Height must not exceed 250 cm" }
        })}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
      {errors.height && (
        <p className="text-sm text-red-500">{errors.height.message}</p>
      )}

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
          min: { value: 60, message: "The minimum allowed weight is 60" },
          max: { value: 300, message: "The maximum allowed weight is 300" }
        })}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
      {errors.weight && (
        <p className="text-sm text-red-500">{errors.weight.message}</p>
      )}

      <button
        disabled={isEditing}
        className="p-2 mt-5 border border-black rounded-lg"
        type="submit"
      >
        {isEditing ? "Updating..." : "Update"}
      </button>
    </form>
  );
}
export default PlanForm;
