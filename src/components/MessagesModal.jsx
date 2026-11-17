import React, { useState } from 'react';
import { X, MessageSquare, Send, CheckCheck } from 'lucide-react';
import { EMPLOYEES_LIST } from '../data/mockData';

export default function MessagesModal({ onClose }) {
  const [selectedUser, setSelectedUser] = useState(EMPLOYEES_LIST[1]); // Sarah Jenkins
  const [messages, setMessages] = useState([
    { sender: "Sarah Jenkins", text: "Hey Tonald, have you checked the new design system tokens for the Task board?", time: "09:12 AM" },
    { sender: "Tonald Drump", text: "Yes Sarah! Just updated the Workmate purple palette (#6938EF) and the progress bars.", time: "09:15 AM" },
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setMessages([
      ...messages,
      { sender: "Tonald Drump", text: inputVal, time: "Just now" }
    ]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-[#EBECEE] flex flex-col h-[520px]">
        
        {/* Header */}
        <div className="p-3 px-4 border-b border-[#EBECEE] flex items-center justify-between bg-[#FCFCFD]">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#EBE9FE]"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#19B36E] ring-1 ring-white" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#252D3C]">{selectedUser.name}</h3>
              <p className="text-[10px] text-[#17A364] font-medium">Online • {selectedUser.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-[#5D6676] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-3 text-xs bg-[#FCFCFD]">
          {messages.map((m, idx) => {
            const isMe = m.sender === "Tonald Drump";
            return (
              <div
                key={idx}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                    isMe
                      ? 'bg-[#6938EF] text-white rounded-br-xs shadow-xs'
                      : 'bg-white border border-[#EBECEE] text-[#252D3C] rounded-bl-xs shadow-xs'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-[#777F8C]">
                  <span>{m.time}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-[#6938EF]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#EBECEE] flex gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 h-10 px-3 bg-[#F4F3FF] border border-[#D9D6FE] rounded-xl text-xs text-[#252D3C] focus:outline-none focus:border-[#6938EF]"
          />
          <button
            type="submit"
            className="w-10 h-10 bg-[#6938EF] hover:bg-[#5925DC] text-white rounded-xl flex items-center justify-center shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
