'use client';

import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function CallbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'general',
    message: ''
  });

  const services = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'graphics', label: 'Graphics Design' },
    { value: 'logo', label: 'Logo Design' },
    { value: 'web', label: 'Web Development' },
    { value: 'social-media', label: 'Social Media Management' },
    { value: 'merchandise', label: 'Merchandise & Print' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `
*New Callback Request*
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Service: ${services.find(s => s.value === formData.service)?.label}
Message: ${formData.message}
    `.trim();

    // Updated WhatsApp number
    const whatsappNumber = '254741590670';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative -mt-16 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-[90%] lg:max-w-[90%] xl:max-w-[1080px] mx-auto relative z-20">
          <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-2xl overflow-hidden animate-slideUp"
          >
            <div className="bg-[#0A2558] py-5 text-center">
              <h2 className="text-2xl font-semibold text-white animate-fadeIn">
                Request a Callback
              </h2>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-gray-600 hover:border-gray-300"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-gray-600 hover:border-gray-300"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-gray-600 hover:border-gray-300"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Service Interested In
                  </label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-gray-600 bg-white hover:border-gray-300"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    {services.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-[1fr,auto] gap-6 items-start">
                <div className="animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    className="w-full px-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-gray-600 hover:border-gray-300"
                    rows={3}
                    placeholder="Tell us about your project"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <div className="self-end animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-2.5 transition-all flex items-center justify-center gap-2 group hover:shadow-lg hover:scale-105"
                  >
                    <FaWhatsapp className="text-lg group-hover:rotate-12 transition-transform" />
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 