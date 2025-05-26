import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import TypingTest from './pages/TypingTest';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/test" element={<TypingTest />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/profile" element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;