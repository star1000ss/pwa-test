import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from "react-router-dom"; 
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const SUFFIX = "@camp.com"; // 預設帳號後綴

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email: studentId + SUFFIX,
      password: password,
    });

    if (error) {
      alert("登入失敗：請檢查學員代碼或密碼是否正確");
    }else{
      navigate("/home");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm">
        {/* 標題區 */}
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-5.09 3.397-9.52 7.397-12.364" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">營隊管理系統</h1>
          <p className="text-slate-400 mt-2">請輸入您的學員代碼以開始</p>
        </div>

        {/* 登入表單 */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">學員代碼</label>
            <input 
              type="text" 
              placeholder="例如：A01" 
              className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-slate-800 placeholder:text-slate-300 shadow-sm"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">密碼</label>
            <input 
              type="password" 
              placeholder="預設為營隊密碼" 
              className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-slate-800 placeholder:text-slate-300 shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-xl shadow-blue-200 transition-all active:scale-95 mt-4
              ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? '登入中...' : '立即登入'}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-slate-500">
            還沒有帳號嗎？{" "}
            <Link to="/register" className="text-blue-600 font-bold hover:underline">
              立即註冊
            </Link>
          </p>
          
          <p className="text-slate-400 text-xs">
            忘記代碼？請洽詢值星官或隊輔人員
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;