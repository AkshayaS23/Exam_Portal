import React from 'react';
import { FileQuestion, BookOpen, FileText, CheckCircle } from 'lucide-react';

function DashboardOverview({ exams, categories }) {
  const getTotalQuestions = () => exams.reduce((total, exam) => total + exam.questions.length, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-indigo-100 text-sm font-semibold">Total Questions</p>
            <FileQuestion className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-4xl font-bold">{getTotalQuestions()}</p>
          <p className="text-indigo-100 text-xs mt-2">Across all exams</p>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-green-100 text-sm font-semibold">Categories</p>
            <BookOpen className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-4xl font-bold">{categories.length}</p>
          <p className="text-green-100 text-xs mt-2">Active categories</p>
        </div>
        <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100 text-sm font-semibold">Total Exams</p>
            <FileText className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-4xl font-bold">{exams.length}</p>
          <p className="text-purple-100 text-xs mt-2">Created exams</p>
        </div>
        <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-orange-100 text-sm font-semibold">Active Exams</p>
            <CheckCircle className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-4xl font-bold">{exams.filter(e => e.status === 'active').length}</p>
          <p className="text-orange-100 text-xs mt-2">Currently active</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;