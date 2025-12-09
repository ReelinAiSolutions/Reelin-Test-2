
import React from 'react';
import { COMPANY_NAME } from '../../constants';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  hideText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  iconClassName = "h-8 w-8",
  hideText = false 
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 
        Custom SVG Logo: Boy Fishing on Crescent Moon
        Refined for a cleaner, gap-free silhouette.
      */}
      <svg 
        viewBox="0 0 100 100" 
        className={`${iconClassName} text-black dark:text-white transition-colors duration-300`}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Crescent Moon Base */}
        <path d="M78.5,12.5 C65.5,4.5,48.5,4.5,35.5,10.5 C15.5,20.5,5.5,45.5,12.5,68.5 C19.5,91.5,45.5,101.5,68.5,94.5 C78.5,91.5,86.5,84.5,91.5,75.5 C88.5,78.5,84.5,80.5,79.5,81.5 C60.5,85.5,41.5,73.5,37.5,54.5 C33.5,35.5,45.5,16.5,64.5,12.5 Z" />
        
        {/* Boy Silhouette - Unified Path sitting flush on the moon */}
        <g>
          {/* Head */}
          <circle cx="54" cy="40" r="5.5" />
          {/* Body & Legs - Merged to sit cleanly on the curve at roughly 45,55 */}
          <path d="M52 45 C 52 45 48 58 46 62 C 45 64 52 68 58 66 C 60 65 62 72 62 72 L 66 70 C 66 70 66 60 62 56 C 60 54 58 45 58 45 Z" />
          {/* Arm holding rod */}
          <path d="M54 48 Q 60 52 64 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Fishing Rod - extending from hand position */}
        <path d="M64 50 L 92 28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        
        {/* Fishing Line - hanging straight down from rod tip */}
        <path d="M92 28 L 92 62" stroke="currentColor" strokeWidth="0.5" />
        
        {/* Star/Bait at the end of the line */}
        <path d="M92 62 L 90 66 L 94 66 Z" />
      </svg>

      {!hideText && (
        <span className="font-bold tracking-tighter text-xl text-black dark:text-white transition-colors duration-300">
          {COMPANY_NAME}
        </span>
      )}
    </div>
  );
};
