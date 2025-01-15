import { supabase } from "./supabase.js";

// getAllRecords関数の実行
export const getAllRecords = async () => {
  const records = await supabase.from("study-record").select("*");
  return records.data;
};

//allTodo関数の実行
export const addTodo = async (title, time) => {
  await supabase.from("study-record").insert({ title: title, time: time });
};

// deleteTodo関数の実行
export const deleteTodo = async (id) => {
  (await supabase.from("study-record").delete().eq("id", id));
}