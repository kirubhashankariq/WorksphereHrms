import React, { useState } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Users, 
  MessageSquare, 
  Share2, 
  Sparkles,
  Maximize2
} from 'lucide-react';

export default function MeetingModal({ meeting, onClose }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeTab, setActiveTab] = useState('grid'); // 'grid' | 'chat'
  const [chatMessages, setChatMessages] = useState([
    { sender: "Sarah Jenkins", text: "Ready to review the sprint deliverables!", time: "01:31 AM" },
    { sender: "Alex Rivera", text: "WebSocket payload schema is ready on staging.", time: "01:32 AM" },
  ]);
  const [chatInput, setChatInput] = useState('');

  if (!meeting) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([
      ...chatMessages,
      { sender: "Tonald Drump", text: chatInput, time: "Just now" }
    ]);
    setChatInput('');
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3">
      <div className="bg-[#18181B] text-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col h-[600px] border border-white/10">
        
        {/* Meeting Top Bar */}
        <div className="px-5 py-3.5 bg-black/40 flex items-center justify-between border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#19B36E] animate-pulse" />
              <h3 className="text-xs font-bold tracking-tight text-white">{meeting.title}</h3>
            </div>
            <p className="text-[10px] text-white/60">{meeting.time} • Secure Encrypted</p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-full text-[11px]">
            <Users className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-semibold">{meeting.attendees.length + (meeting.extraAttendeesCount || 0)}</span>
          </div>
        </div>

        {/* Video Stage / Participants Grid */}
        <div className="flex-1 p-3 grid grid-cols-2 gap-2 overflow-y-auto no-scrollbar relative">
          
          {/* Main User (Tonald Drump) Video Feed */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-800 border border-white/10 flex items-center justify-center min-h-[160px]">
            {isVideoOff ? (
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#6938EF] flex items-center justify-center font-bold text-lg">
                  TD
                </div>
                <span className="text-[10px] text-white/60 mt-1">Camera Off</span>
              </div>
            ) : (
              <div className="w-full h-full relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                  alt="Tonald Drump"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            )}
            
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-medium flex items-center gap-1">
              <span>You (Tonald)</span>
              {isMuted && <MicOff className="w-3 h-3 text-[#E34D4D]" />}
            </div>
          </div>

          {/* Remote Attendee 1 */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-800 border border-white/10 flex items-center justify-center min-h-[160px]">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80"
              alt="Sarah Jenkins"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-medium">
              Sarah Jenkins
            </div>
          </div>

          {/* Remote Attendee 2 */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-800 border border-white/10 flex items-center justify-center min-h-[160px]">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
              alt="Alex Rivera"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-medium">
              Alex Rivera
            </div>
          </div>

          {/* Remote Attendee 3 */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-800 border border-white/10 flex items-center justify-center min-h-[160px]">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80"
              alt="Mia Chen"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-medium">
              Mia Chen
            </div>
          </div>

        </div>

        {/* Meeting Controls Bar */}
        <div className="p-4 bg-black/50 border-t border-white/10 flex items-center justify-around">
          {/* Mute Mic */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isMuted ? 'bg-[#E34D4D] text-white' : 'bg-white/15 text-white hover:bg-white/25'
            }`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Video Toggle */}
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isVideoOff ? 'bg-[#E34D4D] text-white' : 'bg-white/15 text-white hover:bg-white/25'
            }`}
            title={isVideoOff ? "Turn On Camera" : "Turn Off Camera"}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          {/* End Call Button */}
          <button
            onClick={onClose}
            className="w-14 h-11 rounded-full bg-[#E34D4D] hover:bg-[#c93d3d] text-white flex items-center justify-center shadow-lg shadow-[#E34D4D]/30 transition-all cursor-pointer"
            title="Leave Meeting"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
