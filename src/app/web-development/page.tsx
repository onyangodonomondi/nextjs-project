'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { useState } from 'react';

type FeaturePrice = {
  name: string;
  price: number;
  description: string;
};

const websiteBasePrice: Record<string, number> = {
  'landing': 30000,
  'business': 50000,
  'portfolio': 40000,
  'ecommerce': 80000,
  'education': 70000,
  'healthcare': 75000,
  'real-estate': 65000,
  'restaurant': 55000,
  'travel': 60000,
  'ngo': 45000,
  'crm': 90000,
  'booking': 85000,
  'membership': 70000,
  'marketplace': 100000
};

const additionalFeatures: FeaturePrice[] = [
  {
    name: 'Content Management System (CMS)',
    price: 15000,
    description: 'Easy-to-use system for updating website content'
  },
  {
    name: 'E-commerce Integration',
    price: 25000,
    description: 'Online store with payment gateway integration'
  },
  {
    name: 'Custom Database',
    price: 20000,
    description: 'Tailored database solution for your needs'
  },
  {
    name: 'User Authentication',
    price: 15000,
    description: 'Secure login and user management system'
  },
  {
    name: 'API Integration',
    price: 10000,
    description: 'Connect with third-party services'
  },
  {
    name: 'Advanced SEO Package',
    price: 12000,
    description: 'Comprehensive search engine optimization'
  },
  {
    name: 'Social Media Integration',
    price: 8000,
    description: 'Connect your website with social platforms'
  },
  {
    name: 'Analytics Dashboard',
    price: 10000,
    description: 'Custom reporting and analytics'
  }
];

const processSteps = [
  {
    title: 'Discovery',
    description: 'We start by understanding your business goals, target audience, and project requirements.',
    icon: 'fas fa-search',
  },
  {
    title: 'Planning',
    description: 'Creating a detailed project roadmap, wireframes, and technical specifications.',
    icon: 'fas fa-sitemap',
  },
  {
    title: 'Design',
    description: 'Crafting beautiful, user-friendly interfaces that align with your brand.',
    icon: 'fas fa-paint-brush',
  },
  {
    title: 'Development',
    description: 'Building your website using modern, scalable technologies.',
    icon: 'fas fa-code',
  },
  {
    title: 'Testing',
    description: 'Rigorous testing across devices and browsers to ensure quality.',
    icon: 'fas fa-vial',
  },
  {
    title: 'Launch',
    description: 'Deploying your website and providing ongoing support.',
    icon: 'fas fa-rocket',
  },
];

const developmentTimeline = {
  phases: [
    {
      name: 'Discovery & Planning',
      duration: '1-2 weeks',
      tasks: [
        'Requirements gathering',
        'Project scope definition',
        'Technology stack selection',
        'Timeline planning'
      ],
      icon: 'fas fa-search-plus'
    },
    {
      name: 'Design',
      duration: '1-2 weeks',
      tasks: [
        'Wireframe creation',
        'UI/UX design',
        'Design review',
        'Client feedback'
      ],
      icon: 'fas fa-pencil-ruler'
    },
    {
      name: 'Development',
      duration: '2-4 weeks',
      tasks: [
        'Frontend development',
        'Backend integration',
        'Database setup',
        'Feature implementation'
      ],
      icon: 'fas fa-code'
    },
    {
      name: 'Testing',
      duration: '1 week',
      tasks: [
        'Quality assurance',
        'Cross-browser testing',
        'Performance optimization',
        'Security testing'
      ],
      icon: 'fas fa-vial'
    },
    {
      name: 'Deployment',
      duration: '2-3 days',
      tasks: [
        'Server setup',
        'Domain configuration',
        'SSL installation',
        'Go-live preparation'
      ],
      icon: 'fas fa-rocket'
    }
  ]
};

// First, let's define better types for our technologies
type TechStack = {
  id: string;
  category: string;
  icon: string;
  description: string;
  items: {
    name: string;
    icon: string;
    level: 'Basic' | 'Advanced' | 'Expert';
    experience: string;
  }[];
  bgColor: string;
  textColor: string;
};

const technologies: TechStack[] = [
  {
    id: 'frontend',
    category: 'Frontend',
    icon: 'fas fa-laptop-code',
    description: 'Modern and responsive user interfaces',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    textColor: 'text-blue-600',
    items: [
      {
        name: 'React/Next.js',
        icon: 'fab fa-react',
        level: 'Expert',
        experience: '5+ years'
      },
      {
        name: 'TypeScript',
        icon: 'fas fa-code',
        level: 'Expert',
        experience: '4+ years'
      },
      {
        name: 'Tailwind CSS',
        icon: 'fas fa-paint-brush',
        level: 'Expert',
        experience: '3+ years'
      },
      {
        name: 'Vue.js',
        icon: 'fab fa-vuejs',
        level: 'Advanced',
        experience: '3+ years'
      }
    ]
  },
  {
    id: 'backend',
    category: 'Backend',
    icon: 'fas fa-server',
    description: 'Scalable and secure server solutions',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    textColor: 'text-green-600',
    items: [
      {
        name: 'Node.js',
        icon: 'fab fa-node-js',
        level: 'Expert',
        experience: '5+ years'
      },
      {
        name: 'Python',
        icon: 'fab fa-python',
        level: 'Advanced',
        experience: '4+ years'
      },
      {
        name: 'PHP/Laravel',
        icon: 'fab fa-php',
        level: 'Expert',
        experience: '5+ years'
      },
      {
        name: 'Express',
        icon: 'fas fa-server',
        level: 'Expert',
        experience: '4+ years'
      }
    ]
  },
  {
    id: 'database',
    category: 'Database',
    icon: 'fas fa-database',
    description: 'Reliable data storage solutions',
    bgColor: 'bg-gradient-to-br from-purple-50 to-fuchsia-50',
    textColor: 'text-purple-600',
    items: [
      {
        name: 'MySQL',
        icon: 'fas fa-database',
        level: 'Expert',
        experience: '6+ years'
      },
      {
        name: 'PostgreSQL',
        icon: 'fas fa-database',
        level: 'Advanced',
        experience: '4+ years'
      },
      {
        name: 'MongoDB',
        icon: 'fas fa-leaf',
        level: 'Expert',
        experience: '4+ years'
      },
      {
        name: 'Redis',
        icon: 'fas fa-bolt',
        level: 'Advanced',
        experience: '3+ years'
      }
    ]
  },
  {
    id: 'cms',
    category: 'CMS',
    icon: 'fas fa-file-code',
    description: 'Content management solutions',
    bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
    textColor: 'text-orange-600',
    items: [
      {
        name: 'WordPress',
        icon: 'fab fa-wordpress',
        level: 'Expert',
        experience: '7+ years'
      },
      {
        name: 'Strapi',
        icon: 'fas fa-box',
        level: 'Advanced',
        experience: '3+ years'
      },
      {
        name: 'Sanity',
        icon: 'fas fa-cube',
        level: 'Advanced',
        experience: '2+ years'
      },
      {
        name: 'Contentful',
        icon: 'fas fa-feather',
        level: 'Advanced',
        experience: '3+ years'
      }
    ]
  }
];

// Add these types and data
type WebsiteType = {
  id: string;
  title: string;
  description: string;
  icon: React.FC;
  features: string[];
  color: {
    light: string;
    dark: string;
    text: string;
    border: string;
  };
};

// Add these modern icon components
const ModernIcons = {
  Corporate: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
      <path
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m4 0v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1v5m4 0h-4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-current"
      />
    </svg>
  ),
  Ecommerce: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-current"
      />
    </svg>
  ),
  Portfolio: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-current"
      />
    </svg>
  ),
  Healthcare: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 12h6m-3-3v6m3-12H9a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-current"
      />
    </svg>
  ),
  Educational: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-current"
      />
    </svg>
  ),
  Legal: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 6l9-4 9 4v12l-9 4-9-4V6zm9 12v-8m-8-2l8 4 8-4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-current"
      />
    </svg>
  ),
};

// Update the websiteTypes array to use the new icons
const websiteTypes: WebsiteType[] = [
  {
    id: 'corporate',
    title: 'Corporate Websites',
    description: 'Professional websites for businesses that establish credibility and showcase services.',
    icon: ModernIcons.Corporate,
    features: [
      'Company Profile',
      'Service Showcase',
      'Team Profiles',
      'Contact Integration',
      'Blog Integration',
      'Analytics Dashboard'
    ],
    color: {
      light: 'bg-blue-50',
      dark: 'bg-blue-500',
      text: 'text-blue-600',
      border: 'border-blue-200'
    }
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Websites',
    description: 'Online stores with secure payment gateways and inventory management.',
    icon: ModernIcons.Ecommerce,
    features: [
      'Product Catalog',
      'Shopping Cart',
      'Payment Integration',
      'Order Management',
      'Inventory System',
      'Customer Accounts'
    ],
    color: {
      light: 'bg-purple-50',
      dark: 'bg-purple-500',
      text: 'text-purple-600',
      border: 'border-purple-200'
    }
  },
  {
    id: 'portfolio',
    title: 'Portfolio Websites',
    description: 'Creative platforms to showcase your work and attract potential clients.',
    icon: ModernIcons.Portfolio,
    features: [
      'Project Gallery',
      'Case Studies',
      'Client Testimonials',
      'Contact Forms',
      'Social Media Integration',
      'SEO Optimization'
    ],
    color: {
      light: 'bg-orange-50',
      dark: 'bg-orange-500',
      text: 'text-orange-600',
      border: 'border-orange-200'
    }
  },
  {
    id: 'healthcare',
    title: 'Healthcare Websites',
    description: 'User-friendly websites for medical practices and healthcare providers.',
    icon: ModernIcons.Healthcare,
    features: [
      'Appointment Booking',
      'Patient Portal',
      'Service Information',
      'Doctor Profiles',
      'HIPAA Compliance',
      'Emergency Contact'
    ],
    color: {
      light: 'bg-emerald-50',
      dark: 'bg-emerald-500',
      text: 'text-emerald-600',
      border: 'border-emerald-200'
    }
  },
  {
    id: 'educational',
    title: 'Educational Websites',
    description: 'Interactive platforms for schools, colleges, and educational institutions.',
    icon: ModernIcons.Educational,
    features: [
      'Course Catalog',
      'Student Portal',
      'Learning Management',
      'Event Calendar',
      'Resource Library',
      'Online Registration'
    ],
    color: {
      light: 'bg-cyan-50',
      dark: 'bg-cyan-500',
      text: 'text-cyan-600',
      border: 'border-cyan-200'
    }
  },
  {
    id: 'legal',
    title: 'Legal Websites',
    description: 'Professional websites for law firms and legal consultants.',
    icon: ModernIcons.Legal,
    features: [
      'Practice Areas',
      'Case Results',
      'Attorney Profiles',
      'Client Portal',
      'Legal Resources',
      'Consultation Booking'
    ],
    color: {
      light: 'bg-amber-50',
      dark: 'bg-amber-500',
      text: 'text-amber-600',
      border: 'border-amber-200'
    }
  }
];

// Add these types for hosting plans
type HostingPlan = {
  id: string;
  name: string;
  description: string;
  isPopular?: boolean;
  monthlyPrice: number;
  specs: {
    storage: string;
    type: string;
  };
  features: string[];
  color: {
    primary: string;
    light: string;
    border: string;
    text: string;
  };
};

const hostingPlans: HostingPlan[] = [
  {
    id: 'premium',
    name: 'Premium',
    description: 'Basic hosting setup',
    monthlyPrice: 500, // KES 6,000 per year
    specs: {
      storage: '100 GB SSD',
      type: 'Shared Hosting'
    },
    features: [
      'SSL certificates',
      'Weekly backups',
      'WordPress optimization',
      'Basic support'
    ],
    color: {
      primary: 'bg-blue-500',
      light: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600'
    }
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Advanced hosting setup',
    isPopular: true,
    monthlyPrice: 667, // KES 8,000 per year
    specs: {
      storage: '200 GB NVMe',
      type: 'Cloud Hosting'
    },
    features: [
      'SSL certificates',
      'Daily backups',
      'Performance optimization',
      'Priority support'
    ],
    color: {
      primary: 'bg-purple-500',
      light: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600'
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom hosting setup',
    monthlyPrice: 1250, // KES 15,000 per year
    specs: {
      storage: '200 GB NVMe',
      type: 'VPS/Dedicated'
    },
    features: [
      'SSL certificates',
      'Daily backups',
      'Server optimization',
      'Premium support'
    ],
    color: {
      primary: 'bg-gradient-to-r from-orange-500 to-pink-500',
      light: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-600'
    }
  }
];

const domainExtensions = [
  {
    ext: '.com',
    description: 'Most popular global domain, ideal for commercial websites',
    price: '$8.99/year',
    renewal: '$13.99/year',
    features: [
      'Global Recognition',
      'Best for Business',
      'High Availability',
      'Brand Protection'
    ]
  },
  {
    ext: '.co.ke',
    description: 'Kenya\'s official country-specific domain',
    price: '$20/year',
    renewal: '$20/year',
    features: [
      'Local Presence',
      'Better Local SEO',
      'Kenyan Identity',
      'Government Recognition'
    ]
  },
  {
    ext: '.org',
    description: 'Trusted domain for organizations and non-profits',
    price: '$12.99/year',
    renewal: '$17.99/year',
    features: [
      'Non-profit Status',
      'Trust Building',
      'Global Recognition',
      'Community Focus'
    ]
  },
  {
    ext: '.net',
    description: 'Popular for technology and network companies',
    price: '$10.99/year',
    renewal: '$15.99/year',
    features: [
      'Tech Credibility',
      'Network Services',
      'Alternative to .com',
      'Professional Image'
    ]
  },
  {
    ext: '.biz',
    description: 'Specifically for business entities',
    price: '$9.99/year',
    renewal: '$14.99/year',
    features: [
      'Business Focus',
      'Good Availability',
      'Professional Brand',
      'Global Recognition'
    ]
  }
];

const sendHostingPlanToWhatsApp = (plan: any) => {
  const message = `Hello! I'm interested in the following hosting plan:

Plan Name: ${plan.name}
Price: ${plan.price}
Features:
${plan.features.map((feature: string) => `- ${feature}`).join('\n')}

Please help me get started with this plan.`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/254741590670?text=${encodedMessage}`, '_blank');
};

const sendDomainRequestToWhatsApp = (domain: any) => {
  const message = `Hello! I'm interested in registering a domain:

Extension: ${domain.ext}
Price: ${domain.price}
Renewal: ${domain.renewal}

Please help me register this domain.`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/254741590670?text=${encodedMessage}`, '_blank');
};

const techStack = {
  frontend: {
    title: 'Frontend Technologies',
    items: [
      { name: 'React/Next.js', icon: 'fab fa-react', description: 'Fast, modern user interfaces' },
      { name: 'TypeScript', icon: 'fas fa-code', description: 'Type-safe development' },
      { name: 'Tailwind CSS', icon: 'fas fa-paint-brush', description: 'Beautiful, responsive designs' }
    ]
  },
  backend: {
    title: 'Backend Technologies',
    items: [
      { name: 'Node.js', icon: 'fab fa-node-js', description: 'Scalable server solutions' },
      { name: 'Python', icon: 'fab fa-python', description: 'Data processing & APIs' },
      { name: 'PHP/Laravel', icon: 'fab fa-php', description: 'Robust web applications' }
    ]
  }
};

const projectTimelines = {
  basic: {
    type: 'Basic Website',
    duration: '2-3 weeks',
    phases: [
      { name: 'Planning & Design', days: 5 },
      { name: 'Development', days: 7 },
      { name: 'Testing & Revisions', days: 3 }
    ]
  },
  ecommerce: {
    type: 'E-commerce Website',
    duration: '4-6 weeks',
    phases: [
      { name: 'Planning & Design', days: 10 },
      { name: 'Development', days: 15 },
      { name: 'Testing & Integration', days: 7 }
    ]
  }
};

const serviceFeatures = [
  {
    name: 'Responsive Design',
    basic: '✓',
    professional: '✓',
    enterprise: '✓'
  },
  {
    name: 'Custom Domain',
    basic: '✓',
    professional: '✓',
    enterprise: '✓'
  },
  {
    name: 'SSL Certificate',
    basic: 'Basic',
    professional: 'Advanced',
    enterprise: 'Wildcard'
  },
  {
    name: 'Storage Space',
    basic: '10GB',
    professional: '50GB',
    enterprise: 'Unlimited'
  },
  {
    name: 'Bandwidth',
    basic: '100GB',
    professional: '500GB',
    enterprise: 'Unlimited'
  },
  {
    name: 'Email Accounts',
    basic: '5',
    professional: '20',
    enterprise: 'Unlimited'
  },
  {
    name: 'Database',
    basic: '1',
    professional: '5',
    enterprise: 'Unlimited'
  },
  {
    name: 'Backup Frequency',
    basic: 'Weekly',
    professional: 'Daily',
    enterprise: 'Real-time'
  },
  {
    name: 'SEO Tools',
    basic: 'Basic',
    professional: 'Advanced',
    enterprise: 'Premium'
  },
  {
    name: 'Support',
    basic: 'Email',
    professional: 'Priority',
    enterprise: '24/7 Dedicated'
  }
];

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer: "Timeline varies based on complexity. A basic website typically takes 2-3 weeks, while e-commerce sites may take 4-6 weeks or more."
  },
  {
    question: "What is your web development process?",
    answer: "Our process includes discovery, planning, design, development, testing, and launch phases. We maintain clear communication throughout to ensure your vision is realized."
  },
  {
    question: "Do you provide website maintenance services?",
    answer: "Yes, we offer various maintenance packages that include regular updates, security monitoring, backups, and technical support."
  },
  {
    question: "Can you help with website hosting?",
    answer: "Yes, we provide reliable hosting solutions with different plans to suit your needs, including shared hosting, VPS, and dedicated servers."
  },
  {
    question: "Do you offer e-commerce solutions?",
    answer: "Yes, we build custom e-commerce websites using platforms like WooCommerce and Shopify, complete with payment gateway integration and inventory management."
  },
  {
    question: "What about mobile responsiveness?",
    answer: "All our websites are built with a mobile-first approach, ensuring they look and function perfectly on all devices and screen sizes."
  },
  {
    question: "Do you provide SEO services?",
    answer: "Yes, we offer comprehensive SEO services including on-page optimization, keyword research, content strategy, and technical SEO implementation."
  },
  {
    question: "What technologies do you use?",
    answer: "We use modern technologies including React, Next.js, Node.js, PHP/Laravel, and WordPress, choosing the best stack for your specific needs."
  },
  {
    question: "Can you help with domain registration?",
    answer: "Yes, we can help you select and register the perfect domain name for your website, including various TLDs (.com, .co.ke, .org, etc.)."
  },
  {
    question: "What about website security?",
    answer: "We implement robust security measures including SSL certificates, regular security audits, malware scanning, and backup solutions."
  }
];

// Add these color definitions for the phases
const phaseColors = {
  'Discovery & Planning': {
    bg: 'bg-blue-500',
    text: 'text-blue-600',
    light: 'bg-blue-50',
    border: 'border-blue-200'
  },
  'Design': {
    bg: 'bg-purple-500',
    text: 'text-purple-600',
    light: 'bg-purple-50',
    border: 'border-purple-200'
  },
  'Development': {
    bg: 'bg-orange-500',
    text: 'text-orange-600',
    light: 'bg-orange-50',
    border: 'border-orange-200'
  },
  'Testing': {
    bg: 'bg-green-500',
    text: 'text-green-600',
    light: 'bg-green-50',
    border: 'border-green-200'
  },
  'Deployment': {
    bg: 'bg-red-500',
    text: 'text-red-600',
    light: 'bg-red-50',
    border: 'border-red-200'
  }
};

// Add this function to handle plan selection
const handlePlanSelect = (plan: typeof hostingPlans[0]) => {
  const message = `Hi! I'm interested in the ${plan.name} hosting plan:\n\n` +
    `Price: KES ${plan.monthlyPrice}/mo (KES ${plan.monthlyPrice * 12}/year)\n` +
    `Storage: ${plan.specs.storage}\n` +
    `Type: ${plan.specs.type}\n\n` +
    `Features:\n${plan.features.map(f => `- ${f}`).join('\n')}\n\n` +
    `Please provide me with more information.`;
    
  window.open(`https://wa.me/254741590670?text=${encodeURIComponent(message)}`, '_blank');
};

export default function WebDevelopment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'business',
    budget: 'below-50k',
    timeline: 'not-urgent',
    description: '',
    hostingPlan: '',
    domainExtension: '',
    domainName: '',
    needHosting: false,
    needDomain: false,
    needSEO: false,
    needMaintenance: false,
    needSSL: false,
    needAnalytics: false,
    needCustomEmail: false,
    needContentCreation: false
  });

  const [calculator, setCalculator] = useState({
    websiteType: '',
    selectedFeatures: [] as string[],
    totalCost: 0
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Add state for features visibility
  const [showFeatures, setShowFeatures] = useState(false);

  const updateTotalCost = (type: string, features: string[]) => {
    const basePrice = websiteBasePrice[type] || 0;
    const featuresPrice = features.reduce((total, feature) => {
      const featurePrice = additionalFeatures.find(f => f.name === feature)?.price || 0;
      return total + featurePrice;
    }, 0);
    return basePrice + featuresPrice;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const additionalFeatures = [
      formData.needSEO && 'SEO',
      formData.needMaintenance && 'Monthly Maintenance',
      formData.needSSL && 'SSL Certificate',
      formData.needAnalytics && 'Google Analytics',
      formData.needCustomEmail && 'Custom Email',
      formData.needContentCreation && 'Content Creation'
    ].filter(Boolean);

    const message = `New Web Project Quote Request:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Project Type: ${formData.projectType}
Budget: ${formData.budget}
Timeline: ${formData.timeline}

Hosting Details:
${formData.needHosting ? `Selected Plan: ${formData.hostingPlan}` : 'No hosting required'}

Domain Details:
${formData.needDomain ? `
Domain Extension: ${formData.domainExtension}
Desired Domain Name: ${formData.domainName}` : 'No domain required'}

Additional Features Required:
${additionalFeatures.length > 0 ? additionalFeatures.join('\n') : 'None selected'}

Project Description:
${formData.description}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/254741590670?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-gray-50">
        <PageHero 
          title="Web Development Services"
          subtitle="Custom web solutions that drive growth and deliver exceptional user experiences."
          bgImage="/images/web-dev-hero.jpg"
        />

        <section className="py-20 bg-gray-50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Types of Websites We Create</h2>
              <p className="mt-4 text-gray-600">Specialized web solutions for every industry</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {websiteTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 ${type.color.light} rounded-2xl transform transition-transform group-hover:scale-105`} />
                  
                  <div className="relative p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-xl ${type.color.light} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        {type.icon && <type.icon />}
                  </div>
                      <div>
                        <h3 className={`text-xl font-semibold ${type.color.text}`}>{type.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {type.features.map((feature, i) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className={`w-5 h-5 rounded-full ${type.color.light} flex items-center justify-center`}>
                            <i className={`fas fa-check text-xs ${type.color.text}`} />
                          </div>
                        <span className="text-gray-600">{feature}</span>
                        </motion.div>
                    ))}
                </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="mt-6"
                    >
                      <button
                        className={`w-full py-3 rounded-xl ${type.color.light} ${type.color.text} font-medium 
                          transition-colors hover:bg-white hover:shadow-sm border-2 ${type.color.border}`}
                      >
                        Learn More
                        <i className="fas fa-arrow-right ml-2" />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our Development Process
              </h2>
              <p className="mt-4 text-gray-600">
                A systematic approach to delivering exceptional results
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              {/* Timeline Container */}
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-[45px] left-0 right-0 h-1 bg-gray-100">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ 
                      duration: 3,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    viewport={{ once: true }}
                  />
            </div>

                {/* Phases */}
                <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
                  {developmentTimeline.phases.map((phase, index) => (
                    <motion.div
                      key={phase.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2 
                      }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      {/* Phase Dot */}
                      <div className="hidden md:flex justify-center">
                        <motion.div 
                          className="w-[90px] h-[90px] rounded-full flex items-center justify-center 
                            relative z-10 bg-white border-2 transition-all duration-300"
                          initial={{ scale: 0.9, borderColor: 'rgb(229, 231, 235)' }}
                          whileInView={{ 
                            scale: 1.05,
                            borderColor: 'rgb(59, 130, 246)',
                            backgroundColor: 'rgb(239, 246, 255)'
                          }}
                          transition={{ 
                            duration: 0.5,
                            delay: 0.5 + (index * 0.2)
                          }}
                          viewport={{ once: true }}
                        >
                          <motion.span 
                            className="text-2xl font-bold"
                            initial={{ color: 'rgb(156, 163, 175)' }}
                            whileInView={{ color: 'rgb(37, 99, 235)' }}
                            transition={{ 
                              duration: 0.5,
                              delay: 0.5 + (index * 0.2)
                            }}
                            viewport={{ once: true }}
                          >
                            {index + 1}
                          </motion.span>
                        </motion.div>
                  </div>

                      {/* Content Card */}
                      <motion.div
                        className="mt-6 mx-4 rounded-xl bg-white shadow-sm overflow-hidden
                          h-[280px] flex flex-col"
                        initial={{ opacity: 0.6, scale: 0.95 }}
                        whileInView={{ 
                          opacity: 1,
                          scale: 1,
                          y: -5
                        }}
                        transition={{ 
                          duration: 0.5,
                          delay: 0.7 + (index * 0.2)
                        }}
                        viewport={{ once: true }}
                      >
                        {/* Header */}
                        <div className="p-4 bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="md:hidden w-10 h-10 rounded-full bg-white flex items-center justify-center">
                              <span className="text-lg font-bold text-gray-500">{index + 1}</span>
                </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{phase.name}</h3>
                              <span className="text-sm text-gray-500">{phase.duration}</span>
                            </div>
                          </div>
                        </div>

                        {/* Content area with flex-grow to fill space */}
                        <div className="p-4 flex-grow">
                          <div className="space-y-3">
                            {phase.tasks.map((task, i) => (
                              <motion.div
                                key={i}
                                className="flex items-start gap-2" // Changed to items-start for better alignment
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
                                <span className="text-sm text-gray-600 leading-tight">{task}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Technologies We Use</h2>
              <p className="mt-4 text-gray-600">Modern tools for modern web solutions</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-2xl p-6 ${tech.bgColor} hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl ${tech.textColor} bg-white shadow-sm flex items-center justify-center`}>
                      <i className={`${tech.icon} text-2xl`}></i>
                  </div>
                    <div>
                      <h3 className={`text-xl font-semibold ${tech.textColor}`}>{tech.category}</h3>
                      <p className="text-sm text-gray-600">{tech.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {tech.items.map((item) => (
                      <motion.div
                        key={item.name}
                        className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-sm transition-all"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3">
                          <i className={`${item.icon} ${tech.textColor}`}></i>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            item.level === 'Expert' ? 'bg-green-100 text-green-700' :
                            item.level === 'Advanced' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {item.level}
                          </span>
                          <span className="text-xs text-gray-500">{item.experience}</span>
                        </div>
                      </motion.div>
                    ))}
                </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container">
            <div className="section-header">
              <h2 className="text-gradient">Web Development Portfolio</h2>
              <p>Discover our latest web development projects and see how we can transform your digital presence.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  image: "/web/Mac-1024x683.jpg",
                  title: "Security Company Website",
                  description: "Custom Website for a security Company",
                  link: "https://top23security.com/"
                },
                {
                  image: "/web/Macbook-1-1024x683.jpg",
                  title: "Corporate Website",
                  description: "Modern business website with dynamic features",
                  link: "https://lsmsolutionsltd.com/"
                },
                {
                  image: "/web/Macbook-1024x683.jpg",
                  title: "StartUp Company Website",
                  description: "Custom Website for a StartUp Company",
                  link: "https://nafrichemdistributors.co.ke/"
                },
                {
                  image: "/web/Macbook-Pro-1024x683.jpg",
                  title: "Tourism Company Website",
                  description: "Custom Website for a Tourism Company",
                  link: "https://drivestayexplore.com/"
                },
                {
                  image: "/web/Macbook2-1024x683.jpg",
                  title: "E-commerce Website",
                  description: "Custom Website for an E-commerce Company",
                  link: "https://excaliburdealerslimited.com/"
                },
                {
                  image: "/web/Macbook3-1024x683.jpg",
                  title: "Crypto Trading Company Website",
                  description: "Custom Website for a Crypto Trading Company",
                  link: "https://piggycryptoke.com/"
                },
                {
                  image: "/web/Macbook4-1-1024x683.jpg",
                  title: "Law Firm Website",
                  description: "Custom Website for a Law Firm",
                  link: "https://wasongalaw.co.ke/"
                },
                {
                  image: "/web/Macbook6-1024x683.jpg",
                  title: "College Website",
                  description: "Custom Website for a College",
                  link: "https://knowledgespringinstitute.ac.ke/"
                },
                {
                  image: "/web/Macbook7-1024x683.jpg",
                  title: "E-commerce Website",
                  description: "Custom Website for an E-commerce Company",
                  link: "https://charloflexshippers.co.ke/"
                },
                {
                  image: "/web/Macbook4-1024x683.jpg",
                  title: "Corporate Website",
                  description: "Custom Website for a Corporate Company",
                  link: "https://icl.aero/"
                },
                {
                  image: "/web/pure-1024x683.jpg",
                  title: "NGO Website",
                  description: "Custom Website for an NGO",
                  link: "https://pure-gift.org/"
                },
                {
                  image: "/web/Macbook12-1024x683.jpg",
                  title: "Corporate Website",
                  description: "Custom Website for a Corporate Company",
                  link: "https://reucherafricakenyaltd.co.ke/"
                }
              ].map((project, index) => (
                <div key={project.link} className="portfolio-card group" data-aos="fade-up" data-aos-delay={index % 3 * 100}>
                  <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex gap-4">
                      <a
                        href={project.link}
                        className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website <i className="fas fa-external-link-alt"></i>
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-accent transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Details <i className="fas fa-info-circle"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hosting Plans Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Web Hosting Solutions</h2>
              <p className="mt-4 text-gray-600">Professional hosting plans with premium features</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {hostingPlans.map((plan) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="relative"
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 inset-x-0 flex justify-center">
                      <span className="px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className={`h-full bg-white rounded-2xl shadow-sm overflow-hidden ${
                    plan.isPopular ? 'ring-2 ring-primary' : ''
                  }`}>
                    {/* Header */}
                    <div className={`p-6 ${plan.color.light}`}>
                      <h3 className={`text-xl font-semibold ${plan.color.text}`}>{plan.name}</h3>
                      <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
                      
                      {/* Pricing */}
                      <div className="mt-4">
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold">KES {plan.monthlyPrice}</span>
                          <span className="text-gray-500 ml-1">/mo</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          KES {(plan.monthlyPrice * 12).toLocaleString()} billed yearly
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="p-6 space-y-6">
                      {/* Specs */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <i className={`fas fa-hdd text-lg ${plan.color.text}`} />
                          <span>{plan.specs.storage}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <i className={`fas fa-server text-lg ${plan.color.text}`} />
                          <span>{plan.specs.type}</span>
                        </div>
                      </div>

                      {/* Feature List */}
                      <div className="space-y-3 pt-6 border-t">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3">
                            <i className={`fas fa-check text-sm ${plan.color.text}`} />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="p-6 pt-0">
                      <button 
                        onClick={() => handlePlanSelect(plan)}
                        className={`w-full py-3 rounded-xl transition-all
                          ${plan.isPopular 
                            ? 'bg-primary text-white hover:bg-primary-dark' 
                            : `${plan.color.light} ${plan.color.text} hover:bg-white hover:shadow-sm border-2 ${plan.color.border}`
                          }`}
                      >
                        Select Plan
                        <i className="fas fa-arrow-right ml-2" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Domain Extensions Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Domain Extensions</h2>
              <p className="mt-4 text-gray-600">Choose the perfect domain for your brand</p>
            </motion.div>

            <div className="max-w-7xl mx-auto space-y-6">
              {[
                {
                  extension: '.com',
                  badge: 'Most Popular',
                  description: 'Most popular global domain, ideal for commercial websites',
                  price: 8.99,
                  renewal: 13.99,
                  features: ['Global Recognition', 'High Availability', 'Best for Business', 'Brand Protection'],
                  color: 'blue'
                },
                {
                  extension: '.co.ke',
                  description: "Kenya's official country-specific domain",
                  price: 20,
                  renewal: 20,
                  features: ['Local Presence', 'Kenyan Identity', 'Better Local SEO', 'Government Recognition'],
                  color: 'green'
                },
                {
                  extension: '.org',
                  description: 'Trusted domain for organizations and non-profits',
                  price: 12.99,
                  renewal: 17.99,
                  features: ['Non-profit Status', 'Global Recognition', 'Trust Building', 'Community Focus'],
                  color: 'purple'
                },
                {
                  extension: '.net',
                  description: 'Technical and network-related websites',
                  price: 10.99,
                  renewal: 15.99,
                  features: ['Tech Recognition', 'Network Identity', 'Professional Appeal', 'Global Reach'],
                  color: 'orange'
                }
              ].map((domain, index) => (
                <motion.div
                  key={domain.extension}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row items-center md:items-stretch">
                    {/* Extension and Description */}
                    <div className="p-6 md:w-1/3 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{domain.extension}</h3>
                        {domain.badge && (
                          <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                            {domain.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">{domain.description}</p>
                    </div>

                    {/* Features */}
                    <div className="p-6 md:w-1/3 bg-gray-50 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-3">
                        {domain.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <i className={`fas fa-check text-${domain.color}-500 text-sm`}></i>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing and Action */}
                    <div className="p-6 md:w-1/3 flex flex-col justify-center items-center md:items-end">
                      <div className="text-center md:text-right">
                        <div className="text-3xl font-bold text-gray-900">
                          ${domain.price}
                          <span className="text-sm font-normal text-gray-500">/year</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Renewal: ${domain.renewal}/year
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`mt-4 px-6 py-2 rounded-xl font-medium transition-all
                          bg-${domain.color}-50 text-${domain.color}-600 hover:bg-${domain.color}-100`}
                      >
                        Register Now
                        <i className="fas fa-arrow-right ml-2"></i>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Request Form */}
        <section className="py-20 relative overflow-hidden">
          {/* Background gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-gray-50/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-dark to-primary">
                Request a Quote
              </h2>
              <p className="mt-4 text-gray-600 text-lg">Let's bring your vision to life</p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white">
                <form onSubmit={handleSubmit} className="p-8">
                  {/* Contact Information */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {[
                      { label: 'Name', type: 'text', placeholder: 'Your name' },
                      { label: 'Email', type: 'email', placeholder: 'your@email.com' },
                      { label: 'Phone', type: 'tel', placeholder: 'Your phone number' }
                    ].map((field) => (
                      <div key={field.label} className="relative group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                        <input
                          type={field.type}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                            focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white
                            group-hover:border-gray-300 transition-all"
                          placeholder={field.placeholder}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Project Details */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {[
                      {
                        label: 'Project Type',
                        options: [
                          { value: 'corporate', label: 'Corporate Website' },
                          { value: 'ecommerce', label: 'E-commerce Store' },
                          { value: 'portfolio', label: 'Portfolio/Personal' },
                          { value: 'blog', label: 'Blog/Magazine' },
                          { value: 'education', label: 'Educational Platform' },
                          { value: 'healthcare', label: 'Healthcare/Medical' },
                          { value: 'real-estate', label: 'Real Estate' },
                          { value: 'restaurant', label: 'Restaurant/Food' },
                          { value: 'ngo', label: 'NGO/Non-Profit' },
                          { value: 'travel', label: 'Travel/Tourism' },
                          { value: 'marketplace', label: 'Online Marketplace' },
                          { value: 'membership', label: 'Membership Site' },
                          { value: 'booking', label: 'Booking System' },
                          { value: 'crm', label: 'CRM System' }
                        ]
                      },
                      {
                        label: 'Budget Range',
                        options: [
                          { value: 'below-50k', label: 'Below KES 50,000' },
                          { value: '50k-100k', label: 'KES 50,000 - 100,000' },
                          { value: '100k-200k', label: 'KES 100,000 - 200,000' },
                          { value: '200k-500k', label: 'KES 200,000 - 500,000' },
                          { value: 'above-500k', label: 'Above KES 500,000' },
                          { value: 'custom', label: 'Custom Budget' }
                        ]
                      },
                      {
                        label: 'Timeline',
                        options: [
                          { value: 'urgent', label: 'Urgent (2-3 weeks)' },
                          { value: 'standard', label: 'Standard (4-6 weeks)' },
                          { value: 'extended', label: 'Extended (6-8 weeks)' },
                          { value: 'complex', label: 'Complex (8-12 weeks)' },
                          { value: 'flexible', label: 'Flexible Timeline' }
                        ]
                      }
                    ].map((field) => (
                      <div key={field.label} className="relative group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                        <div className="relative">
                          <select 
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                              focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white
                              group-hover:border-gray-300 transition-all appearance-none"
                          >
                            <option value="">Select {field.label.toLowerCase()}</option>
                            {field.options.map(opt => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <i className="fas fa-chevron-down"></i>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Project Description */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                        focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white
                        hover:border-gray-300 transition-all resize-none"
                      placeholder="Tell us about your project requirements..."
                    ></textarea>
                  </div>

                  {/* Additional Services */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Services</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { icon: 'fas fa-server', label: 'Web Hosting' },
                        { icon: 'fas fa-globe', label: 'Domain Name' },
                        { icon: 'fas fa-search', label: 'SEO Service' },
                        { icon: 'fas fa-tools', label: 'Maintenance' },
                        { icon: 'fas fa-lock', label: 'SSL Certificate' },
                        { icon: 'fas fa-chart-line', label: 'Analytics' },
                        { icon: 'fas fa-envelope', label: 'Custom Email' },
                        { icon: 'fas fa-pen', label: 'Content Creation' }
                      ].map((service) => (
                        <motion.div
                          key={service.label}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50/80 hover:bg-primary/5 
                            hover:border-primary/20 border border-transparent transition-all">
                            <i className={`${service.icon} text-primary`}></i>
                            <span className="font-medium text-gray-700">{service.label}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-gradient-to-r from-primary via-primary to-primary-dark text-white 
                        rounded-xl font-medium transition-all inline-flex items-center gap-2 
                        shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)]"
                    >
                      Send Quote Request
                      <i className="fas fa-paper-plane"></i>
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Cost Calculator</h2>
              <p className="mt-4 text-gray-600">Estimate the cost of your web development project</p>
            </motion.div>

            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                {/* Website Type Selection */}
                <div className="p-8 border-b border-gray-100">
                  <h3 className="text-xl font-semibold mb-6">Select Website Type</h3>
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.entries(websiteBasePrice).map(([type, price]) => (
                      <motion.div
                        key={type}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group p-4 rounded-xl cursor-pointer transition-all ${
                          calculator.websiteType === type
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => {
                          setCalculator(prev => ({
                            ...prev,
                            websiteType: type,
                            totalCost: updateTotalCost(type, prev.selectedFeatures)
                          }));
                        }}
                      >
                        <div className="flex flex-col gap-2">
                          <span className="capitalize font-medium">{type.replace('-', ' ')}</span>
                          <span className={`font-bold ${
                            calculator.websiteType === type ? 'text-white' : 'text-primary'
                          }`}>
                            KES {price.toLocaleString()}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Additional Features */}
                <div className="p-8 bg-gray-50">
                  <button 
                    onClick={() => setShowFeatures(!showFeatures)}
                    className="w-full flex items-center justify-between mb-6"
                  >
                    <h3 className="text-xl font-semibold">Additional Features</h3>
                    <span className={`transition-transform duration-300 ${showFeatures ? 'rotate-180' : ''}`}>
                      <i className="fas fa-chevron-down text-gray-400"></i>
                    </span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ 
                      height: showFeatures ? 'auto' : 0,
                      opacity: showFeatures ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {additionalFeatures.map((feature) => (
                        <motion.div
                          key={feature.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 bg-white rounded-xl cursor-pointer transition-all shadow-sm ${
                            calculator.selectedFeatures.includes(feature.name)
                              ? 'ring-2 ring-primary'
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => {
                            setCalculator(prev => {
                              const features = prev.selectedFeatures.includes(feature.name)
                                ? prev.selectedFeatures.filter(f => f !== feature.name)
                                : [...prev.selectedFeatures, feature.name];
                              return {
                                ...prev,
                                selectedFeatures: features,
                                totalCost: updateTotalCost(prev.websiteType, features)
                              };
                            });
                          }}
                        >
                          <div className="flex flex-col gap-2">
                            <div>
                              <h4 className="font-medium text-gray-900">{feature.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                            </div>
                            <span className="font-bold text-primary">
                              KES {feature.price.toLocaleString()}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Selected Features Summary */}
                  <div className={`mt-4 ${showFeatures ? 'hidden' : 'block'}`}>
                    <div className="flex flex-wrap gap-2">
                      {calculator.selectedFeatures.length > 0 ? (
                        calculator.selectedFeatures.map((feature) => (
                          <span 
                            key={feature}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">No additional features selected</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Total Cost Display */}
                <div className="p-8 bg-gradient-to-r from-primary/5 to-primary/10">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Total Estimated Cost</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        * Final cost may vary based on specific requirements
                      </p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-3xl font-bold text-primary">
                        KES {calculator.totalCost.toLocaleString()}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const message = `Hi! I'm interested in a web development project:\n\nWebsite Type: ${calculator.websiteType}\nSelected Features:\n${calculator.selectedFeatures.join('\n')}\n\nEstimated Cost: KES ${calculator.totalCost.toLocaleString()}\n\nPlease provide me with more information.`;
                          window.open(`https://wa.me/254741590670?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                        className="px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark 
                          transition-all shadow-lg shadow-primary/20"
                      >
                        Submit
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-gray-600">
                Everything you need to know about our web development services
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-xl overflow-hidden transition-all duration-300
                    ${expandedFaq === index ? 'shadow-lg ring-2 ring-primary/10' : 'shadow-sm hover:shadow-md'}`}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full text-left p-6 focus:outline-none"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex gap-4 items-start">
                        <span className={`p-2 rounded-lg ${
                          expandedFaq === index 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          <i className="fas fa-question text-lg"></i>
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                          {faq.question}
                        </h3>
                      </div>
                      <span className={`transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}>
                        <i className="fas fa-chevron-down text-gray-400"></i>
                      </span>
                    </div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ 
                      height: expandedFaq === index ? 'auto' : 0,
                      opacity: expandedFaq === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-600 border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 