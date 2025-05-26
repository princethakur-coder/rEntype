import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Keyboard, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <motion.div
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Keyboard className="h-16 w-16 text-primary-500 mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary inline-flex items-center">
          <Home size={18} className="mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;