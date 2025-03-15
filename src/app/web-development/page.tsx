'use client';

import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cardClasses, headingClasses } from '@/utils/classNames';

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

// Define the timeline types
type TimelinePhase = {
  name: string;
  duration: string;
  tasks: string[];
  icon: string;
};

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
  ] as TimelinePhase[]
};

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

export default function WebDevelopment() {
  const [showFeatures, setShowFeatures] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Add scroll event listener to update active dot
  useEffect(() => {
    const slider = document.getElementById('websiteSlider');
    if (slider) {
      const handleScroll = () => {
        const index = Math.round(slider.scrollLeft / (350 + 24)); // card width + gap
        setActiveIndex(index);
      };
      
      slider.addEventListener('scroll', handleScroll);
      return () => slider.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <main className="pt-24 bg-gray-50">
      <PageHero 
        title="Web Development Services"
        subtitle="Custom web solutions that drive growth and deliver exceptional user experiences."
        bgImage="/images/web-dev-hero.jpg"
      />

      {/* Contact Form Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900">Get Started</h2>
            <p className="mt-2 text-gray-600">Tell us about your project</p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-4 sm:p-6 md:p-8">
              <form>
                {/* Contact Details Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      id="fullName"
                      type="text"
                      className="w-full p-3 rounded-xl border border-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-primary/20
                        bg-gray-50/50 hover:bg-gray-50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      className="w-full p-3 rounded-xl border border-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-primary/20
                        bg-gray-50/50 hover:bg-gray-50 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full p-3 rounded-xl border border-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-primary/20
                        bg-gray-50/50 hover:bg-gray-50 transition-colors"
                      placeholder="+254 700 000000"
                    />
                  </div>
                </div>

                {/* Project Details Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Project Type</label>
                    <select
                      id="projectType"
                      className="w-full p-3 rounded-xl border border-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-primary/20 
                        appearance-none bg-gray-50/50 hover:bg-gray-50 transition-colors 
                        cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>Select project type</option>
                      <option value="website">Website Development</option>
                      <option value="ecommerce">E-commerce Platform</option>
                      <option value="webapp">Web Application</option>
                      <option value="portal">Customer Portal</option>
                      <option value="cms">Content Management System</option>
                      <option value="custom">Custom Solution</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Timeline</label>
                    <select
                      id="timeline"
                      className="w-full p-3 rounded-xl border border-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-primary/20 
                        appearance-none bg-gray-50/50 hover:bg-gray-50 transition-colors 
                        cursor-pointer"
                    >
                      <option value="" disabled selected>Select timeline</option>
                      <option value="urgent">Urgent (1-2 weeks)</option>
                      <option value="normal">Normal (2-4 weeks)</option>
                      <option value="relaxed">Relaxed (4-8 weeks)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Budget Range (KES)</label>
                    <select
                      id="budget"
                      className="w-full p-3 rounded-xl border border-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-primary/20 
                        appearance-none bg-gray-50/50 hover:bg-gray-50 transition-colors 
                        cursor-pointer"
                    >
                      <option value="" disabled selected>Select budget</option>
                      <option value="30k-50k">30K - 50K</option>
                      <option value="50k-100k">50K - 100K</option>
                      <option value="100k-200k">100K - 200K</option>
                      <option value="200k-500k">200K - 500K</option>
                      <option value="500k+">500K+</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Priority Level</label>
                    <select
                      id="priority"
                      className="w-full p-3 rounded-xl border border-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-primary/20 
                        appearance-none bg-gray-50/50 hover:bg-gray-50 transition-colors 
                        cursor-pointer"
                    >
                      <option value="" disabled selected>Select priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div className="mb-6 sm:mb-8 space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Project Description</label>
                  <textarea
                    id="description"
                    className="w-full p-3 rounded-xl border border-gray-200 
                      focus:outline-none focus:ring-2 focus:ring-primary/20 
                      bg-gray-50/50 hover:bg-gray-50 transition-colors resize-none"
                    rows={3}
                    placeholder="Tell us about your project goals, features required, and any specific requirements..."
                  ></textarea>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-500 order-2 sm:order-1">
                    <i className="fas fa-shield-alt mr-2"></i>
                    Your information is secure and encrypted
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-xl 
                      font-medium hover:bg-primary-dark transition-all shadow-md 
                      flex items-center justify-center gap-2 order-1 sm:order-2"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      
                      // Get form values
                      const name = (document.getElementById('fullName') as HTMLInputElement)?.value;
                      const email = (document.getElementById('email') as HTMLInputElement)?.value;
                      const phone = (document.getElementById('phone') as HTMLInputElement)?.value;
                      const projectType = (document.getElementById('projectType') as HTMLSelectElement)?.value;
                      const timeline = (document.getElementById('timeline') as HTMLSelectElement)?.value;
                      const budget = (document.getElementById('budget') as HTMLSelectElement)?.value;
                      const priority = (document.getElementById('priority') as HTMLSelectElement)?.value;
                      const description = (document.getElementById('description') as HTMLTextAreaElement)?.value;

                      // Validate required fields
                      if (!name || !email || !phone || !projectType || !budget || !description) {
                        alert('Please fill in all required fields');
                        return;
                      }

                      // Format WhatsApp message
                      const message = `*New Project Request*\n\n` +
                        `*Contact Details*\n` +
                        `Name: ${name}\n` +
                        `Email: ${email}\n` +
                        `Phone: ${phone}\n\n` +
                        `*Project Details*\n` +
                        `Type: ${projectType}\n` +
                        `Timeline: ${timeline}\n` +
                        `Budget: ${budget}\n` +
                        `Priority: ${priority}\n\n` +
                        `*Project Description*\n${description}`;

                      // Open WhatsApp with formatted message
                      window.open(`https://wa.me/254741590670?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                  >
                    Submit Request
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Websites Section */}
      <section className="py-20 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Types of Websites We Create</h2>
            <p className="mt-2 text-gray-600">Specialized web solutions for every industry</p>
          </div>

          <div className="relative">
            {/* Slider Container */}
            <div 
              className="overflow-x-auto hide-scrollbar"
              id="websiteSlider"
            >
              <div className="flex gap-6 pb-8">
                {/* Website Cards */}
                {websiteTypes.map((type, index) => (
                  <div
                        key={type.id} 
                        className={`bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg 
                          transition-all duration-300 min-w-[350px] border border-gray-100
                          hover:border-primary/20 group`}
                    >
                      <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                        group-hover:text-primary transition-colors`}>
                        {type.title}
                      </h3>
                    <p className="text-gray-600 mb-6">{type.description}</p>
                      <ul className="space-y-3 text-gray-600">
                        {type.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full bg-primary/30 
                              group-hover:bg-primary transition-colors`}></span>
                            {feature}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-8 mt-6">
              {/* Left Arrow */}
              <button
                onClick={() => {
                  const slider = document.getElementById('websiteSlider');
                  if (slider) {
                    const newIndex = activeIndex === 0 ? websiteTypes.length - 1 : activeIndex - 1;
                    const scrollAmount = newIndex * (350 + 24);
                    slider.scrollTo({
                      left: scrollAmount,
                      behavior: 'smooth'
                    });
                    setActiveIndex(newIndex);
                  }
                }}
                aria-label="Previous"
                className={`p-3 text-white bg-primary hover:bg-primary-dark rounded-full 
                  shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              {/* Scroll Dots */}
              <div className="flex justify-center items-center gap-3">
                {websiteTypes.map((_, index) => (
                  <button
                    key={index}
                    className={`transition-all duration-300 rounded-full
                      ${index === activeIndex 
                        ? 'w-8 h-3 bg-primary shadow-md' 
                        : 'w-3 h-3 bg-gray-200 hover:bg-primary/40'
                      }`}
                    onClick={() => {
                      const slider = document.getElementById('websiteSlider');
                      if (slider) {
                        const scrollAmount = index * (350 + 24);
                        slider.scrollTo({
                          left: scrollAmount,
                          behavior: 'smooth'
                        });
                        setActiveIndex(index);
                      }
                    }}
                    aria-label={`View ${websiteTypes[index].title}`}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => {
                  const slider = document.getElementById('websiteSlider');
                  if (slider) {
                    const newIndex = activeIndex === websiteTypes.length - 1 ? 0 : activeIndex + 1;
                    const scrollAmount = newIndex * (350 + 24);
                    slider.scrollTo({
                      left: scrollAmount,
                      behavior: 'smooth'
                    });
                    setActiveIndex(newIndex);
                  }
                }}
                aria-label="Next"
                className={`p-3 text-white bg-primary hover:bg-primary-dark rounded-full 
                  shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            {/* Custom Scrollbar Styling */}
            <style jsx global>{`
              .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
                scroll-snap-type: x mandatory;
              }
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Development Process</h2>
            <p className="mt-2 text-gray-600">A systematic approach to delivering exceptional results</p>
          </div>

          {/* Timeline Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Horizontal Line - Hidden on mobile */}
            <div className="hidden md:block absolute top-[25px] left-0 w-full h-[2px]">
              <div className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-red-400"></div>
            </div>

            {/* Vertical Line - Shown only on mobile */}
            <div className="md:hidden absolute left-[25px] top-0 h-full w-[2px]">
              <div className="h-full bg-gradient-to-b from-blue-400 via-purple-500 to-red-400"></div>
            </div>

            {/* Timeline Steps */}
            <div className="relative flex flex-col md:flex-row md:justify-between gap-8 md:gap-0">
              {/* Step 1 */}
              <div className="flex md:flex-col items-start md:items-center gap-6 md:gap-2 md:flex-1">
                <div className="w-[50px] h-[50px] rounded-full border-2 border-blue-400 bg-white 
                  flex items-center justify-center text-blue-400 text-xl font-semibold z-10">
                  1
                </div>
                <div className="md:text-center">
                  <h3 className="text-[#ff6b00] font-semibold">Discovery & Planning</h3>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex md:flex-col items-start md:items-center gap-6 md:gap-2 md:flex-1">
                <div className="w-[50px] h-[50px] rounded-full border-2 border-purple-400 bg-white 
                  flex items-center justify-center text-purple-400 text-xl font-semibold z-10">
                  2
                </div>
                <div className="md:text-center">
                  <h3 className="text-[#ff6b00] font-semibold">Design</h3>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex md:flex-col items-start md:items-center gap-6 md:gap-2 md:flex-1">
                <div className="w-[50px] h-[50px] rounded-full border-2 border-blue-400 bg-white 
                  flex items-center justify-center text-blue-400 text-xl font-semibold z-10">
                  3
                </div>
                <div className="md:text-center">
                  <h3 className="text-[#ff6b00] font-semibold">Development</h3>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex md:flex-col items-start md:items-center gap-6 md:gap-2 md:flex-1">
                <div className="w-[50px] h-[50px] rounded-full border-2 border-pink-400 bg-white 
                  flex items-center justify-center text-pink-400 text-xl font-semibold z-10">
                  4
                </div>
                <div className="md:text-center">
                  <h3 className="text-[#ff6b00] font-semibold">Testing</h3>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex md:flex-col items-start md:items-center gap-6 md:gap-2 md:flex-1">
                <div className="w-[50px] h-[50px] rounded-full border-2 border-red-400 bg-white 
                  flex items-center justify-center text-red-400 text-xl font-semibold z-10">
                  5
                </div>
                <div className="md:text-center">
                  <h3 className="text-[#ff6b00] font-semibold">Deployment</h3>
                </div>
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
                  <div>
                    <a
                      href={project.link}
                      className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
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
  );
} 