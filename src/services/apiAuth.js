import { data } from "react-router-dom";
import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

// eslint-disable-next-line no-unused-vars
export async function signUp({ email, password, firstName, lastName, avatar }) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { firstName, lastName, avatar: "" } }
  });
  if (error) {
    console.error("Sign up failed:", error.message);
    return { error: error.message };
  }

  return { data, error: null };
}
export async function updateUser({ firstName, lastName, password, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (firstName && lastName) updateData = { data: { firstName, lastName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (!avatar) return data;
  if (error) {
    throw new Error(error.message);
  }
  // imageName
  const imageName = `avatar-${Date.now()}-${Math.random()}.jpg`;
  // Upload the Avatar Image
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(imageName, avatar);
  if (storageError) {
    throw new Error(storageError.message);
  }

  // update in the user
  const { data: updatedUser, error: updateUserError } =
    await supabase.auth.updateUser({ data: { avatar: imagePath } });
  if (updateUserError) {
    throw new Error(updateUserError.message);
  }
  return updatedUser;
}
export async function signOut() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
