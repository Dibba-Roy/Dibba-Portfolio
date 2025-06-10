import React from 'react';
import { motion } from 'framer-motion';

const PremiumLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 overflow-hidden pointer-events-none">
      {/* Main loader container */}
      <div className="relative">
        {/* Central morphing shape */}
        <motion.div
          className="relative w-32 h-32"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Main shape */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600"
            style={{
              boxShadow: "0 0 40px rgba(138,56,236,0.4), 0 0 80px rgba(58,134,255,0.3)",
            }}
            animate={{
              borderRadius: ["16px", "50%", "16px", "50%", "16px"],
              scale: [1, 1.2, 1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Inner morphing shape - hollow with glow */}
          <motion.div
            className="absolute inset-2 rounded-2xl"
            style={{
              background: "transparent",
              boxShadow: "inset 0 0 20px rgba(138,56,236,0.5), inset 0 0 40px rgba(58,134,255,0.3)",
            }}
            animate={{
              borderRadius: ["12px", "50%", "12px", "50%", "12px"],
              scale: [1, 0.8, 1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          
          {/* Core glow */}
          <motion.div
            className="absolute inset-8 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(138,56,236,0.7) 40%, transparent 70%)",
              filter: "blur(4px)",
              boxShadow: "0 0 30px rgba(255,255,255,0.6)",
            }}
            animate={{
              scale: [0.8, 1.5, 0.8],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        className="flex items-center gap-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-light tracking-widest uppercase drop-shadow-[0_0_10px_rgba(138,56,236,0.5)]">Loading</span>
        <motion.div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1 h-1 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full drop-shadow-[0_0_3px_rgba(138,56,236,0.7)]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PremiumLoader;