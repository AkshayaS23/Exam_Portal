import React from 'react';
import { X, FileQuestion, CheckCircle, Trash2 } from 'lucide-react';

function ViewQuestionsModal({ exam, exams, setExams, onClose, showNotification, setViewingExamQuestions }) {
  const handleDeleteQuestionFromExam = (examId, qId) => {
    const updatedExams = exams.map(e => e.id === examId ? {...e, questions: e.questions.filter(q => q.id !== qId)} : e);
    setExams(updatedExams);
    
    // Update the viewing modal state immediately
    if (exam && exam.id === examId) {
      const updatedExam = updatedExams.find(e => e.id === examId);
      setViewingExamQuestions(updatedExam);
    }
    
    showNotification('Question deleted', 'success');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative">
        {/* Notification inside modal */}
        <div className="p-6 border-b flex justify-between items-center bg-linear-to-r from-indigo-50 to-purple-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{exam.title}</h2>
            <p className="text-sm text-gray-600 mt-1">📝 {exam.questions.length} Questions • 📚 {exam.category}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-lg transition">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-6">
          {exam.questions.length === 0 ? (
            <div className="text-center py-12">
              <FileQuestion className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No questions added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {exam.questions.map((q, idx) => (
                <div key={q.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition">
                  <div className="flex justify-between mb-3">
                    <p className="font-semibold text-gray-800">
                      <span className="bg-indigo-600 text-white px-2 py-1 rounded mr-2 text-sm">{idx + 1}</span>
                      {q.question}
                    </p>
                    <button 
                      onClick={() => handleDeleteQuestionFromExam(exam.id, q.id)} 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-2 ml-8">
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} className={'p-3 rounded-lg flex items-center gap-2 ' + (optIdx === q.correctAnswer ? 'bg-green-50 border-2 border-green-300' : 'bg-gray-50 border border-gray-200')}>
                        {optIdx === q.correctAnswer && <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />}
                        <span className="font-medium text-gray-700">{String.fromCharCode(65 + optIdx)}.</span>
                        <span className={optIdx === q.correctAnswer ? 'text-green-800 font-semibold' : 'text-gray-700'}>{opt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-6 border-t bg-gray-50">
          <button onClick={onClose} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewQuestionsModal;