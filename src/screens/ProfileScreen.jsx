import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Bell, 
  Lock, 
  LogOut, 
  ChevronRight, 
  BadgeCheck,
  Star,
  CheckCircle2,
  CalendarCheck,
  Smartphone
} from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

export default function ProfileScreen({ user = CURRENT_USER, onSignOut }) {
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="w-full flex-1 flex flex-col px-5 py-4 bg-[#FCFCFD] text-[#252D3C] overflow-y-auto no-scrollbar pb-6">
      
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold tracking-tight text-[#252D3C]">
          Employee Profile
        </h1>
        <p className="text-xs text-[#5D6676]">
          Personal info & account credentials
        </p>
      </div>

      {/* User Card */}
      <div className="p-4 bg-white border border-[#EBECEE] rounded-2xl shadow-xs mb-4 text-center">
        <div className="relative inline-block mb-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-[#EBE9FE] shadow-sm"
          />
          <div className="absolute bottom-0 right-0 p-1 bg-[#3B82F6] rounded-full text-white ring-2 ring-white">
            <BadgeCheck className="w-4 h-4" />
          </div>
        </div>

        <h2 className="text-base font-bold text-[#252D3C]">{user.name}</h2>
        <p className="text-xs text-[#5D6676] mt-0.5">{user.role}</p>
        
        <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full bg-[#EBE9FE] text-[#6938EF] text-[11px] font-semibold">
          <span>Employee ID #{user.id}</span>
        </div>
      </div>

      {/* Performance Stats Cards */}
      <div className="grid grid-cols-3 gap-2.5 mb-5 text-center">
        <div className="p-3 bg-white border border-[#EBECEE] rounded-2xl shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-[#6938EF] mx-auto mb-1" />
          <div className="text-base font-bold text-[#252D3C]">{user.tasksCompleted}</div>
          <div className="text-[10px] text-[#777F8C]">Completed</div>
        </div>

        <div className="p-3 bg-white border border-[#EBECEE] rounded-2xl shadow-xs">
          <CalendarCheck className="w-4 h-4 text-[#17A364] mx-auto mb-1" />
          <div className="text-base font-bold text-[#252D3C]">{user.attendanceRate}</div>
          <div className="text-[10px] text-[#777F8C]">Attendance</div>
        </div>

        <div className="p-3 bg-white border border-[#EBECEE] rounded-2xl shadow-xs">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500 mx-auto mb-1" />
          <div className="text-base font-bold text-[#252D3C]">{user.rating}</div>
          <div className="text-[10px] text-[#777F8C]">Rating</div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="p-4 bg-white border border-[#EBECEE] rounded-2xl shadow-xs mb-4 space-y-3 text-xs">
        <div className="font-bold text-[#252D3C] text-xs">Contact & Department</div>
        
        <div className="flex items-center gap-3 text-[#5D6676]">
          <Mail className="w-4 h-4 text-[#777F8C]" />
          <span>{user.email}</span>
        </div>

        <div className="flex items-center gap-3 text-[#5D6676]">
          <Phone className="w-4 h-4 text-[#777F8C]" />
          <span>{user.phone}</span>
        </div>

        <div className="flex items-center gap-3 text-[#5D6676]">
          <MapPin className="w-4 h-4 text-[#777F8C]" />
          <span>{user.department} • HQ Tower 2</span>
        </div>
      </div>

      {/* Security & System Settings */}
      <div className="p-4 bg-white border border-[#EBECEE] rounded-2xl shadow-xs mb-5 space-y-3.5 text-xs">
        <div className="font-bold text-[#252D3C] text-xs">Security & Preferences</div>

        {/* Biometrics Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-4 h-4 text-[#6938EF]" />
            <div>
              <div className="font-semibold text-[#252D3C]">Biometric Face ID</div>
              <div className="text-[10px] text-[#777F8C]">Fast sign-in for Node 2059-2830</div>
            </div>
          </div>
          <button
            onClick={() => setBiometricsEnabled(!biometricsEnabled)}
            className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
              biometricsEnabled ? 'bg-[#6938EF]' : 'bg-[#EBECEE]'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              biometricsEnabled ? 'translate-x-4' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-[#6938EF]" />
            <div>
              <div className="font-semibold text-[#252D3C]">Push Notifications</div>
              <div className="text-[10px] text-[#777F8C]">Meeting & task reminders</div>
            </div>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
              notificationsEnabled ? 'bg-[#6938EF]' : 'bg-[#EBECEE]'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              notificationsEnabled ? 'translate-x-4' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      {/* Sign Out Button (Returns to Node 2059-2830 Sign In) */}
      <button
        onClick={onSignOut}
        className="w-full h-12 bg-[#FEEEEE] hover:bg-[#FDCACA] text-[#E34D4D] rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out (Back to Figma SignIn Node)</span>
      </button>

    </div>
  );
}
