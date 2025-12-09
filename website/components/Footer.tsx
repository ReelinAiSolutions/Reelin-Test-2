import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_NAME, NAV_LINKS, ADDRESS, CONTACT_EMAIL } from '../constants';
import { Logo } from './ui/Logo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-900 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="md:col-span-1">
          <Link to="/" className="mb-6 block transition-colors">
            <Logo iconClassName="h-6" />
          </Link>
          <p className="text-zinc-500 dark:text-zinc-500 text-xs leading-relaxed">
            Data-driven automation for the modern enterprise.<br />
            {ADDRESS}
          </p>
        </div>

        <div className="md:col-span-1">
          <h4 className="text-black dark:text-white text-sm font-semibold mb-4 transition-colors">Explore</h4>
          <ul className="space-y-2">
            {NAV_LINKS.map(link => (
              <li key={link.path}>
                <Link to={link.path} className="text-zinc-500 hover:text-black dark:hover:text-white text-sm transition-colors duration-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-1">
          <h4 className="text-black dark:text-white text-sm font-semibold mb-4 transition-colors">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-zinc-500 hover:text-black dark:hover:text-white text-sm transition-colors duration-300">Privacy Policy</a></li>
            <li><a href="#" className="text-zinc-500 hover:text-black dark:hover:text-white text-sm transition-colors duration-300">Terms of Service</a></li>
          </ul>
        </div>

        <div className="md:col-span-1">
           <h4 className="text-black dark:text-white text-sm font-semibold mb-4 transition-colors">Connect</h4>
           <a href={`mailto:${CONTACT_EMAIL}`} className="text-zinc-500 hover:text-black dark:hover:text-white text-sm transition-colors duration-300 block mb-2">{CONTACT_EMAIL}</a>
           <p className="text-zinc-500 text-sm">{ADDRESS}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center transition-colors duration-300">
        <p className="text-zinc-500 dark:text-zinc-600 text-xs">Copyright © {currentYear} {COMPANY_NAME} Inc. All rights reserved.</p>
        <p className="text-zinc-500 dark:text-zinc-700 text-xs mt-2 md:mt-0">Designed in Vancouver.</p>
      </div>
    </footer>
  );
};