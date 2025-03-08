import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://bjdudmwyelzvscaafaok.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZHVkbXd5ZWx6dnNjYWFmYW9rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzE1NDk3NSwiZXhwIjoyMDQ4NzMwOTc1fQ.9iXG8eP-KEAo_-tNF_ysjW_DuahqdhKd_1_X8IU0RNE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
