'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { useState } from 'react';

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

const technologies = [
  {
    category: 'Frontend',
    icon: 'fas fa-desktop',
    items: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'TypeScript']
  },
  {
    category: 'Backend',
    icon: 'fas fa-server',
    items: ['Node.js', 'Python', 'PHP', 'Laravel', 'Express']
  },
  {
    category: 'Database',
    icon: 'fas fa-database',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis']
  },
  {
    category: 'CMS',
    icon: 'fas fa-file-code',
    items: ['WordPress', 'Strapi', 'Sanity', 'Contentful']
  }
];

const websiteTypes = [
  {
    icon: '🏢',
    title: 'Corporate Websites',
    description: 'Professional websites for businesses that establish credibility and showcase services.',
    features: ['Company Profile', 'Service Showcase', 'Team Profiles', 'Contact Integration']
  },
  {
    icon: '🛍️',
    title: 'E-commerce Websites',
    description: 'Online stores with secure payment gateways and inventory management.',
    features: ['Product Catalog', 'Shopping Cart', 'Payment Integration', 'Order Management']
  },
  {
    icon: '📱',
    title: 'Portfolio Websites',
    description: 'Creative platforms to showcase your work and attract potential clients.',
    features: ['Project Gallery', 'Case Studies', 'Client Testimonials', 'Contact Forms']
  },
  {
    icon: '🏥',
    title: 'Healthcare Websites',
    description: 'User-friendly websites for medical practices and healthcare providers.',
    features: ['Appointment Booking', 'Service Information', 'Doctor Profiles', 'Patient Resources']
  },
  {
    icon: '🎓',
    title: 'Educational Websites',
    description: 'Interactive platforms for schools, colleges, and educational institutions.',
    features: ['Course Catalog', 'Student Portal', 'Learning Resources', 'Event Calendar']
  },
  {
    icon: '⚖️',
    title: 'Legal Websites',
    description: 'Professional websites for law firms and legal consultants.',
    features: ['Practice Areas', 'Attorney Profiles', 'Case Studies', 'Client Portal']
  }
];

const hostingPlans = [
  {
    provider: 'Hostinger',
    plans: [
      {
        name: 'Premium',
        price: '$2.99/mo × 12 = $35.88/year',
        originalPrice: '$11.99/mo × 12 = $143.88/year',
        savings: 'SAVE 75%',
        features: [
          '100 websites',
          '100 GB SSD storage',
          '~25,000 visits monthly',
          'Free domain (US$ 9.99 value)',
          'Free SSL certificate',
          'Weekly backups',
          'WordPress optimization'
        ],
        bestFor: 'Everything you need to create your website',
        popular: false,
        renewal: 'US$ 7.99/mo when you renew'
      },
      {
        name: 'Business',
        price: '$3.99/mo × 12 = $47.88/year',
        originalPrice: '$13.99/mo × 12 = $167.88/year',
        savings: 'SAVE 71%',
        features: [
          '100 websites',
          '200 GB NVMe storage',
          '~100,000 visits monthly',
          'Free domain & SSL',
          'Daily backups',
          'Advanced WordPress features',
          'Priority support'
        ],
        bestFor: 'Level up with more power and enhanced features',
        popular: true,
        renewal: 'US$ 8.99/mo when you renew'
      },
      {
        name: 'Cloud Startup',
        price: '$7.99/mo × 12 = $95.88/year',
        originalPrice: '$27.99/mo × 12 = $335.88/year',
        savings: 'SAVE 71%',
        features: [
          '300 websites',
          '200 GB NVMe storage',
          '~200,000 visits monthly',
          'Free domain & SSL',
          'Daily backups',
          'Dedicated resources',
          'VIP support'
        ],
        bestFor: 'Enjoy optimized performance & powerful resources',
        popular: false,
        renewal: 'US$ 19.99/mo when you renew'
      }
    ]
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
          description="Custom web solutions that drive growth and deliver exceptional user experiences."
        />

        <section className="py-20 bg-white">
          <div className="container">
            <div className="section-header">
              <h2 className="text-gradient">Types of Websites We Create</h2>
              <p>Specialized web solutions for every industry</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {websiteTypes.map((type, index) => (
                <div
                  key={type.title}
                  className="service-card group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{type.icon}</div>
                    <h3 className="text-xl font-bold text-orange-500 mb-3">{type.title}</h3>
                    <p className="text-gray-600 mb-6">{type.description}</p>
                  </div>
                  <ul className="space-y-3">
                    {type.features.map(feature => (
                      <li key={feature} className="flex items-center gap-3">
                        <i className="fas fa-check text-accent"></i>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="section-header">
              <h2 className="text-gradient">Our Development Process</h2>
              <p>A systematic approach to delivering exceptional results</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="service-card group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="icon-wrapper">
                    <i className={`${step.icon} icon`}></i>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="section-header">
              <h2 className="text-gradient">Technologies We Use</h2>
              <p>Modern tools for modern web solutions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {technologies.map((tech, index) => (
                <div
                  key={tech.category}
                  className="service-card group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="icon-wrapper">
                    <i className={`${tech.icon} icon`}></i>
                  </div>
                  <h3>{tech.category}</h3>
                  <ul className="space-y-2">
                    {tech.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-gray-600">
                        <i className="fas fa-check text-blue-500 text-sm"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
        <section className="py-20 bg-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Web Hosting Solutions</h2>
              <p className="text-gray-600">Professional hosting plans with premium features</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {hostingPlans[0].plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all relative ${
                    plan.popular ? 'border-2 border-primary' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-white px-4 py-1 rounded-full text-sm">Most Popular</span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{plan.bestFor}</p>
                  <div className="mb-6">
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm inline-block mb-3">
                      {plan.savings}
                    </div>
                    <p className="text-3xl font-bold text-primary">{plan.price}</p>
                    <p className="text-sm text-gray-500 line-through mb-2">{plan.originalPrice}</p>
                    <p className="text-sm text-gray-600">{plan.renewal}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <i className="fas fa-check text-primary mr-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => sendHostingPlanToWhatsApp(plan)}
                    className="w-full py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
                  >
                    Choose Plan
                    <i className="fab fa-whatsapp ml-2"></i>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Domain Extensions Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Domain Extensions
              </h2>
              <p className="text-gray-600">Choose the perfect domain for your brand</p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-4">
              {domainExtensions.map((domain, index) => (
                <motion.div
                  key={domain.ext}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      {/* Left side - Extension and Description */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-2xl font-bold text-primary">{domain.ext}</h3>
                          {domain.ext === '.com' && (
                            <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                              Most Popular
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{domain.description}</p>
                        <div className="grid grid-cols-2 gap-3">
                          {domain.features.map((feature, i) => (
                            <div key={i} className="flex items-center text-sm text-gray-600">
                              <i className="fas fa-check text-primary mr-2 text-xs"></i>
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right side - Pricing and Button */}
                      <div className="flex flex-col items-center md:items-end gap-2 pt-4 md:pt-0 border-t md:border-t-0 mt-4 md:mt-0">
                        <div className="text-center md:text-right">
                          <div className="text-2xl font-bold text-primary mb-1">
                            {domain.price}
                          </div>
                          <div className="text-sm text-gray-500">
                            Renewal: {domain.renewal}
                          </div>
                        </div>
                        <button
                          onClick={() => sendDomainRequestToWhatsApp(domain)}
                          className="w-full md:w-auto px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                        >
                          <span>Register Now</span>
                          <i className="fab fa-whatsapp"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Request Form */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4">Request a Quote</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you with a custom quote</p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Project Type</label>
                    <select
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.projectType}
                      onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                    >
                      <option value="">Select project type</option>
                      <optgroup label="Business Websites">
                        <option value="business">Corporate Website</option>
                        <option value="ecommerce">E-commerce Store</option>
                        <option value="portfolio">Portfolio/Personal</option>
                        <option value="landing">Landing Page</option>
                      </optgroup>
                      <optgroup label="Specialized Websites">
                        <option value="education">Educational Institution</option>
                        <option value="healthcare">Healthcare/Medical</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="restaurant">Restaurant/Food</option>
                        <option value="travel">Travel/Tourism</option>
                        <option value="ngo">NGO/Non-Profit</option>
                      </optgroup>
                      <optgroup label="Web Applications">
                        <option value="crm">CRM System</option>
                        <option value="booking">Booking System</option>
                        <option value="membership">Membership Portal</option>
                        <option value="marketplace">Online Marketplace</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Budget Range</label>
                    <select
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    >
                      <option value="below-50k">Below 50K</option>
                      <option value="50k-100k">50K - 100K</option>
                      <option value="100k-200k">100K - 200K</option>
                      <option value="above-200k">Above 200K</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Timeline</label>
                    <select
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.timeline}
                      onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                    >
                      <option value="urgent">Urgent (1-2 weeks)</option>
                      <option value="normal">Normal (2-4 weeks)</option>
                      <option value="not-urgent">Not Urgent (4+ weeks)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="needHosting"
                      checked={formData.needHosting}
                      onChange={(e) => setFormData({...formData, needHosting: e.target.checked})}
                      className="w-4 h-4 text-primary"
                    />
                    <label htmlFor="needHosting" className="text-gray-700">I need web hosting</label>
                  </div>

                  {formData.needHosting && (
                    <div>
                      <label className="block text-gray-700 mb-2">Select Hosting Plan</label>
                      <select
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={formData.hostingPlan}
                        onChange={(e) => setFormData({...formData, hostingPlan: e.target.value})}
                      >
                        <option value="">Select a plan</option>
                        {hostingPlans[0].plans.map(plan => (
                          <option key={plan.name} value={plan.name}>
                            {plan.name} - {plan.price}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="needDomain"
                      checked={formData.needDomain}
                      onChange={(e) => setFormData({...formData, needDomain: e.target.checked})}
                      className="w-4 h-4 text-primary"
                    />
                    <label htmlFor="needDomain" className="text-gray-700">I need a domain name</label>
                  </div>

                  {formData.needDomain && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">Domain Extension</label>
                        <select
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          value={formData.domainExtension}
                          onChange={(e) => setFormData({...formData, domainExtension: e.target.value})}
                        >
                          <option value="">Select extension</option>
                          {domainExtensions.map(domain => (
                            <option key={domain.ext} value={domain.ext}>
                              {domain.ext} - {domain.price}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Desired Domain Name</label>
                        <input
                          type="text"
                          placeholder="e.g., mycompany"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          value={formData.domainName}
                          onChange={(e) => setFormData({...formData, domainName: e.target.value})}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Project Description</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Additional Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="needSEO"
                        checked={formData.needSEO}
                        onChange={(e) => setFormData({...formData, needSEO: e.target.checked})}
                        className="w-4 h-4 text-primary"
                      />
                      <label htmlFor="needSEO" className="text-gray-700">Search Engine Optimization (SEO)</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="needMaintenance"
                        checked={formData.needMaintenance}
                        onChange={(e) => setFormData({...formData, needMaintenance: e.target.checked})}
                        className="w-4 h-4 text-primary"
                      />
                      <label htmlFor="needMaintenance" className="text-gray-700">Monthly Maintenance</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="needSSL"
                        checked={formData.needSSL}
                        onChange={(e) => setFormData({...formData, needSSL: e.target.checked})}
                        className="w-4 h-4 text-primary"
                      />
                      <label htmlFor="needSSL" className="text-gray-700">SSL Certificate</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="needAnalytics"
                        checked={formData.needAnalytics}
                        onChange={(e) => setFormData({...formData, needAnalytics: e.target.checked})}
                        className="w-4 h-4 text-primary"
                      />
                      <label htmlFor="needAnalytics" className="text-gray-700">Google Analytics Setup</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="needCustomEmail"
                        checked={formData.needCustomEmail}
                        onChange={(e) => setFormData({...formData, needCustomEmail: e.target.checked})}
                        className="w-4 h-4 text-primary"
                      />
                      <label htmlFor="needCustomEmail" className="text-gray-700">Custom Email Setup</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="needContentCreation"
                        checked={formData.needContentCreation}
                        onChange={(e) => setFormData({...formData, needContentCreation: e.target.checked})}
                        className="w-4 h-4 text-primary"
                      />
                      <label htmlFor="needContentCreation" className="text-gray-700">Content Creation</label>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-primary text-white rounded-full hover:bg-primary-dark transition-all hover:scale-105"
                  >
                    Send Quote Request
                    <i className="fab fa-whatsapp ml-2"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 