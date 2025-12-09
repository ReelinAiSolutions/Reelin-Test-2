import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Initialize Partnership — Contact Reelin";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setIsSubmitted(true), 800);
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white pt-32 pb-20 flex items-center justify-center transition-colors duration-300">
       <div className="max-w-xl w-full px-6">
         
         {!isSubmitted ? (
           <div className="fade-in-up">
              <h1 className="text-5xl font-bold tracking-tighter mb-4 text-center">Initialize.</h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-center mb-12 transition-colors">
                Tell us about your infrastructure. We'll handle the architecture.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1 transition-colors">Name</label>
                  <input 
                    required
                    type="text" 
                    id="name"
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 py-4 text-xl text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-zinc-400 dark:placeholder-zinc-800"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1 transition-colors">Email</label>
                  <input 
                    required
                    type="email" 
                    id="email"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                    className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 py-4 text-xl text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-zinc-400 dark:placeholder-zinc-800"
                    placeholder="name@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1 transition-colors">Phone <span className="font-normal normal-case opacity-50 ml-1">(Optional)</span></label>
                  <input 
                    type="tel" 
                    id="phone"
                    value={formState.phone}
                    onChange={e => setFormState({...formState, phone: e.target.value})}
                    className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 py-4 text-xl text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-zinc-400 dark:placeholder-zinc-800"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1 transition-colors">Project Details</label>
                  <textarea 
                    required
                    id="message"
                    rows={4}
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                    className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 py-4 text-xl text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-zinc-400 dark:placeholder-zinc-800 resize-none"
                    placeholder="Briefly describe your goals..."
                  />
                </div>

                <div className="pt-8 flex justify-center">
                  <Button type="submit" size="lg" className="w-full md:w-auto px-12">Send Signal</Button>
                </div>
              </form>
           </div>
         ) : (
           <div className="text-center py-20 fade-in-up">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white mb-8 transition-colors">
                 <Icon name="Check" size={40} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Signal Received.</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 transition-colors">Our systems are analyzing your request. Expect a transmission shortly.</p>
              <Button variant="ghost" onClick={() => setIsSubmitted(false)}>Reset Form</Button>
           </div>
         )}
         
       </div>
    </div>
  );
};