import { NavLink, ServiceItem, ServiceTier, Testimonial } from './types';

export const COMPANY_NAME = "Reelin";
export const TAGLINE_MAIN = "Reelin in the Unlimited Nature of AI.";
export const TAGLINE_SECONDARY = "Turning potential into precision.";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const SERVICE_TIERS: ServiceTier[] = [
  {
    level: "System 1",
    title: "Foundation",
    subtitle: "The Baseline",
    features: [
      "Custom High-Performance Website",
      "Lead Generation Funnel Architecture",
      "Automated AI Outreach",
      "Smart Appointment Setting"
    ],
    outcome: "Capture every opportunity. Turn interest into action automatically."
  },
  {
    level: "System 2",
    title: "Expansion",
    subtitle: "The Accelerator",
    features: [
      "Everything in Foundation",
      "SEO Optimization & Strategy",
      "Conversion Tracking & Analytics",
      "High-impact pipelines",
      "A/B Testing for Funnels",
      "Customer Insights & Segmentation"
    ],
    outcome: "Data reveals the path. Understand behavior to serve your market better."
  },
  {
    level: "System 3",
    title: "Autonomous Enterprise",
    subtitle: "The Singularity",
    highlight: true,
    features: [
      "Everything in Expansion",
      "End-to-End AI Business Automation",
      "Predictive Analytics Models",
      "Personalized Content & Campaigns",
      "Complete Workflow Automation",
      "Financial Data Integration",
      "Self-Updating AI Systems"
    ],
    outcome: "Total autonomy. Your system evolves daily, creating value while you sleep."
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "automation",
    title: "AI Automation & Workflow",
    shortDescription: "Eliminate redundancy. Architect efficiency.",
    fullDescription: "We deploy custom neural networks and logic flows to handle the repetitive, allowing your human talent to focus on innovation. From CRM entry to complex operational routing, our systems never sleep.",
    details: ["Custom Zapier/Make Architectures", "CRM Auto-population", "Intelligent Email Sorting", "Automated Invoicing"],
    iconName: "Cpu"
  },
  {
    id: "lead-gen",
    title: "Lead Generation Systems",
    shortDescription: "Precision targeting. High-impact pipelines.",
    fullDescription: "Forget cold calling. Our AI-driven lead engines analyze market signals to identify high-intent prospects before they even start searching. We build self-sustaining pipelines that feed your sales team qualified opportunities.",
    details: ["Predictive Analytics", "Automated Outreach Sequences", "Intent Data Scoring", "Multi-channel Funnels"],
    iconName: "Target"
  },
  {
    id: "branding",
    title: "Portfolio & Branding",
    shortDescription: "Visual identity. Curated for impact.",
    fullDescription: "In a noisy world, clarity is king. We craft minimalist, high-impact digital portfolios and brand identities that resonate with the modern consumer. Clean lines, bold typography, and a futuristic edge.",
    details: ["Visual Identity Systems", "Web Design & Development", "Copywriting & Voice", "Asset Creation"],
    iconName: "Palette"
  },
  {
    id: "consulting",
    title: "Strategic Consulting",
    shortDescription: "The blueprint for your data future.",
    fullDescription: "Transitioning to an AI-first company is daunting. We provide the roadmap. From auditing your current data infrastructure to training your leadership team, we guide your evolution into a data engine.",
    details: ["Digital Transformation Audits", "Staff Training", "Tool Stack Selection", "Long-term AI Roadmap"],
    iconName: "Map"
  }
];

export const CONTACT_EMAIL = "info@reelin.ca";
export const ADDRESS = "Vancouver, BC";