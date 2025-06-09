export type Operation = '+' | '-' | 'x' | '÷' | '%' | null;

export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: Operation;
  memory: string;
  waitingForOperand: boolean;
  history: HistoryItem[];
}

export interface HistoryItem {
  calculation: string;
  result: string;
  timestamp: Date;
}

export type CalculatorButton = 
  | { type: 'number'; value: string }
  | { type: 'operation'; value: Operation }
  | { type: 'function'; value: 'clear' | 'clearEntry' | 'negate' | '=' | 'decimal' }
  | { type: 'memory'; value: 'MC' | 'MR' | 'M+' | 'M-' };