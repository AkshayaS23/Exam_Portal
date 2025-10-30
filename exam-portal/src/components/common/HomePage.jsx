import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Users, FileQuestion, CheckCircle } from 'lucide-react';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-800">ExamPortal</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-indigo-600 font-semibold"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

     {/* Hero Section */}
<div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-12 mt-14">
  {/* Left Side - Text & Buttons */}
  <div className="text-left md:w-1/2 ml-20">
    <h1 className="text-5xl font-bold text-gray-800 mb-6">
      Welcome to ExamPortal
    </h1>
    <p className="text-xl text-gray-600 mb-8 max-w-lg">
      A modern platform for online exams — secure, fast, and easy to use for both students and administrators.
    </p>
    <div className="flex flex-wrap gap-6">
      <button
        onClick={() => navigate('/login')}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 shadow-lg"
      >
        <Users className="w-5 h-5" /> Login as Student
      </button>
      <button
        onClick={() => navigate('/login')}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 shadow-lg"
      >
        <FileText className="w-5 h-5" /> Login as Admin
      </button>
    </div>
  </div>

  {/* Right Side - Online Examination Card */}
  <div className="relative md:w-1/2 flex justify-center mr-20">
    <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 w-[80%]">
      <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white transform -rotate-3 text-center">
        <FileQuestion className="w-24 h-24 mb-4 opacity-80 mx-auto" />
        <h3 className="text-2xl font-bold mb-2">Online Examination</h3>
        <p className="text-indigo-100">Secure, Fast & Reliable</p>
      </div>
    </div>
    <div className="absolute -bottom-3 -right-1 bg-green-500 rounded-full w-32 h-32 flex items-center justify-center shadow-xl">
      <CheckCircle className="w-16 h-16 text-white" />
    </div>
  </div>
</div>


      {/* Footer */}
     <footer className="bg-gray-800 text-white py-6 fixed bottom-0 left-0 w-full z-50">
        <div className="container mx-auto px-6 text-center">
            <p className="text-gray-400">© 2025 ExamPortal. All rights reserved.</p>
        </div>
    </footer>
    </div>
  );
}

export default HomePage;
