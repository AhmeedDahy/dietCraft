import supabase from "./supabase";

export async function addMeal(progressData) {
  const { data, error } = await supabase
    .from("mealsNutritions")
    .insert([progressData]);

  if (error) {
    throw new Error("Failed to insert data: " + error.message);
  }
  return data;
}

export async function getMeals(email) {
  let { data: MealsNutritions, error } = await supabase
    .from("mealsNutritions")
    .select("*")
    .eq("email", email);

  if (error) {
    throw new Error("Failed to get data: " + error.message);
  }
  return MealsNutritions;
}
export async function deleteMeal(id) {
  const { error } = await supabase
    .from("mealsNutritions")
    .delete()
    .eq("mealId", id);
  if (error) {
    throw new Error("Failed to delete data: " + error.message);
  }
}
