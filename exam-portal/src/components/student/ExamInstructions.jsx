import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle } from 'lucide-react';

function ExamInstructions({ exam }) {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/student/exam/take');
  };

  const handleCancel = () => {
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{exam.title}</h1>
          <p className="text-gray-600">Please read the instructions carefully before starting</p>
        </div>

        <div className="bg-linear-to-r from-green-50 to-teal-50 rounded-xl p-6 mb-6 border-2 border-green-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Exam Instructions
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm">1</div>
              <span className="text-gray-700"><strong>Total Questions:</strong> {exam.questions.length} questions</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm">2</div>
              <span className="text-gray-700"><strong>Time Duration:</strong> {exam.duration} minutes</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm">3</div>
              <span className="text-gray-700">Each question has <strong>only one correct answer</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm">4</div>
              <span className="text-gray-700">You can <strong>navigate between questions</strong> using Next/Previous buttons</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm">5</div>
              <span className="text-gray-700">The exam will <strong>auto-submit</strong> when time runs out</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm">6</div>
              <span className="text-gray-700"><strong>Do not refresh</strong> the page during the exam</span>
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
          <p className="text-yellow-800 text-sm flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <strong>Important:</strong> Make sure you have a stable internet connection before starting the exam.
          </p>
        </div>

        <div className="flex gap-4">
          <button onClick={handleCancel} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition">
            Cancel
          </button>
          <button onClick={handleStart} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition shadow-lg">
            I Understand, Start Exam
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamInstructions;