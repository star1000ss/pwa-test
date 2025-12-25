import React from 'react';
import { User } from 'lucide-react';

const Header = ({ session }) => {
  // 假設從 session 中獲取 email，並截取前面的代碼作為顯示
  const userDisplayName = session?.user?.email?.split('@')[0] || "學員";

  return (
    <header className="flex-none h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 flex items-center justify-between shadow-sm z-10">
      {/* 左側：系統名稱 */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-blue-200 shadow-lg">
          <span className="text-white font-bold text-xs">營</span>
        </div>
        <h1 className="text-lg font-bold text-slate-800 tracking-tight">
          Camp <span className="text-blue-600">Pro</span>
        </h1>
      </div>

      {/* 右側：使用者資訊與狀態燈 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-md
         border border-slate-200">
          {/* 狀態燈號 */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          
          <div className="flex items-center gap-1">
            <User size={14} className="text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">{userDisplayName}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;