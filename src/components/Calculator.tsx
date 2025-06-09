import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import Display from './Display';
import Keypad from './Keypad';
import HistoryPanel from './HistoryPanel';
import useCalculator from '../hooks/useCalculator';

const Calculator: React.FC = () => {
  const calculator = useCalculator();
  const [showHistory, setShowHistory] = useState(false);

  return (
    <motion.div 
      className="relative w-full max-w-md mx-auto"
      layout
      transition={{ 
        layout: { duration: 0.3, ease: 'easeOut' }
      }}
    >
      {/* Calculator Body */}
      <motion.div
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md 
                   rounded-3xl shadow-calculator overflow-hidden
                   border border-gray-200 dark:border-gray-700"
        layout
      >
        {/* History Toggle Button */}
        <motion.button
          onClick={() => setShowHistory(!showHistory)}
          className="absolute top-3 right-3 z-10 p-2 rounded-full
                    text-gray-500 dark:text-gray-300
                    hover:text-primary-600 dark:hover:text-primary-400
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    transition-colors focus:outline-none"
          whileTap={{ scale: 0.95 }}
          aria-label={showHistory ? "Hide history" : "Show history"}
        >
          {showHistory ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <Clock className="w-5 h-5" />
          )}
        </motion.button>

        {/* History Panel */}
        <AnimatePresence>
          {showHistory && (
            <HistoryPanel 
              history={calculator.history}
              onClose={() => setShowHistory(false)}
              onSelectItem={(result) => {
                calculator.handleClear();
                calculator.handleDigitInput(result);
              }}
            />
          )}
        </AnimatePresence>

        {/* Calculator Display */}
        <Display 
          value={calculator.displayValue} 
          operation={calculator.operation}
          previousValue={calculator.previousValue}
          memory={calculator.memory}
          waitingForOperand={calculator.waitingForOperand}
        />
        
        {/* Calculator Keypad */}
        <Keypad 
          onDigitPress={calculator.handleDigitInput}
          onOperationPress={calculator.handleOperationInput}
          onEqualsPress={calculator.handleEquals}
          onClearPress={calculator.handleClear}
          onClearEntryPress={calculator.handleClearEntry}
          onDecimalPress={calculator.handleDecimalPoint}
          onNegatePress={calculator.handleNegate}
          onMemoryPress={calculator.handleMemoryOperation}
          currentOperation={calculator.operation}
        />
      </motion.div>
    </motion.div>
  );
};

export default Calculator;