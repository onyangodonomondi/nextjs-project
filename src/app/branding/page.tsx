'use client';

import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';

const brandingServices = [
  {
    title: 'Brand Strategy',
    icon: 'fas fa-chess',
    description: 'Strategic brand positioning and identity development.',
    features: [
      'Market Research',
      'Brand Positioning',
      'Target Audience Analysis',
      'Brand Voice & Messaging'
    ]
  },
  {
    title: 'Visual Identity',
    icon: 'fas fa-palette',
    description: 'Create a distinctive and memorable visual brand presence.',
    features: [
      'Logo Design',
      'Color Palette',
      'Typography Selection',
      'Design System'
    ]
  },
  {
    title: 'Brand Guidelines',
    icon: 'fas fa-book',
    description: 'Comprehensive guidelines for consistent brand application.',
    features: [
      'Usage Guidelines',
      'Brand Standards',
      'Asset Library',
      'Implementation Guide'
    ]
  }
];

const brandingProcess = [
  {
    phase: 'Research',
    description: 'Understanding your market, competitors, and target audience.',
    deliverables: [
      'Market Analysis',
      'Competitor Research',
      'Audience Insights',
      'Brand Audit'
    ]
  },
  {
    phase: 'Strategy',
    description: "Developing your brand's positioning and core messaging.",
    deliverables: [
      'Brand Positioning',
      'Value Proposition',
      'Brand Story',
      'Messaging Framework'
    ]
  },
  {
    phase: 'Design',
    description: 'Creating the visual elements that represent your brand.',
    deliverables: [
      'Logo Design',
      'Color Palette',
      'Typography',
      'Visual Elements'
    ]
  },
  {
    phase: 'Implementation',
    description: 'Applying your brand across all touchpoints.',
    deliverables: [
      'Brand Guidelines',
      'Asset Creation',
      'Template Design',
      'Digital Integration'
    ]
  }
];

const brandElements = [
  {
    title: 'Logo Design',
    icon: 'fas fa-star',
    description: 'Professional logo design that captures your brand essence.'
  },
  {
    title: 'Color Psychology',
    icon: 'fas fa-paint-brush',
    description: 'Strategic color selection to evoke the right emotions.'
  },
  {
    title: 'Typography',
    icon: 'fas fa-font',
    description: 'Font selection that reinforces your brand personality.'
  },
  {
    title: 'Brand Voice',
    icon: 'fas fa-comment',
    description: 'Distinctive tone and messaging that resonates with your audience.'
  },
  {
    title: 'Visual Style',
    icon: 'fas fa-image',
    description: 'Cohesive visual elements that strengthen brand recognition.'
  },
  {
    title: 'Brand Story',
    icon: 'fas fa-book-open',
    description: 'Compelling narrative that connects with your audience.'
  }
];

export default function Branding() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <PageHero 
          title="Brand Development"
          description="Build a powerful brand identity that resonates with your audience and sets you apart from the competition."
        />

        <section className="services-overview py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Branding Services</h2>
              <p className="text-xl text-gray-600">Comprehensive branding solutions to establish your market presence</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brandingServices.map((service, index) => (
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

        <section className="branding-process bg-gray-50 py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Branding Process</h2>
              <p className="text-xl text-gray-600">A systematic approach to building your brand</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {brandingProcess.map((phase, index) => (
                <div
                  key={phase.phase}
                  className="process-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-6 text-xl font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{phase.phase}</h3>
                    <p className="text-gray-600 mb-6">{phase.description}</p>
                    <ul className="space-y-3">
                      {phase.deliverables.map(deliverable => (
                        <li key={deliverable} className="text-gray-600 flex items-center gap-2">
                          <i className="fas fa-check text-accent text-sm"></i>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="brand-elements py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Essential Brand Elements</h2>
              <p className="text-xl text-gray-600">Building blocks of a strong brand identity</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brandElements.map((element, index) => (
                <div
                  key={element.title}
                  className="element-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <i className={`${element.icon} text-2xl text-primary`}></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{element.title}</h3>
                    <p className="text-gray-600">{element.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta bg-primary text-white py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Build Your Brand?</h2>
              <p className="text-xl text-gray-200 mb-8">
                Let's create a powerful brand identity that makes you stand out in your market.
              </p>
              <a
                href="https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I'm%20interested%20in%20Branding%20services."
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Your Brand Journey
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 