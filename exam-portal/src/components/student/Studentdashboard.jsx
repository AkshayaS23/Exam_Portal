import React from 'react';
import { useNavigate } from 'react-router-dom';

function StudentDashboard({ exams, onStartExam, onLogout }) {
  const navigate = useNavigate();

  const handleStartExam = (exam) => {
    const success = onStartExam(exam);
    if (success) {
      navigate('/student/exam/instructions');
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-teal-100 p-4">
      <nav className="bg-white shadow-md rounded-lg p-4 mb-6 max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Available Exams</h1>
        <button onClick={handleLogout} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Logout</button>
      </nav>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {exams.filter(e => e.status === 'active').map(exam => (
          <div key={exam.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-4">{exam.title}</h3>
            <p className="text-gray-600 mb-2">📚 {exam.category}</p>
            <p className="text-gray-600 mb-2">⏱️ {exam.duration} minutes</p>
            <p className="text-gray-600 mb-4">📝 {exam.questions.length} questions</p>
            <button 
              onClick={() => handleStartExam(exam)} 
              disabled={exam.questions.length === 0} 
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold">
              Start Exam
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentDashboard;