/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, createContext } from "react";

const IngredientsContext = createContext();

function IngredientsProvider({ children }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [prevSearch, setPrevSearch] = useState("");

  useEffect(() => {
    if (searchItem === prevSearch) return;
    setPrevSearch(searchItem);

    if (!searchItem.trim() || searchItem.trim().length < 3) {
      if (isLoading) setIsLoading(false);
      setData(null);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    async function fetchIngredients() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=7OzdgD1h7fyklruZGsBB77TgSAEIb9KugGQizT4e&query=${searchItem}&dataType=Foundation,Branded`,
          { signal }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setData(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching ingredients: ", error);
          setData(null);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchIngredients();
    return () => controller.abort();
  }, [searchItem]);

  return (
    <IngredientsContext.Provider
      value={{ data, isLoading, searchItem, setSearchItem }}
    >
      {children}
    </IngredientsContext.Provider>
  );
}

function useIngredients() {
  return useContext(IngredientsContext);
}

export { IngredientsProvider, useIngredients };
