import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { ExperienceModalProps } from '../../models/fetchWorkHistoryModel';

const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience, isOpen, onClose }) => {
  if (!experience) return null;

  // prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal Content - Mobile Friendly */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            {/* Scrollable Container */}
            <div className="flex min-h-full items-start justify-center p-4 sm:items-center">
              <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-slate-800 border border-white/10 shadow-2xl transition-all my-8 sm:my-0">
                {/* Scrollable Content */}
                <div className="max-h-[85vh] overflow-y-auto overscroll-contain">
                  <div className="relative p-6 md:p-8">
                    <button
                      onClick={onClose}
                      className="absolute right-4 top-4 p-2 text-white/60 hover:text-white transition-colors z-10 bg-slate-800/80 rounded-full backdrop-blur-sm"
                    >
                      <X size={24} />
                    </button>

                    <div className="mb-6 pr-12">
                      <h3 className="text-3xl font-bold text-white mb-2">{experience.JobTitle}</h3>
                      <p className="text-white/60">{experience.CompanyName}</p>
                      <p className="text-white/60 text-sm mt-1">{experience.DateRange}</p>
                    </div>

                    <div className="prose prose-invert max-w-none">
                      <p className="text-white/80 leading-relaxed text-lg">
                        {experience.ShortDescription}
                      </p>
                    </div>

                    {/* Dynamic Key Achievements */}
                    {experience.BulletPoints && experience.BulletPoints.length > 0 && (
                      <div className="mt-8 pt-8 border-t border-white/10">
                        <h4 className="text-white font-semibold mb-4">Key Achievements</h4>
                        <ul className="space-y-3">
                          {experience.BulletPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-white/80">
                              <span className="block w-1.5 h-1.5 mt-2 rounded-full bg-sky-400 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExperienceModal;