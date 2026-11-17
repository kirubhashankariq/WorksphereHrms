// Workmate UI HR & Task Management Mock Data

export const CURRENT_USER = {
  id: "11234",
  name: "Tonald Drump",
  role: "Junior Full Stack Developer",
  department: "Product & Engineering",
  email: "tonald.drump@workmate.com",
  phone: "+1 (555) 234-5678",
  joinDate: "March 2024",
  rating: 4.9,
  tasksCompleted: 42,
  attendanceRate: "98.5%",
  verified: true,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
};

export const INITIAL_MEETINGS = [
  {
    id: "m-1",
    title: "Townhall Meeting",
    time: "01:30 AM - 02:00 AM",
    timeTag: "Upcoming",
    type: "All Hands",
    attendees: [
      { name: "Tonald Drump", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      { name: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
      { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
    ],
    extraAttendeesCount: 3,
    link: "https://meet.workmate.internal/townhall-q4",
  },
  {
    id: "m-2",
    title: "Dashboard Report",
    time: "01:30 AM - 02:00 AM",
    timeTag: "In 45m",
    type: "Review",
    attendees: [
      { name: "Tonald Drump", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      { name: "Mia Chen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" },
      { name: "David Kim", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
    ],
    extraAttendeesCount: 0,
    link: "https://meet.workmate.internal/report-sync",
  },
];

export const INITIAL_TASKS = [
  {
    id: "t-1",
    title: "Wiring Dashboard Analytics",
    description: "Connect high-fidelity event hooks with real-time WebSocket pipeline and task metrics.",
    category: "Development",
    status: "In Progress", // "In Progress" | "Completed" | "Pending Review"
    priority: "High", // "High" | "Medium" | "Low"
    progress: 80,
    dueDate: "27 April",
    commentsCount: 2,
    subtasks: [
      { id: "s-1", title: "Review WebSocket endpoints", completed: true },
      { id: "s-2", title: "Map event payload to UI cards", completed: true },
      { id: "s-3", title: "Optimize animation frames & loading states", completed: false },
    ],
    assignees: [
      { name: "Tonald Drump", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      { name: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
      { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "t-2",
    title: "Refactor Mobile Navigation Bar",
    description: "Align 5-tab dock icons with Workmate Design System tokens and active indicator states.",
    category: "UI/UX",
    status: "Completed",
    priority: "Medium",
    progress: 100,
    dueDate: "28 April",
    commentsCount: 5,
    subtasks: [
      { id: "s-4", title: "Export SVG icons from Figma kit", completed: true },
      { id: "s-5", title: "Implement smooth active dot transition", completed: true },
    ],
    assignees: [
      { name: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
      { name: "Tonald Drump", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "t-3",
    title: "Audit Attendance Geofence Trigger",
    description: "Verify GPS beacon tolerance within 50 meters of Tower 2 corporate HQ entrance.",
    category: "Security",
    status: "In Progress",
    priority: "High",
    progress: 45,
    dueDate: "29 April",
    commentsCount: 1,
    subtasks: [
      { id: "s-6", title: "Test iOS CoreLocation delta", completed: true },
      { id: "s-7", title: "Tune threshold to 35m accuracy", completed: false },
    ],
    assignees: [
      { name: "David Kim", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
      { name: "Tonald Drump", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "t-4",
    title: "Employee ID Facial Match Benchmark",
    description: "Stress test biometric auth latency on node 2059-2830 signIn flow for mobile devices.",
    category: "AI/Biometrics",
    status: "Pending Review",
    priority: "Low",
    progress: 90,
    dueDate: "30 April",
    commentsCount: 3,
    subtasks: [
      { id: "s-8", title: "Capture 10 test lighting conditions", completed: true },
      { id: "s-9", title: "Submit latency audit report", completed: true },
    ],
    assignees: [
      { name: "Mia Chen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" },
    ],
  },
];

export const EMPLOYEES_LIST = [
  {
    id: "11234",
    name: "Tonald Drump",
    role: "Junior Full Stack Developer",
    department: "Engineering",
    status: "Online",
    email: "tonald.drump@workmate.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "10982",
    name: "Sarah Jenkins",
    role: "Lead Product Designer",
    department: "Design System",
    status: "Online",
    email: "sarah.j@workmate.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 987-1234",
  },
  {
    id: "11405",
    name: "Alex Rivera",
    role: "Senior Backend Architect",
    department: "Cloud & Infrastructure",
    status: "In Meeting",
    email: "alex.rivera@workmate.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 456-7890",
  },
  {
    id: "11043",
    name: "Mia Chen",
    role: "Staff Product Manager",
    department: "Mobile Experience",
    status: "Away",
    email: "mia.chen@workmate.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 321-6549",
  },
  {
    id: "11520",
    name: "David Kim",
    role: "DevOps & Security Specialist",
    department: "Security Operations",
    status: "Online",
    email: "david.kim@workmate.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 654-9870",
  },
];

export const ATTENDANCE_HISTORY = [
  { date: "Today, 27 Apr", checkIn: "08:15 AM", checkOut: "--:--", status: "On Time", workHours: "In progress" },
  { date: "Fri, 26 Apr", checkIn: "08:22 AM", checkOut: "05:30 PM", status: "On Time", workHours: "9h 08m" },
  { date: "Thu, 25 Apr", checkIn: "08:10 AM", checkOut: "05:15 PM", status: "On Time", workHours: "9h 05m" },
  { date: "Wed, 24 Apr", checkIn: "08:45 AM", checkOut: "06:00 PM", status: "Late (15m)", workHours: "9h 15m" },
  { date: "Tue, 23 Apr", checkIn: "08:18 AM", checkOut: "05:25 PM", status: "On Time", workHours: "9h 07m" },
];

export const NOTIFICATIONS = [
  {
    id: "n-1",
    title: "Meeting Starting Soon",
    desc: "Townhall Meeting starts in 15 minutes in room Virtual Room 3.",
    time: "10m ago",
    unread: true,
    type: "meeting",
  },
  {
    id: "n-2",
    title: "Task Assigned",
    desc: "Sarah Jenkins assigned you to 'Wiring Dashboard Analytics'.",
    time: "1h ago",
    unread: true,
    type: "task",
  },
  {
    id: "n-3",
    title: "Attendance Verified",
    desc: "Your check-in at 08:15 AM has been logged via Tower 2 GPS beacon.",
    time: "2h ago",
    unread: false,
    type: "attendance",
  },
];
