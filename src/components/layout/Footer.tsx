import React from 'react';
import { Keyboard, Github, Twitter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Keyboard className="h-5 w-5 text-primary-500" />
              <span className="text-lg font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                rEnType
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Enhance your typing skills with our professional typing test platform. 
              Track your progress, compete with others, and become a typing master.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/princethakur-coder" className="text-gray-500 hover:text-primary-500 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://github.com/princethakur-coder" className="text-gray-500 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/test" className="hover:text-primary-500 transition-colors">Typing Test</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-primary-500 transition-colors">Leaderboard</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-primary-500 transition-colors">Profile</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors">Typing Tips</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart size={14} className="text-error-500" /> by Prince Thakur &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;