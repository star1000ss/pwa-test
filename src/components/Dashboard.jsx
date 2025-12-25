import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Award, Zap, Users, Star } from "lucide-react";

function Dashboard({ session }) {
  // const [userName, setUserName] = useState("讀取中...");
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    fullName: "載入中...",
    personalScore: 0,
    teamName: "分配中...",
    teamScore: 0,
    teamIcon: "🚩"
  });

  useEffect(() => {
    async function getDashboardData() {
      try {
        setLoading(true);
        // 從 profiles 表中抓取目前登入使用者的姓名
        const { data: profileData, error } = await supabase
          .from("user_profiles")
          .select(`
            full_name,
            score,
            teams (
              team_name,
              score,
              team_icon
            )
          `)
          .eq("id", session.user.id)
          .single();

        if (error) throw error;
        if (profileData) {
          setData({
            fullName: profileData.full_name,
            personalScore: profileData.score || 0,
            teamName: profileData.teams?.team_name || "尚未入隊",
            teamScore: profileData.teams?.score || 0,
            teamIcon: profileData.teams?.team_icon || "🚩"
          });
        }
      } catch (error) {
        console.error("資料讀取失敗:", error.message);
      } finally {
        setLoading(false);
      }
    }

    getDashboardData();
  }, [session]);

  const handleLogout = () => supabase.auth.signOut();

  return (
    <div className=" space-y-6">
      {/* 1. 學員個人卡片 */}
      <div className="relative overflow-hidden bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100 border border-slate-100 p-8">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
        
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-200">
            {data.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-800">{data.fullName}</h1>
              <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">Online</span>
            </div>
            <p className="text-slate-400 text-sm font-medium flex items-center gap-1">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              個人貢獻：{data.personalScore} pts
            </p>
          </div>
        </div>

        {/* 2. 小隊資訊區塊 (重點顯示) */}
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl">{data.teamIcon}</div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">所屬小隊</p>
                <p className="font-black text-slate-700">{data.teamName}</p>
              </div>
            </div>
            <Users className="text-slate-200" size={24} />
          </div>

          <div className="h-[1px] bg-slate-200 w-full mb-4"></div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-blue-500 uppercase">小隊目前總分</p>
              <p className="text-4xl font-black text-blue-600 tracking-tighter">
                {data.teamScore.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-100">
              <Zap size={20} fill="currentColor" />
            </div>
          </div>
        </div>

        {/* 底部裝飾條 */}
        <div className="mt-6 flex justify-center opacity-20">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. 小提醒元件 */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-5 text-white shadow-xl flex items-center gap-4">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
          <Award className="text-amber-400" size={24} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase">小隊精神</p>
          <p className="text-sm font-medium leading-tight">榮譽在於過程，{data.teamName} 衝刺吧！</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
