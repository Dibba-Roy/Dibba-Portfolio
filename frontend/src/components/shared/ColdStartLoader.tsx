import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { type PingResponse } from '../../models/fetchServerPingModel';

interface ColdStartLoaderProps {
  onComplete: () => void;
  coldStartPingService: {
    pingServer: () => Promise<PingResponse>;
  };
  expectedResponseTime?: number; // in milliseconds, defaults to 4000ms (4 seconds)
}

const ColdStartLoader: React.FC<ColdStartLoaderProps> = ({
  onComplete,
  coldStartPingService,
  expectedResponseTime = 60000,
}) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing connection...');
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);

  const startColdStart = useCallback(async () => {
    // Reset any previous error state
    setHasError(false);
    // Reset progress and status for this attempt
    setProgress(0);
    setStatus('Initializing connection...');
    setIsComplete(false);

    // Record when this attempt began
    const requestStartTime = Date.now();
    setStartTime(requestStartTime);

    // Immediately show "Waking up server…" (for the first second)
    setStatus('Waking up server...');

    // Start an interval to update progress up to 95% over expectedResponseTime
    const progressTracker = setInterval(() => {
      const elapsed = Date.now() - requestStartTime;
      // Cap at 95% so we don't hit 100 until the server actually responds
      const progressPercent = Math.min((elapsed / expectedResponseTime) * 100, 95);
      setProgress(progressPercent);

      // Update status in phases
      if (elapsed < 1000) {
        setStatus('Initializing connection...');
      } else if (elapsed < 2000) {
        setStatus('Waking up server...');
      } else if (elapsed < 3000) {
        setStatus('Establishing connection...');
      } else {
        setStatus('Almost ready, grabbing the last bit of things...');
      }
    }, 100);

    try {
      // Await the ping
      const response = await coldStartPingService.pingServer();

      // If Server responds with failure
      if (response.status !== 200) {
        throw new Error(`Server responded with status "${response.status}"`);
      }

      // Clear the interval now that we have a valid response
      clearInterval(progressTracker);

      // Force the bar to 100%
      setProgress(100);
      setStatus('Ready!');
      setIsComplete(true);

      // Wait a moment so the user sees 100% + "Ready!" before continuing
      setTimeout(() => {
        onComplete();
      }, 800);
    } catch (error) {
      console.error('Cold start failed:', error);

      // Clear the progress-tracking interval
      clearInterval(progressTracker);

      // Enter error state: show "Connection failed" + Retry button
      setHasError(true);
      setStatus('Whoops! Looks like the server took too long to respond. Please try again.');
      setProgress(0);
      setIsComplete(false);
    }
  }, [coldStartPingService, expectedResponseTime, onComplete]);

  // Run the first attempt once, on mount
  useEffect(() => {
    startColdStart();
  }, [startColdStart]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 px-8"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <h1 className="text-4xl font-bold text-slate-100 mb-2">
            Loading
          </h1>
          <p className="text-slate-400">
            Preparing your experience
          </p>
        </motion.div>

        {/* Progress Bar or Error State  */}
        <div className="w-80 mx-auto">
          <div className="relative">
            {/* Background Bar */}
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              {/* Foreground Bar (animated width) */}
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
              />
            </div>

            {/* Progress Percent (hidden if error) */}
            {!hasError && (
              <motion.div
                className="mt-3 text-sm font-medium text-slate-400"
                animate={{ opacity: isComplete ? 0 : 1 }}
              >
                {Math.round(progress)}%
              </motion.div>
            )}
          </div>
        </div>

        {/* Status Message */}
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`text-slate-400 ${
            hasError ? 'text-red-500' : ''
          }`}
        >
          {status}
        </motion.div>

        {/* Loading Dots (only if not complete or error) */}
        {!isComplete && !hasError && (
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}

        {/* Success Check Mark (only if complete) */}
        {isComplete && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="text-green-500"
          >
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
        )}

        {/* Retry Button (only if error) */}
        {hasError && (
          <motion.button
            onClick={() => {
              // Kick off a brand‐new attempt
              startColdStart();
            }}
            // Simple hover/tap animation
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 inline-flex items-center justify-center px-5 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
          >
            Retry
          </motion.button>
        )}

        {/* Response Time (only if server responds back) */}
        {isComplete && startTime && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xs text-slate-500"
          >
            Response time: {Date.now() - startTime}ms
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ColdStartLoader;