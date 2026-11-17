import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Flag, 
  MessageCircle, 
  UserPlus, 
  Send,
  Zap,
  Clock
} from 'lucide-react';

export default function TaskDetailModal({ task, onClose, onUpdateTask }) {
  if (!task) return null;

  const [subtasks, setSubtasks] = useState(task.subtasks || []);
  const [progress, setProgress] = useState(task.progress);
  const [status, setStatus] = useState(task.status);
  const [comments, setComments] = useState([
    { id: 1, author: "Sarah Jenkins", text: "Please review the chart color tokens against Figma.", time: "2h ago" },
    { id: 2, author: "Alex Rivera", text: "WebSocket payload format is updated in docs.", time: "1h ago" },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleToggleSubtask = (subtaskId) => {
    const updated = subtasks.map(st => 
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );
    setSubtasks(updated);
    
    // Automatically recalculate progress based on subtasks
    const completedCount = updated.filter(s => s.completed).length;
    const calcProgress = Math.round((completedCount / updated.length) * 100);
    setProgress(calcProgress);
    
    onUpdateTask({
      ...task,
      subtasks: updated,
      progress: calcProgress,
      status: calcProgress === 100 ? 'Completed' : 'In Progress',
    });
  };

  const handleProgressChange = (newVal) => {
    setProgress(newVal);
    onUpdateTask({
      ...task,
      progress: newVal,
      status: newVal === 100 ? 'Completed' : 'In Progress',
    });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      { id: Date.now(), author: "Tonald Drump", text: newComment, time: "Just now" }
    ]);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-[#EBECEE]">
        
        {/* Modal Header */}
        <div className="p-4 px-5 border-b border-[#EBECEE] flex items-center justify-between bg-[#FCFCFD]">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#F4F3FF] text-[#6938EF] flex items-center justify-center">
              <Zap className="w-4 h-4 fill-[#6938EF]" />
            </span>
            <div>
              <span className="text-[10px] text-[#6938EF] font-bold uppercase tracking-wider">
                {task.category || 'Development Task'}
              </span>
              <h3 className="text-sm font-bold text-[#252D3C] line-clamp-1">{task.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#5D6676] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-5 overflow-y-auto no-scrollbar space-y-4 text-xs">
          
          {/* Status & Priority Row */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-[#777F8C] block text-[10px] mb-1">STATUS</span>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  onUpdateTask({ ...task, status: e.target.value });
                }}
                className="h-8 px-2.5 bg-[#F2F4F7] border border-[#EBECEE] rounded-lg text-xs font-semibold text-[#344054] focus:outline-none"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending Review">Pending Review</option>
              </select>
            </div>

            <div>
              <span className="text-[#777F8C] block text-[10px] mb-1">PRIORITY</span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                task.priority === 'High' ? 'bg-[#FEEEEE] text-[#E34D4D]' : 'bg-[#FFF7EC] text-[#E89D3C]'
              }`}>
                <Flag className="w-3.5 h-3.5" />
                {task.priority} Priority
              </span>
            </div>

            <div>
              <span className="text-[#777F8C] block text-[10px] mb-1">DUE DATE</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 text-[#252D3C] font-semibold text-xs">
                <Calendar className="w-3.5 h-3.5 text-[#777F8C]" />
                {task.dueDate}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-[#252D3C] mb-1 text-xs">Description</h4>
            <p className="text-[#5D6676] leading-relaxed bg-[#FCFCFD] p-3 rounded-xl border border-[#EBECEE]">
              {task.description}
            </p>
          </div>

          {/* Interactive Progress Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-bold text-[#252D3C]">Overall Progress</span>
              <span className="font-bold text-[#6938EF]">{progress}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => handleProgressChange(Number(e.target.value))}
              className="w-full accent-[#6938EF] cursor-pointer"
            />
          </div>

          {/* Subtasks Checklist */}
          <div>
            <h4 className="font-bold text-[#252D3C] mb-2 text-xs">Subtasks Checklist</h4>
            <div className="space-y-2">
              {subtasks.map((st) => (
                <div
                  key={st.id}
                  onClick={() => handleToggleSubtask(st.id)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                    st.completed 
                      ? 'bg-[#E8F7F1]/40 border-[#19B36E]/30 text-[#17A364]' 
                      : 'bg-white border-[#EBECEE] text-[#252D3C] hover:border-[#6938EF]/40'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    st.completed ? 'bg-[#19B36E] border-[#19B36E] text-white' : 'border-[#C0C4CA]'
                  }`}>
                    {st.completed && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={`text-xs ${st.completed ? 'line-through text-[#777F8C]' : 'font-medium'}`}>
                    {st.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Feed */}
          <div>
            <h4 className="font-bold text-[#252D3C] mb-2 text-xs flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-[#6938EF]" />
              <span>Team Discussions ({comments.length})</span>
            </h4>
            <div className="space-y-2 mb-3">
              {comments.map((c) => (
                <div key={c.id} className="p-2.5 bg-[#F4F3FF] rounded-xl text-xs">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-[#6938EF]">{c.author}</span>
                    <span className="text-[10px] text-[#777F8C]">{c.time}</span>
                  </div>
                  <p className="text-[#344054]">{c.text}</p>
                </div>
              ))}
            </div>

            {/* Post comment input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a message or update..."
                className="flex-1 h-10 px-3 bg-[#FCFCFD] border border-[#EBECEE] rounded-xl text-xs text-[#252D3C] focus:outline-none focus:border-[#6938EF]"
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

      </div>
    </div>
  );
}
