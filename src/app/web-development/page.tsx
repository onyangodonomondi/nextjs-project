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

      {/* Development Process Section - Redesigned with compact cards in a single row */}
      <section className="py-20 bg-white">
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
              A systematic approach to delivering high-quality web solutions
            </p>
          </motion.div>

          {/* Compact Process Cards in a single row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {[
              {
                step: 1,
                title: "Discovery",
                description: "Understanding business goals and requirements",
                icon: "fas fa-lightbulb",
                color: "from-amber-400 to-amber-300"
              },
              {
                step: 2,
                title: "Design",
                description: "Creating wireframes and visual designs",
                icon: "fas fa-pencil-ruler",
                color: "from-blue-400 to-blue-300"
              },
              {
                step: 3,
                title: "Development",
                description: "Building with modern technologies",
                icon: "fas fa-code",
                color: "from-emerald-400 to-emerald-300"
              },
              {
                step: 4,
                title: "Testing",
                description: "Ensuring quality across devices",
                icon: "fas fa-vial",
                color: "from-violet-400 to-violet-300"
              },
              {
                step: 5,
                title: "Deployment",
                description: "Launching with proper configuration",
                icon: "fas fa-rocket",
                color: "from-red-400 to-red-300"
              },
              {
                step: 6,
                title: "Support",
                description: "Ongoing maintenance and updates",
                icon: "fas fa-sync-alt",
                color: "from-primary to-primary/80"
              }
            ].map((process, index) => (
              <motion.div 
                key={process.step} 
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5 }}
              >
                {/* Card Header with Number */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border-2 border-white z-10">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${process.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-xs">{process.step}</span>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="pt-6 px-3 pb-4 text-center">
                  <div className="mb-2 flex justify-center">
                    <i className={`${process.icon} ${process.color.includes('primary') ? 'text-primary' : `text-${process.color.split('-')[1]}-400`} text-lg`}></i>
                  </div>
                  <h3 className="text-sm font-semibold mb-1">{process.title}</h3>
                  <p className="text-gray-600 text-xs">{process.description}</p>
                </div>
                
                {/* Connection Arrow */}
                {index < 5 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 transform -translate-y-1/2 z-10 text-gray-300">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                )}
              </motion.div>
            ))}
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
              className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 font-medium"
            >
              Start Your Project <i className="fas fa-arrow-right ml-1"></i>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - Redesigned with horizontal cards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
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