/* eslint-disable react/prop-types */
function FoodLogItem({ log, onRemove }) {
  return (
    <div className="flex items-center justify-between border-b max-sm:flex-col">
      <div className="w-full py-2">
        <p className="text-xl font-semibold">{log.food}</p>
        <p className="text-sm text-gray-600">
          {log.calories} kcal | {log.carbs}g Carbs | {log.protein}g Protein |{" "}
          {log.fat}g Fat
        </p>
      </div>
      <div className="flex gap-2 max-sm:w-full max-sm:justify-between max-sm:pb-2">
        <span className="px-3 py-1 text-white bg-green-600 rounded-full">
          {log.mealType}
        </span>
        <button
          onClick={() => onRemove(log.id)}
          className="px-3 py-1 text-white bg-red-500 rounded-full hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default FoodLogItem;
