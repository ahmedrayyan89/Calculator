import React from 'react';
import { motion } from 'framer-motion';
import { Operation } from '../types/calculator';
import { Database, Copy as FloppyDisk } from 'lucide-react';

interface DisplayProps {
  value: string;
  previousValue: string;
  operation: Operation;
  memory: boolean;
  waitingForOperand: boolean;
}

const Display: React.FC<DisplayProps> = ({ 
  value, 
  previousValue, 
  operation,
  memory,
  waitingForOperand
}) => {
  // Format large numbers with commas
  const formatNumber = (num: string): string => {
    if (num === 'Error') return num;
    
    // Handle negative numbers
    const isNegative = num.startsWith('-');
    const absNum = isNegative ? num.substring(1) : num;
    
    // Check if it's in scientific notation
    if (absNum.includes('e')) {
      return num; // Don't format scientific notation
    }
    
    // Split by decimal point
    const [intPart, decPart] = absNum.split('.');
    
    // Format integer part with commas
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Reassemble with negative sign if needed
    const result = isNegative ? '-' + formattedInt : formattedInt;
    
    // Add back decimal part if it exists
    return decPart !== undefined ? `${result}.${decPart}` : result;
  };

  // Determine font size based on length
  const getFontSize = (length: number): string => {
    if (length <= 8) return 'text-4xl sm:text-5xl';
    if (length <= 12) return 'text-3xl sm:text-4xl';
    return 'text-2xl sm:text-3xl';
  };

  // Prepare the expression text (previous value and operation)
  const expressionText = previousValue && operation
    ? `${formatNumber(previousValue)} ${operation}`
    : '';

  return (
    <div className="p-4 sm:p-5 relative">
      {/* Memory indicator */}
      {memory && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-2 left-2 text-primary-500 dark:text-primary-400"
        >
          <FloppyDisk size={16} />
        </motion.div>
      )}
      
      {/* Previous calculation */}
      <div className="h-6 text-sm text-gray-500 dark:text-gray-400 text-right overflow-hidden">
        {expressionText}
      </div>
      
      {/* Main display */}
      <motion.div
        key={value} // Recreate component when value changes for animation
        initial={{ opacity: 0.8, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`calculator-display min-h-[60px] flex items-center justify-end ${getFontSize(value.length)}`}
      >
        <span className={waitingForOperand ? "opacity-70" : ""}>
          {value === 'Error' ? (
            <span className="text-red-500">Error</span>
          ) : (
            formatNumber(value)
          )}
        </span>
      </motion.div>
    </div>
  );
};

export default Display;