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
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="container py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-6xl lg:text-7xl font-bold mb-8">
              Crafting 
              <span className="text-primary block mt-2">Digital Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
              We're a team of passionate digital creators committed to transforming ideas into impactful digital experiences.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I'm%20interested%20in%20starting%20a%20project%20with%20you." 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-white rounded-full hover:bg-primary-dark transition-all hover:scale-105"
              >
                Start Your Project
                <i className="fab fa-whatsapp ml-2"></i>
              </a>
              <a 
                href="/graphics" 
                className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-full hover:bg-primary/5 transition-all"
              >
                View Our Work
                <i className="fas fa-external-link-alt ml-2"></i>
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Optional: Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>
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
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary font-medium mb-4 block">Our Principles</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Core Values that <span className="text-primary">Drive Us</span>
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Icon Container */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                    <i className={`${value.icon} text-2xl text-primary group-hover:text-white transition-colors duration-500`}></i>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 relative z-10">
                    {value.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
                
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-primary/0 group-hover:bg-primary/10 rounded-tr-2xl transition-colors duration-500"></div>
              </motion.div>
            ))}
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
                These core values shape our approach to every project and guide our commitment to delivering exceptional digital solutions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
            <p className="text-xl text-gray-100 mb-8">
              Let's work together to bring your vision to life with our innovative solutions.
            </p>
            <a
              href="https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I'm%20interested%20in%20starting%20a%20project%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105"
            >
              Start Your Journey
              <i className="fab fa-whatsapp ml-2"></i>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 