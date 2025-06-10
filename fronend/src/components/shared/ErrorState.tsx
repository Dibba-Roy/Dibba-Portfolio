import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface ErrorStateProps {
    message?: string | null;
    onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
    message = "Oops! Something went wrong",
    onRetry
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-red-500/10"
        >
            <div className="w-64 h-64 mb-8 relative">
                <DotLottieReact
                    src="https://lottie.host/c18a1d6d-8bc2-460e-b928-bd34ada4fc86/VFi7iu4o8B.lottie"
                    loop
                    autoplay
                />
            </div>

            <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-red-500 mb-4 text-center"
            >
                {message}
            </motion.h3>

            <motion.button
                onClick={onRetry}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors group"
            >
                <RefreshCw className="w-5 h-5 group-hover:animate-spin" />
                Try Again
            </motion.button>
        </motion.div>
    );
};

export default ErrorState;
