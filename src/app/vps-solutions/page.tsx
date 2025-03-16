'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface VPSPlan {
  name: string;
  originalPrice: string;
  price: string;
  savePercent: string;
  term: string;
  renewal: string;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
  };
  isPopular?: boolean;
}

const vpsPlans: VPSPlan[] = [
  {
    name: "KVM 1",
    originalPrice: "$ 8.99",
    price: "5.5",
    savePercent: "45%",
    term: "Per month, billed annually",
    renewal: "Renews at $8.99/mo annually. Cancel anytime.",
    specs: {
      cpu: "1 vCPU core",
      ram: "4 GB RAM",
      storage: "50 GB NVMe disk space",
      bandwidth: "4 TB bandwidth"
    }
  },
  {
    name: "KVM 2",
    originalPrice: "$ 12.99",
    price: "8",
    savePercent: "50%",
    term: "Per month, billed annually",
    renewal: "Renews at $12.99/mo annually. Cancel anytime.",
    specs: {
      cpu: "2 vCPU cores",
      ram: "8 GB RAM",
      storage: "100 GB NVMe disk space",
      bandwidth: "8 TB bandwidth"
    },
    isPopular: true
  },
  {
    name: "KVM 4",
    originalPrice: "$ 15.99",
    price: "10",
    savePercent: "55%",
    term: "Per month, billed annually",
    renewal: "Renews at $15.99/mo annually. Cancel anytime.",
    specs: {
      cpu: "4 vCPU cores",
      ram: "16 GB RAM",
      storage: "200 GB NVMe disk space",
      bandwidth: "16 TB bandwidth"
    }
  },
  {
    name: "KVM 8",
    originalPrice: "$ 35.99",
    price: "23",
    savePercent: "60%",
    term: "Per month, billed annually",
    renewal: "Renews at $35.99/mo annually. Cancel anytime.",
    specs: {
      cpu: "8 vCPU cores",
      ram: "32 GB RAM",
      storage: "400 GB NVMe disk space",
      bandwidth: "32 TB bandwidth"
    }
  }
];

const formatWhatsAppMessage = (plan: VPSPlan) => {
  const monthlyPrice = parseFloat(plan.price);
  const annualCost = (monthlyPrice * 12).toFixed(2);
  
  const message = `
Hi Mocky Digital,

I'm interested in the ${plan.name} VPS Hosting Plan:

Plan Details:
- Monthly Price: $${plan.price}/month
- Annual Total: $${annualCost}/year (billed annually)
- ${plan.specs.cpu}
- ${plan.specs.ram}
- ${plan.specs.storage}
- ${plan.specs.bandwidth}

Please help me get started.
`.trim();

  return `https://wa.me/254741590670?text=${encodeURIComponent(message)}`;
};

// Animation variants for consistent animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function VPSSolutions() {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleChoosePlan = (plan: VPSPlan) => {
    window.open(formatWhatsAppMessage(plan), '_blank');
  };

  return (
    <>
      <main className="pt-24 md:pt-28 bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section with improved visual impact */}
        <section className="relative overflow-hidden pt-6 md:pt-8">
          {/* Replace the missing image with a gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-orange-500/5 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="container mx-auto px-4 py-16 md:py-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center mb-16 md:mb-20"
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Enterprise-Grade Solutions
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary leading-tight">
                VPS Solutions
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                We help our clients set up and configure their VPS servers for complete control and optimal performance
              </p>
            </motion.div>

            {/* Pricing section with improved mobile layout */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-24 mt-6 md:mt-8"
            >
              {vpsPlans.map((plan) => (
                <motion.div
                  key={plan.name}
                  variants={fadeInUp}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
                    plan.isPopular ? 'relative border-2 border-primary lg:scale-105 z-10' : ''
                  }`}
                >
                  {plan.isPopular && (
                    <div className="bg-gradient-to-r from-primary to-orange-500 text-white text-center py-2 text-sm font-medium">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="p-5 md:p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">
                      {plan.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-500 line-through text-sm">
                        {plan.originalPrice}
                      </span>
                      <span className="bg-orange-100 text-orange-600 text-sm px-2 py-1 rounded-full font-medium">
                        SAVE {plan.savePercent}
                      </span>
                    </div>

                    <div className="flex items-baseline mb-2">
                      <span className="text-sm text-gray-600">$</span>
                      <span className="text-4xl md:text-5xl font-bold text-primary mx-1">
                        {plan.price}
                      </span>
                      <span className="text-gray-600">/mo</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">
                      {plan.term}
                    </p>

                    <button 
                      onClick={() => handleChoosePlan(plan)}
                      className={`w-full py-3.5 px-4 rounded-full mb-4 text-center font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                        plan.isPopular 
                          ? 'bg-gradient-to-r from-primary to-orange-600 text-white hover:shadow-lg hover:shadow-primary/20'
                          : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                      }`}
                    >
                      Choose plan
                    </button>

                    <p className="text-xs text-gray-500 mb-8">
                      {plan.renewal}
                    </p>

                    <ul className="space-y-4">
                      {Object.values(plan.specs).map((spec, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-orange-500 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="text-gray-700">{spec}</span>
                        </li>
                      ))}
                      <li className="flex items-start gap-3">
                        <span className="text-orange-500 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700">Data centers worldwide</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-orange-500 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700">Linux operating systems</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Why Choose Our VPS Section - Improved for responsiveness */}
            <section className="py-12 md:py-16 bg-white rounded-2xl shadow-lg mb-20 md:mb-24 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
              <div className="container mx-auto px-4">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUp}
                  className="text-center mb-10 md:mb-12"
                >
                  <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    Why Choose Us
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                    Why Choose Our VPS Solutions?
                  </h2>
                  <p className="text-gray-700 max-w-3xl mx-auto">
                    Experience enterprise-grade VPS hosting with cutting-edge technology and expert support
                  </p>
                </motion.div>

                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                  {[
                    {
                      icon: 'fa-bolt',
                      title: 'High Performance',
                      description: 'NVMe SSD storage and latest generation processors for lightning-fast performance'
                    },
                    {
                      icon: 'fa-shield-alt',
                      title: 'Advanced Security',
                      description: 'Enterprise-level security with DDoS protection and regular security updates'
                    },
                    {
                      icon: 'fa-network-wired',
                      title: 'Global Network',
                      description: 'Multiple data centers worldwide for optimal latency and reliability'
                    },
                    {
                      icon: 'fa-clock',
                      title: '99.9% Uptime',
                      description: 'Guaranteed uptime with redundant infrastructure and monitoring'
                    },
                    {
                      icon: 'fa-sliders-h',
                      title: 'Full Root Access',
                      description: 'Complete control over your server configuration and software'
                    },
                    {
                      icon: 'fa-headset',
                      title: '24/7 Support',
                      description: 'Expert technical support available around the clock'
                    }
                  ].map((feature) => (
                    <motion.div
                      key={feature.title}
                      variants={fadeInUp}
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:bg-white"
                    >
                      <div className="w-14 h-14 mb-4 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-xl flex items-center justify-center">
                        <i className={`fas ${feature.icon} text-xl text-primary`}></i>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Use Cases Section - Enhanced for better mobile view */}
            <section className="mb-20 md:mb-24">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="text-center mb-10 md:mb-12"
              >
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Use Cases
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Perfect For Your Needs
                </h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  Our VPS solutions are tailored for various use cases
                </p>
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {[
                  {
                    icon: 'fa-globe',
                    title: 'Web Hosting',
                    items: ['Multiple websites', 'E-commerce stores', 'High-traffic blogs']
                  },
                  {
                    icon: 'fa-database',
                    title: 'Application Hosting',
                    items: ['Web applications', 'Development environments', 'Database servers']
                  },
                  {
                    icon: 'fa-server',
                    title: 'Game Servers',
                    items: ['Minecraft servers', 'Game hosting', 'Voice servers']
                  },
                  {
                    icon: 'fa-cloud',
                    title: 'Business Solutions',
                    items: ['Email servers', 'File storage', 'Backup solutions']
                  }
                ].map((useCase) => (
                  <motion.div
                    key={useCase.title}
                    variants={fadeInUp}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-5">
                      <i className={`fas ${useCase.icon} text-xl text-primary`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{useCase.title}</h3>
                    <ul className="space-y-3">
                      {useCase.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-gray-700">
                          <span className="text-orange-500 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* FAQ Section - Improved for mobile */}
            <section className="mb-20 md:mb-24 bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="text-center mb-10 md:mb-12"
              >
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  FAQ
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-700">
                  Common questions about our VPS solutions
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto grid gap-6">
                {[
                  {
                    q: "What is a VPS and how does it work?",
                    a: "A Virtual Private Server (VPS) is a virtualized server that acts like a dedicated server within a shared hosting environment. It provides dedicated resources and root access, ensuring better performance and control."
                  },
                  {
                    q: "Can I upgrade my VPS plan later?",
                    a: "Yes, you can easily upgrade your VPS plan as your needs grow. We offer seamless upgrades with minimal downtime."
                  },
                  {
                    q: "What operating systems do you support?",
                    a: "We support all major Linux distributions including Ubuntu, CentOS, Debian, and more. Custom OS installations are also available upon request."
                  },
                  {
                    q: "How quickly can I get started?",
                    a: "Once your order is confirmed, your VPS will be provisioned within minutes. Our team can assist with the setup and configuration process."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="bg-gray-50 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white rounded-xl p-6 transition-all duration-300 hover:shadow-md"
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-start gap-3">
                      <span className="text-primary flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </span>
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 pl-8">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* VPS Setup Service Section - Enhanced for mobile */}
            <section className="py-16 md:py-20 relative overflow-hidden rounded-3xl bg-gray-50">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
              <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-orange-500/5 rounded-full blur-3xl"></div>
              
              <div className="container mx-auto px-4 relative">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUp}
                  className="text-center mb-16 md:mb-20"
                >
                  <span className="text-orange-500 font-semibold text-sm tracking-wider uppercase mb-4 block">
                    Expert Configuration
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                    Complete VPS Setup Service
                  </h2>
                  <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                    Our expert team helps you set up and configure your VPS server, ensuring you have full control and optimal performance.
                  </p>
                </motion.div>

                <div className="max-w-7xl mx-auto">
                  {/* What We Set Up Section */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <span className="bg-gradient-to-r from-primary/20 to-orange-500/20 p-3 rounded-lg">
                        <i className="fas fa-cog text-primary text-xl"></i>
                      </span>
                      <h3 className="text-2xl font-bold text-primary">What We Set Up</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        {
                          title: 'Server Configuration',
                          items: ['Server OS installation', 'Control panel setup', 'Performance tuning']
                        },
                        {
                          title: 'Security Implementation',
                          items: ['Firewall configuration', 'Security hardening', 'SSL certificates']
                        },
                        {
                          title: 'System Management',
                          items: ['Backup configuration', 'Monitoring setup', 'DNS management']
                        }
                      ].map((group) => (
                        <motion.div 
                          key={group.title} 
                          variants={fadeInUp}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                          className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                        >
                          <h4 className="font-semibold text-gray-800 mb-4">{group.title}</h4>
                          <ul className="space-y-3">
                            {group.items.map((item) => (
                              <li key={item} className="flex items-center gap-3 text-gray-700">
                                <span className="text-orange-500 flex-shrink-0">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Key Benefits Section */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <span className="bg-gradient-to-r from-primary/20 to-orange-500/20 p-3 rounded-lg">
                        <i className="fas fa-star text-primary text-xl"></i>
                      </span>
                      <h3 className="text-2xl font-bold text-primary">Key Benefits</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        {
                          icon: 'fa-shield-alt',
                          title: 'Enhanced Security',
                          description: 'Robust security measures to protect your server and data'
                        },
                        {
                          icon: 'fa-tachometer-alt',
                          title: 'Optimized Performance',
                          description: 'Fine-tuned configuration for maximum speed and efficiency'
                        },
                        {
                          icon: 'fa-users-cog',
                          title: 'Full Control',
                          description: 'Complete access and control over your server environment'
                        },
                        {
                          icon: 'fa-hands-helping',
                          title: 'Ongoing Support',
                          description: 'Expert assistance and guidance whenever you need it'
                        }
                      ].map((benefit) => (
                        <motion.div 
                          key={benefit.title} 
                          variants={fadeInUp}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                          className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                        >
                          <span className="inline-block text-orange-500 bg-gradient-to-r from-orange-100 to-orange-50 p-3 rounded-lg mb-4">
                            <i className={`fas ${benefit.icon} text-xl`}></i>
                          </span>
                          <h4 className="font-semibold text-gray-800 mb-3">{benefit.title}</h4>
                          <p className="text-gray-600">{benefit.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTA Section */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                  >
                    <div className="bg-gradient-to-r from-[#0B1C30] to-[#1B3A5D] rounded-3xl p-8 md:p-12 relative overflow-hidden">
                      {/* Replace the missing image with a geometric pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1C30]/80 to-[#1B3A5D]/80"></div>
                      <div 
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                          backgroundSize: '40px 40px'
                        }}
                      ></div>
                      <div className="absolute right-0 top-0 w-1/2 h-full bg-white/5 blur-3xl rounded-full transform translate-x-1/2"></div>
                      
                      <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <h4 className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
                          Ready to get started?
                        </h4>
                        <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
                          Let our experts handle your VPS setup while you focus on your business. Get a secure, optimized, and fully configured server.
                        </p>
                        <Link
                          href="https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I'm%20interested%20in%20VPS%20setup%20services"
                          className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-[#0B1C30] px-6 md:px-8 py-3 md:py-4 rounded-full transition-all group font-medium text-base md:text-lg"
                          target="_blank"
                        >
                          Contact Us Now
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
} 