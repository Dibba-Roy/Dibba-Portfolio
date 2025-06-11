import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // decide when header should actually be visible
  const visible = scrolled || isMenuOpen;

  // handle smooth scroll
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/80 z-30 transition-opacity duration-300
          ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsMenuOpen(false)}
      />

      <header
        className={`
          fixed top-0 left-0 w-full z-50
          transform transition-transform duration-300
          ${visible ? 'translate-y-0' : '-translate-y-full'}
          ${scrolled
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-sm'
            : ''
          }
        `}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
              Dibba
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['home','workExperience', 'personalProjects'].map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-slate-700 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(open => !open)}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-800"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden fixed inset-0 top-[72px]
            bg-white dark:bg-slate-900 z-40
            transition-transform duration-300 transform
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <nav className="flex flex-col items-end justify-center h-full space-y-8 text-xl pt-16 pr-8">
            {['home','workExperience', 'personalProjects'].map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-slate-700 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavBar;