import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';

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

export const About: React.FC = () => {
  useEffect(() => {
    document.title = "The Reelin Protocol — About";
  }, []);

  return (
    <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white transition-colors duration-300">
       
       {/* Hero Section */}
       <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 fade-in-up bg-clip-text text-transparent bg-gradient-to-b from-black via-zinc-800 to-zinc-500 dark:from-white dark:via-white dark:to-zinc-500">
              Intelligence, <br />Orchestrated.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-2xl fade-in-up delay-100 transition-colors">
              We are the architects of the invisible. Reelin engineers the signal that drives autonomous growth and clarity in a complex world.
            </p>
          </div>
       </section>

       {/* The Thesis / Split Section */}
       <section className="py-24 border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                <ScrollReveal>
                   <h2 className="text-3xl font-bold mb-6 tracking-tight">The New Renaissance</h2>
                   <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light mb-8">
                      We are living through a renaissance of productivity. Companies that integrate AI unlock unprecedented potential. 
                      <br /><br />
                      The speed of the market creates new opportunities for those ready to move. Automation isn't about replacing the human touch; it's about amplifying it by removing the friction of the mundane.
                   </p>
                   <div className="h-px w-24 bg-black dark:bg-white mb-8"></div>
                   <p className="text-lg text-black dark:text-white font-medium">
                      Leadership is now a matter of momentum.
                   </p>
                </ScrollReveal>

                <ScrollReveal delay={150}>
                   <h2 className="text-3xl font-bold mb-6 tracking-tight">The Reelin Protocol</h2>
                   <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light mb-8">
                      We don't just build websites; we construct digital neural networks. By integrating predictive AI with automated execution layers, we bridge the gap between potential and reality.
                   </p>
                   <ul className="space-y-4">
                      <li className="flex items-center text-zinc-800 dark:text-zinc-200">
                         <Icon name="Check" size={18} className="mr-3 text-blue-500" />
                         <span>From Reactive to Predictive</span>
                      </li>
                      <li className="flex items-center text-zinc-800 dark:text-zinc-200">
                         <Icon name="Check" size={18} className="mr-3 text-blue-500" />
                         <span>From Manual to Autonomous</span>
                      </li>
                      <li className="flex items-center text-zinc-800 dark:text-zinc-200">
                         <Icon name="Check" size={18} className="mr-3 text-blue-500" />
                         <span>From Noise to Signal</span>
                      </li>
                   </ul>
                </ScrollReveal>
             </div>
          </div>
       </section>

       {/* Abstract Visual / The Core */}
       <section className="py-32 bg-zinc-50 dark:bg-zinc-900/30 overflow-hidden relative transition-colors duration-300">
          {/* Neural Core Animation */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-zinc-300 dark:border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-zinc-300 dark:border-white/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
             <ScrollReveal>
               <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Operating Principles</h2>
             </ScrollReveal>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <ScrollReveal delay={100}>
                   <div className="p-8 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all">
                      <div className="text-blue-500 mb-4"><Icon name="Cpu" size={32} /></div>
                      <h3 className="text-xl font-bold mb-3 tracking-tight">Autonomy First</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                         If it can be automated, it should be. We remove human latency from critical loops to free up creative energy.
                      </p>
                   </div>
                </ScrollReveal>
                
                <ScrollReveal delay={200}>
                   <div className="p-8 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all">
                      <div className="text-indigo-500 mb-4"><Icon name="Zap" size={32} /></div>
                      <h3 className="text-xl font-bold mb-3 tracking-tight">Speed</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                         Speed is a feature. Our systems are architected for millisecond decision making and rapid adaptation.
                      </p>
                   </div>
                </ScrollReveal>

                <ScrollReveal delay={300}>
                   <div className="p-8 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all">
                      <div className="text-purple-500 mb-4"><Icon name="Globe" size={32} /></div>
                      <h3 className="text-xl font-bold mb-3 tracking-tight">Evolution</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                         Dynamic systems thrive. We build self-improving architectures that learn from data and get better every day.
                      </p>
                   </div>
                </ScrollReveal>
             </div>
          </div>
       </section>

       {/* Global Reach / Footer CTA */}
       <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="bg-black text-white dark:bg-white dark:text-black rounded-[2.5rem] p-12 md:p-24 text-center overflow-hidden relative">
             {/* Abstract Grid Background */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             <div className="absolute inset-0 bg-grid-white/[0.05] dark:bg-grid-black/[0.05] bg-[size:30px_30px]"></div>
             
             <div className="relative z-10">
                <span className="inline-block py-1 px-3 rounded-full bg-white/10 dark:bg-black/10 text-xs font-mono mb-8 backdrop-blur-md">
                   HQ: VANCOUVER, BC
                </span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                   Ready to ascend?
                </h2>
                <p className="text-xl text-zinc-400 dark:text-zinc-600 mb-12 max-w-2xl mx-auto font-light">
                   The future is open. Join the vanguard of the automated economy.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                   <Link to="/contact">
                      <Button 
                         size="lg" 
                         className="bg-white text-black hover:bg-zinc-200 dark:bg-black dark:text-white dark:hover:bg-zinc-800"
                      >
                         Initialize Partnership
                      </Button>
                   </Link>
                   <Link to="/services">
                      <Button variant="ghost" className="text-white hover:text-zinc-300 dark:text-black dark:hover:text-zinc-600">
                         View Architectures &rarr;
                      </Button>
                   </Link>
                </div>
             </div>
          </div>
       </section>

    </div>
  );
};