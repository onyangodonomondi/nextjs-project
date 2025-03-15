'use client';

import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Types for our technologies section
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

// Technologies data
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

export default function WebDevelopment() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="pt-24 bg-gray-50">
        <PageHero 
          title="Web Development Services"
          subtitle="Custom web solutions that drive growth and deliver exceptional user experiences."
          bgImage="/images/web-dev-hero.jpg"
        />

      {/* Service Overview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Professional Web Development</h2>
            <p className="mt-2 text-gray-600">Creating digital experiences that drive business growth</p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-primary text-2xl mb-4">
                <i className="fas fa-laptop-code"></i>
                </div>
              <h3 className="text-xl font-semibold mb-3">Custom Web Development</h3>
              <p className="text-gray-600">Tailored websites and web applications designed specifically for your business needs.</p>
              </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-primary text-2xl mb-4">
                <i className="fas fa-mobile-alt"></i>
                </div>
              <h3 className="text-xl font-semibold mb-3">Responsive Design</h3>
              <p className="text-gray-600">Websites that look and function perfectly across all devices and screen sizes.</p>
              </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-primary text-2xl mb-4">
                <i className="fas fa-search"></i>
            </div>
              <h3 className="text-xl font-semibold mb-3">SEO Optimization</h3>
              <p className="text-gray-600">Built-in search engine optimization to help your website rank higher.</p>
          </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-primary text-2xl mb-4">
                <i className="fas fa-shield-alt"></i>
            </div>
              <h3 className="text-xl font-semibold mb-3">Security</h3>
              <p className="text-gray-600">Robust security measures to protect your website and user data from threats.</p>
              </div>
            </div>
          </div>
        </section>

      {/* Technologies We Use Section */}
        <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
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

      {/* Website Types Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Types of Websites We Create</h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              We specialize in developing a wide range of websites tailored to different business needs and objectives
            </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                title: "Corporate Websites",
                icon: "fas fa-building",
                description: "Professional websites that establish credibility and showcase your brand's unique value proposition to potential clients.",
                features: ["Brand Storytelling", "Team Profiles", "Service Showcases", "Contact Information"]
              },
              {
                title: "E-commerce Websites",
                icon: "fas fa-shopping-cart",
                description: "Fully-functional online stores with secure payment gateways, inventory management, and customer account features.",
                features: ["Product Catalog", "Secure Checkout", "Customer Accounts", "Order Tracking"]
              },
              {
                title: "Portfolio Websites",
                icon: "fas fa-images",
                description: "Visually stunning showcases for creative professionals looking to display their work and attract new clients.",
                features: ["Project Galleries", "Case Studies", "Testimonials", "Inquiry Forms"]
              },
              {
                title: "Landing Pages",
                icon: "fas fa-bullseye",
                description: "Conversion-focused pages designed to drive specific actions like sign-ups, downloads, or purchases.",
                features: ["Clear CTAs", "Lead Capture", "A/B Testing", "Conversion Tracking"]
              },
              {
                title: "Blogs & News Sites",
                icon: "fas fa-newspaper",
                description: "Content-rich platforms for sharing articles, news, and engaging with your audience through regular updates.",
                features: ["Content Categories", "Search Functionality", "Social Sharing", "Comment Systems"]
              },
              {
                title: "Web Applications",
                icon: "fas fa-cogs",
                description: "Interactive, feature-rich applications that offer specific functionalities and solve user problems.",
                features: ["User Authentication", "Real-time Updates", "Data Visualization", "Custom Functionality"]
              }
            ].map((item, index) => (
              <div 
                key={item.title}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <i className={`${item.icon} text-xl`}></i>
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-5">{item.description}</p>
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {item.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <i className="fas fa-check text-xs text-green-500"></i>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-4">
              Need a custom solution that doesn't fit these categories?
            </p>
            <Link href="/contact" className="text-primary hover:text-primary-dark font-medium">
              Contact us for a custom quote <i className="fas fa-arrow-right ml-1"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Web Development Portfolio</h2>
            <p className="mt-2 text-gray-600">Discover our latest web development projects</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/images/web/Mac-1024x683.jpg",
                  title: "Security Company Website",
                  description: "Custom Website for a security Company",
                  link: "https://top23security.com/"
                },
                {
                image: "/images/web/Macbook-1-1024x683.jpg",
                  title: "Corporate Website",
                  description: "Modern business website with dynamic features",
                  link: "https://lsmsolutionsltd.com/"
                },
                {
                image: "/images/web/Macbook-1024x683.jpg",
                  title: "StartUp Company Website",
                  description: "Custom Website for a StartUp Company",
                  link: "https://nafrichemdistributors.co.ke/"
                },
                {
                image: "/images/web/Macbook-Pro-1024x683.jpg",
                  title: "Tourism Company Website",
                  description: "Custom Website for a Tourism Company",
                  link: "https://drivestayexplore.com/"
                },
                {
                image: "/images/web/Macbook2-1024x683.jpg",
                  title: "E-commerce Website",
                  description: "Custom Website for an E-commerce Company",
                  link: "https://excaliburdealerslimited.com/"
                },
                {
                image: "/images/web/Macbook3-1024x683.jpg",
                  title: "Crypto Trading Company Website",
                  description: "Custom Website for a Crypto Trading Company",
                  link: "https://piggycryptoke.com/"
                }
              ].map((project, index) => (
              <div key={project.link} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
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
              ))}
                </div>
          
          <div className="mt-12 text-center">
            <Link href="/portfolio" className="px-8 py-3 bg-[#0A1929] text-white rounded-full hover:bg-[#0A1929]/90 transition-colors inline-block">
              View All Projects
            </Link>
          </div>
          </div>
        </section>

      {/* Development Process Section - Timeline Style */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Development Process</h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              A systematic approach to delivering high-quality web solutions that meet your business objectives
            </p>
          </motion.div>

          {/* Timeline Process for Desktop/Tablet */}
          <div className="hidden md:block relative mb-16">
            {/* Timeline Track */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-blue-400 to-primary"></div>
            
            {/* Process Steps */}
            <div className="grid grid-cols-6 gap-4 relative">
              {[
                {
                  step: 1,
                  title: "Discovery & Planning",
                  description: "We begin by understanding your business, target audience, and objectives through in-depth consultations.",
                  icon: "fas fa-lightbulb",
                  color: "bg-amber-400",
                  textColor: "text-amber-600"
                },
                {
                  step: 2,
                  title: "Design",
                  description: "Creating wireframes and visual designs that align with your brand identity and user experience goals.",
                  icon: "fas fa-pencil-ruler",
                  color: "bg-blue-400",
                  textColor: "text-blue-600"
                },
                {
                  step: 3,
                  title: "Development",
                  description: "Building with modern technologies to create a robust and scalable web solution.",
                  icon: "fas fa-code",
                  color: "bg-emerald-400",
                  textColor: "text-emerald-600"
                },
                {
                  step: 4,
                  title: "Testing",
                  description: "Thorough quality assurance across devices to ensure a flawless user experience.",
                  icon: "fas fa-vial",
                  color: "bg-violet-400",
                  textColor: "text-violet-600"
                },
                {
                  step: 5,
                  title: "Deployment",
                  description: "Launching your website with proper configuration and optimization for performance.",
                  icon: "fas fa-rocket",
                  color: "bg-red-400",
                  textColor: "text-red-600"
                },
                {
                  step: 6,
                  title: "Support",
                  description: "Ongoing maintenance and updates to keep your site secure and performing optimally.",
                  icon: "fas fa-sync-alt",
                  color: "bg-primary",
                  textColor: "text-primary-dark"
                }
              ].map((process, index) => (
                <motion.div 
                  key={process.step} 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  {/* Step Number Circle on Timeline */}
                  <div className="mb-6 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-white z-10 relative">
                    <div className={`w-full h-full rounded-full ${process.color} flex items-center justify-center text-white text-lg font-bold`}>
                      {process.step}
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 border border-gray-100 h-full w-full transition-all duration-300 transform hover:translate-y-[-5px]">
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-full ${process.color} bg-opacity-20 flex items-center justify-center mr-3`}>
                        <i className={`${process.icon} ${process.textColor}`}></i>
                      </div>
                      <h3 className={`font-semibold text-base ${process.textColor}`}>{process.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{process.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Mobile Process Cards with horizontal scroll */}
          <div className="md:hidden overflow-hidden">
            <div className="relative">
              {/* Small timeline track */}
              <div className="absolute left-4 top-8 bottom-16 w-1 bg-gradient-to-b from-amber-300 via-blue-400 to-primary"></div>
              
              {/* Process Steps */}
              <div className="ml-9 space-y-12 pb-8">
                {[
                  {
                    step: 1,
                    title: "Discovery & Planning",
                    description: "Understanding your business needs & goals through in-depth consultations.",
                    icon: "fas fa-lightbulb",
                    color: "bg-amber-400",
                    textColor: "text-amber-600"
                  },
                  {
                    step: 2,
                    title: "Design",
                    description: "Creating wireframes & visual designs aligned with your brand.",
                    icon: "fas fa-pencil-ruler",
                    color: "bg-blue-400",
                    textColor: "text-blue-600"
                  },
                  {
                    step: 3,
                    title: "Development",
                    description: "Building with modern technologies for robust solutions.",
                    icon: "fas fa-code",
                    color: "bg-emerald-400",
                    textColor: "text-emerald-600"
                  },
                  {
                    step: 4,
                    title: "Testing",
                    description: "Quality assurance across devices for flawless user experience.",
                    icon: "fas fa-vial",
                    color: "bg-violet-400",
                    textColor: "text-violet-600"
                  },
                  {
                    step: 5,
                    title: "Deployment",
                    description: "Launching with proper configuration & performance optimization.",
                    icon: "fas fa-rocket",
                    color: "bg-red-400",
                    textColor: "text-red-600"
                  },
                  {
                    step: 6,
                    title: "Support",
                    description: "Ongoing maintenance to keep your site secure & performing optimally.",
                    icon: "fas fa-sync-alt",
                    color: "bg-primary",
                    textColor: "text-primary-dark"
                  }
                ].map((process, index) => (
                  <motion.div 
                    key={process.step} 
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    {/* Step Number Circle on Timeline */}
                    <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md border-2 border-white z-10">
                      <div className={`w-full h-full rounded-full ${process.color} flex items-center justify-center text-white font-bold text-xs`}>
                        {process.step}
                      </div>
                    </div>
                    
                    {/* Content Card */}
                    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                      <div className="flex items-center mb-2">
                        <div className={`w-8 h-8 rounded-full ${process.color} bg-opacity-20 flex items-center justify-center mr-2`}>
                          <i className={`${process.icon} ${process.textColor} text-sm`}></i>
                        </div>
                        <h3 className={`font-semibold text-base ${process.textColor}`}>{process.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{process.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Our transparent and effective process ensures your vision becomes reality on time and within budget.
            </p>
            <Link 
              href="/contact" 
              className="px-6 py-3 bg-[#0A1929] text-white rounded-full hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 font-medium"
            >
              <span>Start Your Project</span> <i className="fas fa-arrow-right"></i>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Web Development Project Inquiry Form */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Start Your Web Project</h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Fill out the form below to help us understand your project requirements, and we'll get back to you promptly
              </p>
            </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10"
          >
            <WebDevelopmentForm />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - Redesigned with horizontal cards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Common questions about our web development services and process
            </p>
          </motion.div>

          {/* Horizontal FAQ Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                question: "How long does it take to build a website?",
                answer: "The timeline for website development varies based on complexity and requirements. A simple informational website might take 2-4 weeks, while more complex e-commerce sites or web applications can take 2-3 months or more. During our initial consultation, we'll provide a more accurate timeline based on your specific needs.",
                icon: "fas fa-clock",
                color: "from-amber-400 to-amber-300"
              },
              {
                question: "How much does a website cost?",
                answer: "Website costs vary widely depending on design complexity, functionality requirements, and content volume. Basic websites start around $3,000, while e-commerce sites and custom web applications typically range from $8,000 to $25,000+. We provide detailed quotes after understanding your specific requirements.",
                icon: "fas fa-dollar-sign",
                color: "from-green-400 to-green-300"
              }
            ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full"
              >
                <div className="p-6 flex h-full">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${faq.color} flex items-center justify-center shadow-md mt-1 mr-4`}>
                    <i className={`${faq.icon} text-white`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second Row of FAQ Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "Will my website be mobile-friendly?",
                answer: "Absolutely! All websites we develop are fully responsive and optimized for all devices, including smartphones, tablets, and desktop computers. We thoroughly test on multiple screen sizes to ensure a consistent, user-friendly experience.",
                icon: "fas fa-mobile-alt",
                color: "from-blue-400 to-blue-300"
              },
              {
                question: "Do you provide website maintenance services?",
                answer: "Yes, we offer ongoing maintenance packages to keep your website secure, updated, and performing optimally. Our maintenance services include security updates, performance monitoring, content updates, technical support, and regular backups.",
                icon: "fas fa-tools",
                color: "from-violet-400 to-violet-300"
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full"
              >
                <div className="p-6 flex h-full">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${faq.color} flex items-center justify-center shadow-md mt-1 mr-4`}>
                    <i className={`${faq.icon} text-white`}></i>
                      </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Third Row of FAQ Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {[
              {
                question: "Will my website be search engine friendly?",
                answer: "Yes, all our websites are built with SEO best practices in mind. We implement proper HTML structure, mobile optimization, schema markup, fast loading speeds, and user-friendly navigation. We also offer additional SEO services for more comprehensive search engine marketing.",
                icon: "fas fa-search",
                color: "from-red-400 to-red-300"
              },
              {
                question: "Do you provide content for the website?",
                answer: "While we primarily focus on design and development, we can assist with content creation through our network of professional copywriters and content strategists for an additional fee. We can also provide guidance if you prefer to create the content yourself.",
                icon: "fas fa-file-alt",
                color: "from-primary to-primary/80"
              }
            ].map((faq, index) => (
                  <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full"
              >
                <div className="p-6 flex h-full">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${faq.color} flex items-center justify-center shadow-md mt-1 mr-4`}>
                    <i className={`${faq.icon} text-white`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                    </div>
                  </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4">Have more questions?</h3>
              <p className="text-gray-600 mb-6">
                Our team is ready to help you with any additional questions about our web development services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <i className="fas fa-envelope"></i> Contact Us
                </Link>
                <a 
                  href="https://wa.me/254741590670" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <i className="fab fa-whatsapp"></i> WhatsApp
                </a>
              </div>
            </div>
                </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-primary to-[#0A1929]">
        {/* Abstract shapes for visual interest */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
          {/* Code symbols */}
          <div className="absolute top-20 right-20 text-white text-6xl opacity-20 rotate-12">&lt;/&gt;</div>
          <div className="absolute bottom-20 left-20 text-white text-6xl opacity-20 -rotate-12">{`{ }`}</div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Digital Presence?
            </motion.h2>
            
            <motion.p 
              className="text-white/90 text-lg max-w-3xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Let's discuss how our web development expertise can help bring your vision to life with solutions that drive business growth and deliver exceptional user experiences.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/contact" 
                className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl min-w-[200px] flex items-center justify-center gap-2"
              >
                Get Started <i className="fas fa-arrow-right ml-1"></i>
              </Link>
              
              <Link 
                href="/portfolio" 
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 min-w-[200px] flex items-center justify-center gap-2"
              >
                View Portfolio <i className="fas fa-images ml-1"></i>
              </Link>
                </motion.div>
            
            {/* Trust indicators */}
            <motion.div 
              className="mt-16 pt-10 border-t border-white/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-white/70 mb-6 text-sm uppercase tracking-wider">Trusted by Businesses Across Kenya</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div key={index} className="w-24 h-12 bg-white/10 rounded-md flex items-center justify-center">
                    <div className="w-16 h-6 bg-white/20 rounded animate-pulse"></div>
                  </div>
              ))}
            </div>
            </motion.div>
          </motion.div>
          </div>
        </section>
    </div>
  );
}

// Add this new component above the main WebDevelopment component
function WebDevelopmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    projectType: 'corporate',
    budget: 'medium',
    timeline: 'flexible',
    requirements: '',
    hearAbout: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
  const projectTypes = [
    { value: 'corporate', label: 'Corporate Website' },
    { value: 'ecommerce', label: 'E-commerce Store' },
    { value: 'landing', label: 'Landing Page' },
    { value: 'blog', label: 'Blog/Content Site' },
    { value: 'portfolio', label: 'Portfolio Website' },
    { value: 'web-app', label: 'Web Application' },
    { value: 'other', label: 'Other' }
  ];
  
  const budgetRanges = [
    { value: 'small', label: 'Less than $2,000' },
    { value: 'medium', label: '$2,000 - $5,000' },
    { value: 'large', label: '$5,000 - $10,000' },
    { value: 'enterprise', label: 'More than $10,000' },
    { value: 'undecided', label: 'Not sure yet' }
  ];
  
  const timelineOptions = [
    { value: 'urgent', label: 'Urgent (< 2 weeks)' },
    { value: 'standard', label: 'Standard (2-4 weeks)' },
    { value: 'relaxed', label: 'Relaxed (1-2 months)' },
    { value: 'flexible', label: 'Flexible / Not sure yet' }
  ];
  
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.requirements.trim()) errors.requirements = "Project requirements are required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Format the message for WhatsApp
    const projectTypeLabel = projectTypes.find(type => type.value === formData.projectType)?.label || formData.projectType;
    const budgetLabel = budgetRanges.find(budget => budget.value === formData.budget)?.label || formData.budget;
    const timelineLabel = timelineOptions.find(timeline => timeline.value === formData.timeline)?.label || formData.timeline;
    
    const message = `
*Web Development Project Inquiry*

*Contact Information:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.companyName || 'N/A'}

*Project Details:*
Type: ${projectTypeLabel}
Budget Range: ${budgetLabel}
Timeline: ${timelineLabel}

*Requirements:*
${formData.requirements}

*How they heard about us:*
${formData.hearAbout || 'Not specified'}

*Sent from the Web Development contact form*
    `.trim();
    
    // Phone number for WhatsApp
    const phoneNumber = '254741590670'; // Replace with your actual phone number
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset form state
    setIsSubmitting(false);
    
    // Optional: reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      companyName: '',
      projectType: 'corporate',
      budget: 'medium',
      timeline: 'flexible',
      requirements: '',
      hearAbout: ''
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition`}
              placeholder="Your full name"
            />
            {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition`}
              placeholder="your.email@example.com"
            />
            {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition`}
              placeholder="Your contact number"
            />
            {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
          </div>
          
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
              placeholder="Your company (if applicable)"
            />
          </div>
        </div>
      </div>
      
      {/* Project Details Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">Project Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">Type of Website</label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
            >
              {projectTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
            >
              {budgetRanges.map(budget => (
                <option key={budget.value} value={budget.value}>{budget.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">Preferred Timeline</label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
            >
              {timelineOptions.map(timeline => (
                <option key={timeline.value} value={timeline.value}>{timeline.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Requirements Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">Project Requirements</h3>
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">Describe Your Project <span className="text-red-500">*</span></label>
          <textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows={5}
            className={`w-full p-3 border ${formErrors.requirements ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition`}
            placeholder="Please provide details about your project: key features, functionality requirements, design preferences, etc."
          ></textarea>
          {formErrors.requirements && <p className="mt-1 text-sm text-red-500">{formErrors.requirements}</p>}
        </div>
        
        <div className="mt-4">
          <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-700 mb-1">How did you hear about us?</label>
          <input
            type="text"
            id="hearAbout"
            name="hearAbout"
            value={formData.hearAbout}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
            placeholder="Google, Referral, Social Media, etc."
          />
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium text-center inline-flex items-center justify-center min-w-[200px]"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Submit Project Inquiry'
          )}
        </button>
        
        <p className="mt-4 text-sm text-gray-600">
          We'll respond to your inquiry within 24 hours during business days.
        </p>
      </div>
    </form>
  );
} 