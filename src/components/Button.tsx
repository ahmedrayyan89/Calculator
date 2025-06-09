import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  text: string;
  className?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, className = '', onClick }) => {
  // Special display for certain buttons
  const buttonText = () => {
    switch (text) {
      case 'clear': return 'AC';
      case 'clearEntry': return 'CE';
      case 'negate': return '+/-';
      case 'decimal': return '.';
      default: return text;
    }
  };

  return (
    <motion.div
      className={`h-full w-full ${className}`}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Calculator button ${text}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      {buttonText()}
    </motion.div>
  );
};

export default Button;