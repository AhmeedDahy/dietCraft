import supabase from "./supabase";

export async function addTarget(email, targetData) {
  try {
    // Check if the email exists in the guests table
    const { data: existingGuest, error: fetchError } = await supabase
      .from("Target")
      .select("email")
      .eq("email", email);

    if (fetchError) {
      throw new Error("Failed to fetch Target data: " + fetchError.message);
    }

    let result;

    if (existingGuest.length > 0) {
      // Check if the guest exists
      // Update existing guest
      const { data: updatedTarget, error: updateError } = await supabase
        .from("Target")
        .update(targetData)
        .eq("email", email)
        .select();

      if (updateError) {
        throw new Error("Failed to update data: " + updateError.message);
      }

      result = updatedTarget;
    } else {
      // Insert new guest
      const { data: newTarget, error: insertError } = await supabase
        .from("Target")
        .insert([{ ...targetData, email }])
        .select();

      if (insertError) {
        throw new Error("Failed to insert data: " + insertError.message);
      }

      result = newTarget;
    }

    return result;
  } catch (error) {
    console.error("Error in addTarget:", error.message);
    throw error;
  }
}

export async function getTargetData(email) {
  const { data, error } = await supabase
    .from("Target")
    .select("Bmi, Bmr")
    .eq("email", email);

  if (error) {
    console.error("Error fetching data:", error);
  }

  return data;
}
