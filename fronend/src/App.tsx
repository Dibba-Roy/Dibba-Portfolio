import { useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import WorkHistory from './components/WorkHistory';
import Projects from './components/Projects';
import { AnimatePresence, motion } from 'motion/react';
import ColdStartLoader from './components/shared/ColdStartLoader';
import AppLoadingAnimation from './components/AppLoadingAnimation';
import { coldStartPingService } from './services/get-cold-start-ping';

function App() {
  const [coldStartComplete, setColdStartComplete] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleColdStartComplete = () => {
    setColdStartComplete(true);
  };

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {!coldStartComplete && (
        <ColdStartLoader
          onComplete={handleColdStartComplete}
          coldStartPingService={coldStartPingService}
        />
      )}
      {coldStartComplete && !animationComplete && (
        <AppLoadingAnimation onComplete={handleAnimationComplete} />
      )}
      {coldStartComplete && animationComplete && (
        <AnimatePresence>
          <motion.main
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.0 }}
            className="overflow-hidden"
          >
            <NavBar />
            <Hero />
            <WorkHistory />
            <Projects />
          </motion.main>
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;
