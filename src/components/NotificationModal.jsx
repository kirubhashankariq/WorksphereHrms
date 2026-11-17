import React from 'react';
import { X, Bell, Check, Video, CheckSquare, CalendarCheck, Sparkles } from 'lucide-react';
import { NOTIFICATIONS } from '../data/mockData';

export default function NotificationModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-[#EBECEE] flex flex-col max-h-[500px]">
        
        {/* Header */}
        <div className="p-4 px-5 border-b border-[#EBECEE] flex items-center justify-between bg-[#FCFCFD]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#EBE9FE] text-[#6938EF] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#252D3C]">Activity Notifications</h3>
              <p className="text-[10px] text-[#5D6676]">2 unread alerts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-[#5D6676] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-2.5 text-xs">
          {NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-2xl border transition-all ${
                n.unread 
                  ? 'bg-[#F4F3FF]/70 border-[#D9D6FE]' 
                  : 'bg-white border-[#EBECEE]'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white shadow-xs border border-[#EBECEE] flex items-center justify-center shrink-0">
                  {n.type === 'meeting' && <Video className="w-4 h-4 text-[#6938EF]" />}
                  {n.type === 'task' && <CheckSquare className="w-4 h-4 text-[#19B36E]" />}
                  {n.type === 'attendance' && <CalendarCheck className="w-4 h-4 text-amber-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-[#252D3C] text-xs">{n.title}</h4>
                    <span className="text-[10px] text-[#777F8C]">{n.time}</span>
                  </div>
                  <p className="text-[#5D6676] mt-0.5 text-[11px] leading-snug">{n.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#FCFCFD] border-t border-[#EBECEE] text-center">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#6938EF] hover:underline cursor-pointer"
          >
            Mark All as Read
          </button>
        </div>

      </div>
    </div>
  );
}
