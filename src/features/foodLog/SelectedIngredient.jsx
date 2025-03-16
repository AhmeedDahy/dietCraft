/* eslint-disable react/prop-types */
import { useState } from "react";
import useUser from "../auth/useUser";
import useAddMeal from "./useAddMeal";
import SpinnerMini from "../../ui/SpinnerMini";

function SelectedIngredient({
  setSelectedIngredient,
  selectedIngredient,
  setOverlay
}) {
  const [servings, setServings] = useState(1);
  const { user } = useUser();
  const { addMealFn, isPending } = useAddMeal();
  const [mealType, setMealType] = useState("Breakfast");
  const filteredFoods = {
    1008: "Calories",
    1004: "Total Fat",
    1093: "Sodium",
    1005: "Total Carbs",
    1003: "Protein",
    1063: "Sugar",
    1079: "Fiber",
    1253: "Cholesterol"
  };
  console.log(selectedIngredient);
  // Convert the following code to use the filteredFoods object {1008: "Calories", ...}
  const handleFilter = selectedIngredient.foodNutrients.filter((nutrient) =>
    Object.keys(filteredFoods).includes(nutrient.nutrientId.toString())
  );
  // Acess the filteredFoods object to get the nutrient name , value and unit {name: "Calories", value: 0, unit: "g"}
  const handleNameAndValue = handleFilter.map((nutrient) => ({
    name: filteredFoods[nutrient.nutrientId],
    value: ((nutrient.value / 100) * servings).toFixed(2),
    unit: nutrient.unitName.toLowerCase()
  }));
  // to match names from schema DataBase
  const nutrientKeyMap = {
    Calories: "calories",
    "Total Fat": "fat",
    Sodium: "sodium",
    "Total Carbs": "carb",
    Protein: "protein",
    Sugar: "sugar",
    Fiber: "fiber",
    Cholesterol: "cholesterol"
  };
  // Create an object with the nutrient name and value [calories, 0 , fat, 0, ...] --> {calories: 0, fat: 0, ...}
  const initialNutrients = Object.fromEntries(
    Object.values(nutrientKeyMap).map((key) => [key, 0])
  );
  // Convert the following code to use the nutrientKeyMap object {calories: 220, fat: 10, ...}
  const nutrientsObject = handleNameAndValue.reduce(
    (acc, nutrient) => {
      const key = nutrientKeyMap[nutrient.name];
      if (key) acc[key] = parseFloat(nutrient.value);
      return acc;
    },
    { ...initialNutrients }
  );

  const handleServingsChange = (e) => {
    if (e.target.value < 0) return;
    setServings(e.target.value);
  };

  function handleAddToDiary(meal) {
    if (!selectedIngredient) return;
    addMealFn(
      {
        ...meal,
        mealName: selectedIngredient.description,
        email: user.email,
        IngredientsId: Date.now(),
        mealType: mealType
      },
      {
        onSuccess: () => {
          setOverlay(false);
        }
      }
    );
  }

  return (
    <div className="w-full p-3 mx-auto rounded-lg shadow-md md:p-6 bg-gray-50">
      <h2 className="mb-4 text-2xl font-bold">
        {selectedIngredient.description}
      </h2>

      <div className="flex flex-col flex-wrap items-center mb-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        {/* Servings Label and Input */}
        <h3 className="w-full mb-2 font-bold text-l">Servings:</h3>
        <div className="flex items-center gap-2 max-sm:w-full">
          <input
            type="number"
            value={servings}
            onChange={handleServingsChange}
            className="py-1 text-center border rounded-md max-sm:w-[50%] w-24"
          />

          {/* Disabled Input for "1g" */}
          <input
            type="text"
            value="1g"
            disabled
            className="w-24 py-1 text-center bg-white border rounded-md max-sm:w-[50%] disabled:opacity-50"
          />
        </div>

        {/* Meal Type Select Dropdown */}
        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="w-full py-1 text-center bg-white border rounded-md sm:flex-1"
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snack</option>
        </select>
      </div>
      <div>
        {handleNameAndValue.length > 0 ? (
          <>
            <h3 className="mb-2 font-bold text-l">Nutrients:</h3>
            <div className="grid w-full grid-cols-1 p-3 text-gray-700 bg-white rounded-lg shadow md:p-6 gap-y-3 gap-x-6 md:grid-cols-2">
              {handleNameAndValue.map(({ name, value, unit }) => (
                <div
                  key={name}
                  className="flex justify-between p-2 border-b md:p-4"
                >
                  <span className="font-semibold">{name}</span>
                  <span>
                    {parseFloat(value)} {unit}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No Nutrients Found</p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
        <button
          onClick={() => setSelectedIngredient(null)}
          className="px-4 py-2 text-white bg-green-500 rounded-lg max-sm:w-full hover:bg-green-600"
        >
          Back to Ingredients
        </button>
        <button
          onClick={() => handleAddToDiary(nutrientsObject)}
          disabled={isPending}
          className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-lg max-sm:w-full hover:bg-blue-600"
        >
          {isPending ? <SpinnerMini /> : "Add to Diary"}
        </button>
      </div>
    </div>
  );
}

export default SelectedIngredient;
