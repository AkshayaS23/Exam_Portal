import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

function ExamsManagement({ exams, setExams, categories, showNotification }) {
  const [newExam, setNewExam] = useState({
    title: '', 
    category: '', 
    duration: 30, 
    scheduledDate: '', 
    status: 'active'
  });

  const handleAddExam = () => {
    if (!newExam.title || !newExam.category) {
      showNotification('Please fill all required fields', 'error');
      return;
    }
    setExams([...exams, {id: Date.now(), ...newExam, questions: []}]);
    setNewExam({title: '', category: '', duration: 30, scheduledDate: '', status: 'active'});
    showNotification('Exam created successfully!', 'success');
  };

  const handleDeleteExam = (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(e => e.id !== id));
      showNotification('Exam deleted successfully', 'success');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Plus className="w-7 h-7" />
          Create New Exam
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-indigo-100 mb-2">Exam Title <span className="text-yellow-300">*</span></label>
            <input 
              type="text" 
              value={newExam.title} 
              onChange={(e) => setNewExam({...newExam, title: e.target.value})} 
              placeholder="e.g., React Advanced Test" 
              className="w-full p-3 bg-white/10 backdrop-blur border-2 border-white/20 rounded-lg text-white placeholder-indigo-200 focus:border-white focus:outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-100 mb-2">Category <span className="text-yellow-300">*</span></label>
            <select 
              value={newExam.category} 
              onChange={(e) => setNewExam({...newExam, category: e.target.value})} 
              className="w-full p-3 bg-white/10 backdrop-blur border-2 border-white/20 rounded-lg text-white focus:border-white focus:outline-none">
              <option value="" className="text-gray-900">Select Category</option>
              {categories.map(cat => <option key={cat} value={cat} className="text-gray-900">{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-100 mb-2">Duration (minutes)</label>
            <input 
              type="number" 
              value={newExam.duration} 
              onChange={(e) => setNewExam({...newExam, duration: parseInt(e.target.value) || 30})} 
              placeholder="30" 
              className="w-full p-3 bg-white/10 backdrop-blur border-2 border-white/20 rounded-lg text-white placeholder-indigo-200 focus:border-white focus:outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-100 mb-2">Scheduled Date</label>
            <input 
              type="date" 
              value={newExam.scheduledDate} 
              onChange={(e) => setNewExam({...newExam, scheduledDate: e.target.value})} 
              className="w-full p-3 bg-white/10 backdrop-blur border-2 border-white/20 rounded-lg text-white focus:border-white focus:outline-none" 
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-indigo-100 mb-2">Status</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="status" 
                  checked={newExam.status === 'scheduled'} 
                  onChange={() => setNewExam({...newExam, status: 'scheduled'})} 
                  className="w-4 h-4" 
                />
                <span className="text-white">Scheduled</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="status" 
                  checked={newExam.status === 'active'} 
                  onChange={() => setNewExam({...newExam, status: 'active'})} 
                  className="w-4 h-4" 
                />
                <span className="text-white">Active</span>
              </label>
            </div>
          </div>
        </div>
        <button 
          onClick={handleAddExam} 
          className="w-full bg-white hover:bg-gray-100 text-indigo-600 font-bold py-4 rounded-lg shadow-lg transition transform hover:scale-105">
          <Plus className="w-5 h-5 inline mr-2" />Create Exam
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">All Exams ({exams.length})</h2>
        <div className="space-y-4">
          {exams.map(exam => (
            <div key={exam.id} className="bg-linear-to-r from-gray-50 to-gray-100 border-l-4 border-indigo-500 rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-xl text-gray-800">{exam.title}</h3>
                    <span className={'px-3 py-1 rounded-full text-xs font-bold ' + (exam.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700')}>
                      {exam.status === 'active' ? '🟢 Active' : '📅 Scheduled'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">📚 {exam.category}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>⏱️ {exam.duration} min</span>
                    <span>📝 {exam.questions.length} questions</span>
                    <span>📅 {exam.scheduledDate || 'Not scheduled'}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteExam(exam.id)} 
                  className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExamsManagement;