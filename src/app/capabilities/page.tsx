'use client';

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
      <main className="pt-24">
        <section className="bg-gray-50 py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h4 className="text-primary uppercase tracking-wide mb-2">EXPERTISE</h4>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                We are a creative agency specializing<br />
                in building brands and visual<br />
                experiences.
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {capabilities.map((capability, index) => (
                <div 
                  key={capability.title}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center">
                      <i className={`fas ${capability.icon} text-2xl text-primary`}></i>
                    </div>
                    <h3 className="text-xl font-bold">{capability.title}</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {capability.services.map(service => (
                      <li key={service} className="flex items-start gap-2">
                        <i className="fas fa-check text-primary mt-1"></i>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 