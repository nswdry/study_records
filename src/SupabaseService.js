import { createClient } from '@supabase/supabase-js';

// Supabaseに接続
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Supabaseからデータを取得する
export const  getStudyRecords = async () => {
    const { data, error } = await supabase
      .from("study-record")
      .select("title, time");

    if (error) {
      console.error("Error fetching records:", error);
      return null; 
    }
  return data; 
};

// Supabaseにデータを追加する
export const insertStudyRecord = async (record) => {
  const { data, error } = await supabase.from("study-record").insert([record]);

  if (error) {
    console.error("Error inserting record:", error);
    return null;
  }
  return data;
};
