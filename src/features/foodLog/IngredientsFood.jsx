/* eslint-disable react/prop-types */
import { CiCircleRemove, CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { useIngredients } from "../../context/IngredientsContext";
import IngredientsList from "./IngredientsList";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import SelectedIngredient from "./SelectedIngredient";
import Modal from "../../ui/Modal";

function IngredientsFood({ setOverlay }) {
  const { data, isLoading, setSearchItem, searchItem } = useIngredients();
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  return (
    <Modal isOpen={true} onClose={() => setOverlay((e) => !e)}>
      {/* Modal Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ingredients</h1>
        <button
          type="button"
          onClick={() => setOverlay((e) => !e)}
          className="text-black hover:text-[#FB0101] transition"
        >
          <IoIosClose size={40} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          placeholder="Search..."
          className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-green-500"
          name="search"
          type="text"
          autoComplete="off"
          value={searchItem || ""}
          onChange={(e) => {
            setSearchItem(e.target.value);
            setSelectedIngredient(null);
          }}
        />
        {searchItem ? (
          <CiCircleRemove
            size={22}
            onClick={() => setSearchItem("")}
            className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer top-1/2 right-4 hover:text-red-500"
          />
        ) : (
          <CiSearch
            size={22}
            className="absolute text-gray-500 transform -translate-y-1/2 top-1/2 right-4"
          />
        )}
      </div>

      {/* Scrollable Container */}
      <div className="max-h-[400px] overflow-y-auto scrollbar-hide relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Spinner />
          </div>
        ) : !data || data.foods.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            <CiSearch size={40} className="mb-2" />
            <p>No results found</p>
          </div>
        ) : selectedIngredient ? (
          // Show Selected Ingredient Details
          <SelectedIngredient
            selectedIngredient={selectedIngredient}
            setSelectedIngredient={setSelectedIngredient}
          />
        ) : (
          // Show Ingredients List
          data?.foods?.map((item, index) => (
            <IngredientsList
              key={index}
              item={item}
              setSelectedIngredient={setSelectedIngredient}
            />
          ))
        )}
        {/* Gradient Fade Effect */}
        <div className="sticky bottom-0 h-8 pointer-events-none bg-gradient-to-t from-white to-transparent"></div>
      </div>
    </Modal>
  );
}

export default IngredientsFood;
