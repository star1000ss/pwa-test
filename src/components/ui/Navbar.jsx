import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Trophy, Gamepad2, Settings, ListTodo } from "lucide-react";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // 定義按鈕配置
  const tabs = [
    { id: "/manual", label: "手冊", icon: Trophy },
    { id: "/leaderboard", label: "排行", icon: ListTodo },
    { id: "/home", label: "首頁", icon: Home, isMain: true },
    { id: "/games", label: "營隊遊戲", icon: Gamepad2 },
    { id: "/settings", label: "設定", icon: Settings },
  ];

  return (
    <nav className="flex-none bg-white border-t border-slate-200 pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-10">
      <div className="flex justify-around items-end h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          // 判斷網址是否包含該路徑，例如 /games/rank 也能讓 /games 按鈕亮起
          const isActive = location.pathname.startsWith(tab.id);

          if (tab.isMain) {
            return (
              <div key={tab.id} className="relative flex flex-col items-center mb-2">
                <button
                  onClick={() => navigate(tab.id)}
                  className={`
                    absolute -top-12 w-16 h-16 rounded-full flex items-center justify-center
                    shadow-xl transition-all duration-300 transform active:scale-90
                    ${isActive ? "bg-blue-600 text-white" : "bg-slate-700 text-white"}
                  `}
                >
                  <Icon size={32} />
                </button>
                <span className={`text-[10px] mt-6 font-medium ${isActive ? "text-blue-600" : "text-slate-500"}`}>
                  {tab.label}
                </span>
              </div>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id)}
              className="flex flex-col items-center justify-center w-full py-2 transition-all active:opacity-60"
            >
              <Icon size={24} className={isActive ? "text-blue-600" : "text-slate-400"} />
              <span className={`text-[10px] mt-1 font-medium ${isActive ? "text-blue-600" : "text-slate-500"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;



