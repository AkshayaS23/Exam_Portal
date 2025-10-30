import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import DashboardOverview from './DashboardOverview';
import ExamsManagement from './ExamsManagement';
import CategoriesManagement from './CategoriesManagement';
import AddQuestions from './AddQuestions';
import QuestionsView from './QuestionsView';
import Analytics from './Analytics';
import Schedule from './Schedule';
import Students from './Students';
import { Menu } from 'lucide-react';

function AdminDashboard({ exams, setExams, categories, setCategories, registeredUsers, onLogout, showNotification }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // perform any logout logic (like clearing session)
    navigate('/'); // redirect to homepage
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        sidebarOpen={sidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />

      <div className={'flex-1 transition-all ' + (sidebarOpen ? 'ml-64' : 'ml-0')}>
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Exam Management System</h1>
        </header>

        <main className="p-6">
          {activeSection === 'dashboard' && (
            <DashboardOverview exams={exams} categories={categories} />
          )}

          {activeSection === 'exams' && (
            <ExamsManagement 
              exams={exams}
              setExams={setExams}
              categories={categories}
              showNotification={showNotification}
            />
          )}

          {activeSection === 'categories' && (
            <CategoriesManagement 
              categories={categories}
              setCategories={setCategories}
              showNotification={showNotification}
            />
          )}

          {activeSection === 'add' && (
            <AddQuestions 
              exams={exams}
              setExams={setExams}
              showNotification={showNotification}
            />
          )}

          {activeSection === 'questions' && (
            <QuestionsView 
              exams={exams}
              setExams={setExams}
              showNotification={showNotification}
            />
          )}

          {activeSection === 'analytics' && <Analytics />}
          {activeSection === 'schedule' && <Schedule exams={exams} />}
          {activeSection === 'students' && (
        <Students 
          registeredUsers={registeredUsers} 
          exams={exams}  // Add this line
        />
)}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
