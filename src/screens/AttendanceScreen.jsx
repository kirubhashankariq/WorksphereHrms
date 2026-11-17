import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  AlertCircle, 
  TrendingUp, 
  Timer,
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { ATTENDANCE_HISTORY } from '../data/mockData';

export default function AttendanceScreen({ onClockToggle }) {
  const [isClockedIn, setIsClockedIn] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(7 * 3600 + 45 * 60 + 20); // 7h 45m 20s
  const [history, setHistory] = useState(ATTENDANCE_HISTORY);

  useEffect(() => {
    let interval = null;
    if (isClockedIn) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClockedIn]);

  const formatHours = (totalSec) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
  };

  const handleToggleClock = () => {
    if (isClockedIn) {
      // Clocking out
      setIsClockedIn(false);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setHistory((prev) => [
        { ...prev[0], checkOut: timeStr, workHours: formatHours(elapsedSeconds) },
        ...prev.slice(1),
      ]);
    } else {
      // Clocking in
      setIsClockedIn(true);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setHistory((prev) => [
        { date: "Today, 27 Apr", checkIn: timeStr, checkOut: "--:--", status: "On Time", workHours: "In progress" },
        ...prev,
      ]);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col px-5 py-4 bg-[#FCFCFD] text-[#252D3C] overflow-y-auto no-scrollbar pb-6">
      
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold tracking-tight text-[#252D3C]">
          Attendance & Timesheet
        </h1>
        <p className="text-xs text-[#5D6676]">
          Real-time check-in and geofence tracking
        </p>
      </div>

      {/* Geofence verification card */}
      <div className="p-3 bg-white border border-[#EBECEE] rounded-2xl flex items-center justify-between shadow-xs mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E8F7F1] text-[#17A364] flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#252D3C]">Workmate HQ Tower 2</span>
              <span className="px-1.5 py-0.2 bg-[#E8F7F1] text-[#17A364] text-[10px] font-bold rounded">
                Verified GPS
              </span>
            </div>
            <p className="text-[11px] text-[#5D6676] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#17A364]" />
              <span>Floor 8 • Wi-Fi Beacon: Workmate_Secure_5G</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Clock Card with Interactive Pulse Button */}
      <div className="p-5 bg-white border border-[#EBECEE] rounded-2xl shadow-xs text-center relative overflow-hidden mb-5">
        <div className="text-xs font-medium text-[#777F8C] uppercase tracking-wider mb-1">
          Working Hours Today
        </div>
        
        <div className="text-3xl font-extrabold tracking-tight text-[#252D3C] font-mono mb-4">
          {formatHours(elapsedSeconds)}
        </div>

        {/* Circular Clock Button */}
        <div className="relative inline-flex items-center justify-center mb-4">
          {/* Pulse ring when clocked in */}
          {isClockedIn && (
            <div className="absolute w-36 h-36 rounded-full bg-[#6938EF]/15 animate-ping pointer-events-none" />
          )}
          
          <button
            onClick={handleToggleClock}
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-white shadow-xl transition-all duration-300 transform active:scale-95 cursor-pointer ${
              isClockedIn
                ? 'bg-gradient-to-tr from-[#6938EF] to-[#7A5AF8] shadow-[#6938EF]/30 hover:brightness-105'
                : 'bg-gradient-to-tr from-[#344054] to-[#5D6676] shadow-slate-400/20'
            }`}
          >
            <Clock className="w-8 h-8 mb-1" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {isClockedIn ? 'Clock Out' : 'Clock In'}
            </span>
            <span className="text-[10px] text-white/80 font-normal">
              {isClockedIn ? 'Tap to finish' : 'Tap to start'}
            </span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs pt-2 border-t border-[#F2F4F7]">
          <div>
            <span className="text-[#777F8C]">Check In: </span>
            <span className="font-bold text-[#252D3C]">08:15 AM</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-[#C0C4CA]" />
          <div>
            <span className="text-[#777F8C]">Status: </span>
            <span className="font-bold text-[#17A364]">On Time</span>
          </div>
        </div>
      </div>

      {/* Quick Weekly Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-3.5 bg-white border border-[#EBECEE] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#5D6676] mb-1">
            <span>Presence Rate</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#17A364]" />
          </div>
          <div className="text-xl font-bold text-[#252D3C]">98.5%</div>
          <p className="text-[10px] text-[#17A364] font-medium mt-0.5">+2.1% from last month</p>
        </div>

        <div className="p-3.5 bg-white border border-[#EBECEE] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#5D6676] mb-1">
            <span>Avg Work / Day</span>
            <Timer className="w-3.5 h-3.5 text-[#6938EF]" />
          </div>
          <div className="text-xl font-bold text-[#252D3C]">8h 42m</div>
          <p className="text-[10px] text-[#5D6676] font-medium mt-0.5">Compliant with policy</p>
        </div>
      </div>

      {/* History Log Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#252D3C]">Recent Activity</h3>
          <span className="text-xs font-semibold text-[#6938EF] hover:underline cursor-pointer">
            Export Report
          </span>
        </div>

        <div className="space-y-2.5">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-white border border-[#EBECEE] rounded-xl flex items-center justify-between text-xs hover:border-[#6938EF]/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F4F3FF] text-[#6938EF] flex items-center justify-center font-bold text-[11px]">
                  {item.date.split(' ')[0]}
                </div>
                <div>
                  <div className="font-bold text-[#252D3C]">{item.date}</div>
                  <div className="text-[11px] text-[#5D6676] mt-0.5">
                    {item.checkIn} - {item.checkOut}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  item.status.includes('Late') 
                    ? 'bg-[#FEEEEE] text-[#E34D4D]' 
                    : 'bg-[#E8F7F1] text-[#17A364]'
                }`}>
                  {item.status}
                </span>
                <div className="text-[10px] text-[#777F8C] mt-1 font-mono">
                  {item.workHours}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
