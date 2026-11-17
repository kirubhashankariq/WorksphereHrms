import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MessageCircle, 
  Flag, 
  Zap, 
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';

export default function TaskScreen({ tasks, setTasks, onOpenTaskDetails }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New task form
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Development');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState('29 April');

  const filteredTasks = tasks.filter((t) => {
    const matchesFilter = activeFilter === 'All' || t.status === activeFilter;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: `t-${Date.now()}`,
      title: newTaskTitle,
      description: `Task created for ${newTaskCategory} team sprint.`,
      category: newTaskCategory,
      status: "In Progress",
      priority: newTaskPriority,
      progress: 0,
      dueDate: newTaskDueDate,
      commentsCount: 0,
      subtasks: [
        { id: `s-${Date.now()}-1`, title: 'Define scope & criteria', completed: false },
        { id: `s-${Date.now()}-2`, title: 'Implement logic', completed: false },
      ],
      assignees: [
        { name: "Tonald Drump", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      ],
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setIsAddModalOpen(false);
  };

  const handleToggleComplete = (taskId, e) => {
    e.stopPropagation();
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        const isDone = t.status === 'Completed';
        return {
          ...t,
          status: isDone ? 'In Progress' : 'Completed',
          progress: isDone ? 50 : 100,
        };
      }
      return t;
    }));
  };

  return (
    <div className="w-full flex-1 flex flex-col px-5 py-4 bg-[#FCFCFD] text-[#252D3C] overflow-y-auto no-scrollbar pb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#252D3C]">
            Task Management
          </h1>
          <p className="text-xs text-[#5D6676]">
            {tasks.length} total tasks assigned
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="h-9 px-3.5 bg-[#6938EF] hover:bg-[#5925DC] active:scale-95 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-[#6938EF]/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777F8C]">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search assigned tasks..."
          className="w-full h-11 pl-10 pr-4 bg-white border border-[#EBECEE] rounded-xl text-xs text-[#252D3C] placeholder-[#777F8C] focus:outline-none focus:ring-2 focus:ring-[#6938EF]/20 focus:border-[#6938EF]"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-3">
        {['All', 'In Progress', 'Completed', 'Pending Review'].map((tab) => {
          const isActive = activeFilter === tab;
          const count = tab === 'All' 
            ? tasks.length 
            : tasks.filter(t => t.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#6938EF] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#5D6676] border border-[#EBECEE] hover:border-[#6938EF]/40'
              }`}
            >
              {tab} ({count})
            </button>
          );
        })}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#777F8C]">
            <CheckSquare className="w-10 h-10 mx-auto text-[#C0C4CA] mb-2" />
            <p>No tasks found in this section</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.status === 'Completed';
            return (
              <div
                key={task.id}
                onClick={() => onOpenTaskDetails(task)}
                className="bg-white rounded-2xl p-4 border border-[#EBECEE] shadow-xs hover:border-[#6938EF]/40 hover:shadow-sm transition-all cursor-pointer group"
              >
                {/* Header: Title + Checkmark */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      onClick={(e) => handleToggleComplete(task.id, e)}
                      title={isCompleted ? "Mark Incomplete" : "Mark Complete"}
                      className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                        isCompleted
                          ? 'bg-[#19B36E] border-[#19B36E] text-white'
                          : 'border-[#C0C4CA] bg-white hover:border-[#6938EF]'
                      }`}
                    >
                      {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                    <div>
                      <h4 className={`text-sm font-bold tracking-tight text-[#252D3C] group-hover:text-[#6938EF] transition-colors ${
                        isCompleted ? 'line-through text-[#777F8C]' : ''
                      }`}>
                        {task.title}
                      </h4>
                      <p className="text-xs text-[#5D6676] line-clamp-1 mt-0.5">
                        {task.description}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                    task.priority === 'High' 
                      ? 'bg-[#FEEEEE] text-[#E34D4D]' 
                      : task.priority === 'Medium' 
                        ? 'bg-[#FFF7EC] text-[#E89D3C]' 
                        : 'bg-[#F4F3FF] text-[#6938EF]'
                  }`}>
                    {task.priority}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center text-[11px] text-[#5D6676] mb-1 font-medium">
                    <span>Progress</span>
                    <span className="text-[#252D3C] font-semibold">{task.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#EBECEE] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCompleted ? 'bg-[#19B36E]' : 'bg-[#6938EF]'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>

                {/* Footer: Assignees & Due Date */}
                <div className="flex items-center justify-between pt-2 border-t border-[#F2F4F7]">
                  <div className="flex -space-x-1.5">
                    {task.assignees.map((a, i) => (
                      <img
                        key={i}
                        src={a.avatar}
                        alt={a.name}
                        className="w-5 h-5 rounded-full object-cover ring-2 ring-white"
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-[#5D6676]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#777F8C]" />
                      <span>{task.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-[#777F8C]" />
                      <span>{task.commentsCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-left">
            <h3 className="text-base font-bold text-[#252D3C]">Create New Task</h3>
            <p className="text-xs text-[#5D6676] mt-1">
              Add a task to the Workmate board.
            </p>
            
            <form onSubmit={handleCreateTask} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-xs font-medium text-[#344054] mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Design System Token Sync"
                  className="w-full h-10 px-3 border border-[#EBECEE] rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#344054] mb-1">
                  Category
                </label>
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                  className="w-full h-10 px-3 border border-[#EBECEE] rounded-xl text-xs bg-white"
                >
                  <option value="Development">Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Security">Security</option>
                  <option value="HR Operations">HR Operations</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-[#344054] mb-1">
                    Priority
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full h-10 px-3 border border-[#EBECEE] rounded-xl text-xs bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#344054] mb-1">
                    Due Date
                  </label>
                  <input
                    type="text"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="w-full h-10 px-3 border border-[#EBECEE] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 h-10 bg-slate-100 hover:bg-slate-200 text-[#344054] rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-10 bg-[#6938EF] hover:bg-[#5925DC] text-white rounded-xl font-semibold shadow-xs"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
