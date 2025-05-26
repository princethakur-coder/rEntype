import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Keyboard, Moon, Sun, Menu, X, User, Award, Home } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { to: '/', label: 'Home', icon: <Home size={18} /> },
    { to: '/test', label: 'Typing Test', icon: <Keyboard size={18} /> },
    { to: '/leaderboard', label: 'Leaderboard', icon: <Award size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Keyboard className="h-6 w-6 text-primary-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              rEnType
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-1 text-sm font-medium hover:text-primary-500 transition-colors ${
                  location.pathname === link.to
                    ? 'text-primary-500'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Right Nav Section */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <div className="bg-primary-100 dark:bg-primary-900 w-8 h-8 rounded-full flex items-center justify-center">
                    <User size={16} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="font-medium">{user.username}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-error-600 dark:text-error-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="btn btn-outline text-sm">
                  Log In
                </Link>
                <Link to="/register" className="btn btn-primary text-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="mt-4 space-y-2 pb-4">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center space-x-2 p-3 rounded-md ${
                      location.pathname === link.to
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}

                <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-2">
                  <button
                    onClick={toggleTheme}
                    className="flex w-full items-center space-x-2 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                  </button>
                </div>

                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <User size={18} />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="flex w-full items-center space-x-2 p-3 rounded-md text-error-600 dark:text-error-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <span>Sign out</span>
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" className="block w-full btn btn-outline text-center">
                      Log In
                    </Link>
                    <Link to="/register" className="block w-full btn btn-primary text-center">
                      Sign Up
                    </Link>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;