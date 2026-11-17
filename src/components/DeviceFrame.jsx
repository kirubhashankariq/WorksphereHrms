import React, { useState } from 'react';
import { 
  Smartphone, 
  Monitor, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function DeviceFrame({ 
  children, 
  currentScreen, 
  setCurrentScreen, 
  isAuthenticated,
  onReset 
}) {
  const [viewMode, setViewMode] = useState('phone'); // 'phone' | 'fluid'
  const [zoomLevel, setZoomLevel] = useState(1);

  const screens = [
    { id: 'signin', label: '1. Sign In (Figma Node 2059-2830)' },
    { id: 'home', label: '2. Home Dashboard' },
    { id: 'attendance', label: '3. Attendance & Timesheet' },
    { id: 'tasks', label: '4. Tasks Board' },
    { id: 'employees', label: '5. Team & Employee ID Card' },
    { id: 'profile', label: '6. User Profile' },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-start min-h-0 w-full overflow-hidden">
      
      {/* Top Application Bar & Controls */}
      <div className="w-full bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-white z-40 backdrop-blur-md">
        
        {/* Left: App Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#6938EF] flex items-center justify-center font-bold text-white shadow-sm shadow-[#6938EF]/30">
              WM
            </div>
            <div>
              <div className="font-bold text-white text-xs tracking-tight flex items-center gap-1.5">
                <span>Workmate Mobile</span>
                <span className="px-1.5 py-0.2 bg-[#6938EF]/30 text-[#D9D6FE] text-[10px] font-mono rounded">
                  v1.0
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                UI HR Management & Task Management
              </div>
            </div>
          </div>
        </div>

        {/* Center: Quick Jump Screen Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px] hidden md:inline">Jump to Screen:</span>
          <select
            value={currentScreen}
            onChange={(e) => setCurrentScreen(e.target.value)}
            className="h-8 px-2.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-[#6938EF]"
          >
            {screens.map(s => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Right: View Controls */}
        <div className="flex items-center gap-2">
          {/* Phone Frame Toggle */}
          <div className="flex p-0.5 bg-slate-800 rounded-lg">
            <button
              onClick={() => setViewMode('phone')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-all ${
                viewMode === 'phone' ? 'bg-[#6938EF] text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile Device Mockup"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Phone Frame</span>
            </button>
            <button
              onClick={() => setViewMode('fluid')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-all ${
                viewMode === 'fluid' ? 'bg-[#6938EF] text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Responsive View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Responsive</span>
            </button>
          </div>

          {/* Reset App State */}
          <button
            onClick={onReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Reset to Node 2059-2830 Sign In"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Main Container Stage */}
      <div className="flex-1 w-full flex items-center justify-center p-3 sm:p-6 overflow-y-auto overflow-x-hidden relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        
        {viewMode === 'phone' ? (
          /* Phone Frame Mockup (iPhone 14 Pro style) */
          <div 
            className="relative transition-all duration-300 flex items-center justify-center my-auto"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Outer Hardware Shell */}
            <div className="w-[390px] h-[812px] bg-[#090A0F] rounded-[52px] p-3 shadow-2xl ring-1 ring-white/20 relative phone-shadow flex flex-col">
              
              {/* Left Side Buttons (Volume) */}
              <div className="absolute -left-[5px] top-28 w-[5px] h-12 bg-slate-700 rounded-l-md" />
              <div className="absolute -left-[5px] top-44 w-[5px] h-12 bg-slate-700 rounded-l-md" />
              
              {/* Right Side Button (Power) */}
              <div className="absolute -right-[5px] top-36 w-[5px] h-16 bg-slate-700 rounded-r-md" />

              {/* Inner Screen Bezel */}
              <div className="w-full h-full bg-[#FCFCFD] rounded-[42px] overflow-hidden flex flex-col relative shadow-inner">
                
                {/* Dynamic Island Pill */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-2.5 shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                  <div className="w-2 h-2 rounded-full bg-blue-950/60 ring-1 ring-blue-500/20" />
                </div>

                {/* Mobile App Viewport */}
                <div className="w-full h-full flex flex-col overflow-hidden relative">
                  {children}
                </div>

              </div>

            </div>
          </div>
        ) : (
          /* Responsive Fluid View */
          <div className="w-full max-w-md h-[812px] bg-[#FCFCFD] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-slate-700/50 relative my-auto">
            {children}
          </div>
        )}

      </div>

    </div>
  );
}
