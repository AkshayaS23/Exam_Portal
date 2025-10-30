import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function Analytics() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-xl mb-4 text-gray-800">Performance by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              {cat: 'React', score: 85}, 
              {cat: 'JavaScript', score: 78}, 
              {cat: 'Web Dev', score: 92}
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cat" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-xl mb-4 text-gray-800">Pass/Fail Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={[{name: 'Pass', value: 2}, {name: 'Fail', value: 1}]} 
                cx="50%" 
                cy="50%" 
                outerRadius={100} 
                dataKey="value" 
                label>
                <Cell fill="#10B981" />
                <Cell fill="#EF4444" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;