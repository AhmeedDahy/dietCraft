import { useReducer, useState, useEffect } from "react";
import IngredientsFood from "./IngredientsFood";
import FoodLogList from "./FoodLogList";
import FoodLogForm from "./FoodLogForm";

const foodReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((item) => item.id !== action.payload);
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

function FoodLogs() {
  const [overlay, setOverlay] = useState(false);
  const [foodLog, dispatch] = useReducer(foodReducer, [], () => {
    const savedData = localStorage.getItem("foodLogData");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("foodLogData", JSON.stringify(foodLog));
  }, [foodLog]);

  return (
    <div className="flex flex-col min-h-screen gap-5 rounded-lg md:p-4 bg-gray-50">
      {/* Food Entry Form */}
      <div className="w-full p-6 mx-auto bg-white rounded-lg shadow-md max-w-8xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Add Food Entry
        </h2>
        {/* Form */}
        <FoodLogForm dispatch={dispatch} setOverlay={setOverlay} />
      </div>
      {/* Overlay for Ingredients */}
      {overlay && <IngredientsFood setOverlay={setOverlay} />}
      {/* Food Log List */}
      <FoodLogList foodLog={foodLog} dispatch={dispatch} />
      {/* Ingredients Modal */}
      <div className="w-full p-6 mx-auto bg-white rounded-lg shadow-md max-w-8xl">
        <h4 className="mb-4 text-2xl font-bold text-gray-800">
          Log Your Ingredients
        </h4>
        <p className="text-gray-600">
          No ingredients entries yet. Start adding your meals!
        </p>
      </div>
    </div>
  );
}

export default FoodLogs;
