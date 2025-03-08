/* eslint-disable react/prop-types */
function SelectedIngredient({ setSelectedIngredient, selectedIngredient }) {
  // Custom Names for filteredFoods
  const filteredFoods = {
    Energy: "Energy",
    "Total lipid (fat)": "Total Fat",
    "Sodium, Na": "Sodium",
    "Potassium, K": "Potassium",
    "Carbohydrate, by difference": "Total Carbs",
    Protein: "Protein",
    "Calcium, Ca": "Calcium",
    "Iron, Fe": "Iron",
    "Vitamin B-6": "Vitamin B-6"
  };
  return (
    <div className="w-full p-3 mx-auto rounded-lg shadow-md md:p-6 bg-gray-50">
      <h2 className="mb-4 text-2xl font-bold">
        {selectedIngredient.description}
      </h2>

      <div className="flex items-center mb-4">
        <label className="mr-2 font-semibold text-l">Servings:</label>
        <input
          type="number"
          defaultValue={1}
          className="w-20 px-2 py-1 text-center border rounded-md"
        />
        <select className="w-full px-2 py-1 ml-2 text-center bg-white border rounded-md sm:w-28">
          <option>1 slice</option>
          <option>100g</option>
        </select>
      </div>

      <h2 className="mb-4 font-bold text-l">Nutrients:</h2>

      <div className="grid w-full grid-cols-1 p-3 text-gray-700 bg-white rounded-lg shadow md:p-6 gap-y-3 gap-x-6 md:grid-cols-2">
        {selectedIngredient.foodNutrients
          .filter((nutrient) =>
            Object.keys(filteredFoods).includes(nutrient.nutrientName)
          )
          .map((nutrient, index) => {
            const displayName =
              nutrient.nutrientName === "Energy" && nutrient.unitName === "KCAL"
                ? "Calories"
                : filteredFoods[nutrient.nutrientName];
            return (
              <div
                key={index}
                className="flex justify-between p-2 border-b md:p-4"
              >
                <span className="font-semibold">{displayName}</span>
                <span>
                  {parseFloat(nutrient.value.toFixed(2))}{" "}
                  {nutrient.unitName.toLowerCase()}
                </span>
              </div>
            );
          })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
        <button
          onClick={() => setSelectedIngredient(null)}
          className="px-4 py-2 text-white bg-green-500 rounded-lg max-sm:w-full hover:bg-green-600"
        >
          Back to Ingredients
        </button>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-lg max-sm:w-full hover:bg-blue-600">
          Add to Diary
        </button>
      </div>
    </div>
  );
}

export default SelectedIngredient;
