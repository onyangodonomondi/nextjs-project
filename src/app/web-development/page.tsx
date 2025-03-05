'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';

const processSteps = [
  {
    title: 'Discovery',
    description: 'We start by understanding your business goals, target audience, and project requirements.',
    icon: 'fas fa-search',
  },
  {
    title: 'Planning',
    description: 'Creating a detailed project roadmap, wireframes, and technical specifications.',
    icon: 'fas fa-sitemap',
  },
  {
    title: 'Design',
    description: 'Crafting beautiful, user-friendly interfaces that align with your brand.',
    icon: 'fas fa-paint-brush',
  },
  {
    title: 'Development',
    description: 'Building your website using modern, scalable technologies.',
    icon: 'fas fa-code',
  },
  {
    title: 'Testing',
    description: 'Rigorous testing across devices and browsers to ensure quality.',
    icon: 'fas fa-vial',
  },
  {
    title: 'Launch',
    description: 'Deploying your website and providing ongoing support.',
    icon: 'fas fa-rocket',
  },
];

const technologies = [
  {
    category: 'Frontend',
    icon: 'fas fa-desktop',
    items: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'TypeScript']
  },
  {
    category: 'Backend',
    icon: 'fas fa-server',
    items: ['Node.js', 'Python', 'PHP', 'Laravel', 'Express']
  },
  {
    category: 'Database',
    icon: 'fas fa-database',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis']
  },
  {
    category: 'CMS',
    icon: 'fas fa-file-code',
    items: ['WordPress', 'Strapi', 'Sanity', 'Contentful']
  }
];

const websiteTypes = [
  {
    icon: '🏢',
    title: 'Corporate Websites',
    description: 'Professional websites for businesses that establish credibility and showcase services.',
    features: ['Company Profile', 'Service Showcase', 'Team Profiles', 'Contact Integration']
  },
  {
    icon: '🛍️',
    title: 'E-commerce Websites',
    description: 'Online stores with secure payment gateways and inventory management.',
    features: ['Product Catalog', 'Shopping Cart', 'Payment Integration', 'Order Management']
  },
  {
    icon: '📱',
    title: 'Portfolio Websites',
    description: 'Creative platforms to showcase your work and attract potential clients.',
    features: ['Project Gallery', 'Case Studies', 'Client Testimonials', 'Contact Forms']
  },
  {
    icon: '🏥',
    title: 'Healthcare Websites',
    description: 'User-friendly websites for medical practices and healthcare providers.',
    features: ['Appointment Booking', 'Service Information', 'Doctor Profiles', 'Patient Resources']
  },
  {
    icon: '🎓',
    title: 'Educational Websites',
    description: 'Interactive platforms for schools, colleges, and educational institutions.',
    features: ['Course Catalog', 'Student Portal', 'Learning Resources', 'Event Calendar']
  },
  {
    icon: '⚖️',
    title: 'Legal Websites',
    description: 'Professional websites for law firms and legal consultants.',
    features: ['Practice Areas', 'Attorney Profiles', 'Case Studies', 'Client Portal']
  }
];

export default function WebDevelopment() {
  return (
    <>
      <Navbar />
      <main className="pt-24 bg-gray-50">
        <PageHero 
          title="Web Development Services"
          description="Custom web solutions that drive growth and deliver exceptional user experiences."
        />

        <section className="py-20 bg-white">
          <div className="container">
            <div className="section-header">
              <h2 className="text-gradient">Types of Websites We Create</h2>
              <p>Specialized web solutions for every industry</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {websiteTypes.map((type, index) => (
                <div
                  key={type.title}
                  className="service-card group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{type.icon}</div>
                    <h3 className="text-xl font-bold text-orange-500 mb-3">{type.title}</h3>
                    <p className="text-gray-600 mb-6">{type.description}</p>
                  </div>
                  <ul className="space-y-3">
                    {type.features.map(feature => (
                      <li key={feature} className="flex items-center gap-3">
                        <i className="fas fa-check text-accent"></i>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="section-header">
              <h2 className="text-gradient">Our Development Process</h2>
              <p>A systematic approach to delivering exceptional results</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="service-card group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="icon-wrapper">
                    <i className={`${step.icon} icon`}></i>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="section-header">
              <h2 className="text-gradient">Technologies We Use</h2>
              <p>Modern tools for modern web solutions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {technologies.map((tech, index) => (
                <div
                  key={tech.category}
                  className="service-card group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="icon-wrapper">
                    <i className={`${tech.icon} icon`}></i>
                  </div>
                  <h3>{tech.category}</h3>
                  <ul className="space-y-2">
                    {tech.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-gray-600">
                        <i className="fas fa-check text-blue-500 text-sm"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container">
            <div className="section-header">
              <h2 className="text-gradient">Web Development Portfolio</h2>
              <p>Discover our latest web development projects and see how we can transform your digital presence.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  image: "/web/Mac-1024x683.jpg",
                  title: "Security Company Website",
                  description: "Custom Website for a security Company",
                  link: "https://top23security.com/"
                },
                {
                  image: "/web/Macbook-1-1024x683.jpg",
                  title: "Corporate Website",
                  description: "Modern business website with dynamic features",
                  link: "https://lsmsolutionsltd.com/"
                },
                {
                  image: "/web/Macbook-1024x683.jpg",
                  title: "StartUp Company Website",
                  description: "Custom Website for a StartUp Company",
                  link: "https://nafrichemdistributors.co.ke/"
                },
                {
                  image: "/web/Macbook-Pro-1024x683.jpg",
                  title: "Tourism Company Website",
                  description: "Custom Website for a Tourism Company",
                  link: "https://drivestayexplore.com/"
                },
                {
                  image: "/web/Macbook2-1024x683.jpg",
                  title: "E-commerce Website",
                  description: "Custom Website for an E-commerce Company",
                  link: "https://excaliburdealerslimited.com/"
                },
                {
                  image: "/web/Macbook3-1024x683.jpg",
                  title: "Crypto Trading Company Website",
                  description: "Custom Website for a Crypto Trading Company",
                  link: "https://piggycryptoke.com/"
                },
                {
                  image: "/web/Macbook4-1-1024x683.jpg",
                  title: "Law Firm Website",
                  description: "Custom Website for a Law Firm",
                  link: "https://wasongalaw.co.ke/"
                },
                {
                  image: "/web/Macbook6-1024x683.jpg",
                  title: "College Website",
                  description: "Custom Website for a College",
                  link: "https://knowledgespringinstitute.ac.ke/"
                },
                {
                  image: "/web/Macbook7-1024x683.jpg",
                  title: "E-commerce Website",
                  description: "Custom Website for an E-commerce Company",
                  link: "https://charloflexshippers.co.ke/"
                },
                {
                  image: "/web/Macbook4-1024x683.jpg",
                  title: "Corporate Website",
                  description: "Custom Website for a Corporate Company",
                  link: "https://icl.aero/"
                },
                {
                  image: "/web/pure-1024x683.jpg",
                  title: "NGO Website",
                  description: "Custom Website for an NGO",
                  link: "https://pure-gift.org/"
                },
                {
                  image: "/web/Macbook12-1024x683.jpg",
                  title: "Corporate Website",
                  description: "Custom Website for a Corporate Company",
                  link: "https://reucherafricakenyaltd.co.ke/"
                }
              ].map((project, index) => (
                <div key={project.link} className="portfolio-card group" data-aos="fade-up" data-aos-delay={index % 3 * 100}>
                  <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex gap-4">
                      <a
                        href={project.link}
                        className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website <i className="fas fa-external-link-alt"></i>
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-accent transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Details <i className="fas fa-info-circle"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 