import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export default function StatusBar({ theme = 'light' }) {
  const [time, setTime] = useState('08:15');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as 08:15 or current time
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const textColor = theme === 'dark' ? 'text-white' : 'text-[#252D3C]';

  return (
    <div className={`w-full px-7 pt-3.5 pb-2 flex justify-between items-center text-xs font-semibold tracking-tight select-none z-30 ${textColor}`}>
      <span className="font-semibold text-xs tracking-tighter pl-1">{time}</span>
      <div className="flex items-center space-x-1.5 pr-1">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5">
          <BatteryMedium className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
