'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';

const capabilities = [
  {
    title: 'Brand Identity',
    icon: 'fa-fingerprint',
    services: [
      'Logo Design',
      'Business Cards',
      'Letterheads',
      'Envelopes',
      'Invoice/ Quotations',
      'Complimentary Slips',
      'Brand Manual',
      'Email Signatures',
      'Brand Strategy'
    ]
  },
  {
    title: 'Illustration Designs',
    icon: 'fa-pen-ruler',
    services: [
      'Illustrations',
      'Character Concepts',
      'Icons & Symbols',
      'Poster Artwork',
      'Book Cover Artwork',
      'Flyer Artwork',
      'Brochure Artwork',
      'Album Art/ Music Artwork'
    ]
  },
  {
    title: 'Website Design & Development',
    icon: 'fa-code',
    services: [
      'Domain Name and Hosting Registration',
      'Content Management and Migration',
      'UI/ UX Design',
      'SEO (Search Engine Optimization)',
      'Form Integration',
      'Email Setup'
    ]
  },
  {
    title: 'Print Design',
    icon: 'fa-print',
    services: [
      'Flyers',
      'Posters',
      'Billboard Designs',
      'Certificates',
      'Presentation Folders'
    ]
  },
  {
    title: 'Editorial/ Layout Design',
    icon: 'fa-newspaper',
    services: [
      'Brochures',
      'Annual Reports',
      'Newsletters/ Journals',
      'Magazines',
      'Catalogues',
      'Books'
    ]
  },
  {
    title: 'Motion Design',
    icon: 'fa-film',
    services: [
      '2D Animation',
      '3D Animation',
      'Explainer Videos',
      'Visual Company Profiles',
      'Character Creation'
    ]
  },
  {
    title: 'Package Design',
    icon: 'fa-box-open',
    services: [
      'Packaging Design',
      'Product Design',
      'Product Label Design'
    ]
  },
  {
    title: 'Merchandise Design',
    icon: 'fa-tshirt',
    services: [
      'Notebooks & Pads',
      'Stationery',
      'Clothing & Apparel',
      'Signages',
      'Bags',
      'Badges',
      'Tickets',
      'Stickers'
    ]
  },
  {
    title: 'Software & Mobile App Development',
    icon: 'fa-mobile-alt',
    services: [
      'CRM (Customer Relation Management) Systems',
      'ERP (Enterprise Resource Planning) Systems',
      'HRM (Human Resource Management) System',
      'PMS (Property Management System)',
      'EMS (E-Learning Management System)'
    ]
  }
];

export default function Capabilities() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#0A2647] via-[#144272] to-[#205295] relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF5400] rounded-full mix-blend-overlay filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 mb-8"
              >
                <div className="h-[2px] w-8 bg-[#FF5400]"></div>
                <span className="text-[#FF5400] font-medium tracking-wider text-sm">OUR EXPERTISE</span>
                <div className="h-[2px] w-8 bg-[#FF5400]"></div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8"
              >
                <span className="text-[#FF5400]">Creative agency</span> <br />
                specializing in building
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 text-transparent bg-clip-text"
              >
                brands & visual experiences
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-gray-300 text-lg max-w-2xl mx-auto"
              >
                We transform ideas into compelling visual stories that captivate and connect with your audience.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Brand Identity Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <i className="fas fa-fingerprint text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Brand Identity</h3>
                </div>
                <ul className="space-y-4">
                  {capabilities[0].services.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600">
                      <i className="fas fa-check text-sm text-primary"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Illustration Designs Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <i className="fas fa-pencil-ruler text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Illustration Designs</h3>
                </div>
                <ul className="space-y-4">
                  {capabilities[1].services.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600">
                      <i className="fas fa-check text-sm text-primary"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Website Design Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <i className="fas fa-code text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Website Design & Development</h3>
                </div>
                <ul className="space-y-4">
                  {capabilities[2].services.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600">
                      <i className="fas fa-check text-sm text-primary"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#0A2647]">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-8"
            >
              Ready to start your project?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-[#FF5400] text-white rounded-full hover:bg-[#FF5400]/90 transition-colors text-lg font-medium group"
              >
                Get Started
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
} 