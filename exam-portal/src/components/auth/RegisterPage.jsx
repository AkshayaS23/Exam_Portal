import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

function RegisterPage({ onRegister, showNotification }) {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const handleRegister = () => {
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      showNotification('Passwords do not match', 'error');
      return;
    }
    const success = onRegister(registerForm);
    if (success) {
      setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-6 text-center">
          <FileText className="w-16 h-16 mx-auto text-white mb-3" />
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-indigo-100">Join us today</p>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={registerForm.name}
                onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                placeholder="John Doe" 
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                value={registerForm.email}
                onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                placeholder="student@example.com" 
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input 
                type="password" 
                value={registerForm.password}
                onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                placeholder="••••••••" 
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input 
                type="password" 
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                placeholder="••••••••" 
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none" 
              />
            </div>
            <button 
              onClick={handleRegister}
              className="w-full py-4 rounded-lg font-bold text-white shadow-lg transition bg-indigo-600 hover:bg-indigo-700">
              Create Account
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')} 
              className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default RegisterPage;
