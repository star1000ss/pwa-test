import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 防呆檢查：如果沒讀到網址，在控制台噴出明顯提示
if (!supabaseUrl || !supabaseKey) {
    console.error("錯誤：找不到 Supabase 連線資訊，請檢查 .env 檔案或 GitHub Secrets 設定。");
}

export const supabase = createClient(supabaseUrl, supabaseKey);