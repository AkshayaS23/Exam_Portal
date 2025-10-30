import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Users } from 'lucide-react';

function LoginPage({ onLogin, showNotification }) {
  const navigate = useNavigate();
  const [loginTab, setLoginTab] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    const role = loginTab === 'student' ? 'student' : 'admin';
    const success = onLogin(email, password, role);
    if (success) {
      setEmail('');
      setPassword('');
      navigate(role === 'student' ? '/student/dashboard' : '/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-6 text-center text-white">
          <FileText className="w-16 h-16 mx-auto mb-2" />
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-indigo-100">Sign in to continue</p>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setLoginTab('student')}
            className={`flex-1 py-4 font-semibold ${
              loginTab === 'student'
                ? 'text-green-600 border-b-4 border-green-600 bg-green-50'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5 inline mr-2" />
            Student
          </button>
          <button
            onClick={() => setLoginTab('admin')}
            className={`flex-1 py-4 font-semibold ${
              loginTab === 'admin'
                ? 'text-indigo-600 border-b-4 border-indigo-600 bg-indigo-50'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-5 h-5 inline mr-2" />
            Admin
          </button>
        </div>

        <div className="p-8 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleLogin}
            className={`w-full py-4 rounded-lg font-bold text-white shadow-lg transition ${
              loginTab === 'student'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            Sign In as {loginTab === 'student' ? 'Student' : 'Admin'}
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
