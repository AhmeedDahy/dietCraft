/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaFire, FaCubes, FaDrumstickBite } from "react-icons/fa";

function Results({ dessert }) {
  // Limit the name to 4 words
  const Name =
    dessert.Name.split(" ").length > 3
      ? dessert.Name.split(" ").slice(0, 3).join(" ") + "..."
      : dessert.Name;

  return (
    <li className="flex flex-col justify-between w-full pb-4 mx-auto shadow-lg rounded-2xl">
      <div className="block shadow-xs shadow-green-200">
        <img
          alt={dessert?.Name || "Dessert image"}
          src={
            dessert?.Images[0] || "/6c4a7fb9-5fde-42e2-b537-b4732a92cf56.png"
          }
          loading="lazy"
          className="object-cover w-full h-56 rounded-t-lg rounded-b-none"
        />
      </div>

      <div className="px-3 py-3">
        {/* Render the truncated name */}
        <p className="overflow-hidden text-xl font-medium text-center text-ellipsis">
          {Name}
        </p>
      </div>

      <div className="flex flex-col flex-wrap justify-between gap-4 px-5 lg:px-2">
        <div className="flex justify-between w-full gap-4">
          {/* Calories */}
          <div className="inline-flex items-center gap-2 shrink-0">
            <FaFire className="text-green-600 size-5" />
            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Calories</p>
              <p className="font-medium">
                {Math.ceil(dessert?.Calories) || "N/A"} kcal
              </p>
            </div>
          </div>

          {/* Sugar */}
          <div className="items-center hidden gap-2 sm:inline-flex shrink-0">
            <FaCubes className="text-green-600 size-5" />
            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Sugar</p>
              <p className="font-medium">
                {Math.ceil(dessert?.SugarContent) || "N/A"} g
              </p>
            </div>
          </div>

          {/* Protein */}
          <div className="inline-flex items-center gap-2 shrink-0">
            <FaDrumstickBite className="text-green-600 size-5" />
            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Protein</p>
              <p className="font-medium">
                {Math.ceil(dessert?.ProteinContent) || "N/A"} g
              </p>
            </div>
          </div>
        </div>

        {/* Button */}
        <Link
          to={dessert?.RecipeId ? `/browse-foods/${dessert.RecipeId}` : "#"}
          className="flex items-center justify-center w-full gap-2 px-3 py-2 mx-auto text-sm font-medium text-green-600 transition border border-green-700 rounded-lg hover:text-white hover:bg-green-700 hover:border-green-800"
        >
          Find out more
        </Link>
      </div>
    </li>
  );
}

export default Results;
