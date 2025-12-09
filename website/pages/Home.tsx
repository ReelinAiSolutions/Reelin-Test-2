import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { TAGLINE_MAIN, TAGLINE_SECONDARY } from '../constants';

// Internal component for scroll reveal animations
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

// --- Abstract Visual Components ---

const VisualLevel1 = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl opacity-40">
    <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
    <div className="absolute right-10 top-10 w-32 h-32 border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
    <div className="absolute right-14 top-14 w-24 h-24 border border-blue-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
    <div className="absolute right-[4.5rem] top-[4.5rem] w-16 h-16 bg-blue-500/5 rounded-full animate-pulse"></div>
  </div>
);

const VisualLevel2 = () => (
   <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl opacity-40">
      <div className="absolute -right-20 top-20 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute right-8 top-12 flex gap-1.5 items-end h-24 rotate-12 opacity-60">
         {[...Array(5)].map((_, i) => (
             <div 
               key={i} 
               className="w-3 bg-gradient-to-t from-indigo-500/10 to-indigo-500/40 rounded-t-sm animate-[pulse_2s_ease-in-out_infinite]" 
               style={{ 
                 height: `${40 + i * 15}%`, 
                 animationDelay: `${i * 200}ms` 
               }} 
             />
         ))}
      </div>
   </div>
);

const VisualLevel3 = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl opacity-50">
     <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-purple-900/10 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
     {/* Abstract Mesh/Network */}
     <svg className="absolute top-0 right-0 w-full h-full opacity-40" viewBox="0 0 200 200" preserveAspectRatio="none">
        <defs>
           <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" className="text-purple-500" stopOpacity="0" />
              <stop offset="100%" stopColor="currentColor" className="text-purple-500" stopOpacity="0.5" />
           </linearGradient>
        </defs>
        <path d="M0,200 Q100,100 200,0" stroke="url(#grad1)" strokeWidth="0.5" fill="none" />
        <path d="M50,200 Q125,100 200,50" stroke="url(#grad1)" strokeWidth="0.5" fill="none" />
        <path d="M100,200 Q150,150 200,100" stroke="url(#grad1)" strokeWidth="0.5" fill="none" />
     </svg>
     <div className="absolute right-8 top-8 w-40 h-40 border border-purple-500/10 rounded-full animate-[spin_60s_linear_infinite] border-dashed"></div>
  </div>
);

// --- Main Component ---

export const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    document.title = "Reelin — Turn Struggles into Systems";
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-black dark:selection:text-white transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           {/* Grid Overlay */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-100 mix-blend-soft-light"></div>
           <div className="absolute inset-0 bg-grid-zinc-900/[0.04] dark:bg-grid-white/[0.02] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"></div>

           {/* Animated Background Blobs */}
           <div 
             className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-blue-400/20 dark:bg-blue-900/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal animate-blob filter transition-colors duration-1000"
             style={{ 
               transform: `translate(-50%, calc(-50% + ${scrollY * 0.2}px))` 
             }} 
           />
           <div 
             className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-indigo-300/30 dark:bg-indigo-900/5 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-normal animate-blob delay-200 filter transition-colors duration-1000"
             style={{ 
               transform: `translate(0, ${scrollY * 0.1}px)` 
             }}
           />
           <div 
             className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-300/20 dark:bg-purple-900/5 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-normal animate-blob delay-500 filter transition-colors duration-1000"
           />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight fade-in-up delay-100 bg-clip-text text-transparent bg-gradient-to-b from-black via-zinc-800 to-zinc-500 dark:from-white dark:via-white dark:to-zinc-500 transition-all duration-300">
            {TAGLINE_MAIN}
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-light tracking-wide max-w-2xl mx-auto fade-in-up delay-200 transition-colors">
            {TAGLINE_SECONDARY}
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8 fade-in-up delay-300 relative z-20">
            <Link to="/contact" className="z-20 relative">
              <Button size="lg" withIcon>Initialize System</Button>
            </Link>
            <Link to="/services" className="z-20 relative">
              <Button variant="ghost">Explore Systems</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition / Intro */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8 leading-tight text-black dark:text-white transition-colors">
              The future belongs to the automated.<br />
              <span className="text-blue-500/80 dark:text-blue-400/80">Empower your team to focus on what matters.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light transition-colors">
               The opportunity is immense. Automation isn't just about speed; it's about liberation. 
               We deploy self-sustaining architectures that free your potential, allowing you to 
               focus on creativity, strategy, and growth.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Turn Your Struggles into Systems (Visual Redesign) */}
      <section className="py-32 bg-white dark:bg-black relative transition-colors duration-300 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="mb-16 text-center md:text-left md:flex justify-between items-end">
               <div>
                  <h3 className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2 transition-colors">The Trajectory</h3>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black dark:text-white transition-colors">Turn Your Struggles into Systems.</h2>
                  <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-lg">Technology advances daily. Evolve your infrastructure to match. Choose your trajectory.</p>
               </div>
               <Link to="/services" className="hidden md:block text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors text-sm group z-20 relative">
                 Compare Tiers <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
               </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Level 1: Foundation */}
            <ScrollReveal className="h-full">
              <div className="relative h-full p-10 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 flex flex-col hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 group overflow-hidden">
                <VisualLevel1 />
                
                <div className="relative z-10 pointer-events-none">
                    <h4 className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-3">System 1</h4>
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Foundation</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                    The baseline. Digitize your presence and automate your first touchpoints to capture every lead.
                    </p>
                </div>
                <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800/50 relative z-20">
                    <Link to="/services" className="text-sm font-medium text-black dark:text-white hover:opacity-70 transition-opacity flex items-center">
                    Build Foundation <Icon name="ChevronRight" size={14} className="ml-1" />
                    </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Level 2: Expansion */}
            <ScrollReveal className="h-full" delay={100}>
              <div className="relative h-full p-10 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 flex flex-col hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 group overflow-hidden">
                <VisualLevel2 />
                
                <div className="relative z-10 pointer-events-none">
                    <h4 className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-3">System 2</h4>
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Expansion</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                    The accelerator. Multi-channel analytics and conversion architecture to multiply your impact.
                    </p>
                </div>
                <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800/50 relative z-20">
                    <Link to="/services" className="text-sm font-medium text-black dark:text-white hover:opacity-70 transition-opacity flex items-center">
                    Initiate Expansion <Icon name="ChevronRight" size={14} className="ml-1" />
                    </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Level 3: Autonomous Enterprise */}
            <ScrollReveal className="h-full" delay={200}>
              <div className="relative h-full p-10 rounded-[2rem] bg-zinc-900 text-white dark:bg-black border border-transparent dark:border-zinc-800 flex flex-col overflow-hidden group shadow-2xl">
                <VisualLevel3 />
                
                <div className="relative z-10 pointer-events-none">
                    <h4 className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-3">System 3</h4>
                    <h3 className="text-2xl font-bold mb-4">Autonomous Enterprise</h3>
                    <p className="text-zinc-400 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                    The singularity. Predictive intelligence that updates itself. Total market leadership.
                    </p>
                </div>
                <div className="mt-auto pt-4 border-t border-white/10 relative z-20">
                    <Link to="/services" className="text-sm font-medium hover:opacity-70 transition-opacity flex items-center text-white">
                    Achieve Autonomy <Icon name="ChevronRight" size={14} className="ml-1" />
                    </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA (Visual Refinement) */}
      <section className="py-40 bg-black text-center relative overflow-hidden">
         {/* Refined Data Stream Background */}
         <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-black"></div>
            {/* Elegant moving lines/stream instead of chaotic pulse */}
            {[...Array(8)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute top-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent opacity-30 animate-[scan_5s_linear_infinite]"
                    style={{
                        left: `${10 + i * 12}%`,
                        height: '100%',
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${3 + i * 0.5}s`
                    }}
                />
            ))}
         </div>
         
         <div className="max-w-4xl mx-auto px-6 relative z-10">
            <ScrollReveal>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">upgrade?</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light">
                The algorithm learns and grows. Let's build a system that grows with it.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
                <Link to="/contact" className="z-20 relative">
                  <Button size="lg" className="px-12 py-5 text-lg min-w-[200px] shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_-5px_rgba(99,102,241,0.6)] border border-indigo-500/30">Initialize Project</Button>
                </Link>
                <Link to="/services" className="z-20 relative">
                  <Button variant="secondary" size="lg" className="px-12 py-5 text-lg min-w-[200px] bg-white/5 border-white/10 text-white hover:bg-white/10 dark:bg-white/5 dark:text-white dark:border-white/10 dark:hover:bg-white/10">View Roadmap</Button>
                </Link>
              </div>
            </ScrollReveal>
         </div>
      </section>

    </div>
  );
};