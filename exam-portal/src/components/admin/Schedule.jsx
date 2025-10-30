import React from 'react';

function Schedule({ exams }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Exam Schedule Calendar</h2>
      <div className="grid md:grid-cols-7 grid-cols-4 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold text-gray-700 py-2">{day}</div>
        ))}
        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35].map(i => {
          const date = new Date(2025, 9, i - 2);
          const dateStr = date.toISOString().split('T')[0];
          const examsOnDate = exams.filter(e => e.scheduledDate === dateStr);
          return (
            <div key={i} className={'min-h-24 p-2 border-2 rounded-lg transition hover:border-indigo-300 ' + (examsOnDate.length > 0 ? 'bg-indigo-50 border-indigo-200' : 'border-gray-200')}>
              <div className="font-bold text-sm text-gray-700">{date.getDate()}</div>
              {examsOnDate.map(exam => (
                <div key={exam.id} className="text-xs bg-indigo-600 text-white p-1 rounded mt-1 truncate" title={exam.title}>
                  {exam.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Schedule;