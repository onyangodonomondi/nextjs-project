'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const websiteTypes = [
  {
    icon: '🖥️',
    title: 'Custom Websites',
    description: 'Responsive and engaging websites that reflect your brand and captivate your audience.',
    features: [
      'Responsive Design',
      'Content Management System',
      'SEO Optimization',
      'Contact Forms',
      'Social Media Integration'
    ]
  },
  {
    icon: '🛒',
    title: 'E-commerce Solutions',
    description: 'Robust e-commerce platforms that drive sales and enhance customer experience.',
    features: [
      'Product Management',
      'Secure Payment Gateway',
      'Inventory Tracking',
      'Order Management',
      'M-Pesa Integration'
    ],
    popular: true
  },
  {
    icon: '⚙️',
    title: 'Web Applications',
    description: 'Scalable web applications that streamline operations and improve efficiency.',
    features: [
      'Custom Development',
      'Database Integration',
      'User Authentication',
      'API Development',
      'Cloud Hosting'
    ]
  }
];

const websiteCategories = [
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

export default function WebDevelopmentCards() {
  return (
    <>
      <section className="website-types py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">
              Choose the perfect solution for your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {websiteTypes.map((type, index) => (
              <div
                key={type.title}
                className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all ${
                  type.popular ? 'border-2 border-accent' : ''
                }`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {type.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">{type.icon}</div>
                  <h3 className="text-2xl font-bold text-orange-500 mb-3">{type.title}</h3>
                  <p className="text-gray-600 mb-6">{type.description}</p>
                </div>
                <ul className="space-y-4">
                  {type.features.map(feature => (
                    <li key={feature} className="flex items-center gap-3">
                      <i className="fas fa-check text-accent"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 text-center">
                  <Link
                    href="/pricing"
                    className={`inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full font-semibold transition-colors ${
                      type.popular
                        ? 'bg-accent hover:bg-accent-hover text-white'
                        : 'bg-primary hover:bg-secondary text-white'
                    }`}
                  >
                    Get Started
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="website-categories py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Types of Websites We Create</h2>
            <p className="text-xl text-gray-600">
              Explore our specialized website solutions for different industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {websiteCategories.map((category, index) => (
              <div
                key={category.title}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-orange-500 mb-3">{category.title}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                </div>
                <ul className="space-y-3">
                  {category.features.map(feature => (
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
    </>
  );
} 