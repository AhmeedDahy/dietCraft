/* eslint-disable react/prop-types */
import { FiPlusCircle } from "react-icons/fi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUser from "../auth/useUser";
import useAddFood from "./useAddFood";

function FoodLogForm({ dispatch, setOverlay }) {
  const { user } = useUser;
  const { addFoodFn, isPending } = useAddFood();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      food: "",
      mealType: "Breakfast",
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
    },
  });

  // منع القيم السالبة
  const handleNumberChange = (field) => (e) => {
    const value = Math.max(0, Number(e.target.value)); // يمنع القيم السالبة
    setValue(field, value);
  };

  const onSubmit = (data) => {
    addFoodFn({ ...data, email: user.email, mealId: Date.now() });
    dispatch({
      type: "ADD",
      payload: { ...data, id: Date.now().toString() },
    });
    reset();
    toast.success("Food entry added successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Food Name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Food Name
          </label>
          <input
            type="text"
            className={`w-full p-3 border rounded-lg outline-none ${
              errors.food ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter food name"
            {...register("food", { required: "Food name is required" })}
          />
          {errors.food && (
            <p className="mt-2 text-sm text-red-500">{errors.food.message}</p>
          )}
        </div>

        {/* Meal Type */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Meal Type
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            {...register("mealType")}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Calories */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Calories (kcal)
          </label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            placeholder="Enter calories"
            {...register("calories", { valueAsNumber: true })}
            value={watch("calories")}
            onChange={handleNumberChange("calories")}
          />
        </div>

        {/* Carbs */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Carbs (g)
          </label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            placeholder="Enter carbs"
            {...register("carbs", { valueAsNumber: true })}
            value={watch("carbs")}
            onChange={handleNumberChange("carbs")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Protein */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Protein (g)
          </label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            placeholder="Enter protein"
            {...register("protein", { valueAsNumber: true })}
            value={watch("protein")}
            onChange={handleNumberChange("protein")}
          />
        </div>

        {/* Fat */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Fat (g)
          </label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            placeholder="Enter fat"
            {...register("fat", { valueAsNumber: true })}
            value={watch("fat")}
            onChange={handleNumberChange("fat")}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          disabled={isPending}
          type="submit"
          className="flex items-center justify-center w-full gap-2 p-3 text-white transition-transform transform bg-green-600 rounded-lg md:w-48 hover:bg-green-700"
        >
          <FiPlusCircle size={18} /> Add Food
        </button>
        <button
          type="button"
          onClick={() => setOverlay(true)}
          className="flex items-center justify-center w-full gap-2 p-3 text-white transition-transform transform bg-blue-600 rounded-lg md:w-48 hover:bg-blue-700"
        >
          <FiPlusCircle size={18} /> Add Ingredients
        </button>
      </div>
    </form>
  );
}

export default FoodLogForm;
