'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

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

export default function VPSSolutions() {
  const handleChoosePlan = (plan: VPSPlan) => {
    window.open(formatWhatsAppMessage(plan), '_blank');
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              VPS Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We help our clients set up and configure their VPS servers for complete control and optimal performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {vpsPlans.map((plan) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`bg-white rounded-2xl overflow-hidden ${
                  plan.isPopular ? 'relative' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    {plan.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-500 line-through text-sm">
                      {plan.originalPrice}
                    </span>
                    <span className="bg-orange-100 text-orange-500 text-sm px-2 py-1 rounded">
                      SAVE {plan.savePercent}
                    </span>
                  </div>

                  <div className="flex items-baseline mb-2">
                    <span className="text-sm text-gray-500">$</span>
                    <span className="text-4xl font-bold text-primary mx-1">
                      {plan.price}
                    </span>
                    <span className="text-gray-500">/mo</span>
                  </div>

                  <p className="text-sm text-gray-500 mb-6">
                    {plan.term}
                  </p>

                  <button 
                    onClick={() => handleChoosePlan(plan)}
                    className={`w-full py-3 px-4 rounded-full mb-4 text-center font-medium transition-colors ${
                      plan.isPopular 
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    Choose plan
                  </button>

                  <p className="text-xs text-gray-500 mb-8">
                    {plan.renewal}
                  </p>

                  <ul className="space-y-4">
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-orange-500"></i>
                      <span>{plan.specs.cpu}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-orange-500"></i>
                      <span>{plan.specs.ram}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-orange-500"></i>
                      <span>{plan.specs.storage}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-orange-500"></i>
                      <span>{plan.specs.bandwidth}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-orange-500"></i>
                      <span>Data centers worldwide</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-orange-500"></i>
                      <span>Linux operating systems</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Why Choose Our VPS Section */}
          <section className="py-16 bg-white rounded-2xl shadow-lg mb-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Why Choose Our VPS Solutions?
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Experience enterprise-grade VPS hosting with cutting-edge technology and expert support
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center p-6"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <i className={`fas ${feature.icon} text-2xl text-primary`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Perfect For Your Needs
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our VPS solutions are tailored for various use cases
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <i className={`fas ${useCase.icon} text-xl text-primary`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{useCase.title}</h3>
                  <ul className="space-y-2">
                    {useCase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-gray-600">
                        <i className="fas fa-check text-orange-500 text-sm"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-24 bg-white rounded-2xl shadow-lg p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* VPS Setup Service Section */}
          <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
            <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-orange-500/5 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto px-4 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20"
              >
                <span className="text-orange-500 font-semibold text-sm tracking-wider uppercase mb-4 block">
                  Expert Configuration
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                  Complete VPS Setup Service
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our expert team helps you set up and configure your VPS server, ensuring you have full control and optimal performance.
                </p>
              </motion.div>

              <div className="max-w-7xl mx-auto">
                {/* What We Set Up Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg mb-8"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <span className="bg-primary/10 p-3 rounded-lg">
                      <i className="fas fa-cog text-primary text-xl"></i>
                    </span>
                    <h3 className="text-2xl font-bold text-primary">What We Set Up</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
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
                      <div key={group.title} className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-800 mb-4">{group.title}</h4>
                        <ul className="space-y-3">
                          {group.items.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-gray-600">
                              <i className="fas fa-check-circle text-orange-500"></i>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Key Benefits Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg mb-8"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <span className="bg-primary/10 p-3 rounded-lg">
                      <i className="fas fa-star text-primary text-xl"></i>
                    </span>
                    <h3 className="text-2xl font-bold text-primary">Key Benefits</h3>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6">
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
                      <div key={benefit.title} className="bg-gray-50 rounded-xl p-6">
                        <span className="inline-block text-orange-500 bg-orange-100 p-3 rounded-lg mb-4">
                          <i className={`fas ${benefit.icon} text-xl`}></i>
                        </span>
                        <h4 className="font-semibold text-gray-800 mb-2">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#0B1C30] rounded-3xl p-12 relative overflow-hidden">
                    {/* Background gradient and effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C30] via-[#132943] to-[#1B3A5D]"></div>
                    <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
                    <div className="absolute right-0 top-0 w-1/3 h-full bg-white/5 blur-3xl rounded-full transform translate-x-1/2"></div>
                    
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                      <h4 className="text-3xl font-bold mb-4 text-orange-500">
                        Ready to get started?
                      </h4>
                      <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                        Let our experts handle your VPS setup while you focus on your business. Get a secure, optimized, and fully configured server.
                      </p>
                      <Link
                        href="https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I'm%20interested%20in%20VPS%20setup%20services"
                        className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-[#0B1C30] px-8 py-4 rounded-full transition-all group font-medium"
                        target="_blank"
                      >
                        Contact Us Now
                        <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
} 