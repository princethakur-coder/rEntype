import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import TypingTestComponent, { TestResults } from '../components/typing/TypingTest';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const TypingTest: React.FC = () => {
  const { user } = useAuth();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [category, setCategory] = useState('general');
  const [lastResults, setLastResults] = useState<TestResults | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleTestComplete = useCallback(async (results: TestResults) => {
    setLastResults(results);
    
    // Save results to backend if user is logged in
    if (user) {
      try {
        setIsSaving(true);
        // This would be connected to a real API endpoint
        // await axios.post('/api/tests', {
        //   userId: user._id,
        //   wpm: results.wpm,
        //   accuracy: results.accuracy,
        //   errorCount: results.errorCount,
        //   duration: results.duration,
        //   difficulty,
        //   category,
        // });
        
        // Simulate saving
        await new Promise(resolve => setTimeout(resolve, 800));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (err) {
        console.error('Error saving test results:', err);
      } finally {
        setIsSaving(false);
      }
    }
  }, [user, difficulty, category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-center mb-2">Typing Test</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          Improve your typing speed and accuracy with our professional typing test.
        </p>
      </motion.div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setDifficulty('easy')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                difficulty === 'easy'
                  ? 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => setDifficulty('medium')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                difficulty === 'medium'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setDifficulty('hard')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                difficulty === 'hard'
                  ? 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Hard
            </button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setCategory('general')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === 'general'
                  ? 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setCategory('code')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === 'code'
                  ? 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Code
            </button>
            <button
              onClick={() => setCategory('quotes')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === 'quotes'
                  ? 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Quotes
            </button>
          </div>
        </div>

        {isSaving && (
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary-500 mr-2"></div>
            <p className="text-sm text-gray-500">Saving your results...</p>
          </div>
        )}

        {saveSuccess && (
          <motion.div 
            className="bg-success-100 dark:bg-success-900/20 text-success-700 dark:text-success-400 text-sm text-center py-2 rounded-md mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Results saved successfully!
          </motion.div>
        )}
      </div>

      <TypingTestComponent
        difficulty={difficulty}
        category={category}
        onComplete={handleTestComplete}
      />

      {!user && (
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Create an account to save your results and track your progress over time.
          </p>
          <a href="/register" className="text-primary-600 dark:text-primary-400 hover:underline">
            Sign up now
          </a>
        </div>
      )}
    </div>
  );
};

export default TypingTest;