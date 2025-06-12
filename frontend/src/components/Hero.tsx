import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Twitter } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { imageService } from '../services/get-image-service';
import type { RawImageFile } from '../models/fetchImageModel';
import LoadingState from './shared/LoadingState';

const phrases = [
  'Software Engineer',
  'Mobile App Developer',
  'Web Developer',
  'UI/UX Enthusiast'
];

const Hero: React.FC = () => {
  const [typed, setTyped] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    const typeText = () => {
      if (isDeleting) {
        if (typed.length === 0) {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTypingSpeed(150);
          return;
        }
        setTyped((t) => t.slice(0, -1));
        setTypingSpeed(50);
      } else {
        if (typed.length === currentPhrase.length) {
          setTypingSpeed(2000);
          setIsDeleting(true);
          return;
        }
        setTyped(currentPhrase.slice(0, typed.length + 1));
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(typeText, typingSpeed);
    return () => clearTimeout(timer);
  }, [typed, currentPhraseIndex, isDeleting, typingSpeed]);

  useEffect(() => {
    async function fetchFirstImage() {
      try {
        const files: RawImageFile[] = await imageService.getImageList();

        if (files.length === 0) {
          return;
        }

        const firstFile = files[0];
        const relativeUrl = firstFile.formats.large.url;

        setImgUrl(relativeUrl);

      } catch (e: any) {
        console.error(e);
      }
    }
    fetchFirstImage();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Spline
          scene="https://prod.spline.design/ALcsKa3s-ZGa8iY4/scene.splinecode"
          className="w-full h-full pointer-events-auto"
        />
        <div
          className="
            absolute inset-x-0
            bottom-0
            h-1/3
            bg-gradient-to-t
            from-black/100
            via-black/80
            to-transparent
            pointer-events-none
          "
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 pointer-events-none">
        <div className="pointer-events-none grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="flex flex-col text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
              initial="initial"
              animate="animate"
            >
              <span className="block">Hey! I'm</span>
              <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 bg-clip-text text-transparent">
                Dibba Roy
              </span>
            </motion.h1>

            <div className="h-8 md:h-10 mb-6">
              <motion.h2
                className="text-xl md:text-3xl font-medium text-slate-600 dark:text-slate-400"
                initial="initial"
                animate="animate"
              >
                I'm a <span className="text-sky-500 dark:text-sky-400">{typed}</span>
                <span className="animate-blink">|</span>
              </motion.h2>
            </div>

            <motion.p
              className="max-w-xl text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed"
              initial="initial"
              animate="animate"
            >
              Building beautiful, intuitive applications with a focus on performance and user experience.
              With 4 years of experience crafting solutions for web and mobile platforms.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial="initial"
              animate="animate"
            >
              <motion.button
                onClick={() => scrollToSection('workExperience')}
                className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full font-medium transition-all transform hover:scale-105 shadow-md hover:shadow-lg pointer-events-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-transparent border-2 border-slate-300 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-500 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 rounded-full font-medium transition-all pointer-events-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {imgUrl ? (
              <div className="relative w-[400px] h-[400px] mx-auto">
                <motion.div
                  className="absolute inset-0 rounded-full overflow-hidden border-4 border-sky-500/30"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(14, 165, 233, 0.3)',
                      '0 0 100px rgba(14, 165, 233, 0.3)',
                      '0 0 20px rgba(14, 165, 233, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  {/* Now src is guaranteed to be a string, not null */}
                  <img
                    src={imgUrl}
                    alt="Professional portrait"
                    className="w-full h-full object-cover object-[50%_0%]"
                  />
                </motion.div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/10 via-sky-500/10 to-blue-500/10 mix-blend-overlay" />
              </div>
            ) : (
              // Optionally show a placeholder/loading state:
              <LoadingState />
            )}
          </motion.div>
        </div>
      </div>

      {/* Social Links - Fixed Position on Left */}
      <motion.div
        className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        {[
          { icon: Github, href: "https://https://github.com/dibba99.com" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/dibba-roy/" },
          { icon: Twitter, href: "https://twitter.com" }
        ].map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 dark:bg-black/40 backdrop-blur-md rounded-full border border-white/20 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-white/20 dark:hover:bg-black/60 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + index * 0.1 }}
          >
            <social.icon size={20} />
          </motion.a>
        ))}
      </motion.div>

      <motion.button
        onClick={() => scrollToSection('workExperience')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors pointer-events-auto"
        aria-label="Scroll to Work Experience section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
};

export default Hero;