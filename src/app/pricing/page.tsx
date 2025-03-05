'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';

const pricingPlans = {
  graphics: [
    {
      name: 'Basic',
      price: '15,000',
      description: 'Essential graphics design services for small businesses',
      features: [
        'Logo Design',
        'Business Card Design',
        'Social Media Templates (3)',
        'Basic Brand Guidelines',
        '2 Revisions',
        '5 Days Delivery'
      ]
    },
    {
      name: 'Professional',
      price: '35,000',
      description: 'Comprehensive design package for growing businesses',
      features: [
        'Everything in Basic',
        'Full Brand Identity',
        'Social Media Templates (10)',
        'Marketing Materials',
        'Unlimited Revisions',
        '10 Days Delivery',
        'Source Files'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Complete design solutions for established businesses',
      features: [
        'Everything in Professional',
        'Custom Illustrations',
        'Print Materials',
        'Packaging Design',
        'Brand Strategy',
        'Priority Support',
        'Dedicated Designer'
      ]
    }
  ],
  web: [
    {
      name: 'Starter',
      price: '45,000',
      description: 'Perfect for small business websites',
      features: [
        '5 Pages Website',
        'Responsive Design',
        'Basic SEO Setup',
        'Contact Form',
        'Social Media Integration',
        '2 Weeks Delivery'
      ]
    },
    {
      name: 'Business',
      price: '95,000',
      description: 'Advanced website with custom functionality',
      features: [
        '10 Pages Website',
        'E-commerce Integration',
        'Advanced SEO',
        'Custom Features',
        'Analytics Setup',
        '4 Weeks Delivery',
        'Training Session'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Full-scale web solutions for large businesses',
      features: [
        'Custom Web Application',
        'Advanced E-commerce',
        'API Integration',
        'Custom Backend',
        'Performance Optimization',
        'Priority Support',
        'Maintenance Plan'
      ]
    }
  ],
  social: [
    {
      name: 'Basic',
      price: '25,000',
      description: 'Essential social media management',
      features: [
        '2 Platforms',
        '12 Posts Monthly',
        'Basic Content Strategy',
        'Community Management',
        'Monthly Reports',
        'Basic Analytics'
      ]
    },
    {
      name: 'Growth',
      price: '45,000',
      description: 'Comprehensive social media presence',
      features: [
        '4 Platforms',
        '20 Posts Monthly',
        'Content Calendar',
        'Engagement Strategy',
        'Paid Ads Management',
        'Advanced Analytics',
        'Weekly Reports'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: '85,000',
      description: 'Advanced social media marketing',
      features: [
        'All Platforms',
        '30 Posts Monthly',
        'Custom Strategy',
        'Influencer Marketing',
        'Campaign Management',
        'ROI Tracking',
        '24/7 Support'
      ]
    }
  ]
};

export default function Pricing() {
  const [selectedService, setSelectedService] = useState<'graphics' | 'web' | 'social'>('graphics');

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <PageHero 
          title="Pricing Plans"
          description="Flexible pricing options tailored to your business needs"
        />

        <section className="pricing-section py-20">
          <div className="container">
            <div className="service-selector mb-16">
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => setSelectedService('graphics')}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedService === 'graphics'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Graphics Design
                </button>
                <button
                  onClick={() => setSelectedService('web')}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedService === 'web'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Web Development
                </button>
                <button
                  onClick={() => setSelectedService('social')}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedService === 'social'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Social Media
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricingPlans[selectedService].map((plan, index) => (
                <div
                  key={plan.name}
                  className="pricing-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all ${
                    plan.popular ? 'border-2 border-accent' : ''
                  }`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-4xl font-bold mb-2">
                        <span className="text-lg">KES </span>
                        {plan.price}
                      </div>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map(feature => (
                        <li key={feature} className="flex items-center gap-3">
                          <i className="fas fa-check-circle text-accent"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-center">
                      <a
                        href={`https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I'm%20interested%20in%20the%20${plan.name}%20${selectedService}%20package.`}
                        className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold transition-colors ${
                          plan.popular
                            ? 'bg-accent hover:bg-accent-hover text-white'
                            : 'bg-primary hover:bg-secondary text-white'
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Started
                        <i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="faq bg-gray-50 py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Common questions about our pricing and services</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold mb-2">Do you offer custom packages?</h3>
                  <p className="text-gray-600">Yes, we can create custom packages tailored to your specific needs and budget. Contact us to discuss your requirements.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
                  <p className="text-gray-600">We accept M-Pesa, bank transfers, and other major payment methods. Payment terms can be discussed during consultation.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold mb-2">Do you offer refunds?</h3>
                  <p className="text-gray-600">We have a satisfaction guarantee policy. If you're not satisfied with our work, we'll revise until you're happy with the results.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta bg-primary text-white py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Need a Custom Solution?</h2>
              <p className="text-xl text-gray-200 mb-8">
                Let's discuss your specific requirements and create a tailored package for your business.
              </p>
              <a
                href="https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I'm%20interested%20in%20discussing%20a%20custom%20package."
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 