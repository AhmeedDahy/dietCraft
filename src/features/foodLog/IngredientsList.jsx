/* eslint-disable react/prop-types */
function IngredientsList({ item, setSelectedIngredient }) {
  const Name =
    item.description.split(" ").length > 3
      ? item.description.split(" ").slice(0, 3).join(" ") + "..."
      : item.description;
  return (
    <div className="p-2 sm:p-3">
      <button
        onClick={() => setSelectedIngredient(item)}
        className="w-full p-4 text-left transition-shadow duration-300 bg-white border-2 rounded-lg shadow-md hover:shadow-lg"
      >
        <h1 className="mb-1 text-xl font-bold text-gray-800">
          {Name?.charAt(0).toUpperCase() + Name?.slice(1)}
        </h1>
        <p className="text-sm text-gray-500">
          Calories:{" "}
          {item.foodNutrients
            .filter((nutrient) => nutrient.nutrientId === 1008)
            .map((nutrient) => nutrient.value)
            .join(" ") || "0"}{" "}
          kcal
        </p>
      </button>
    </div>
  );
}

export default IngredientsList;
