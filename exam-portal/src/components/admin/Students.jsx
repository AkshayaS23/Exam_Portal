import React, { useState } from 'react';
import { Users, FileText, TrendingUp, CheckCircle, Eye, X, ChevronDown } from 'lucide-react';

function Students({ registeredUsers, exams }) {
  const [viewingResult, setViewingResult] = useState(null);
  const [selectedExamFilter, setSelectedExamFilter] = useState('all');

  // Mock student results data (you can replace this with actual data from your backend)
  const studentResults = [
    {
      id: 1,
      studentName: 'John Doe',
      studentEmail: 'john@example.com',
      examId: 1,
      examTitle: 'React Fundamentals Test',
      score: 85,
      totalQuestions: 2,
      correctAnswers: 2,
      answers: {
        101: 0, // question id: selected answer index
        102: 0
      },
      submittedAt: 'Oct 10, 2025',
      status: 'passed'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      studentEmail: 'jane@example.com',
      examId: 1,
      examTitle: 'React Fundamentals Test',
      score: 100,
      totalQuestions: 2,
      correctAnswers: 2,
      answers: {
        101: 0,
        102: 0
      },
      submittedAt: 'Oct 10, 2025',
      status: 'passed'
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      studentEmail: 'mike@example.com',
      examId: 1,
      examTitle: 'React Fundamentals Test',
      score: 50,
      totalQuestions: 2,
      correctAnswers: 1,
      answers: {
        101: 0,
        102: 1 // wrong answer
      },
      submittedAt: 'Oct 11, 2025',
      status: 'failed'
    }
  ];

  const getExamDetails = (examId) => {
    return exams.find(e => e.id === examId);
  };

  // Filter results based on selected exam
  const filteredResults = selectedExamFilter === 'all' 
    ? studentResults 
    : studentResults.filter(r => r.examId === parseInt(selectedExamFilter));

  // Get exam-wise statistics
  const getExamStats = (examId) => {
    const examResults = studentResults.filter(r => r.examId === examId);
    if (examResults.length === 0) return null;
    
    const totalAttempts = examResults.length;
    const passed = examResults.filter(r => r.status === 'passed').length;
    const avgScore = (examResults.reduce((sum, r) => sum + r.score, 0) / totalAttempts).toFixed(0);
    
    return { totalAttempts, passed, avgScore };
  };

  const ResultDetailModal = ({ result, onClose }) => {
    const exam = getExamDetails(result.examId);
    if (!exam) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-6 border-b flex justify-between items-center bg-linear-to-r from-indigo-50 to-purple-50">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{result.studentName}'s Result</h2>
              <p className="text-sm text-gray-600 mt-1">
                {result.examTitle} • Score: {result.score}% • {result.correctAnswers}/{result.totalQuestions} Correct
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-lg transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 font-semibold">Total Questions</p>
                  <p className="text-3xl font-bold text-blue-600">{result.totalQuestions}</p>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 font-semibold">Correct Answers</p>
                  <p className="text-3xl font-bold text-green-600">{result.correctAnswers}</p>
                </div>
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 font-semibold">Wrong Answers</p>
                  <p className="text-3xl font-bold text-red-600">{result.totalQuestions - result.correctAnswers}</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4 text-gray-800">Detailed Answers</h3>
            <div className="space-y-4">
              {exam.questions.map((question, idx) => {
                const studentAnswer = result.answers[question.id];
                const isCorrect = studentAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className={'border-2 rounded-lg p-4 ' + (isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50')}>
                    <div className="flex items-start justify-between mb-3">
                      <p className="font-semibold text-gray-800 flex items-start gap-2">
                        <span className={'px-2 py-1 rounded text-sm text-white ' + (isCorrect ? 'bg-green-600' : 'bg-red-600')}>
                          Q{idx + 1}
                        </span>
                        <span>{question.question}</span>
                      </p>
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                      ) : (
                        <X className="w-6 h-6 text-red-600 shrink-0" />
                      )}
                    </div>

                    <div className="space-y-2 ml-10">
                      {question.options.map((option, optIdx) => {
                        const isStudentAnswer = studentAnswer === optIdx;
                        const isCorrectAnswer = question.correctAnswer === optIdx;
                        
                        let className = 'p-3 rounded-lg border-2 flex items-center gap-2 ';
                        
                        if (isCorrectAnswer) {
                          className += 'border-green-500 bg-green-100';
                        } else if (isStudentAnswer && !isCorrect) {
                          className += 'border-red-500 bg-red-100';
                        } else {
                          className += 'border-gray-200 bg-gray-50';
                        }

                        return (
                          <div key={optIdx} className={className}>
                            <span className="font-medium text-gray-700 w-6">{String.fromCharCode(65 + optIdx)}.</span>
                            <span className={isCorrectAnswer ? 'text-green-800 font-semibold' : 'text-gray-700'}>
                              {option}
                            </span>
                            {isCorrectAnswer && (
                              <span className="ml-auto text-green-600 text-sm font-semibold">✓ Correct Answer</span>
                            )}
                            {isStudentAnswer && !isCorrect && (
                              <span className="ml-auto text-red-600 text-sm font-semibold">✗ Student Answer</span>
                            )}
                            {isStudentAnswer && isCorrect && (
                              <span className="ml-auto text-green-600 text-sm font-semibold">✓ Student Answer</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 border-t bg-gray-50">
            <button onClick={onClose} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Student Performance</h2>
      
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600 font-semibold">Total Students</p>
        <Users className="w-8 h-8 text-indigo-500" />
      </div>
      <p className="text-3xl font-bold text-gray-800">{registeredUsers.length}</p>
      <p className="text-xs text-gray-500 mt-1">Registered users</p>
    </div>

    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600 font-semibold">Exams Taken</p>
        <FileText className="w-8 h-8 text-green-500" />
      </div>
      <p className="text-3xl font-bold text-gray-800">{filteredResults.length}</p>
      <p className="text-xs text-gray-500 mt-1">Total attempts</p>
    </div>

    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600 font-semibold">Avg Score</p>
        <TrendingUp className="w-8 h-8 text-blue-500" />
      </div>
      <p className="text-3xl font-bold text-gray-800">
        {filteredResults.length > 0 
          ? (filteredResults.reduce((sum, r) => sum + r.score, 0) / filteredResults.length).toFixed(0) 
          : 0}%
      </p>
      <p className="text-xs text-gray-500 mt-1">Overall average</p>
    </div>

    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600 font-semibold">Pass Rate</p>
        <CheckCircle className="w-8 h-8 text-green-500" />
      </div>
      <p className="text-3xl font-bold text-gray-800">
        {filteredResults.length > 0
          ? ((filteredResults.filter(r => r.status === 'passed').length / filteredResults.length) * 100).toFixed(0)
          : 0}%
      </p>
      <p className="text-xs text-gray-500 mt-1">Success rate</p>
    </div>
  </div>

      {/* Exam-wise Statistics */}
      <div className="bg-linear-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Exam-wise Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.filter(exam => exam.status === 'active').map(exam => {
            const stats = getExamStats(exam.id);
            if (!stats) return null;
            
            return (
              <div key={exam.id} className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4">
                <h4 className="font-bold text-lg mb-2">{exam.title}</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-white/90">📝 {stats.totalAttempts} students attempted</p>
                  <p className="text-white/90">✓ {stats.passed} students passed</p>
                  <p className="text-white/90">📊 {stats.avgScore}% average score</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Dropdown */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Student Results</h3>
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-gray-700">Filter by Exam:</label>
            <div className="relative">
              <select 
                value={selectedExamFilter}
                onChange={(e) => setSelectedExamFilter(e.target.value)}
                className="appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-2 pr-10 focus:border-indigo-500 focus:outline-none font-semibold text-gray-700 cursor-pointer">
                <option value="all">All Exams</option>
                {exams.filter(exam => exam.status === 'active').map(exam => (
                  <option key={exam.id} value={exam.id}>
                    {exam.title} ({studentResults.filter(r => r.examId === exam.id).length} students)
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {filteredResults.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No results found for this exam</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Exam</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Score</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Correct/Total</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map(result => (
                  <tr key={result.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-gray-800">{result.studentName}</p>
                        <p className="text-xs text-gray-500">{result.studentEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{result.examTitle}</td>
                    <td className="px-4 py-3">
                      <span className={'px-3 py-1 rounded-full text-sm font-semibold ' + (result.status === 'passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}>
                        {result.score}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-gray-700">
                        {result.correctAnswers}/{result.totalQuestions}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={'px-3 py-1 rounded-full text-xs font-semibold ' + (result.status === 'passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}>
                        {result.status === 'passed' ? '✓ Passed' : '✗ Failed'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{result.submittedAt}</td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => setViewingResult(result)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {viewingResult && (
        <ResultDetailModal 
          result={viewingResult} 
          onClose={() => setViewingResult(null)} 
        />
      )}
    </div>
  );
}

export default Students;