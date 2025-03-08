/* eslint-disable react/prop-types */
import { useContext, useState, createContext } from "react";
import toast from "react-hot-toast";

const targetContext = createContext();

function TargetProvider({ children }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getNutritions(data) {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://dietcraftbackend.vercel.app/diet_recommendation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch nutrations");
      }

      const nutrations = await res.json();
      setData(nutrations);
      return nutrations;
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
      toast.success("Nutritions updated successfully");
    }
  }
  return (
    <targetContext.Provider value={{ data, isLoading, getNutritions }}>
      {children}
    </targetContext.Provider>
  );
}

function useTarget() {
  const context = useContext(targetContext);
  if (!context) {
    throw new Error(
      "useTarget must be used within a TargetProvider. Wrap your component with TargetProvider."
    );
  }
  return context;
}

export { TargetProvider, useTarget };
