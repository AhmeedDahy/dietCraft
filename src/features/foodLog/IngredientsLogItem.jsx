/* eslint-disable react/prop-types */
import useDeleteIngredients from "./useDeleteIngredients";
import NutritionLogItem from "../../ui/NutritionLogItem";

function IngredientsLogItem({ progress }) {
  const { deleteIngredients, isPending: isDeleting } = useDeleteIngredients();
  return (
    <NutritionLogItem
      id={progress.IngredientsId}
      name={
        progress.mealName.charAt(0) + progress.mealName.slice(1).toLowerCase()
      }
      mealType={progress.mealType}
      calories={progress.calories}
      carbs={progress.carb}
      protein={progress.protein}
      fat={progress.fat}
      sugar={progress.sugar}
      sodium={progress.sodium}
      cholesterol={progress.cholesterol}
      fiber={progress.fiber}
      onDelete={deleteIngredients}
      isDeleting={isDeleting}
      showDetailsButton={true}
    />
  );
}

export default IngredientsLogItem;
