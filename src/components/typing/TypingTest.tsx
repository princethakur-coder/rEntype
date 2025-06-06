import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Play, Pause, BarChart2, Timer } from 'lucide-react';
import TypingMetrics from './TypingMetrics';
import { useSampleText } from '../../hooks/useSampleText';

interface TypingTestProps {
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
  onComplete?: (results: TestResults) => void;
}

export interface TestResults {
  wpm: number;
  accuracy: number;
  errorCount: number;
  duration: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  completedText: string;
}

const TypingTest: React.FC<TypingTestProps> = ({
  difficulty = 'medium',
  category = 'general',
  onComplete,
}) => {
  const { text, loading, error, fetchNewText } = useSampleText(difficulty, category);
  const [input, setInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLimit, setTimeLimit] = useState<number>(60); // Default 1 minute
  const [remainingTime, setRemainingTime] = useState<number>(60);

  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle keyboard events for both desktop and mobile
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive && !completed) {
        handleStart();
      }
      
      if (completed) return;

        // Only process printable characters
        if (e.key === ' ') {
          e.preventDefault(); // <--- Add this line to stop scrolling
        }
      
      // Only process printable characters
      if (e.key.length === 1) {
        const value = input + e.key;
        handleInputChange(value);
      } else if (e.key === 'Backspace') {
        handleInputChange(input.slice(0, -1));
      }
    };

    // Handle mobile input
    const handleMobileInput = (e: Event) => {
      const inputElement = e.target as HTMLInputElement;
      handleInputChange(inputElement.value);
    };

    document.addEventListener('keydown', handleKeyDown);
    if (inputRef.current) {
      inputRef.current.addEventListener('input', handleMobileInput);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (inputRef.current) {
        inputRef.current.removeEventListener('input', handleMobileInput);
      }
    };
  }, [isActive, completed, input, text]);

  // Timer countdown
  useEffect(() => {
    if (isActive && !completed) {
      timerRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            completeTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, completed]);

  // Start the test
  const handleStart = useCallback(() => {
    if (!isActive && !completed) {
      setIsActive(true);
      setStartTime(Date.now());
      setRemainingTime(timeLimit);
      
      // Focus the input field
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isActive, completed, timeLimit]);

  // Calculate metrics
  const calculateMetrics = useCallback(() => {
    if (!startTime || !isActive) return;
    
    const currentTime = Date.now();
    const elapsedMinutes = (currentTime - startTime) / 60000;
    
    // Standard WPM calculation (5 chars = 1 word)
    const typedWords = input.length / 5;
    const currentWpm = Math.round(typedWords / elapsedMinutes);
    
    // Accuracy calculation
    const totalChars = correctChars + incorrectChars;
    const currentAccuracy = totalChars === 0 
      ? 100 
      : Math.round((correctChars / totalChars) * 100);
    
    setWpm(currentWpm);
    setAccuracy(currentAccuracy);
  }, [startTime, isActive, input.length, correctChars, incorrectChars]);

  // Update metrics every second
  useEffect(() => {
    if (isActive && !completed) {
      intervalRef.current = setInterval(calculateMetrics, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, completed, calculateMetrics]);

  // Process input
  const handleInputChange = (value: string) => {
    if (completed) return;
    
    // Start test on first keystroke
    if (!isActive) {
      handleStart();
    }
    
    // Check if the current character is correct
    if (value.length > input.length) {
      const lastChar = value[value.length - 1];
      const isCorrect = text[currentCharIndex] === lastChar;
      
      if (isCorrect) {
        setCorrectChars(prev => prev + 1);
      } else {
        setIncorrectChars(prev => prev + 1);
        setErrorCount(prev => prev + 1);
      }
      
      setCurrentCharIndex(prev => prev + 1);
    } else if (value.length < input.length) {
      // Handle backspace
      setCurrentCharIndex(prev => Math.max(0, prev - 1));
    }
    
    setInput(value);
    
    // Check if test is completed
    if (currentCharIndex >= text.length - 1) {
      completeTest();
    }
  };

  // Complete the test
  const completeTest = () => {
    setIsActive(false);
    setCompleted(true);
    setEndTime(Date.now());
    
    if (startTime) {
      const duration = (Date.now() - startTime) / 1000; // in seconds
      const totalChars = correctChars + incorrectChars;
      
      const results: TestResults = {
        wpm,
        accuracy,
        errorCount,
        duration,
        correctChars,
        incorrectChars,
        totalChars,
        completedText: input,
      };
      
      if (onComplete) {
        onComplete(results);
      }
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Reset the test
  const resetTest = () => {
    setInput('');
    setIsActive(false);
    setStartTime(null);
    setEndTime(null);
    setCurrentCharIndex(0);
    setErrorCount(0);
    setCorrectChars(0);
    setIncorrectChars(0);
    setCompleted(false);
    setWpm(0);
    setAccuracy(100);
    setRemainingTime(timeLimit);
    
    fetchNewText();
  };

  // Toggle pause
  const togglePause = () => {
    if (completed) return;
    setIsActive(prev => !prev);
  };

  // Format remaining time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Render text with appropriate styling
  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = 'typing-character';
      
      if (index === currentCharIndex) {
        className += ' typing-character-current';
      } else if (index < input.length) {
        className += input[index] === char 
          ? ' typing-character-correct' 
          : ' typing-character-incorrect';
      }
      
      return (
        <span key={index} className={className}>
          {char}
          {index === currentCharIndex && (
            <span className="typing-cursor">|</span>
          )}
        </span>
      );
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-error-500 text-center p-4">
        Error loading text. Please try again.
      </div>
    );
  }

  return (
    <div className="card max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Typing Test</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Timer className="h-5 w-5 text-gray-500" />
            <select
              value={timeLimit}
              onChange={(e) => {
                setTimeLimit(Number(e.target.value));
                setRemainingTime(Number(e.target.value));
              }}
              className="input py-1 px-2"
              disabled={isActive || completed}
            >
              <option value={30}>30s</option>
              <option value={60}>1min</option>
              <option value={300}>5min</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={resetTest}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Reset test"
            >
              <RefreshCw size={18} />
            </button>
            {!completed && (
              <button
                onClick={togglePause}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label={isActive ? "Pause test" : "Resume test"}
                disabled={!startTime && !isActive}
              >
                {isActive ? <Pause size={18} /> : <Play size={18} />}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="text-xl font-mono text-center mb-4">
        {formatTime(remainingTime)}
      </div>

      <TypingMetrics 
        wpm={wpm} 
        accuracy={accuracy} 
        isActive={isActive} 
        completed={completed}
      />

      <motion.div 
        className="mt-6 p-4 rounded-md bg-gray-50 dark:bg-gray-800/50 font-mono text-lg leading-relaxed relative min-h-[150px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleStart}
      >
        {!isActive && !startTime && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-md z-10">
            <button
              onClick={handleStart}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Play size={18} />
              <span>Start Typing</span>
            </button>
          </div>
        )}
        <div className="typing-text mb-4">{renderText()}</div>
      </motion.div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        className="sr-only"
        aria-label="Typing input"
        disabled={!isActive || completed}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      {completed && (
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-md">
            <div className="flex items-center mb-2">
              <BarChart2 size={18} className="text-primary-500 mr-2" />
              <h3 className="font-medium">Test Results</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">WPM</p>
                <p className="text-2xl font-bold text-primary-500">{wpm}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
                <p className="text-2xl font-bold text-secondary-500">{accuracy}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Errors</p>
                <p className="text-2xl font-bold text-error-500">{errorCount}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                <p className="text-2xl font-bold text-accent-500">
                  {startTime && endTime 
                    ? Math.round((endTime - startTime) / 1000) 
                    : 0}s
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button onClick={resetTest} className="btn btn-primary">
                Try Again
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TypingTest;