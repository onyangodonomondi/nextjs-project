'use client';

import Link from 'next/link';

const services = [
  {
    title: 'Graphics Design',
    description: 'Professional graphic design services that bring your brand to life',
    features: ['Logo & Brand Identity', 'Marketing Materials', 'Social Media Graphics'],
    link: 'https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I\'m%20interested%20in%20Graphics%20Design%20services.'
  },
  {
    title: 'Web Development',
    description: 'Custom websites and web applications that drive results',
    features: ['Responsive Design', 'E-commerce Solutions', 'CMS Development'],
    link: 'https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I\'m%20interested%20in%20Web%20Development%20services.'
  },
  {
    title: 'Social Media',
    description: 'Strategic social media management to boost your online presence',
    features: ['Content Strategy', 'Community Management', 'Paid Advertising'],
    link: 'https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I\'m%20interested%20in%20Social%20Media%20services.'
  },
  {
    title: 'Branding',
    description: 'Build a strong, memorable brand that connects with your audience',
    features: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines'],
    link: 'https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I\'m%20interested%20in%20Branding%20services.'
  },
  {
    title: 'Cloud & VPS Solutions',
    description: 'Professional cloud infrastructure setup and management for your web applications',
    features: ['VPS Server Setup', 'Cloud Migration', 'Server Management'],
    link: 'https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I\'m%20interested%20in%20Cloud%20%26%20VPS%20Solutions%20services.'
  },
  {
    title: 'Website Maintenance',
    description: 'Keep your website secure, updated, and performing at its best',
    features: ['Regular Updates', 'Security Monitoring', 'Performance Optimization'],
    link: 'https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I\'m%20interested%20in%20Website%20Maintenance%20services.'
  }
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container py-20">
        <div className="section-header text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-orange-500">What We Offer</h2>
          <p className="text-xl text-gray-600">Comprehensive digital solutions to transform your business presence</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="service-card group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-500 relative overflow-hidden" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 group-hover:text-orange-500 transition-colors">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href={service.link}
                  className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                  <span className="text-lg">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 