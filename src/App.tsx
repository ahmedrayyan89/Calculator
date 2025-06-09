import React, { useState, useEffect } from 'react';
import Calculator from './components/Calculator';
import ThemeToggle from './components/ThemeToggle';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for user preference in localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    // Update document class and localStorage when theme changes
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-4 right-4"
      >
        <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </motion.div>
      
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 dark:text-white mb-2">
          Rayyan's Calculator
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          A beautiful, functional calculator with React
        </p>
      </motion.header>
      
      <motion.main
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Calculator />
      </motion.main>
      
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-center text-gray-500 dark:text-gray-400"
      >
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
        >
          <Github size={16} />
          <span>View on GitHub</span>
        </a>
      </motion.footer>
    </div>
  );
}

export default App;