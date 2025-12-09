import React from 'react';
import { Icon } from './Icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  withIcon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  withIcon = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group";
  
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };
  
  // Inverted colors for dark mode: Primary is White on Dark, Black on Light
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 focus:ring-black dark:focus:ring-white",
    secondary: "bg-zinc-100 text-black hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 focus:ring-zinc-200 dark:focus:ring-zinc-700 border border-zinc-200 dark:border-zinc-700",
    ghost: "bg-transparent text-black dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 px-0 hover:bg-transparent"
  };

  return (
    <button 
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`} 
      {...props}
    >
      {/* Subtle shimmer effect for primary button */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent z-10" />
      )}
      <span className="relative z-20 flex items-center">
        {children}
        {withIcon && <Icon name="ChevronRight" size={16} className="ml-2" />}
      </span>
    </button>
  );
};