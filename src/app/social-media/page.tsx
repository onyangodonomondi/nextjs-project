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
  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const package_type = e.target.value;
    const instagram = document.querySelector<HTMLInputElement>('input[value="instagram"]');
    const facebook = document.querySelector<HTMLInputElement>('input[value="facebook"]');
    const linkedin = document.querySelector<HTMLInputElement>('input[value="linkedin"]');
    const twitter = document.querySelector<HTMLInputElement>('input[value="twitter"]');

    // Reset all checkboxes
    [instagram, facebook, linkedin, twitter].forEach(checkbox => {
      if (checkbox) checkbox.checked = false;
    });

    // Set checkboxes based on package
    if (package_type === 'starter') {
      if (instagram) instagram.checked = true;
      if (facebook) facebook.checked = true;
    } else if (package_type === 'booster') {
      if (instagram) instagram.checked = true;
      if (facebook) facebook.checked = true;
      if (linkedin) linkedin.checked = true;
      if (twitter) twitter.checked = true;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const phone = formData.get('phone');
    const package_type = formData.get('package');
    const platforms = formData.getAll('platforms');
    const message = formData.get('message');

    // Create WhatsApp message
    const whatsappMessage = `
*New Social Media Package Request*
----------------------------
*Name:* ${name}
*Email:* ${email}
*Company:* ${company || 'N/A'}
*Phone:* ${phone}
*Package:* ${package_type}
*Platforms:* ${platforms.join(', ')}

*Additional Information:*
${message || 'N/A'}
`.trim();

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/254741590670?text=${encodedMessage}`, '_blank');
  };

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

        {/* Pricing Section */}
        <section className="py-20 bg-gradient-to-b from-primary to-primary-dark">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white">Social Media Management Packages</h2>
              <p className="mt-2 text-blue-100">Choose the perfect plan for your business</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Starter Package */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-primary to-accent p-8">
                  <div className="text-white text-4xl font-bold mb-2">01</div>
                  <h3 className="text-2xl font-bold text-white">Starter Package</h3>
                  <div className="text-xl text-white mt-4">Ksh. 10,000 P.M</div>
                </div>
                <div className="p-8">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <i className="fas fa-check text-green-500"></i>
                      4 posting per week (per network)
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-check text-green-500"></i>
                      Social Account Setup
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-check text-green-500"></i>
                      Content Creation
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-check text-green-500"></i>
                      Increase in followers
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-check text-green-500"></i>
                      Account Managements
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-check text-green-500"></i>
                      No Setup Fee
                    </li>
                  </ul>
                  <div className="flex gap-2 mt-6">
                    <i className="fab fa-instagram text-2xl text-gray-600"></i>
                    <i className="fab fa-facebook text-2xl text-gray-600"></i>
                  </div>
                  <AdNote />
                </div>
              </div>

              {/* Booster Package */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-accent to-primary p-8">
                  <div className="text-white text-4xl font-bold mb-2">02</div>
                  <h3 className="text-2xl font-bold text-white">Booster Package</h3>
                  <div className="text-xl text-white mt-4">Ksh. 15,000 P.M</div>
                </div>
                <div className="p-8">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <i className="fas fa-check text-green-500"></i>
                      4 posting per week (per network)
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-check text-green-500"></i>
                      Social Account Setup
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-check text-green-500"></i>
                      Content Creation
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-check text-green-500"></i>
                      Increase in followers
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-check text-green-500"></i>
                      Spam/Comments monitoring
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-check text-green-500"></i>
                      Account Managements
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-check text-green-500"></i>
                      No Setup Fee
                    </li>
                  </ul>
                  <div className="flex gap-2 mt-6">
                    <i className="fab fa-instagram text-2xl text-gray-600"></i>
                    <i className="fab fa-facebook text-2xl text-gray-600"></i>
                    <i className="fab fa-linkedin text-2xl text-gray-600"></i>
                    <i className="fab fa-twitter text-2xl text-gray-600"></i>
                  </div>
                  <AdNote />
                </div>
              </div>

              {/* Custom Package */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-primary-dark to-primary p-8">
                  <div className="text-white text-4xl font-bold mb-2">03</div>
                  <h3 className="text-2xl font-bold text-white">Custom Package</h3>
                  <div className="text-xl text-white mt-4">Coming Soon</div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 mb-6 text-center text-lg font-medium">
                    Stay tuned for our custom package options!
                  </p>
                  <div className="flex gap-2 mt-6 justify-center">
                    <i className="fab fa-instagram text-2xl text-primary/40"></i>
                    <i className="fab fa-facebook text-2xl text-primary/40"></i>
                    <i className="fab fa-linkedin text-2xl text-primary/40"></i>
                    <i className="fab fa-twitter text-2xl text-primary/40"></i>
                    <i className="fab fa-tiktok text-2xl text-primary/40"></i>
                    <i className="fab fa-youtube text-2xl text-primary/40"></i>
                  </div>
                  <AdNote />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* After the pricing section, add: */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Get Started with Your Package</h2>
                <p className="mt-2 text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Business Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="+254 700 000000"
                    />
                  </div>
                </div>

                {/* Package Selection */}
                <div>
                  <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Package *
                  </label>
                  <select
                    id="package"
                    name="package"
                    required
                    onChange={handlePackageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Choose a package</option>
                    <option value="starter">Starter Package - Ksh. 10,000 P.M</option>
                    <option value="booster">Booster Package - Ksh. 15,000 P.M</option>
                  </select>
                </div>

                {/* Social Media Platforms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Social Media Platforms *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" name="platforms" value="instagram" className="rounded text-primary focus:ring-primary" />
                      <span className="text-gray-700">Instagram</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" name="platforms" value="facebook" className="rounded text-primary focus:ring-primary" />
                      <span className="text-gray-700">Facebook</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" name="platforms" value="twitter" className="rounded text-primary focus:ring-primary" />
                      <span className="text-gray-700">Twitter</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" name="platforms" value="linkedin" className="rounded text-primary focus:ring-primary" />
                      <span className="text-gray-700">LinkedIn</span>
                    </label>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Tell us about your business and social media goals..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                  >
                    Submit
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

const AdNote = () => (
  <div className="mt-6 pt-4 border-t border-gray-100">
    <p className="text-sm text-gray-500 italic">
      <i className="fas fa-info-circle mr-2 text-primary"></i>
      Paid ads/boost posts available based on your budget (not included in package cost)
    </p>
  </div>
); 