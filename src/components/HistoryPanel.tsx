import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HistoryItem } from '../types/calculator';
import { Trash2 } from 'lucide-react';

interface HistoryPanelProps {
  history: HistoryItem[];
  onClose: () => void;
  onSelectItem: (result: string) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  history, 
  onClose, 
  onSelectItem 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden bg-gray-50 dark:bg-gray-850 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="p-4 max-h-64 overflow-y-auto">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">History</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ChevronUp size={16} />
          </button>
        </div>

        {history.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No calculation history yet
          </p>
        ) : (
          <ul className="space-y-2">
            <AnimatePresence>
              {history.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="p-2 rounded-md bg-white dark:bg-gray-800 
                           hover:bg-gray-100 dark:hover:bg-gray-700 
                           cursor-pointer transition-colors"
                  onClick={() => onSelectItem(item.result)}
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.calculation}
                  </div>
                  <div className="text-lg font-medium text-gray-800 dark:text-white">
                    = {item.result}
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default HistoryPanel;