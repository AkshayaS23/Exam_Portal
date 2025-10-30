import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

function ExamTaking({ exam, currentQuestionIndex, setCurrentQuestionIndex, studentAnswers, setStudentAnswers, timeRemaining, setTimeRemaining }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            navigate('/student/exam/results');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining, setTimeRemaining, navigate]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  };

  const handleAnswerSelect = (qId, idx) => {
    setStudentAnswers({...studentAnswers, [qId]: idx});
  };

  const handleSubmit = () => {
    navigate('/student/exam/results');
  };

  const currentQ = exam.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{exam.title}</h1>
          <div className="bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="font-bold text-lg">{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <p className="text-sm font-semibold text-gray-600 mb-4">Question {currentQuestionIndex + 1} of {exam.questions.length}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-green-600 h-2 rounded-full transition-all" style={{width: ((currentQuestionIndex + 1) / exam.questions.length * 100) + '%'}} />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{currentQ.question}</h2>
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswerSelect(currentQ.id, idx)} className={'w-full text-left p-4 rounded-lg border-2 transition-all ' + (studentAnswers[currentQ.id] === idx ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-300 hover:border-green-300 hover:bg-gray-50')}>
                <div className="flex items-center gap-3">
                  <div className={'w-6 h-6 rounded-full border-2 flex items-center justify-center ' + (studentAnswers[currentQ.id] === idx ? 'border-green-500 bg-green-500' : 'border-gray-300')}>
                    {studentAnswers[currentQ.id] === idx && <div className="w-3 h-3 bg-white rounded-full" />}
                  </div>
                  <span className="font-medium">{opt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))} disabled={currentQuestionIndex === 0} className="px-6 py-3 bg-gray-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold">← Previous</button>
          {currentQuestionIndex === exam.questions.length - 1 ? (
            <button onClick={handleSubmit} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-lg">Submit Exam ✓</button>
          ) : (
            <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold">Next →</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExamTaking;