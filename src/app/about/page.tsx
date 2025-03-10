'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const values = [
  {
    title: 'Innovation',
    icon: 'fas fa-rocket',
    description: 'Pushing boundaries with creative digital solutions'
  },
  {
    title: 'Quality',
    icon: 'fas fa-crown',
    description: 'Delivering excellence in every project we undertake'
  },
  {
    title: 'Integrity',
    icon: 'fas fa-shield',
    description: 'Building trust through honest business practices'
  },
  {
    title: 'Collaboration',
    icon: 'fas fa-users',
    description: 'Working together to achieve exceptional results'
  }
];

export default function About() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-[#0A2647]/5 via-white to-[#FF5400]/5">
        <div className="container py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#FF5400] font-medium text-sm uppercase tracking-wider mb-6 block"
            >
              Welcome to Mocky Digital
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-6xl lg:text-7xl font-bold mb-8"
            >
              <span className="text-[#0A2647]">Crafting</span>
              <span className="text-[#FF5400] block mt-4">Digital Excellence</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            >
              We're a team of passionate digital creators committed to transforming ideas into impactful digital experiences.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[#0A2647]/5 rounded-full blur-3xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-[#FF5400]/5 rounded-full blur-3xl"
          />
          
          {/* Additional Decorative Elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
            className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#FF5400]/20 rounded-full"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-[#0A2647]/20 rounded-full"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute top-1/2 right-1/3 w-3 h-3 bg-[#FF5400]/20 rounded-full"
          />
        </div>

        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{ 
            backgroundImage: 'linear-gradient(#0A2647 1px, transparent 1px), linear-gradient(to right, #0A2647 1px, transparent 1px)',
            backgroundSize: '4rem 4rem'
          }}
        />
      </section>

      {/* CEO Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
                  src="/images/about/ceo.jpg"
                  alt="CEO of Mocky Digital"
                  fill
                  className="object-cover object-top"
                  style={{ objectPosition: "center 10%" }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6 md:space-y-8"
              >
                <div className="space-y-4">
                  <p className="text-base md:text-xl text-gray-600 leading-relaxed">
                    "When I started Mocky Digital, I had a simple goal - to help local businesses thrive in the digital world. 
                    Growing up in Kenya, I saw many talented entrepreneurs struggling to make their mark online. That's why 
                    we focus on creating practical, results-driven solutions that actually work for our clients."
                  </p>
                  <p className="text-base md:text-xl text-gray-600 leading-relaxed">
                    "What makes us different is our hands-on approach. I personally ensure that each project gets the attention 
                    it deserves. Whether you're a small startup or an established business, we treat your digital presence 
                    with the same dedication and creativity. It's not just about delivering a service - it's about building 
                    lasting relationships and seeing our clients succeed."
                  </p>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary">Don Omondi</h3>
                  <p className="text-base md:text-lg text-gray-600">Founder & CEO</p>
                  <div className="flex gap-4 mt-3">
                    <a 
                      href="https://www.linkedin.com/in/don-omondi-242367206/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      <i className="fab fa-linkedin text-xl md:text-2xl"></i>
                    </a>
                    <a 
                      href="https://x.com/onyango__omondi" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      <i className="fab fa-twitter text-xl md:text-2xl"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-[#FF5400] font-medium text-sm uppercase tracking-wider mb-4 block">Our Principles</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A2647] mb-6">
              Core Values that Define Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our values are more than just words – they're the foundation of our work ethic and the promises we make to our clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Innovation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="mb-6 relative">
                <div className="w-16 h-16 bg-[#FF5400]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FF5400] transition-all duration-500">
                  <i className="fas fa-lightbulb text-2xl text-[#FF5400] group-hover:text-white transition-colors duration-500"></i>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FF5400]/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              </div>
              
              <h3 className="text-xl font-bold text-[#0A2647] mb-4 group-hover:text-[#FF5400] transition-colors">
                Innovation First
              </h3>
              <p className="text-gray-600 mb-4">
                We constantly push boundaries and explore new technologies to deliver cutting-edge solutions that keep our clients ahead of the curve.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FF5400] mr-2"></i>
                  Creative problem-solving
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FF5400] mr-2"></i>
                  Latest technology adoption
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FF5400] mr-2"></i>
                  Forward-thinking approach
                </li>
              </ul>
            </motion.div>

            {/* Quality Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="mb-6 relative">
                <div className="w-16 h-16 bg-[#FF5400]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FF5400] transition-all duration-500">
                  <i className="fas fa-gem text-2xl text-[#FF5400] group-hover:text-white transition-colors duration-500"></i>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FF5400]/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              </div>
              
              <h3 className="text-xl font-bold text-[#0A2647] mb-4 group-hover:text-[#FF5400] transition-colors">
                Uncompromising Quality
              </h3>
              <p className="text-gray-600 mb-4">
                Every pixel, every line of code, and every design element is crafted with precision and attention to detail.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FF5400] mr-2"></i>
                  Rigorous quality control
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FF5400] mr-2"></i>
                  Attention to detail
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FF5400] mr-2"></i>
                  Excellence in execution
                </li>
              </ul>
            </motion.div>

            {/* Integrity Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="mb-6 relative">
                <div className="w-16 h-16 bg-[#FF5400]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FF5400] transition-all duration-500">
                  <i className="fas fa-shield-alt text-2xl text-[#FF5400] group-hover:text-white transition-colors duration-500"></i>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FF5400]/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              </div>
              
              <h3 className="text-xl font-bold text-[#0A2647] mb-4 group-hover:text-[#FF5400] transition-colors">
                Unwavering Integrity
              </h3>
              <p className="text-gray-600 mb-4">
                Trust is earned through transparent communication, honest practices, and delivering on our promises.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FF5400] mr-2"></i>
                  Transparent communication
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FF5400] mr-2"></i>
                  Ethical practices
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FF5400] mr-2"></i>
                  Reliable partnerships
                </li>
              </ul>
            </motion.div>

            {/* Collaboration Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="mb-6 relative">
                <div className="w-16 h-16 bg-[#FF5400]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FF5400] transition-all duration-500">
                  <i className="fas fa-hands-helping text-2xl text-[#FF5400] group-hover:text-white transition-colors duration-500"></i>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FF5400]/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              </div>
              
              <h3 className="text-xl font-bold text-[#0A2647] mb-4 group-hover:text-[#FF5400] transition-colors">
                Effective Collaboration
              </h3>
              <p className="text-gray-600 mb-4">
                Success is achieved through strong partnerships and working closely with our clients throughout the journey.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FF5400] mr-2"></i>
                  Client-centric approach
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FF5400] mr-2"></i>
                  Open communication
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FF5400] mr-2"></i>
                  Shared success
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="max-w-3xl mx-auto px-8 py-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <p className="text-gray-600 text-lg">
                These core values are embedded in every project we undertake, ensuring consistent delivery of exceptional digital solutions that exceed expectations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 