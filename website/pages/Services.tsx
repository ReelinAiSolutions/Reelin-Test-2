import React, { useEffect, useState, useRef } from 'react';
import { SERVICE_TIERS } from '../constants';
import { Icon } from '../components/ui/Icon';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

// Reuse ScrollReveal logic locally
const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ 
  children, 
  className = "",
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-1000 ease-apple ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const Services: React.FC = () => {
  useEffect(() => {
    document.title = "AI Services & Automation Tiers — Reelin";
  }, []);

  return (
    <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white pt-32 pb-20 transition-colors duration-300">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 fade-in-up bg-clip-text text-transparent bg-gradient-to-b from-black via-zinc-800 to-zinc-500 dark:from-white dark:via-white dark:to-zinc-500">
          Innovate & Ascend.
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto fade-in-up delay-100 transition-colors font-light">
          Stay ahead of the game in the age of AI
        </p>
      </div>

      {/* Tiers Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICE_TIERS.map((tier, index) => {
            const isFullStack = index === 2;
            return (
              <ScrollReveal key={index} delay={index * 150} className="h-full">
                <div 
                  className={`h-full relative flex flex-col p-8 md:p-10 rounded-[2rem] border transition-all duration-500 group
                    ${isFullStack 
                      ? 'bg-zinc-900 text-white border-zinc-800 dark:bg-white dark:text-black dark:border-white shadow-2xl scale-[1.02] z-10' 
                      : 'bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20'
                    }
                  `}
                >
                  {/* Highlight Glow for Full Stack */}
                  {isFullStack && (
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-20 dark:opacity-10 pointer-events-none" />
                  )}

                  {/* Level Tag */}
                  <div className={`mb-6 flex justify-between items-center`}>
                     <span className={`text-xs font-bold uppercase tracking-widest ${isFullStack ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-400 dark:text-zinc-500'}`}>
                        {tier.level}
                     </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">{tier.title}</h2>
                    <p className={`text-lg font-medium ${isFullStack ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'}`}>
                      {tier.subtitle}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="flex-grow mb-10">
                    <ul className="space-y-4">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start">
                          <div className={`mt-1 mr-3 flex-shrink-0 ${isFullStack ? 'text-blue-400 dark:text-blue-600' : 'text-blue-600 dark:text-blue-400'}`}>
                             <Icon name="Check" size={16} />
                          </div>
                          <span className={`text-sm leading-relaxed ${isFullStack ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-600 dark:text-zinc-300'}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcome Section (Footer of Card) */}
                  <div className={`pt-8 mt-auto border-t ${isFullStack ? 'border-white/10 dark:border-black/10' : 'border-zinc-200 dark:border-white/5'}`}>
                    <div className="mb-6">
                       <span className={`text-xs font-semibold uppercase tracking-wider mb-2 block ${isFullStack ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-400 dark:text-zinc-600'}`}>
                         Why This Level?
                       </span>
                       <p className={`text-base font-medium leading-snug ${isFullStack ? 'text-white dark:text-black' : 'text-black dark:text-white'}`}>
                         {tier.outcome}
                       </p>
                    </div>
                    
                    <Link to="/contact" className="block">
                      <Button 
                        variant={isFullStack ? 'secondary' : 'primary'} 
                        className={`w-full justify-center ${isFullStack ? 'bg-white text-black hover:bg-zinc-200 dark:bg-black dark:text-white dark:hover:bg-zinc-800' : ''}`}
                      >
                        {isFullStack ? 'Transform Now' : 'Get Started'}
                      </Button>
                    </Link>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto px-6 mt-32 text-center border-t border-zinc-200 dark:border-zinc-900 pt-20 transition-colors duration-300">
         <h2 className="text-3xl font-bold mb-6 text-black dark:text-white transition-colors">Lead the transformation.</h2>
         <p className="text-zinc-600 dark:text-zinc-400 mb-8 transition-colors max-w-xl mx-auto">
           The new economy is here. Secure your place at the forefront of the automated revolution.
         </p>
         <Link to="/contact">
           <Button variant="ghost">Book a Strategy Call</Button>
         </Link>
      </div>
    </div>
  );
};