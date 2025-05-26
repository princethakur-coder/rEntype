import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ChevronDown, Clock, TrendingUp, BarChart, Settings, ChevronUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Mock data for demo purposes
const mockUserStats = {
  averageWpm: 65,
  bestWpm: 85,
  averageAccuracy: 94.2,
  testsCompleted: 42,
  totalTimePracticed: '5h 23m',
  skillLevel: 'Intermediate',
  testHistory: [
    { id: 1, date: '2023-11-20', wpm: 68, accuracy: 95.1, difficulty: 'medium' },
    { id: 2, date: '2023-11-19', wpm: 72, accuracy: 93.8, difficulty: 'medium' },
    { id: 3, date: '2023-11-18', wpm: 63, accuracy: 92.5, difficulty: 'medium' },
    { id: 4, date: '2023-11-17', wpm: 70, accuracy: 96.2, difficulty: 'easy' },
    { id: 5, date: '2023-11-16', wpm: 65, accuracy: 94.7, difficulty: 'hard' },
    { id: 6, date: '2023-11-15', wpm: 62, accuracy: 93.9, difficulty: 'medium' },
    { id: 7, date: '2023-11-14', wpm: 58, accuracy: 91.8, difficulty: 'easy' },
    { id: 8, date: '2023-11-13', wpm: 67, accuracy: 94.3, difficulty: 'medium' },
  ],
};

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [userStats, setUserStats] = useState(mockUserStats);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // In a real app, we would fetch user stats from the backend
    // fetchUserStats(user._id).then(stats => setUserStats(stats));
    
    // Using mock data for demonstration
    setUserStats(mockUserStats);
  }, [user]);

  const statCards = [
    {
      title: 'Average WPM',
      value: userStats.averageWpm,
      icon: <TrendingUp className="h-5 w-5 text-primary-500" />,
      color: 'primary',
    },
    {
      title: 'Best WPM',
      value: userStats.bestWpm,
      icon: <Award className="h-5 w-5 text-secondary-500" />,
      color: 'secondary',
    },
    {
      title: 'Average Accuracy',
      value: `${userStats.averageAccuracy}%`,
      icon: <BarChart className="h-5 w-5 text-accent-500" />,
      color: 'accent',
    },
    {
      title: 'Tests Completed',
      value: userStats.testsCompleted,
      icon: <Clock className="h-5 w-5 text-success-500" />,
      color: 'success',
    },
  ];

  const displayedHistory = showAllHistory
    ? userStats.testHistory
    : userStats.testHistory.slice(0, 5);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-success-500 bg-success-50 dark:bg-success-900/20';
      case 'medium':
        return 'text-primary-500 bg-primary-50 dark:bg-primary-900/20';
      case 'hard':
        return 'text-error-500 bg-error-50 dark:bg-error-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="card mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                {user?.username.substring(0, 2).toUpperCase()}
              </span>
            </div>

            <div className="flex-grow">
              <h1 className="text-2xl font-bold">{user?.username}</h1>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
              <div className="mt-2 flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300">
                  {userStats.skillLevel}
                </span>
                <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                  {userStats.totalTimePracticed} practice time
                </span>
              </div>
            </div>

            <button className="btn btn-outline flex items-center gap-1">
              <Settings size={16} />
              <span>Edit Profile</span>
            </button>
          </div>
        </motion.div>

        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tests'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Test History
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'achievements'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Achievements
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  className="card p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start">
                    <div className={`rounded-full p-2 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 mr-3`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Tests</h2>
                <button
                  onClick={() => setActiveTab('tests')}
                  className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 flex items-center"
                >
                  View all
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        WPM
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Accuracy
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Difficulty
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {userStats.testHistory.slice(0, 5).map((test) => (
                      <tr key={test.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {formatDate(test.date)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          {test.wpm}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {test.accuracy}%
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                              test.difficulty
                            )}`}
                          >
                            {test.difficulty}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}

        {activeTab === 'tests' && (
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4">Test History</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      WPM
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Accuracy
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Difficulty
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {displayedHistory.map((test) => (
                    <tr key={test.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {formatDate(test.date)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        {test.wpm}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {test.accuracy}%
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                            test.difficulty
                          )}`}
                        >
                          {test.difficulty}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {userStats.testHistory.length > 5 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAllHistory(!showAllHistory)}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
                  {showAllHistory ? (
                    <>
                      Show less
                      <ChevronUp size={16} className="ml-1" />
                    </>
                  ) : (
                    <>
                      Show all ({userStats.testHistory.length})
                      <ChevronDown size={16} className="ml-1" />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'achievements' && (
          <div className="card">
            <h2 className="text-lg font-semibold mb-6">Achievements</h2>

            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Achievements coming soon! Keep practicing to unlock rewards.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;