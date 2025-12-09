import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';

export const NewsletterPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check session storage to avoid spamming the user during a single session
      const hasSeen = sessionStorage.getItem('reelin_popup_seen');
      
      // Trigger after scrolling past 800px (past hero/intro)
      if (!hasSeen && window.scrollY > 800) {
        setIsOpen(true);
        sessionStorage.setItem('reelin_popup_seen', 'true');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 3500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-md transition-opacity duration-500 animate-fade-in"
        onClick={handleClose}
      />
      
      {/* Modal Card */}
      <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 p-8 md:p-12 rounded-3xl max-w-md w-full shadow-2xl animate-fade-in overflow-hidden transition-colors duration-300">
        
        {/* Subtle decorative gradient blob */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-zinc-100 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-black dark:text-zinc-600 dark:hover:text-white transition-colors duration-300 p-2"
          aria-label="Close"
        >
          <Icon name="X" size={20} />
        </button>

        {!isSubmitted ? (
          <div className="text-center relative z-10">
            {/* Logo Container */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-black dark:text-white mb-6 shadow-lg transition-colors p-3">
              {/* Uses logo.png with dark mode inversion */}
              <img 
                src="/logo.png" 
                className="w-full h-full object-contain dark:invert" 
                alt="Logo"
                onError={(e) => {
                   // Fallback to Icon if image missing
                   e.currentTarget.style.display = 'none';
                   const icon = document.createElement('div');
                   icon.innerHTML = '⚡'; 
                   e.currentTarget.parentElement?.appendChild(icon);
                }}
              />
            </div>
            
            <div className="space-y-3 mb-8">
              <h3 className="text-2xl font-bold tracking-tight text-black dark:text-white transition-colors">Initialize with an Advantage</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-[90%] mx-auto transition-colors">
                Enter your email to receive a 10% discount on your first month of service. Secure your place in the automated future.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-full px-6 py-4 text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500 transition-all text-sm group-hover:border-zinc-300 dark:group-hover:border-zinc-700"
                  required
                />
              </div>
              <Button type="submit" className="w-full py-4 text-sm">
                Claim 10% Off
              </Button>
            </form>
            
            <p className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mt-6 transition-colors">
              No noise. Just signal. Unsubscribe anytime.
            </p>
          </div>
        ) : (
          <div className="text-center py-8 relative z-10 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-black dark:text-white mb-6 transition-colors">
              <Icon name="Check" size={32} />
            </div>
            <h3 className="text-xl font-bold text-black dark:text-white mb-2 transition-colors">Offer Secured.</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm transition-colors">Check your inbox for your exclusive code.</p>
          </div>
        )}
      </div>
    </div>
  );
};