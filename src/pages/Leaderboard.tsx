import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Mock data for demonstration
const mockLeaderboardData = [
  { id: 1, rank: 1, username: 'Prince', wpm: 148, accuracy: 98.7, tests: 253 },
  { id: 2, rank: 2, username: 'Rahul', wpm: 142, accuracy: 97.5, tests: 178 },
  { id: 3, rank: 3, username: 'Shubham', wpm: 136, accuracy: 96.8, tests: 321 },
  { id: 4, rank: 4, username: 'Sumit', wpm: 131, accuracy: 98.2, tests: 145 },
  { id: 5, rank: 5, username: 'Ujjwal', wpm: 129, accuracy: 95.9, tests: 232 },
  { id: 6, rank: 6, username: 'Sia', wpm: 124, accuracy: 97.1, tests: 189 },
  { id: 7, rank: 7, username: 'Prapti', wpm: 122, accuracy: 96.5, tests: 210 },
  { id: 8, rank: 8, username: 'Rohit', wpm: 119, accuracy: 95.8, tests: 175 },
  { id: 9, rank: 9, username: 'Deepti', wpm: 117, accuracy: 94.9, tests: 163 },
  { id: 10, rank: 10, username: 'Subhdeep', wpm: 115, accuracy: 97.2, tests: 142 },
  { id: 11, rank: 11, username: 'Joshdeep', wpm: 114, accuracy: 96.1, tests: 135 },
  { id: 12, rank: 12, username: 'Pooja', wpm: 112, accuracy: 95.5, tests: 128 },
  { id: 13, rank: 13, username: 'Sanjana', wpm: 110, accuracy: 94.8, tests: 154 },
  { id: 14, rank: 14, username: 'Parul', wpm: 108, accuracy: 95.2, tests: 112 },
  { id: 15, rank: 15, username: 'Mohit', wpm: 107, accuracy: 96.3, tests: 98 },
];

// Function to get rank medal icon or text
const getRankIndicator = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Medal className="h-5 w-5 text-amber-700" />;
    default:
      return <span className="text-gray-500">{rank}</span>;
  }
};

const Leaderboard: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFrame, setTimeFrame] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [leaderboardData, setLeaderboardData] = useState(mockLeaderboardData);
  const [filteredData, setFilteredData] = useState(mockLeaderboardData);
  const itemsPerPage = 10;

  useEffect(() => {
    // In a real app, we would fetch leaderboard data from the API
    // fetchLeaderboard(timeFrame).then(data => setLeaderboardData(data));
    
    // Using mock data for demonstration
    setLeaderboardData(mockLeaderboardData);
  }, [timeFrame]);

  useEffect(() => {
    // Filter data based on search term
    const filtered = leaderboardData.filter(item =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, leaderboardData]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Find current user's position if they're logged in
  const userPosition = user
    ? leaderboardData.findIndex(item => item.username === user.username) + 1
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-2">Global Leaderboard</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          See where you stand among the world's fastest typists. Compete and climb the rankings!
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search by username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setTimeFrame('daily')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeFrame === 'daily'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeFrame('weekly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeFrame === 'weekly'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeFrame('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeFrame === 'all'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        <motion.div
          className="card overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {userPosition && (
            <div className="bg-primary-50 dark:bg-primary-900/20 p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-12 text-center">
                  <span className="text-gray-500">{userPosition}</span>
                </div>
                <div className="flex-grow">
                  <span className="font-medium text-primary-600 dark:text-primary-400">
                    You ({user.username})
                  </span>
                </div>
                <div className="w-20 text-center">
                  <span className="font-medium">
                    {leaderboardData[userPosition - 1]?.wpm || 0}
                  </span>
                </div>
                <div className="w-20 text-center hidden md:block">
                  <span>{leaderboardData[userPosition - 1]?.accuracy || 0}%</span>
                </div>
                <div className="w-20 text-center hidden md:block">
                  <span>{leaderboardData[userPosition - 1]?.tests || 0}</span>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20 text-center">
                    WPM
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20 text-center hidden md:table-cell">
                    Accuracy
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20 text-center hidden md:table-cell">
                    Tests
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                      item.username === user?.username
                        ? 'bg-primary-50 dark:bg-primary-900/20'
                        : ''
                    }`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap w-12 text-center">
                      <div className="flex justify-center items-center">
                        {getRankIndicator(item.rank)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="font-medium">
                        {item.username === user?.username ? (
                          <span className="text-primary-600 dark:text-primary-400">
                            {item.username} (You)
                          </span>
                        ) : (
                          item.username
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center font-semibold">
                      {item.wpm}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center hidden md:table-cell">
                      {item.accuracy}%
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center hidden md:table-cell">
                      {item.tests}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(startIndex + itemsPerPage, filteredData.length)}
                </span>{' '}
                of <span className="font-medium">{filteredData.length}</span> results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="px-3 py-1 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <div className="mt-8 text-center">
          <a href="/test" className="btn btn-primary">
            Take a Test & Compete
          </a>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;