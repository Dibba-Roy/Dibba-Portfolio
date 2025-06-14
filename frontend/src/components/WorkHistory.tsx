import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ExperienceModal from './shared/sharedModal';
import ErrorState from './shared/ErrorState';
import LoadingState from './shared/LoadingState';
import { SquareMousePointer } from 'lucide-react';
import type { WorkExperience } from '../models/fetchWorkHistoryModel';
import { workHistoryService } from '../services/get-work-history-service';

const WorkHistory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedExp, setSelectedExp] = useState<WorkExperience | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workHistory, setWorkHistory] = useState<WorkExperience[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const childElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    childElements?.forEach((el: Element) => {
      observer.observe(el);
    });

    return () => {
      childElements?.forEach((el: Element) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const fetchWorkHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response: WorkExperience[] = await workHistoryService.getExperiences();

      if (!response || response.length === 0) {
        setError('Failed to load work history. Please try again.');
        return;
      }

      // Clone and sort in descending order by workId:
      const sortedByIdDesc = [...response].sort((a, b) => b.WorkID - a.WorkID);
      setWorkHistory(sortedByIdDesc);
    } catch (err) {
      console.error('Error fetching work history >>', err);
      setError('Failed to load work history. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkHistory();
  }, [fetchWorkHistory]);

  const handleCardClick = (exp: WorkExperience) => {
    setSelectedExp(exp);
    setIsModalOpen(true);
  };

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <section
        id="workExperience"
        ref={sectionRef}
        className="py-24 bg-slate-900 flex items-center justify-center"
      >
        <LoadingState />
      </section>
    );
  }

  // Show error state if fetch failed
  if (error) {
    return (
      <section id="workExperience" className="py-24 bg-slate-900 flex items-center justify-center">
        <ErrorState message={error} onRetry={fetchWorkHistory} />
      </section>
    );
  }

  return (
    <section id="workExperience" ref={sectionRef} className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold text-white text-center mb-20"
        >
          Experience
        </motion.h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line - Left on mobile, center on desktop */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute left-6 md:left-1/2 top-0 w-px h-full bg-white/20"
            style={{ transformOrigin: 'top' }}
          />

          <div className="space-y-24">
            {workHistory.map((exp, index) => (
              <div key={exp.id} className="relative animate-on-scroll">
                {/* Date marker - Positioned relative to timeline */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white"
                />

                {/* Date text - Positioned differently for mobile vs desktop */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute left-12 md:left-1/2 md:-translate-x-1/2 -top-8 text-white/60 text-sm whitespace-nowrap"
                >
                  {exp.DateRange}
                </motion.div>

                {/* Content card - All right-aligned on mobile, alternating on desktop */}
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    x: window.innerWidth >= 768 ? (index % 2 === 0 ? -50 : 50) : 50 
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className={`
                    ml-16 w-[calc(100%-5rem)]
                    md:w-[calc(50%-40px)] md:ml-0
                    ${index % 2 === 0 
                      ? 'md:mr-auto' 
                      : 'md:ml-[calc(50%+40px)]'
                    }
                  `}
                  onClick={() => handleCardClick(exp)}
                >
                  <motion.div
                    className="bg-slate-800 p-6 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-slate-800/80 transition-all duration-300"
                    animate={{
                      boxShadow: ['0 0 20px rgba(14, 165, 233, 0.3)'],
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-bold text-white mb-1">{exp.JobTitle}</h3>
                      <SquareMousePointer size={20} className="hidden sm:block" />
                    </div>
                    <p className="text-white/60 mb-4">{exp.CompanyName}</p>
                    <p className="text-white/80 leading-relaxed">{exp.ShortDescription}</p>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ExperienceModal
        experience={selectedExp}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default WorkHistory;