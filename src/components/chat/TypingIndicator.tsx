import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Brain } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 flex items-center justify-center">
        <Zap className="w-5 h-5 text-white" />
      </div>
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex items-center space-x-3">
        <Brain className="w-4 h-4 text-blue-400 animate-pulse" />
        <div className="flex space-x-1">
          <motion.div
            className="w-2 h-2 bg-blue-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-blue-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-blue-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
        <span className="text-sm text-gray-400">Arsenal AI is thinking...</span>
      </div>
    </motion.div>
  );
};