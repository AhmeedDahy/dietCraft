/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import FoodLogItem from "./FoodLogItem";

import { FiTrash2 } from "react-icons/fi";

function FoodLogList({ foodLog, dispatch }) {
  const handleClearAll = () => {
    dispatch({ type: "CLEAR" });
    toast("All food entries cleared.", {
      icon: <FiTrash2 size={18} />
    });
  };
  return (
    <div className="w-full p-6 mx-auto bg-white rounded-lg shadow-md max-w-8xl">
      <h4 className="mb-4 text-2xl font-bold text-gray-800">Log Your Meals</h4>
      {foodLog.length === 0 ? (
        <p className="text-gray-600">
          No food entries yet. Start adding your meals!
        </p>
      ) : (
        <div className="space-y-4">
          {foodLog.map((log, index) => (
            <FoodLogItem
              key={index}
              log={log}
              onRemove={() => {
                dispatch({ type: "REMOVE", payload: log.id });
                toast("Food entry removed.");
              }}
            />
          ))}
          <div className="flex justify-end">
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 p-3 text-white transition-transform transform bg-red-600 rounded-lg hover:bg-red-700 hover:scale-105"
            >
              <FiTrash2 size={18} /> Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodLogList;
