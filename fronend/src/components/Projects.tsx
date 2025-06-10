import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Star } from 'lucide-react';
import { projectService } from '../services/get-projects-service';
import { type Project } from '../models/fetchProjectsModel';
import ErrorState from './shared/ErrorState';
import LoadingState from './shared/LoadingState';

const ProjectShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [baseURL, setBaseURL] = useState<string>('');

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

  const fetchPersonalProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response: Project[] = await projectService.getPersonalProjects();
      if (!response || response.length === 0) {
        setError('Failed to load personal projects. Please try again.');
        return;
      }
      const baseURL = import.meta.env.VITE_IMAGE_URL;
      const sortedByIdAsc = [...response].sort((a, b) => a.projectid - b.projectid);

      setBaseURL(baseURL);
      setProjects(sortedByIdAsc);
    } catch (error) {
      console.error(error);
      setError('Failed to load personal projects. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPersonalProjects();
  }, [fetchPersonalProjects]);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
  };

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      prevProject();
    } else if (info.offset.x < -threshold) {
      nextProject();
    }
    setDragOffset(0);
  };

  const getCardPosition = (index: number) => {
    const diff = index - currentIndex;
    const totalProjects = projects.length;

    // Handle circular positioning
    let position = diff;
    if (Math.abs(diff) > totalProjects / 2) {
      position = diff > 0 ? diff - totalProjects : diff + totalProjects;
    }

    return position;
  };

  if (isLoading) {
    return (
      <section
        id="personalProjects"
        ref={sectionRef}
        className="py-24 bg-slate-900 flex items-center justify-center"
      >
        <LoadingState />
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="personalProjects"
        className="py-24 bg-slate-900 flex items-center justify-center"
      >
        <ErrorState message={error} onRetry={fetchPersonalProjects} />
      </section>
    );
  }

  return (
    <section
      id="personalProjects"
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 overflow-hidden relative"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute top-40 right-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
        >
          My Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-white/80 text-center mb-12"
        >
          Explore my latest work and personal projects
        </motion.p>

        {/* Carousel Container */}
        <div className="relative h-[550px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => {
              const position = getCardPosition(index);
              const isActive = position === 0;
              const isVisible = Math.abs(position) <= 2;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={project.id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDrag={(_, info) => setDragOffset(info.offset.x)}
                  onDragEnd={handleDragEnd}
                  animate={{
                    x: position * 320 + dragOffset,
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : 0.7,
                    zIndex: isActive ? 10 : 5 - Math.abs(position),
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                  }}
                  className="absolute cursor-grab active:cursor-grabbing"
                  whileHover={isActive ? { scale: 1.02 } : {}}
                >
                  <motion.div
                    className={`w-[280px] md:w-[320px] h-[460px] rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
                      isActive ? 'bg-white' : 'bg-white/20 backdrop-blur-md'
                    }`}
                  >
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      {project.projectImage ? (
                        <img
                          src={baseURL + project.projectImage.formats.thumbnail.url}
                          alt={project.title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div
                          className={`w-full h-full flex items-center justify-center ${
                            isActive ? 'bg-gradient-to-br from-indigo-100 to-purple-100' : 'bg-white/10'
                          }`}
                        >
                          <div className="text-6xl">🚀</div>
                        </div>
                      )}

                      {/* Featured badge overlaid on image */}
                      {project.featured && (
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                              isActive ? 'bg-yellow-100/90 text-yellow-800' : 'bg-white/30 text-white'
                            }`}
                          >
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      {/* Sparkles for active card */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                        >
                          <div className="relative">
                            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 absolute -left-6 top-0" />
                            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 absolute -right-8 top-2" />
                            <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 absolute left-8 top-8" />
                          </div>
                        </motion.div>
                      )}

                      <h3
                        className={`text-2xl font-bold mb-3 ${
                          isActive ? 'text-gray-800' : 'text-white'
                        }`}
                      >
                        {project.title}
                      </h3>

                      <p
                        className={`text-sm mb-4 flex-grow ${
                          isActive ? 'text-gray-600' : 'text-white/90'
                        }`}
                      >
                        {project.Description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className={`px-2 py-1 rounded-full text-xs ${
                              isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-white/20 text-white'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-4 mt-auto">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              isActive
                                ? 'bg-gray-900 text-white hover:bg-gray-800'
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        )}
                        {project.websiteUrl && (
                          <a
                            href={project.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              isActive
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevProject}
            className="absolute left-4 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextProject}
            className="absolute right-4 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
