import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ExamResults({ exam, studentAnswers, onRetake }) {
  const navigate = useNavigate();

  const calculateScore = () => {
    let correct = 0;
    exam.questions.forEach(q => {
      if (studentAnswers[q.id] === q.correctAnswer) correct++;
    });
    return {correct, total: exam.questions.length};
  };

  const score = calculateScore();
  const percentage = ((score.correct / score.total) * 100).toFixed(1);

  const handleRetake = () => {
    const success = onRetake(exam);
    if (success) {
      navigate('/student/exam/instructions');
    }
  };

  const handleBackToDashboard = () => {
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-teal-100 p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 mx-auto text-green-600 mb-4" />
          <h1 className="text-3xl font-bold">Exam Completed!</h1>
          <p className="text-gray-600">Great job on finishing the exam</p>
        </div>
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="80" stroke="#e5e7eb" strokeWidth="16" fill="none" />
              <circle cx="96" cy="96" r="80" stroke={percentage >= 60 ? '#10b981' : '#ef4444'} strokeWidth="16" fill="none" strokeDasharray={(percentage / 100 * 502.4) + ' 502.4'} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">{percentage}%</span>
              <span className="text-sm text-gray-600">{score.correct}/{score.total} Correct</span>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={[{name: 'Correct', value: score.correct}, {name: 'Wrong', value: score.total - score.correct}]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                <Cell fill="#10b981" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={handleRetake} className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">Retake Exam</button>
          <button onClick={handleBackToDashboard} className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold">Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
}

export default ExamResults;