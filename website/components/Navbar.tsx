import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, COMPANY_NAME } from '../constants';
import { Icon } from './ui/Icon';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './ui/Logo';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showThemeTip, setShowThemeTip] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Show theme tooltip briefly on mount if not seen before
    const hasSeenTip = sessionStorage.getItem('theme_tip_seen');
    if (!hasSeenTip) {
      const timer = setTimeout(() => setShowThemeTip(true), 1500);
      const hideTimer = setTimeout(() => {
        setShowThemeTip(false);
        sessionStorage.setItem('theme_tip_seen', 'true');
      }, 6000);
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="z-50 block cursor-pointer">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${location.pathname === link.path ? 'text-black dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pl-4 border-l border-zinc-200 dark:border-zinc-800 relative">
             <ThemeToggle />
             
             {/* Theme Switch Tooltip */}
             <div className={`absolute top-full right-0 mt-4 w-32 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-xs font-medium py-2 px-3 rounded-lg shadow-xl pointer-events-none transition-all duration-500 transform ${showThemeTip ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                <div className="absolute -top-1 right-3 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rotate-45"></div>
                Try Light Mode
             </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 md:hidden z-50">
          <ThemeToggle />
          <button 
            className="text-black dark:text-white focus:outline-none cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Icon name={isOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center space-y-8 transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
           {NAV_LINKS.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="text-2xl font-semibold text-black dark:text-white hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};