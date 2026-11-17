import React, { useState } from 'react';
import { 
  BadgeCheck, 
  MessageSquare, 
  Bell, 
  Video, 
  Clock, 
  Zap, 
  Calendar, 
  MessageCircle, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Flag
} from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

export default function HomeScreen({ 
  user = CURRENT_USER, 
  meetings, 
  tasks, 
  onJoinMeeting, 
  onOpenTaskDetails,
  onOpenNotifications,
  onOpenMessages,
  onNavigateTab
}) {
  const [activeTask, setActiveTask] = useState(tasks[0] || null);

  return (
    <div className="w-full flex-1 flex flex-col px-5 py-3 bg-[#FCFCFD] text-[#252D3C] overflow-y-auto no-scrollbar pb-6">
      
      {/* 1. User Profile Header */}
      <div className="flex items-center justify-between py-2 mb-4">
        <div 
          onClick={() => onNavigateTab('profile')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#FFD8B2] shadow-xs group-hover:scale-105 transition-transform"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#19B36E] border-2 border-white rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-[#252D3C] tracking-tight group-hover:text-[#6938EF] transition-colors">
                {user.name}
              </h2>
              <BadgeCheck className="w-4 h-4 text-[#3B82F6] fill-[#3B82F6]/20 stroke-[2.5]" />
            </div>
            <p className="text-xs text-[#5D6676] font-normal">
              {user.role}
            </p>
          </div>
        </div>

        {/* Action icons: Message and Notification */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMessages}
            className="w-9 h-9 rounded-full bg-[#F4F3FF] text-[#6938EF] flex items-center justify-center hover:bg-[#EBE9FE] transition-colors relative cursor-pointer"
            title="Messages"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#6938EF] rounded-full ring-2 ring-white" />
          </button>
          
          <button
            onClick={onOpenNotifications}
            className="w-9 h-9 rounded-full bg-[#F4F3FF] text-[#6938EF] flex items-center justify-center hover:bg-[#EBE9FE] transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#F95555] rounded-full ring-2 ring-white animate-pulse" />
          </button>
        </div>
      </div>

      {/* 2. My Work Summary Banner Widget (Figma Gradient card) */}
      <div 
        onClick={() => onNavigateTab('attendance')}
        className="w-full bg-gradient-to-r from-[#6938EF] via-[#7546F5] to-[#7A5AF8] rounded-2xl p-4 text-white relative shadow-md shadow-[#6938EF]/20 mb-6 cursor-pointer hover:brightness-105 transition-all group"
      >
        <div className="relative z-10 flex justify-between items-start">
          <div className="flex-1 pr-3">
            <div className="flex items-center gap-1.5 text-xs text-[#EBE9FE] font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Today task & presence activity</span>
            </div>
            <h3 className="text-lg font-bold tracking-tight text-white mb-2">
              My Work Summary
            </h3>
            
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-[11px] font-medium text-white">
              <span className="w-2 h-2 rounded-full bg-[#19B36E] animate-ping" />
              <span>Clocked In: 08:15 AM • 98.5% Rate</span>
            </div>
          </div>

          {/* Stylized presence badge illustration */}
          <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex flex-col items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 text-amber-300 mb-0.5 fill-amber-300" />
            <span className="text-[9px] font-bold text-white uppercase tracking-wider">Active</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-[#EBE9FE]">
          <span>View full timesheet & geofence</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* 3. Section: Today Meeting */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#252D3C]">Today Meeting</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#EBE9FE] text-[#6938EF] text-xs font-bold">
              {meetings.length}
            </span>
          </div>
          <button 
            onClick={() => onJoinMeeting(meetings[0])}
            className="text-xs font-semibold text-[#6938EF] hover:underline"
          >
            Join Next
          </button>
        </div>
        <p className="text-xs text-[#5D6676] mb-3">Your schedule for the day</p>

        {/* Meeting Cards List */}
        <div className="space-y-3">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white rounded-2xl p-4 border border-[#EBECEE] shadow-xs hover:border-[#6938EF]/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F4F3FF] text-[#6938EF] flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#252D3C] tracking-tight">
                      {meeting.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-[#5D6676] mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#777F8C]" />
                      <span>{meeting.time}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onJoinMeeting(meeting)}
                  className="px-3.5 py-1.5 rounded-full bg-[#6938EF] hover:bg-[#5925DC] active:scale-95 text-white text-xs font-semibold shadow-xs shadow-[#6938EF]/20 transition-all cursor-pointer shrink-0"
                >
                  Join Meet
                </button>
              </div>

              {/* Card Footer: Attendees */}
              <div className="flex items-center justify-between pt-2 border-t border-[#F2F4F7]">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {meeting.attendees.map((att, i) => (
                      <img
                        key={i}
                        src={att.avatar}
                        alt={att.name}
                        title={att.name}
                        className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                      />
                    ))}
                  </div>
                  {meeting.extraAttendeesCount > 0 && (
                    <span className="ml-1.5 text-[11px] font-bold text-[#6938EF] bg-[#EBE9FE] px-1.5 py-0.5 rounded-full">
                      +{meeting.extraAttendeesCount}
                    </span>
                  )}
                </div>

                <span className="text-[11px] text-[#777F8C] font-medium">
                  {meeting.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Section: Today Task */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#252D3C]">Today Task</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#EBE9FE] text-[#6938EF] text-xs font-bold">
              1
            </span>
          </div>
          <button 
            onClick={() => onNavigateTab('tasks')}
            className="text-xs font-semibold text-[#6938EF] hover:underline"
          >
            View All ({tasks.length})
          </button>
        </div>
        <p className="text-xs text-[#5D6676] mb-3">The tasks assigned to you for today</p>

        {/* Task Card (Wiring Dashboard Analytics as seen in Figma) */}
        {tasks.length > 0 && (
          <div
            onClick={() => onOpenTaskDetails(tasks[0])}
            className="bg-white rounded-2xl p-4 border border-[#EBECEE] shadow-xs hover:border-[#6938EF]/40 hover:shadow-sm transition-all cursor-pointer group"
          >
            {/* Header: Lightning icon + Title */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#F4F3FF] text-[#6938EF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 fill-[#6938EF]" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-[#252D3C] tracking-tight group-hover:text-[#6938EF] transition-colors">
                  {tasks[0].title}
                </h4>
                <p className="text-xs text-[#5D6676] line-clamp-1 mt-0.5">
                  {tasks[0].description}
                </p>
              </div>
            </div>

            {/* Badges Row: Status + Priority */}
            <div className="flex items-center gap-2 mb-3">
              {/* Status Badge: In Progress */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F2F4F7] text-[#344054] text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#777F8C]" />
                {tasks[0].status}
              </span>

              {/* Priority Badge: High */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEEEEE] text-[#E34D4D] text-xs font-medium">
                <Flag className="w-3 h-3 fill-[#E34D4D]" />
                {tasks[0].priority} Priority
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between items-center text-xs text-[#5D6676] mb-1 font-medium">
                <span>Progress</span>
                <span className="text-[#252D3C] font-semibold">{tasks[0].progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#EBECEE] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6938EF] rounded-full transition-all duration-500"
                  style={{ width: `${tasks[0].progress}%` }}
                />
              </div>
            </div>

            {/* Footer: Avatars + Due Date + Comments */}
            <div className="flex items-center justify-between pt-2 border-t border-[#F2F4F7]">
              {/* Assignees */}
              <div className="flex -space-x-2">
                {tasks[0].assignees.map((assignee, idx) => (
                  <img
                    key={idx}
                    src={assignee.avatar}
                    alt={assignee.name}
                    title={assignee.name}
                    className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                  />
                ))}
              </div>

              {/* Meta: Due Date & Comments */}
              <div className="flex items-center gap-3 text-xs text-[#5D6676]">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#777F8C]" />
                  <span>{tasks[0].dueDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 text-[#777F8C]" />
                  <span>{tasks[0].commentsCount}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
