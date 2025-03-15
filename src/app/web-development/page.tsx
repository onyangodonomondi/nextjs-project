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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Development Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Development Process</h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              A systematic approach to delivering high-quality web solutions that meet your business objectives
            </p>
          </div>

          <div className="relative">
            {/* Process Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2 z-0"></div>
            
            <div className="space-y-12 md:space-y-0 relative z-10">
              {[
                {
                  step: 1,
                  title: "Discovery & Planning",
                  description: "We begin by understanding your business, target audience, and objectives through in-depth consultations.",
                  details: [
                    "Requirements gathering",
                    "User research",
                    "Competitive analysis",
                    "Project scoping",
                    "Timeline planning"
                  ],
                  icon: "fas fa-lightbulb"
                },
                {
                  step: 2,
                  title: "Design & Prototyping",
                  description: "Our team creates wireframes and visual designs that align with your brand and provide optimal user experience.",
                  details: [
                    "Wireframing",
                    "UI/UX design",
                    "Responsive layouts",
                    "Interactive prototypes",
                    "Client feedback integration"
                  ],
                  icon: "fas fa-pencil-ruler"
                },
                {
                  step: 3,
                  title: "Development",
                  description: "We build your website using the latest technologies while following best practices for performance and security.",
                  details: [
                    "Frontend coding",
                    "Backend development",
                    "Database integration",
                    "API implementation",
                    "Content management setup"
                  ],
                  icon: "fas fa-code"
                },
                {
                  step: 4,
                  title: "Testing & Quality Assurance",
                  description: "Thorough testing across devices and browsers to ensure your website functions flawlessly.",
                  details: [
                    "Functionality testing",
                    "Cross-browser compatibility",
                    "Mobile responsiveness",
                    "Performance optimization",
                    "Security testing"
                  ],
                  icon: "fas fa-vial"
                },
                {
                  step: 5,
                  title: "Deployment & Launch",
                  description: "We handle the technical aspects of launching your website and ensure everything runs smoothly.",
                  details: [
                    "Server configuration",
                    "DNS setup",
                    "SSL implementation",
                    "Performance monitoring",
                    "Launch support"
                  ],
                  icon: "fas fa-rocket"
                },
                {
                  step: 6,
                  title: "Ongoing Support & Optimization",
                  description: "We provide continued support and strategic updates to help your website grow with your business.",
                  details: [
                    "Regular maintenance",
                    "Performance monitoring",
                    "Security updates",
                    "Analytics reporting",
                    "Strategic enhancements"
                  ],
                  icon: "fas fa-sync-alt"
                }
              ].map((process, index) => (
                <div key={process.step} className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center mb-12 md:mb-20">
                  <div className={`md:text-right md:pr-10 ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                    {/* Step Circle for medium screens and up */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary text-white items-center justify-center text-xl font-bold shadow-lg z-20">
                      {process.step}
                    </div>
                    
                    {/* Content */}
                    <div className={`bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 relative ${index % 2 !== 0 ? '' : 'md:mr-10'}`}>
                      {/* Step Circle for mobile */}
                      <div className="md:hidden flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold shadow-md mr-3">
                          {process.step}
                        </div>
                        <div className={`w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary`}>
                          <i className={`${process.icon}`}></i>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        {/* Icon for medium screens and up */}
                        <div className={`hidden md:flex w-10 h-10 ${index % 2 !== 0 ? 'ml-3 order-2' : 'mr-3'} rounded-full bg-primary/10 items-center justify-center text-primary`}>
                          <i className={`${process.icon}`}></i>
                        </div>
                        <span>{process.title}</span>
                      </h3>
                      
                      <p className="text-gray-600 mb-4">{process.description}</p>
                      
                      <div className="mt-4 space-y-2">
                        {process.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <i className="fas fa-check-circle text-green-500 mt-1"></i>
                            <span className="text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Empty column for alternating layout */}
                  {index % 2 !== 0 && <div className="hidden md:block"></div>}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/contact" className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors inline-block">
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Common questions about our web development services and process
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                question: "How long does it take to build a website?",
                answer: "The timeline for website development varies based on complexity and requirements. A simple informational website might take 2-4 weeks, while more complex e-commerce sites or web applications can take 2-3 months or more. During our initial consultation, we'll provide a more accurate timeline based on your specific needs."
              },
              {
                question: "How much does a website cost?",
                answer: "Website costs vary widely depending on design complexity, functionality requirements, and content volume. Basic websites start around $3,000, while e-commerce sites and custom web applications typically range from $8,000 to $25,000+. We provide detailed quotes after understanding your specific requirements."
              },
              {
                question: "Will my website be mobile-friendly?",
                answer: "Absolutely! All websites we develop are fully responsive and optimized for all devices, including smartphones, tablets, and desktop computers. We thoroughly test on multiple screen sizes to ensure a consistent, user-friendly experience."
              },
              {
                question: "Do you provide website maintenance services?",
                answer: "Yes, we offer ongoing maintenance packages to keep your website secure, updated, and performing optimally. Our maintenance services include security updates, performance monitoring, content updates, technical support, and regular backups."
              },
              {
                question: "Will my website be search engine friendly?",
                answer: "Yes, all our websites are built with SEO best practices in mind. We implement proper HTML structure, mobile optimization, schema markup, fast loading speeds, and user-friendly navigation. We also offer additional SEO services for more comprehensive search engine marketing."
              },
              {
                question: "Do you provide content for the website?",
                answer: "While we primarily focus on design and development, we can assist with content creation through our network of professional copywriters and content strategists for an additional fee. We can also provide guidance if you prefer to create the content yourself."
              }
            ].map((faq, index) => (
              <div key={index} className="mb-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-4">Have more questions? We're here to help!</p>
            <Link href="/contact" className="text-primary hover:text-primary-dark font-medium">
              Contact our team <i className="fas fa-arrow-right ml-1"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to start your project?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Let's discuss how we can help bring your vision to life with our web development expertise.
          </p>
          <Link href="/contact" className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
} 