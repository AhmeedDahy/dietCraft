import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecipes } from "../../context/RecipesContext";
import { CiSearch, CiCircleRemove } from "react-icons/ci";
import Result from "../DietRecommendation/Results";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function Recipes() {
  const { data = [], isLoading } = useRecipes();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromParams = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromParams);
  const [postsPerPage] = useState(12);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const valueFromParams = searchParams.get("value") || "";
  const [searchTerm, setSearchTerm] = useState(valueFromParams);
  const [searchBy, setSearchBy] = useState(
    searchParams.get("searchBy") || "recipe"
  );

  let filterData = data;
  if (searchBy === "recipe") {
    filterData = data?.filter((recipe) =>
      recipe.Name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else if (searchBy === "ingredient") {
    filterData = data?.filter((recipe) =>
      recipe.RecipeIngredientParts?.some((part) =>
        part.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  const currentPosts = filterData?.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    setSearchTerm(valueFromParams);
  }, [valueFromParams]);

  useEffect(() => {
    const newParams = { page: currentPage, value: searchTerm, searchBy };
    if (currentPage > 84) {
      newParams.page = 84;
      setCurrentPage(84);
    }
    setSearchParams(newParams);
  }, [currentPage, searchTerm, searchBy, setSearchParams]);

  const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
    setSearchParams({ page: 1, searchBy });
  };

  const toggleSearchBy = () => {
    const newSearchBy = searchBy === "recipe" ? "ingredient" : "recipe";
    setSearchBy(newSearchBy);
    setSearchParams({ searchBy: newSearchBy, value: searchTerm, page: 1 });
    setCurrentPage(1);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-4 px-4 mx-auto max-w-7xl">
      <h2 className="text-3xl font-bold text-center md:text-left">
        Featured Recipes
      </h2>
      <p className="text-sm text-center text-gray-600 md:text-left">
        Discover delicious and healthy recipes tailored to your needs.
      </p>

      {/* Search Bar & Button */}
      <div className="flex flex-col items-center w-full gap-3 md:flex-row md:gap-4">
        <div className="relative w-full md:w-3/4">
          <input
            type="text"
            placeholder="Search for recipes..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
              setSearchParams({ value: e.target.value, page: 1, searchBy });
            }}
            className={`w-full px-5 py-3 transition-all border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 ${searchBy === "ingredient" ? "ring-green-500" : "ring-blue-500"}`}
          />
          {searchTerm ? (
            <CiCircleRemove
              size={22}
              onClick={handleClearSearch}
              className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer top-1/2 right-4 hover:text-red-500"
            />
          ) : (
            <CiSearch
              size={22}
              className="absolute text-gray-500 transform -translate-y-1/2 top-1/2 right-4"
            />
          )}
        </div>
        <button
          type="button"
          onClick={toggleSearchBy}
          className={`px-5 py-3 font-semibold w-full md:w-1/4 rounded-lg transition-all shadow-md ${
            searchBy === "ingredient"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {searchBy === "ingredient"
            ? "Search by Recipe"
            : "Search by Ingredient"}
        </button>
      </div>

      {/* Recipes List */}
      {currentPosts.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((dessert) => (
            <Result key={dessert.RecipeId} dessert={dessert} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center py-10">
          <p className="text-gray-500">No recipes found.</p>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPosts={filterData ? filterData.length : 0}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Recipes;
