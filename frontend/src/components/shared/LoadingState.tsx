import React from 'react';
import { motion } from 'framer-motion';

const SimpleLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      {/* Spinner */}
      <motion.div
        className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Loading text */}
      <motion.div
        className="flex items-center gap-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="text-gray-600 text-sm font-medium">Loading</span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1 h-1 bg-blue-600 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SimpleLoader;