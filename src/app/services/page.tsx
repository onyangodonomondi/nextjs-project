import PageHero from '@/components/PageHero';
import Image from 'next/image';

const services = [
  {
    title: "Professional Web Design",
    description: "Custom website development solutions for businesses in Kenya. We create responsive, SEO-friendly websites that drive results.",
    features: [
      "Responsive Web Design",
      "E-commerce Development",
      "WordPress Solutions",
      "SEO Optimization",
      "Website Maintenance",
      "SSL Security"
    ],
    icon: "fa-code",
    image: "/images/web/web-design.jpg"
  },
  {
    title: "Graphic Design Services",
    description: "Expert graphic design services in Nairobi. From logos to marketing materials, we bring your brand to life.",
    features: [
      "Logo Design",
      "Brand Identity",
      "Marketing Materials",
      "Social Media Graphics",
      "Print Design",
      "Packaging Design"
    ],
    icon: "fa-pen-nib",
    image: "/images/graphics/graphic-design.jpg"
  },
  {
    title: "Digital Marketing",
    description: "Comprehensive digital marketing strategies to grow your business in Kenya's competitive market.",
    features: [
      "SEO Services",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "PPC Advertising",
      "Analytics & Reporting"
    ],
    icon: "fa-chart-line",
    image: "/images/services/digital-marketing.jpg"
  }
];

export const metadata = {
  title: 'Professional Digital Services | Web Design & Branding in Kenya - Mocky Digital',
  description: 'Comprehensive digital services including website development, graphic design, SEO optimization, and social media marketing for businesses in Kenya.',
  keywords: 'web design kenya, graphic design services, digital marketing nairobi, seo services kenya, social media marketing, business branding, e-commerce development'
};

export default function ServicesPage() {
  return (
    <main className="pt-24">
      <PageHero 
        title="Digital Services in Kenya"
        subtitle="Professional Web Design, Graphic Design & Digital Marketing Solutions"
      />
      
      {/* Enhanced Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Our Professional Digital Services
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored for businesses in Kenya. From web design to digital marketing, we help you establish a strong online presence.
          </p>
          
          {services.map((service, index) => (
            <div key={index} className="mb-20 last:mb-0">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className={`space-y-6 ${index % 2 === 0 ? 'order-1 md:order-none' : ''}`}>
                  <h3 className="text-3xl font-bold text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 text-lg">{service.description}</p>
                  <ul className="space-y-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700">
                        <i className="fas fa-check-circle text-primary"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a 
                    href="/contact" 
                    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Learn More
                    <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Our Process</h2>
          <p className="text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            We follow a proven methodology to deliver exceptional results for our clients
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We learn about your business goals and requirements"
              },
              {
                step: "02",
                title: "Strategy",
                description: "Develop a tailored plan to achieve your objectives"
              },
              {
                step: "03",
                title: "Execute",
                description: "Implement solutions with precision and care"
              },
              {
                step: "04",
                title: "Optimize",
                description: "Continuously improve based on data and feedback"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-xl mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose Our Digital Services?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Expert Team in Kenya</h3>
                <p className="text-gray-600">Professional designers and developers with years of experience in the Kenyan market.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Affordable Solutions</h3>
                <p className="text-gray-600">Competitive pricing for web design and digital marketing services in Nairobi.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Results-Driven Approach</h3>
                <p className="text-gray-600">Focus on delivering measurable results and ROI for your business.</p>
              </div>
            </div>

            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/images/hero/services-hero.jpg"
                alt="Digital Services in Kenya"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div>
                    <h3 className="font-bold">Client Name</h3>
                    <p className="text-gray-600">Company</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Excellent service and professional team. They delivered our project on time and exceeded our expectations."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl mb-12 text-gray-200">
            Get professional web design and digital marketing services in Kenya
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-primary rounded-full hover:bg-gray-100 transition-colors text-lg font-medium"
          >
            Start Your Project
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </section>
    </main>
  );
} 