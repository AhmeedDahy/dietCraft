import { useReducer, useState } from "react";
import IngredientsModal from "./IngredientsModal";
import FoodLogList from "./FoodLogList";
import FoodLogForm from "./FoodLogForm";
import useGetProgress from "./useGetProgress";
import useUser from "../auth/useUser";
import Spinner from "../../ui/Spinner";
import IngredientsLogList from "./IngredientsLogList";

const foodReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((log) => log.id !== action.payload);
    default:
      return state;
  }
};

function FoodLogs() {
  const [overlay, setOverlay] = useState(false);
  const [foodLog, dispatch] = useReducer(foodReducer, []);
  const { user } = useUser();
  const { progressData, isPending: isProgressPending } = useGetProgress(
    user?.email
  );

  if (isProgressPending) return <Spinner />;

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
      {overlay && <IngredientsModal setOverlay={setOverlay} />}
      {/* Food Log List */}
      <FoodLogList foodLog={foodLog} dispatch={dispatch} />
      {/* Ingredients List */}
      <IngredientsLogList progressData={progressData} />
    </div>
  );
}

export default FoodLogs;
