import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Twitter } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { useImage } from '../contexts/ImageContext';
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
  const { imgUrl, isImageLoading } = useImage();

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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Desktop Spline Background - Only show on md and up */}
      <div className="absolute inset-0 z-0 hidden md:block md:pointer-events-none">
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
            md:pointer-events-none
          "
        />
      </div>

      {/* Mobile Background - Only show on mobile */}
      <div className="absolute inset-0 z-0 md:hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(14,165,233,0.2),transparent_50%)]"></div>
        </div>
        
        {/* Animated particles/dots */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-sky-400 rounded-full animate-[float1_6s_ease-in-out_infinite]"
          ></div>
          <div 
            className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-[float2_8s_ease-in-out_infinite_1s]"
          ></div>
          <div 
            className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-[float3_7s_ease-in-out_infinite_2s]"
          ></div>
          <div 
            className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-[float4_9s_ease-in-out_infinite_0.5s]"
          ></div>
          <div 
            className="absolute top-1/2 left-1/6 w-1 h-1 bg-sky-300 rounded-full animate-[float5_5s_ease-in-out_infinite_3s]"
          ></div>
          <div 
            className="absolute top-3/4 right-1/6 w-2 h-2 bg-blue-300 rounded-full animate-[float6_10s_ease-in-out_infinite_1.5s]"
          ></div>
          
          {/* Additional floating particles */}
          <div 
            className="absolute top-1/6 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-[float7_12s_ease-in-out_infinite_4s]"
          ></div>
          <div 
            className="absolute top-2/3 left-1/5 w-1 h-1 bg-teal-400 rounded-full animate-[float8_6.5s_ease-in-out_infinite_1.2s]"
          ></div>
          <div 
            className="absolute bottom-1/6 left-2/3 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-[float9_8.5s_ease-in-out_infinite_2.8s]"
          ></div>
          <div 
            className="absolute top-1/12 right-1/12 w-1 h-1 bg-pink-400 rounded-full animate-[float10_11s_ease-in-out_infinite_0.8s]"
          ></div>
          <div 
            className="absolute bottom-1/12 left-1/12 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-[float11_7.5s_ease-in-out_infinite_3.5s]"
          ></div>
          <div 
            className="absolute top-5/6 right-2/5 w-1 h-1 bg-orange-400 rounded-full animate-[float12_9.5s_ease-in-out_infinite_1.8s]"
          ></div>
          <div 
            className="absolute top-2/5 right-1/8 w-2 h-2 bg-violet-400 rounded-full animate-[float13_13s_ease-in-out_infinite_2.3s]"
          ></div>
          <div 
            className="absolute bottom-2/5 left-3/4 w-1 h-1 bg-rose-400 rounded-full animate-[float14_6.8s_ease-in-out_infinite_4.2s]"
          ></div>
          <div 
            className="absolute top-1/8 left-3/5 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-[float15_10.5s_ease-in-out_infinite_1.7s]"
          ></div>
          <div 
            className="absolute bottom-1/8 right-3/5 w-2 h-2 bg-blue-500 rounded-full animate-[float16_8.2s_ease-in-out_infinite_3.1s]"
          ></div>
        </div>

        {/* CSS Animations for floating particles */}
        <style>{`
          @keyframes float1 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(10px, -15px) rotate(90deg); }
            50% { transform: translate(-5px, -10px) rotate(180deg); }
            75% { transform: translate(-15px, 5px) rotate(270deg); }
          }
          
          @keyframes float2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-20px, 10px) scale(1.2); }
            66% { transform: translate(15px, -5px) scale(0.8); }
          }
          
          @keyframes float3 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            30% { transform: translate(15px, 20px) rotate(120deg); }
            60% { transform: translate(-10px, -15px) rotate(240deg); }
          }
          
          @keyframes float4 {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(-25px, -10px); }
            50% { transform: translate(-10px, 15px); }
            75% { transform: translate(20px, -5px); }
          }
          
          @keyframes float5 {
            0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
            50% { transform: translate(25px, -20px) scale(1.5) rotate(180deg); }
          }
          
          @keyframes float6 {
            0%, 100% { transform: translate(0, 0); }
            20% { transform: translate(10px, -25px); }
            40% { transform: translate(-15px, -15px); }
            60% { transform: translate(-20px, 10px); }
            80% { transform: translate(5px, 20px); }
          }
          
          @keyframes float7 {
            0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
            25% { transform: translate(-30px, 15px) rotate(90deg) scale(1.3); }
            50% { transform: translate(20px, 25px) rotate(180deg) scale(0.7); }
            75% { transform: translate(35px, -10px) rotate(270deg) scale(1.1); }
          }
          
          @keyframes float8 {
            0%, 100% { transform: translate(0, 0); }
            16% { transform: translate(8px, -12px); }
            32% { transform: translate(-18px, -8px); }
            48% { transform: translate(-12px, 18px); }
            64% { transform: translate(22px, 12px); }
            80% { transform: translate(15px, -20px); }
          }
          
          @keyframes float9 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(-25px, -30px) rotate(120deg); }
            66% { transform: translate(30px, -15px) rotate(240deg); }
          }
          
          @keyframes float10 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            20% { transform: translate(15px, 25px) scale(0.8); }
            40% { transform: translate(-20px, 20px) scale(1.4); }
            60% { transform: translate(-25px, -15px) scale(0.9); }
            80% { transform: translate(18px, -22px) scale(1.2); }
          }
          
          @keyframes float11 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(-35px, 30px) rotate(360deg); }
          }
          
          @keyframes float12 {
            0%, 100% { transform: translate(0, 0); }
            14% { transform: translate(12px, -18px); }
            28% { transform: translate(-8px, -25px); }
            42% { transform: translate(-28px, -5px); }
            56% { transform: translate(-15px, 20px); }
            70% { transform: translate(25px, 22px); }
            84% { transform: translate(30px, -10px); }
          }
          
          @keyframes float13 {
            0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
            25% { transform: translate(20px, -25px) rotate(90deg) scale(0.8); }
            50% { transform: translate(-15px, -20px) rotate(180deg) scale(1.3); }
            75% { transform: translate(-30px, 18px) rotate(270deg) scale(0.9); }
          }
          
          @keyframes float14 {
            0%, 100% { transform: translate(0, 0); }
            30% { transform: translate(-18px, 12px); }
            60% { transform: translate(22px, -28px); }
          }
          
          @keyframes float15 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            20% { transform: translate(28px, 15px) rotate(72deg); }
            40% { transform: translate(10px, -32px) rotate(144deg); }
            60% { transform: translate(-25px, -18px) rotate(216deg); }
            80% { transform: translate(-32px, 25px) rotate(288deg); }
          }
          
          @keyframes float16 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            16% { transform: translate(-15px, -20px) scale(1.2); }
            32% { transform: translate(25px, -15px) scale(0.8); }
            48% { transform: translate(30px, 20px) scale(1.1); }
            64% { transform: translate(-5px, 25px) scale(0.9); }
            80% { transform: translate(-28px, 8px) scale(1.3); }
          }
        `}</style>

        {/* Bottom gradient overlay for mobile */}
        <div
          className="
            absolute inset-x-0
            bottom-0
            h-1/4
            bg-gradient-to-t
            from-slate-900/80
            to-transparent
          "
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 pointer-events-auto md:pointer-events-none">
        <div className="grid md:grid-cols-2 gap-8 items-center pointer-events-auto md:pointer-events-none">
          {/* Profile Image - Shows first on mobile, second on desktop */}
          <motion.div
            className="relative flex justify-center md:block order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {imgUrl && !isImageLoading ? (
              <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] mx-auto">
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
                  <img
                    src={imgUrl}
                    alt="Professional portrait"
                    className="w-full h-full object-cover object-[50%_0%]"
                  />
                </motion.div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/10 via-sky-500/10 to-blue-500/10 mix-blend-overlay" />
              </div>
            ) : (
              <LoadingState />
            )}
          </motion.div>

          {/* Text Content - Shows second on mobile, first on desktop */}
          <motion.div
            className="flex flex-col text-left order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
              initial="initial"
              animate="animate"
            >
              <span className="block text-white">Hey! I'm</span>
              <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 bg-clip-text text-transparent">
                Dibba Roy
              </span>
            </motion.h1>

            <div className="h-8 md:h-10 mb-6">
              <motion.h2
                className="text-xl md:text-3xl font-medium text-slate-400"
                initial="initial"
                animate="animate"
              >
                I'm a <span className="text-sky-400">{typed}</span>
                <span className="animate-blink">|</span>
              </motion.h2>
            </div>

            <motion.p
              className="max-w-xl text-slate-400 mb-8 text-lg leading-relaxed"
              initial="initial"
              animate="animate"
            >
              Building beautiful, intuitive applications with a focus on performance and user experience for both web and mobile platforms.
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
                className="px-8 py-3 bg-transparent border-2 border-slate-700 hover:border-sky-500 text-slate-300 hover:text-sky-400 rounded-full font-medium transition-all pointer-events-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Social Links - Show below content on mobile */}
        <motion.div
          className="flex md:hidden justify-center gap-4 mt-8 mb-8 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {[
            { icon: Github, href: "https://https://github.com/dibba99.com" },
            // { icon: Linkedin, href: "" },
            { icon: Twitter, href: "https://twitter.com" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-slate-300 hover:text-sky-400 hover:bg-white/20 transition-all pointer-events-auto"
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
      </div>

      {/* Desktop Social Links - Fixed Position on Left (hidden on mobile) */}
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
            className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-slate-400 hover:text-sky-400 hover:bg-black/60 transition-all pointer-events-auto"
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow text-slate-400 hover:text-sky-400 transition-colors hidden md:block pointer-events-auto"
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