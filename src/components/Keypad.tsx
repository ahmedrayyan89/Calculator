import React from 'react';
import { motion } from 'framer-motion';
import { CalculatorButton, Operation } from '../types/calculator';
import Button from './Button';

interface KeypadProps {
  onDigitPress: (digit: string) => void;
  onOperationPress: (operation: Operation) => void;
  onEqualsPress: () => void;
  onClearPress: () => void;
  onClearEntryPress: () => void;
  onDecimalPress: () => void;
  onNegatePress: () => void;
  onMemoryPress: (op: 'MC' | 'MR' | 'M+' | 'M-') => void;
  currentOperation: Operation;
}

const Keypad: React.FC<KeypadProps> = ({
  onDigitPress,
  onOperationPress,
  onEqualsPress,
  onClearPress,
  onClearEntryPress,
  onDecimalPress,
  onNegatePress,
  onMemoryPress,
  currentOperation
}) => {
  // Define all calculator buttons
  const buttons: CalculatorButton[] = [
    // Row 1
    { type: 'memory', value: 'MC' },
    { type: 'memory', value: 'MR' },
    { type: 'memory', value: 'M+' },
    { type: 'memory', value: 'M-' },
    // Row 2
    { type: 'function', value: 'clear' },
    { type: 'function', value: 'clearEntry' },
    { type: 'function', value: 'negate' },
    { type: 'operation', value: '%' },
    // Row 3
    { type: 'number', value: '7' },
    { type: 'number', value: '8' },
    { type: 'number', value: '9' },
    { type: 'operation', value: '÷' },
    // Row 4
    { type: 'number', value: '4' },
    { type: 'number', value: '5' },
    { type: 'number', value: '6' },
    { type: 'operation', value: 'x' },
    // Row 5
    { type: 'number', value: '1' },
    { type: 'number', value: '2' },
    { type: 'number', value: '3' },
    { type: 'operation', value: '-' },
    // Row 6
    { type: 'number', value: '0' },
    { type: 'function', value: 'decimal' },
    { type: 'function', value: '=' },
    { type: 'operation', value: '+' },
  ];

  // Handle button click based on type and value
  const handleButtonClick = (button: CalculatorButton) => {
    switch (button.type) {
      case 'number':
        onDigitPress(button.value);
        break;
      case 'operation':
        onOperationPress(button.value);
        break;
      case 'function':
        switch (button.value) {
          case 'clear': onClearPress(); break;
          case 'clearEntry': onClearEntryPress(); break;
          case 'decimal': onDecimalPress(); break;
          case 'negate': onNegatePress(); break;
          case '=': onEqualsPress(); break;
        }
        break;
      case 'memory':
        onMemoryPress(button.value);
        break;
    }
  };

  // Get display text for each button
  const getButtonText = (button: CalculatorButton): string => {
    if (button.type === 'function' && button.value === 'decimal') return '.';
    return button.value;
  };

  // Get class name for each button
  const getButtonClassName = (button: CalculatorButton): string => {
    switch (button.type) {
      case 'number': return 'digit-button';
      case 'operation': return `operation-button ${currentOperation === button.value ? 'ring-2 ring-white' : ''}`;
      case 'function': return 'function-button';
      case 'memory': return 'memory-button';
    }
  };

  // Determine colspan for zero button
  const getColSpan = (button: CalculatorButton): string => {
    if (button.type === 'number' && button.value === '0') {
      return 'col-span-2';
    }
    return '';
  };

  return (
    <motion.div 
      className="grid grid-cols-4 gap-3 p-4 sm:p-5"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05
          }
        }
      }}
      initial="hidden"
      animate="show"
    >
      {buttons.map((button, index) => (
        <motion.div
          key={`${button.type}-${button.value}`}
          className={`aspect-square ${getColSpan(button)}`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
          }}
        >
          <Button
            text={getButtonText(button)}
            className={getButtonClassName(button)}
            onClick={() => handleButtonClick(button)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Keypad;