import React from 'react';
import { Home, FileText, BookOpen, Plus, FileQuestion, BarChart3, Calendar, Users, LogOut } from 'lucide-react';

function AdminSidebar({ sidebarOpen, activeSection, setActiveSection, onLogout }) {
  return (
    <aside className={'bg-indigo-900 text-white transition-all overflow-hidden fixed h-full z-10 ' + (sidebarOpen ? 'w-64' : 'w-0')}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          <button onClick={() => setActiveSection('dashboard')} className={'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ' + (activeSection === 'dashboard' ? 'bg-indigo-700' : 'hover:bg-indigo-800')}>
            <Home className="w-5 h-5" />Dashboard
          </button>
          <button onClick={() => setActiveSection('exams')} className={'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ' + (activeSection === 'exams' ? 'bg-indigo-700' : 'hover:bg-indigo-800')}>
            <FileText className="w-5 h-5" />Exams
          </button>
          <button onClick={() => setActiveSection('categories')} className={'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ' + (activeSection === 'categories' ? 'bg-indigo-700' : 'hover:bg-indigo-800')}>
            <BookOpen className="w-5 h-5" />Categories
          </button>
          <button onClick={() => setActiveSection('add')} className={'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ' + (activeSection === 'add' ? 'bg-indigo-700' : 'hover:bg-indigo-800')}>
            <Plus className="w-5 h-5" />Add Questions
          </button>
          <button onClick={() => setActiveSection('questions')} className={'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ' + (activeSection === 'questions' ? 'bg-indigo-700' : 'hover:bg-indigo-800')}>
            <FileQuestion className="w-5 h-5" />Questions
          </button>
          <button onClick={() => setActiveSection('analytics')} className={'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ' + (activeSection === 'analytics' ? 'bg-indigo-700' : 'hover:bg-indigo-800')}>
            <BarChart3 className="w-5 h-5" />Analytics
          </button>
          <button onClick={() => setActiveSection('schedule')} className={'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ' + (activeSection === 'schedule' ? 'bg-indigo-700' : 'hover:bg-indigo-800')}>
            <Calendar className="w-5 h-5" />Schedule
          </button>
          <button onClick={() => setActiveSection('students')} className={'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ' + (activeSection === 'students' ? 'bg-indigo-700' : 'hover:bg-indigo-800')}>
            <Users className="w-5 h-5" />Students
          </button>
        </nav>
      </div>
      <div className="absolute bottom-0 w-64 p-6">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition">
          <LogOut className="w-5 h-5" />Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;