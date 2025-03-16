import supabase from "./supabase";

export async function addMeal(progressData) {
  const { data, error } = await supabase
    .from("MealsNutritions")
    .insert([progressData]);

  if (error) {
    throw new Error("Failed to insert data: " + error.message);
  }
  return data;
}

export async function getProgress(email) {
  let { data: MealsNutritions, error } = await supabase
    .from("MealsNutritions")
    .select("*")
    .eq("email", email);

  if (error) {
    throw new Error("Failed to get data: " + error.message);
  }
  return MealsNutritions;
}
export async function deleteMeal(id) {
  const { error } = await supabase
    .from("MealsNutritions")
    .delete()
    .eq("IngredientsId", id);
  if (error) {
    throw new Error("Failed to delete data: " + error.message);
  }
}
