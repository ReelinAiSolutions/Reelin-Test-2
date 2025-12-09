import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  details: string[];
  iconName: string; 
}

export interface ServiceTier {
  level: string;
  title: string;
  subtitle: string;
  features: string[];
  outcome: string;
  highlight?: boolean;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface Testimonial {
  author: string;
  company: string;
  quote: string;
}

export enum ThemeColor {
  Black = 'bg-black',
  DarkGray = 'bg-zinc-900',
  Acccent = 'text-blue-500'
}