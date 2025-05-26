import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Check, Zap } from 'lucide-react';

interface TypingMetricsProps {
  wpm: number;
  accuracy: number;
  isActive: boolean;
  completed: boolean;
}

const TypingMetrics: React.FC<TypingMetricsProps> = ({
  wpm,
  accuracy,
  isActive,
  completed,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <motion.div
        className="flex flex-col items-center p-2 rounded-md bg-primary-50 dark:bg-primary-900/20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <div className="flex items-center mb-1">
          <Zap size={14} className="text-primary-500 mr-1" />
          <span className="text-xs text-gray-500 dark:text-gray-400">WPM</span>
        </div>
        <span className={`text-xl font-bold ${isActive || completed ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>
          {wpm}
        </span>
      </motion.div>

      <motion.div
        className="flex flex-col items-center p-2 rounded-md bg-secondary-50 dark:bg-secondary-900/20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <div className="flex items-center mb-1">
          <Check size={14} className="text-secondary-500 mr-1" />
          <span className="text-xs text-gray-500 dark:text-gray-400">Accuracy</span>
        </div>
        <span className={`text-xl font-bold ${isActive || completed ? 'text-secondary-600 dark:text-secondary-400' : 'text-gray-400'}`}>
          {accuracy}%
        </span>
      </motion.div>

      <motion.div
        className="flex flex-col items-center p-2 rounded-md bg-accent-50 dark:bg-accent-900/20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.3 }}
      >
        <div className="flex items-center mb-1">
          <Timer size={14} className="text-accent-500 mr-1" />
          <span className="text-xs text-gray-500 dark:text-gray-400">Time</span>
        </div>
        <span className={`text-xl font-bold ${isActive ? 'text-accent-600 dark:text-accent-400' : 'text-gray-400'}`}>
          {isActive ? (
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-accent-500 mr-1 animate-pulse"></span>
              Live
            </span>
          ) : completed ? (
            "Done"
          ) : (
            "0:00"
          )}
        </span>
      </motion.div>
    </div>
  );
};

export default TypingMetrics;