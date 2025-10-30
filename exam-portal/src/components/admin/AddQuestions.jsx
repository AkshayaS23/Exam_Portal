import React, { useState } from 'react';
import { Upload, Plus } from 'lucide-react';
import Papa from 'papaparse';

function AddQuestions({ exams, setExams, showNotification }) {
  const [selectedExamForUpload, setSelectedExamForUpload] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    question: '', 
    options: ['', '', '', ''], 
    correctAnswer: 0
  });

  const handleFileUpload = (event, examId) => {
    const file = event.target.files[0];
    if (!file || !file.name.endsWith('.csv')) {
      showNotification('Please select a valid CSV file', 'error');
      return;
    }
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const newQs = results.data.map((row, i) => ({
          id: Date.now() + i,
          question: row.question?.trim() || '',
          options: [row.option1?.trim(), row.option2?.trim(), row.option3?.trim(), row.option4?.trim()],
          correctAnswer: (parseInt(row.correctAnswer) || 1) - 1
        })).filter(q => q.question && q.options.every(o => o));
        
        if (newQs.length === 0) {
          showNotification('No valid questions found in CSV', 'error');
          return;
        }
        
        setExams(exams.map(e => e.id === examId ? {...e, questions: [...e.questions, ...newQs]} : e));
        showNotification(`Successfully uploaded ${newQs.length} questions!`, 'success');
      },
      error: (error) => {
        showNotification('Error parsing CSV file', 'error');
      }
    });
    event.target.value = null;
  };

  const handleAddQuestionToExam = (examId) => {
    if (!newQuestion.question || newQuestion.options.some(opt => !opt)) {
      showNotification('Please fill all question fields', 'error');
      return;
    }
    setExams(exams.map(exam => exam.id === examId ? {...exam, questions: [...exam.questions, {id: Date.now(), ...newQuestion}]} : exam));
    setNewQuestion({question: '', options: ['', '', '', ''], correctAnswer: 0});
    showNotification('Question added successfully!', 'success');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Questions to Exam</h2>
      <select 
        value={selectedExamForUpload?.id || ''} 
        onChange={(e) => setSelectedExamForUpload(exams.find(ex => ex.id === parseInt(e.target.value)))} 
        className="w-full p-3 border-2 border-gray-300 rounded-lg mb-6 focus:border-indigo-500 focus:outline-none">
        <option value="">Select Exam to Add Questions</option>
        {exams.map(exam => <option key={exam.id} value={exam.id}>{exam.title} ({exam.questions.length} questions)</option>)}
      </select>
      {selectedExamForUpload && (
        <div className="space-y-6">
          <div className="bg-linear-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Upload className="w-6 h-6" />
              Upload Questions via CSV
            </h3>
            <p className="text-sm text-purple-100 mb-4">Upload a CSV file with columns: question, option1, option2, option3, option4, correctAnswer (1-4)</p>
            <label className="cursor-pointer block bg-white text-purple-600 py-3 px-6 rounded-lg text-center font-semibold hover:bg-gray-100 transition">
              <Upload className="w-5 h-5 inline mr-2" />
              Choose CSV File
              <input type="file" accept=".csv" onChange={(e) => handleFileUpload(e, selectedExamForUpload.id)} className="hidden" />
            </label>
          </div>
          <div className="border-2 border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Add Question Manually</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Question Text <span className="text-red-500">*</span></label>
                <textarea 
                  value={newQuestion.question} 
                  onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})} 
                  placeholder="Enter your question here..."
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none" 
                  rows="3" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Options <span className="text-red-500">*</span></label>
                {newQuestion.options.map((opt, idx) => (
                  <div key={idx} className="flex gap-2 mb-3">
                    <input 
                      type="text" 
                      value={opt} 
                      onChange={(e) => {
                        const opts = [...newQuestion.options]; 
                        opts[idx] = e.target.value; 
                        setNewQuestion({...newQuestion, options: opts});
                      }} 
                      placeholder={`Option ${idx + 1}`}
                      className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none" 
                    />
                    <button 
                      onClick={() => setNewQuestion({...newQuestion, correctAnswer: idx})} 
                      className={'px-6 py-3 rounded-lg font-semibold transition ' + (newQuestion.correctAnswer === idx ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}
                      title="Mark as correct answer"
                    >
                      {newQuestion.correctAnswer === idx ? '✓ Correct' : 'Mark Correct'}
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => handleAddQuestionToExam(selectedExamForUpload.id)} 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-lg">
                <Plus className="w-5 h-5 inline mr-2" />
                Add Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddQuestions;