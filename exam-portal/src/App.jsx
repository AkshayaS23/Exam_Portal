import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// 🏠 Common Components
import HomePage from './components/common/HomePage';
import NotificationBar from './components/common/NotificationBar';

// 🔐 Auth Components
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';

// 🎓 Student Components
import StudentDashboard from './components/student/StudentDashboard';
import ExamInstructions from './components/student/ExamInstructions';
import ExamTaking from './components/student/ExamTaking';
import ExamResults from './components/student/ExamResults';

// 🧑‍💼 Admin Components
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const [exams, setExams] = useState([
    {
      id: 1,
      title: "React Fundamentals Test",
      category: "React",
      duration: 30,
      scheduledDate: "2025-10-28",
      status: "active",
      questions: [
        {
          id: 101,
          question: "What is React?",
          options: ["JavaScript Library", "Programming Language", "Database", "Operating System"],
          correctAnswer: 0
        },
        {
          id: 102,
          question: "What does JSX stand for?",
          options: ["JavaScript XML", "Java Syntax Extension", "JSON X-ray", "JavaScript Extra"],
          correctAnswer: 0
        }
      ]
    }
  ]);

  const [categories, setCategories] = useState(['React', 'JavaScript', 'Web Dev', 'Python', 'Database']);
  const [selectedExam, setSelectedExam] = useState(null);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1800);

  const location = useLocation();
  const navigate = useNavigate();

  // 🔔 Notification Function
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  // 🔑 Login Function
  const handleLogin = (email, password, role) => {
    if (role === 'student') {
      const user = registeredUsers.find(u => u.email === email && u.password === password);
      if (!user) {
        showNotification('Invalid credentials or user not registered. Please register first.', 'error');
        return false;
      }
      setCurrentUser(user);
    }
    setUserRole(role);
    showNotification(`Welcome! Logged in successfully as ${role}`, 'success');
    return true;
  };

  // 📝 Register Function
  const handleRegister = (registerForm) => {
    if (registeredUsers.some(u => u.email === registerForm.email)) {
      showNotification('Email already registered', 'error');
      return false;
    }
    setRegisteredUsers([...registeredUsers, registerForm]);
    showNotification('Registration successful! Please login.', 'success');
    return true;
  };

  // 🚪 Logout Function
  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setSelectedExam(null);
    setStudentAnswers({});
    setCurrentQuestionIndex(0);
    showNotification('Logged out successfully', 'success');
    
    // redirect to homepage after short delay for smooth UX
    setTimeout(() => navigate('/'), 800);
  };

  // ▶️ Start Exam Function
  const handleStartExam = (exam) => {
    if (exam.questions.length === 0) {
      showNotification('This exam has no questions yet', 'error');
      return false;
    }
    setSelectedExam(exam);
    setStudentAnswers({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(exam.duration * 60);
    return true;
  };

  // 🔒 Protected Route
  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!userRole) return <Navigate to="/login" replace />;
    if (allowedRole && userRole !== allowedRole) return <Navigate to="/login" replace />;
    return children;
  };

  // ✨ Page transition animation
  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -30 }
  };

  const pageTransition = {
    duration: 0.5,
    ease: "easeInOut"
  };

  return (
    <>
      <NotificationBar notification={notification} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* 🏠 Home Page */}
          <Route
            path="/"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {userRole ? (
                  <Navigate to={userRole === 'student' ? '/student/dashboard' : '/admin/dashboard'} replace />
                ) : (
                  <HomePage />
                )}
              </motion.div>
            }
          />

          {/* 🔐 Auth Routes */}
          <Route
            path="/login"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {userRole ? (
                  <Navigate to={userRole === 'student' ? '/student/dashboard' : '/admin/dashboard'} replace />
                ) : (
                  <LoginPage onLogin={handleLogin} showNotification={showNotification} />
                )}
              </motion.div>
            }
          />
          <Route
            path="/register"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {userRole ? (
                  <Navigate to={userRole === 'student' ? '/student/dashboard' : '/admin/dashboard'} replace />
                ) : (
                  <RegisterPage onRegister={handleRegister} showNotification={showNotification} />
                )}
              </motion.div>
            }
          />

          {/* 🎓 Student Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRole="student">
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                  <StudentDashboard exams={exams} onStartExam={handleStartExam} onLogout={handleLogout} />
                </motion.div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/exam/instructions"
            element={
              <ProtectedRoute allowedRole="student">
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                  {selectedExam ? <ExamInstructions exam={selectedExam} /> : <Navigate to="/student/dashboard" replace />}
                </motion.div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/exam/take"
            element={
              <ProtectedRoute allowedRole="student">
                {selectedExam ? (
                  <ExamTaking
                    exam={selectedExam}
                    currentQuestionIndex={currentQuestionIndex}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                    studentAnswers={studentAnswers}
                    setStudentAnswers={setStudentAnswers}
                    timeRemaining={timeRemaining}
                    setTimeRemaining={setTimeRemaining}
                  />
                ) : (
                  <Navigate to="/student/dashboard" replace />
                )}
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/exam/results"
            element={
              <ProtectedRoute allowedRole="student">
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                  {selectedExam ? (
                    <ExamResults exam={selectedExam} studentAnswers={studentAnswers} onRetake={handleStartExam} />
                  ) : (
                    <Navigate to="/student/dashboard" replace />
                  )}
                </motion.div>
              </ProtectedRoute>
            }
          />

          {/* 🧑‍💼 Admin Routes - NO ANIMATION WRAPPER */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard
                  exams={exams}
                  setExams={setExams}
                  categories={categories}
                  setCategories={setCategories}
                  registeredUsers={registeredUsers}
                  onLogout={handleLogout}
                  showNotification={showNotification}
                />
              </ProtectedRoute>
            }
          />

          {/* 🌐 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;