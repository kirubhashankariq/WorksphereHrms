import React from 'react';
import { Home, CalendarCheck, CheckSquare, Users, User } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, taskCount = 1 }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: taskCount },
    { id: 'employees', label: 'Team', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="w-full bg-[#18181B] text-white pt-2.5 pb-5 px-4 rounded-t-3xl shadow-2xl relative select-none z-30">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 group ${
                isActive ? 'text-white' : 'text-[#777F8C] hover:text-[#C0C4CA]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-white' : 'group-hover:scale-105'
                  }`}
                  strokeWidth={isActive ? 2.3 : 1.8}
                />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-[#6938EF] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center ring-2 ring-[#18181B]">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium tracking-tight ${
                isActive ? 'text-white font-semibold' : 'text-[#777F8C]'
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1.5 h-1.5 bg-[#6938EF] rounded-full mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
      {/* iOS Home Bar Indicator */}
      <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-2.5" />
    </div>
  );
}
