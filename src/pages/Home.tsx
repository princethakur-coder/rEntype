import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Keyboard, Clock, BarChart, Trophy, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Clock className="h-6 w-6 text-primary-500" />,
      title: "Real-time Metrics",
      description: "Track your typing speed (WPM) and accuracy as you type with live updates.",
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary-500" />,
      title: "Detailed Analysis",
      description: "Get comprehensive insights about your typing performance and areas for improvement.",
    },
    {
      icon: <Trophy className="h-6 w-6 text-primary-500" />,
      title: "Global Leaderboards",
      description: "Compete with typists from around the world and climb the rankings.",
    },
    {
      icon: <Keyboard className="h-6 w-6 text-primary-500" />,
      title: "Multiple Test Types",
      description: "Choose from various difficulty levels and specialized text categories.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 to-accent-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Become a Typing <span className="text-accent-200">Master</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-lg">
                Improve your typing speed and accuracy with our professional typing tests. 
                Track your progress and compete with others in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/test" className="btn bg-white text-primary-600 hover:bg-gray-100 font-medium">
                  Start Typing Test
                </Link>
                <Link to="/register" className="btn bg-primary-700/40 backdrop-blur-sm hover:bg-primary-700/60 text-white font-medium">
                  Create Account
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-full max-w-md p-4 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl border border-white/20">
                <div className="font-mono text-sm p-4 bg-gray-900/80 rounded mb-4 text-green-400">
                  <div className="mb-1">
                    <span className="text-white">const</span> <span className="text-accent-300">typingTest</span> = <span className="text-primary-300">{"{"}</span>
                  </div>
                  <div className="pl-4 mb-1">
                    <span className="text-primary-200">speed</span>: <span className="text-warning-300">75</span> <span className="text-gray-500">// wpm</span>
                  </div>
                  <div className="pl-4 mb-1">
                    <span className="text-primary-200">accuracy</span>: <span className="text-warning-300">98.5</span> <span className="text-gray-500">// percent</span>
                  </div>
                  <div className="pl-4 mb-1">
                    <span className="text-primary-200">progress</span>: <span className="text-secondary-300">'improving'</span>
                  </div>
                  <div>
                    <span className="text-primary-300">{"}"}</span><span className="typing-cursor animate-cursor-blink">|</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs text-white/70">
                  <div>rEnType v1.0</div>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse mr-1"></span>
                    Ready
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our typing test platform is designed to help you improve your typing skills with professional tools and metrics.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="card hover:translate-y-[-5px]"
                variants={itemVariants}
              >
                <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-3 w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Getting started is easy. Follow these simple steps to begin improving your typing skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-primary-600 dark:text-primary-400 font-bold text-lg">1</div>
              <h3 className="text-xl font-semibold mb-2">Choose a Test</h3>
              <p className="text-gray-600 dark:text-gray-400">Select from various difficulty levels and specialized text categories.</p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-primary-600 dark:text-primary-400 font-bold text-lg">2</div>
              <h3 className="text-xl font-semibold mb-2">Start Typing</h3>
              <p className="text-gray-600 dark:text-gray-400">Begin typing and receive real-time feedback on your speed and accuracy.</p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-primary-600 dark:text-primary-400 font-bold text-lg">3</div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600 dark:text-gray-400">Review your performance and see your improvement over time.</p>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link to="/test" className="btn btn-primary inline-flex items-center">
              Start Your First Test
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-accent-600 to-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Typing Skills?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join thousands of users who have improved their typing speed and accuracy with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/test" className="btn bg-white text-primary-600 hover:bg-gray-100 font-medium">
              Start Typing Test
            </Link>
            <Link to="/register" className="btn bg-primary-700/40 backdrop-blur-sm hover:bg-primary-700/60 text-white font-medium">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;