/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, createContext } from "react";
import axios from "axios";

const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // https://dietcraftbackend.vercel.app/food-data
  const getData = () => {
    setIsLoading(true);
    axios
      .get("https://dietcraftbackend.vercel.app/food-data")
      .then((res) => {
        setData(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // Function to get a recipe by ID
  const getRecipeById = (id) => {
    return data?.find((recipe) => recipe?.RecipeId === Number(id) || null);
  };

  return (
    <RecipesContext.Provider value={{ data, getRecipeById, isLoading }}>
      {children}
    </RecipesContext.Provider>
  );
}

function useRecipes() {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error(
      "useRecipes must be used within a RecipesProvider. Wrap your component with RecipesProvider."
    );
  }
  return context;
}

export { RecipesProvider, useRecipes };
