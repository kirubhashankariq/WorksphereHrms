import React, { useState } from 'react';
import StatusBar from './components/StatusBar';
import BottomNav from './components/BottomNav';
import DeviceFrame from './components/DeviceFrame';
import FigmaDesignSpecs from './components/FigmaDesignSpecs';

// Screens
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import TaskScreen from './screens/TaskScreen';
import EmployeeScreen from './screens/EmployeeScreen';
import ProfileScreen from './screens/ProfileScreen';

// Modals
import MeetingModal from './components/MeetingModal';
import TaskDetailModal from './components/TaskDetailModal';
import NotificationModal from './components/NotificationModal';
import MessagesModal from './components/MessagesModal';

// Mock Data
import { CURRENT_USER, INITIAL_MEETINGS, INITIAL_TASKS } from './data/mockData';

export default function App() {
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);
  const [currentScreen, setCurrentScreen] = useState('signin'); // 'signin' (Node 2059-2830) | 'home' | 'attendance' | 'tasks' | 'employees' | 'profile'
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  
  // Modals state
  const [activeMeeting, setActiveMeeting] = useState(null);
  const [activeTaskDetail, setActiveTaskDetail] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  // Sign In success handler (Figma prototype arrow: "Tap Sign In" -> Home)
  const handleSignInSuccess = (authData) => {
    setCurrentUser(prev => ({
      ...prev,
      name: authData.name || prev.name,
      id: authData.id || prev.id,
    }));
    setCurrentScreen('home');
  };

  // Sign Out handler (returns to Node 2059-2830)
  const handleSignOut = () => {
    setCurrentScreen('signin');
  };

  // Update task handler
  const handleUpdateTask = (updatedTask) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    setActiveTaskDetail(updatedTask);
  };

  // Reset to initial
  const handleReset = () => {
    setCurrentScreen('signin');
    setTasks(INITIAL_TASKS);
    setMeetings(INITIAL_MEETINGS);
    setActiveMeeting(null);
    setActiveTaskDetail(null);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-slate-950 font-sans select-none overflow-hidden">
      
      {/* Device Frame Wrapper with screen switcher */}
      <DeviceFrame
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        isAuthenticated={currentScreen !== 'signin'}
        onReset={handleReset}
      >
        {/* Mobile Top Status Bar */}
        <StatusBar theme="light" />

        {/* Dynamic Screen Viewport */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          {currentScreen === 'signin' && (
            <SignInScreen onSignInSuccess={handleSignInSuccess} />
          )}

          {currentScreen === 'home' && (
            <HomeScreen
              user={currentUser}
              meetings={meetings}
              tasks={tasks}
              onJoinMeeting={(meeting) => setActiveMeeting(meeting)}
              onOpenTaskDetails={(task) => setActiveTaskDetail(task)}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onOpenMessages={() => setIsMessagesOpen(true)}
              onNavigateTab={(tab) => setCurrentScreen(tab)}
            />
          )}

          {currentScreen === 'attendance' && (
            <AttendanceScreen onClockToggle={() => {}} />
          )}

          {currentScreen === 'tasks' && (
            <TaskScreen
              tasks={tasks}
              setTasks={setTasks}
              onOpenTaskDetails={(task) => setActiveTaskDetail(task)}
            />
          )}

          {currentScreen === 'employees' && (
            <EmployeeScreen user={currentUser} />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              user={currentUser}
              onSignOut={handleSignOut}
            />
          )}
        </div>

        {/* 5-Tab Dark Bottom Navigation (Hidden only on SignIn screen) */}
        {currentScreen !== 'signin' && (
          <BottomNav
            activeTab={currentScreen}
            setActiveTab={setCurrentScreen}
            taskCount={tasks.filter(t => t.status === 'In Progress').length}
          />
        )}

        {/* Video Meeting Modal */}
        {activeMeeting && (
          <MeetingModal
            meeting={activeMeeting}
            onClose={() => setActiveMeeting(null)}
          />
        )}

        {/* Task Detail Modal */}
        {activeTaskDetail && (
          <TaskDetailModal
            task={activeTaskDetail}
            onClose={() => setActiveTaskDetail(null)}
            onUpdateTask={handleUpdateTask}
          />
        )}

        {/* Notifications Slide Panel */}
        {isNotificationsOpen && (
          <NotificationModal
            onClose={() => setIsNotificationsOpen(false)}
          />
        )}

        {/* Messages Drawer */}
        {isMessagesOpen && (
          <MessagesModal
            onClose={() => setIsMessagesOpen(false)}
          />
        )}
      </DeviceFrame>

      {/* Figma Design System Inspector Drawer at bottom */}
      <FigmaDesignSpecs />

    </div>
  );
}
