import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import ViewQuestionsModal from '../student/ViewQuestionsModel';

function QuestionsView({ exams, setExams, showNotification }) {
  const [viewingExamQuestions, setViewingExamQuestions] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Questions by Exam</h2>
      <div className="space-y-4">
        {exams.map(exam => (
          <div key={exam.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-300 transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{exam.title}</h3>
                <p className="text-sm text-gray-600 mt-1">📝 {exam.questions.length} questions • 📚 {exam.category}</p>
              </div>
              <button 
                onClick={() => setViewingExamQuestions(exam)} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Questions
              </button>
            </div>
          </div>
        ))}
      </div>

      {viewingExamQuestions && (
        <ViewQuestionsModal 
          exam={viewingExamQuestions}
          exams={exams}
          setExams={setExams}
          onClose={() => setViewingExamQuestions(null)}
          showNotification={showNotification}
          setViewingExamQuestions={setViewingExamQuestions}
        />
      )}
    </div>
  );
}

export default QuestionsView;