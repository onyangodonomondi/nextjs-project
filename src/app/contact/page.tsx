'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'info', message: 'Sending...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-100">Let's create something amazing together</p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg" data-aos="fade-up">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-map-marker-alt text-2xl text-primary"></i>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-600">Kahawa Wendani<br/>Thika Road, Nairobi</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-envelope text-2xl text-primary"></i>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600">info@mockydigital.com</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-phone text-2xl text-primary"></i>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600">+254 741 590 670</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Form Side */}
            <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-right">
              <h2 className="text-3xl font-bold mb-8 text-gradient">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {status.message && (
                  <div className={`p-4 rounded-lg ${
                    status.type === 'success' ? 'bg-green-100 text-green-700' :
                    status.type === 'error' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {status.message}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">Service Interest</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      <option value="web">Web Development</option>
                      <option value="graphics">Graphics Design</option>
                      <option value="social">Social Media</option>
                      <option value="branding">Branding</option>
                      <option value="cloud">Cloud & VPS Solutions</option>
                      <option value="maintenance">Website Maintenance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Send Message
                  <i className="fas fa-paper-plane ml-2"></i>
                </button>
              </form>
            </div>

            {/* Map Side */}
            <div className="rounded-xl overflow-hidden shadow-lg" data-aos="fade-left">
              <div className="h-[600px] w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.156511195512!2d36.93501535!3d-1.1897397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f59c85e45ad%3A0x9e18d7940617a214!2sKahawa%20Wendani%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1709913427349!5m2!1sen!2ske"
                  style={{ border: 0, width: '100%', height: '100%' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 