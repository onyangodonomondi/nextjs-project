'use client';

import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';

const platforms = [
  {
    name: 'Facebook',
    icon: 'fab fa-facebook',
    services: ['Page Management', 'Content Creation', 'Ad Campaigns', 'Community Engagement']
  },
  {
    name: 'Instagram',
    icon: 'fab fa-instagram',
    services: ['Feed Strategy', 'Stories & Reels', 'Influencer Marketing', 'Visual Branding']
  },
  {
    name: 'Twitter',
    icon: 'fab fa-twitter',
    services: ['Profile Management', 'Tweet Strategy', 'Trend Analysis', 'Engagement Growth']
  },
  {
    name: 'LinkedIn',
    icon: 'fab fa-linkedin',
    services: ['Company Page', 'B2B Marketing', 'Lead Generation', 'Professional Content']
  }
];

const services = [
  {
    title: 'Content Creation',
    icon: 'fas fa-pencil-alt',
    description: 'Engaging, platform-optimized content that resonates with your audience.',
    features: [
      'Custom Graphics & Videos',
      'Copywriting & Captions',
      'Content Calendar',
      'Brand Voice Development'
    ]
  },
  {
    title: 'Social Media Management',
    icon: 'fas fa-tasks',
    description: 'Complete handling of your social media presence across platforms.',
    features: [
      'Daily Post Management',
      'Community Engagement',
      'Analytics & Reporting',
      'Crisis Management'
    ]
  },
  {
    title: 'Paid Advertising',
    icon: 'fas fa-ad',
    description: 'Strategic paid campaigns that drive results and ROI.',
    features: [
      'Campaign Strategy',
      'Ad Creation & Design',
      'Audience Targeting',
      'Performance Tracking'
    ]
  }
];

export default function SocialMedia() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <PageHero 
          title="Social Media Marketing"
          description="Strategic social media management and marketing services to boost your online presence and engage your audience."
        />

        <section className="platforms py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-orange-500">Platforms We Manage</h2>
              <p className="text-xl text-gray-600">Comprehensive social media management across all major platforms</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {platforms.map((platform, index) => (
                <div
                  key={platform.name}
                  className="platform-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <i className={`${platform.icon} text-3xl text-primary`}></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{platform.name}</h3>
                    <ul className="space-y-3">
                      {platform.services.map(service => (
                        <li key={service} className="text-gray-600 flex items-center gap-2">
                          <i className="fas fa-check text-accent text-sm"></i>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="services bg-gray-50 py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-orange-500">Our Services</h2>
              <p className="text-xl text-gray-600">Comprehensive social media solutions for your business</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="service-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <i className={`${service.icon} text-2xl text-primary`}></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map(feature => (
                        <li key={feature} className="text-gray-600 flex items-center gap-2">
                          <i className="fas fa-check text-accent text-sm"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta bg-primary text-white py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">Ready to Grow Your Social Media Presence?</h2>
              <p className="text-xl text-gray-200 mb-8">
                Let's create a powerful social media strategy that connects with your audience and drives results.
              </p>
              <a
                href="https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I'm%20interested%20in%20Social%20Media%20Marketing%20services."
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 