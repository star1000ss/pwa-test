import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabase";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Header from "./components/ui/Header";
import Navbar from "./components/ui/Navbar";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // 監聽登入狀態
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);



  return (

    <BrowserRouter>
      <div className="flex flex-col h-[100dvh] bg-slate-50 font-sans overflow-hidden">
        {!session ? (
          /* 登入前的路由 */
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : (
          /* 登入後的路由 */
          <>
            <Header session={session} />
            <main className="flex-1 overflow-y-auto px-4 py-2">
              <Routes>
                <Route path="/home" element={<Dashboard session={session} />} />
                <Route path="/leaderboard" element={<div className="p-8">隊伍排行榜</div>} />
                <Route path="/games/*" element={<div className="p-8">營隊遊戲模組 (支援子路由)</div>} />
                <Route path="/manual" element={<div className="p-8">營隊手冊</div>} />
                <Route path="/settings" element={
                  <div className="p-8 text-center">
                    <h2 className="mb-4">系統設定</h2>
                    <button onClick={() => supabase.auth.signOut()} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                      登出帳號
                    </button>
                  </div>
                } />
                {/* 預設首頁 */}
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            </main>
            <Navbar />
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
