import { useState, useEffect, useCallback } from 'react';
import { CalculatorState, Operation, HistoryItem } from '../types/calculator';

const MAX_DIGITS = 12;

export const useCalculator = () => {
  const initialState: CalculatorState = {
    currentValue: '0',
    previousValue: '',
    operation: null,
    memory: '0',
    waitingForOperand: false,
    history: []
  };

  const [state, setState] = useState<CalculatorState>(initialState);
  
  // Format the display value to handle large numbers and decimals
  const formatDisplayValue = (value: string): string => {
    if (!value) return '0';
    
    // Handle potential scientific notation for very large numbers
    const num = parseFloat(value);
    if (Math.abs(num) >= 1e12) {
      return num.toExponential(6);
    }
    
    // Ensure we don't exceed max digits
    if (value.replace(/[-.]/g, '').length > MAX_DIGITS) {
      if (value.includes('.')) {
        // Truncate decimal part
        const [intPart, decPart] = value.split('.');
        const maxDecDigits = Math.max(0, MAX_DIGITS - intPart.length - 1);
        return `${intPart}.${decPart.substring(0, maxDecDigits)}`;
      } else {
        // Truncate large integers
        return num.toExponential(6);
      }
    }
    
    return value;
  };

  const performCalculation = useCallback((a: string, b: string, operation: Operation): string => {
    const numA = parseFloat(a || '0');
    const numB = parseFloat(b || '0');
    
    switch (operation) {
      case '+': return String(numA + numB);
      case '-': return String(numA - numB);
      case 'x': return String(numA * numB);
      case '÷': return numB === 0 ? 'Error' : String(numA / numB);
      case '%': return String(numA * (numB / 100));
      default: return b;
    }
  }, []);

  const addToHistory = useCallback((calculation: string, result: string) => {
    setState(prev => ({
      ...prev,
      history: [
        { calculation, result, timestamp: new Date() },
        ...prev.history.slice(0, 9) // Keep last 10 items
      ]
    }));
  }, []);

  const handleDigitInput = (digit: string) => {
    setState(prev => {
      // If we're waiting for operand, replace current value
      if (prev.waitingForOperand) {
        return {
          ...prev,
          currentValue: digit,
          waitingForOperand: false
        };
      }
      
      // Don't allow multiple leading zeros
      if (digit === '0' && prev.currentValue === '0') {
        return prev;
      }
      
      // Replace '0' with the digit
      if (prev.currentValue === '0' && digit !== '.') {
        return {
          ...prev,
          currentValue: digit
        };
      }
      
      // Append digit to current value
      const newValue = prev.currentValue + digit;
      return {
        ...prev,
        currentValue: formatDisplayValue(newValue)
      };
    });
  };

  const handleDecimalPoint = () => {
    setState(prev => {
      // If waiting for operand, start a new decimal number
      if (prev.waitingForOperand) {
        return {
          ...prev,
          currentValue: '0.',
          waitingForOperand: false
        };
      }
      
      // Don't add another decimal point if one already exists
      if (prev.currentValue.includes('.')) {
        return prev;
      }
      
      return {
        ...prev,
        currentValue: prev.currentValue + '.',
        waitingForOperand: false
      };
    });
  };

  const handleOperationInput = (nextOperation: Operation) => {
    setState(prev => {
      // If there's a pending operation, perform it
      if (prev.operation && !prev.waitingForOperand) {
        const result = performCalculation(prev.previousValue, prev.currentValue, prev.operation);
        const calculation = `${prev.previousValue} ${prev.operation} ${prev.currentValue}`;
        
        if (result !== 'Error') {
          addToHistory(calculation, result);
        }
        
        return {
          ...prev,
          currentValue: result,
          previousValue: result,
          operation: nextOperation,
          waitingForOperand: true
        };
      }
      
      return {
        ...prev,
        previousValue: prev.currentValue,
        operation: nextOperation,
        waitingForOperand: true
      };
    });
  };

  const handleEquals = () => {
    setState(prev => {
      if (!prev.operation) return prev;
      
      const result = performCalculation(prev.previousValue, prev.currentValue, prev.operation);
      const calculation = `${prev.previousValue} ${prev.operation} ${prev.currentValue}`;
      
      if (result !== 'Error') {
        addToHistory(calculation, result);
      }
      
      return {
        ...prev,
        currentValue: result,
        previousValue: '',
        operation: null,
        waitingForOperand: true
      };
    });
  };

  const handleClear = () => {
    setState(initialState);
  };

  const handleClearEntry = () => {
    setState(prev => ({
      ...prev,
      currentValue: '0',
      waitingForOperand: false
    }));
  };

  const handleNegate = () => {
    setState(prev => {
      if (prev.currentValue === '0') return prev;
      
      const newValue = prev.currentValue.startsWith('-') 
        ? prev.currentValue.slice(1) 
        : '-' + prev.currentValue;
        
      return {
        ...prev,
        currentValue: newValue
      };
    });
  };

  const handleMemoryOperation = (operation: 'MC' | 'MR' | 'M+' | 'M-') => {
    setState(prev => {
      switch (operation) {
        case 'MC': // Memory Clear
          return {
            ...prev,
            memory: '0'
          };
        case 'MR': // Memory Recall
          return {
            ...prev,
            currentValue: prev.memory,
            waitingForOperand: false
          };
        case 'M+': // Memory Add
          return {
            ...prev,
            memory: String(parseFloat(prev.memory) + parseFloat(prev.currentValue))
          };
        case 'M-': // Memory Subtract
          return {
            ...prev,
            memory: String(parseFloat(prev.memory) - parseFloat(prev.currentValue))
          };
        default:
          return prev;
      }
    });
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for calculator keys
      if (
        /[\d+\-*/%.=]/.test(e.key) || 
        e.key === 'Enter' || 
        e.key === 'Escape' || 
        e.key === 'Backspace'
      ) {
        e.preventDefault();
      }
      
      // Number keys
      if (/\d/.test(e.key)) {
        handleDigitInput(e.key);
      }
      // Operators
      else if (e.key === '+') handleOperationInput('+');
      else if (e.key === '-') handleOperationInput('-');
      else if (e.key === '*') handleOperationInput('x');
      else if (e.key === '/') handleOperationInput('÷');
      else if (e.key === '%') handleOperationInput('%');
      // Equals and Enter
      else if (e.key === '=' || e.key === 'Enter') handleEquals();
      // Decimal point
      else if (e.key === '.') handleDecimalPoint();
      // Clear and Escape
      else if (e.key === 'Escape') handleClear();
      // Backspace (Clear Entry)
      else if (e.key === 'Backspace') handleClearEntry();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // Empty dependency array as the handlers use callbacks

  return {
    displayValue: state.currentValue,
    previousValue: state.previousValue,
    operation: state.operation,
    memory: state.memory !== '0',
    waitingForOperand: state.waitingForOperand,
    history: state.history,
    handleDigitInput,
    handleOperationInput,
    handleEquals,
    handleClear,
    handleClearEntry,
    handleDecimalPoint,
    handleNegate,
    handleMemoryOperation
  };
};

export default useCalculator;