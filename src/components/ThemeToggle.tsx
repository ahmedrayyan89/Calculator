import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md 
                 hover:bg-gray-100 dark:hover:bg-gray-700 
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
                 transition-colors duration-200"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-6 h-6">
        {isDarkMode ? (
          <Moon className="w-6 h-6 text-primary-400" />
        ) : (
          <Sun className="w-6 h-6 text-accent-500" />
        )}
      </div>
    </motion.button>
  );
};

export default ThemeToggle;