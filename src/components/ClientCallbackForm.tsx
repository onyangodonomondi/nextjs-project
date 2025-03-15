'use client';

import React from 'react';
import { useState, useMemo } from 'react';

// Services array is static, define outside component
const services = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'graphics', label: 'Graphics Design' },
  { value: 'logo', label: 'Logo Design' },
  { value: 'web', label: 'Web Development' },
  { value: 'social-media', label: 'Social Media Management' },
  { value: 'merchandise', label: 'Merchandise & Print' }
];

// Main form component
export default function ClientCallbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'general',
    message: ''
  });

  // Handle input change more efficiently
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Pre-compute the WhatsApp number
  const whatsappNumber = useMemo(() => '254741590670', []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const serviceLabel = services.find(s => s.value === formData.service)?.label;
    
    const message = `
*New Callback Request*
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Service: ${serviceLabel}
Message: ${formData.message}
    `.trim();

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#FF5400]">
            Request a Callback
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Fill out the form below and we'll get back to you shortly
          </p>

          <form 
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-[#FF5400] focus:border-[#FF5400] transition text-gray-600 hover:border-gray-300"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-[#FF5400] focus:border-[#FF5400] transition text-gray-600 hover:border-gray-300"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  name="phone"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-[#FF5400] focus:border-[#FF5400] transition text-gray-600 hover:border-gray-300"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Service Interested In
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-[#FF5400] focus:border-[#FF5400] transition text-gray-600 bg-white hover:border-gray-300"
                  value={formData.service}
                  onChange={handleChange}
                  name="service"
                >
                  {services.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Message (Optional)
              </label>
              <textarea
                className="w-full px-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-[#FF5400] focus:border-[#FF5400] transition text-gray-600 hover:border-gray-300"
                rows={4}
                placeholder="Tell us about your project"
                value={formData.message}
                onChange={handleChange}
                name="message"
              />
            </div>
            
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#FF5400] hover:bg-[#FF5400]/90 text-white font-medium px-8 py-3 rounded transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 