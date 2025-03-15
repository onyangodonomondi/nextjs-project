import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import ClientCallbackForm from '@/components/ClientCallbackForm';

// Export metadata directly in the page file
export const metadata = {
  title: 'Mocky Digital - Web Design & Digital Marketing Agency Kenya',
  description: 'Professional web design, graphic design, and digital marketing services in Kenya.',
  keywords: 'graphic design, web development, digital marketing, branding, Kenya, Nairobi'
};

// Server Component
export default function Home() {
  // WhatsApp link precomputed
  const whatsappLink = "https://wa.me/254741590670?text=Hello%20Mocky%20Graphics!";
  
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        {/* Hero Section - Server Rendered */}
        <section className="relative min-h-screen overflow-hidden bg-[#0A1929] pt-20">
          <div className="container relative mx-auto px-6 py-16 flex items-center min-h-[calc(100vh-80px)]">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <span className="text-sm font-medium text-white">Welcome to Mocky Digital</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  <span className="block mb-2">Transform Your</span>
                  <span className="block text-blue-200">Digital Presence</span>
                </h1>
                
                <p className="max-w-xl text-lg text-white/90 leading-relaxed">
                  We create effective visual experiences that drive growth
                  through strategic branding and innovative digital solutions.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                    className="bg-white hover:bg-gray-100 text-[#0A1929] px-8 py-4 rounded-full font-medium text-center transition-colors">
                    Get Started
                  </a>
                  <a href="#work" 
                    className="border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-full font-medium text-center transition-colors">
                    View Our Work
                  </a>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-[350px] md:h-[450px] mx-auto w-full max-w-lg">
                <div className="absolute inset-0 rounded-2xl overflow-hidden flex items-center justify-center">
                  <Image 
                    src="/images/hero/2.svg" 
                    alt="Mocky Digital Hero"
                    width={450}
                    height={450}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#081422] to-transparent"></div>
        </section>

        {/* Callback Form Section */}
        <ClientCallbackForm />

        {/* What We Offer Section */}
        <section className="py-20 bg-white" id="services">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[#FF5400]">
                What We Offer
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive digital solutions to transform your business presence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Graphics Design Card */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Graphics Design</h3>
                <p className="text-gray-600 mb-6">
                  Professional graphic design services that bring your brand to life
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">Logo & Brand Identity</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">Marketing Materials</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">Social Media Graphics</span>
                  </li>
                </ul>
                <Link 
                  href="/services#graphics-design" 
                  className="text-[#FF5400] hover:text-[#FF5400]/80 font-medium inline-flex items-center"
                >
                  Get Started →
                </Link>
              </div>

              {/* Web Development Card */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Web Development</h3>
                <p className="text-gray-600 mb-6">
                  Custom websites and web applications that drive results
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">Responsive Design</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">E-commerce Solutions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">CMS Development</span>
                  </li>
                </ul>
                <Link 
                  href="/services#web-development" 
                  className="text-[#FF5400] hover:text-[#FF5400]/80 font-medium inline-flex items-center"
                >
                  Get Started →
                </Link>
              </div>

              {/* Social Media Card */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Social Media</h3>
                <p className="text-gray-600 mb-6">
                  Strategic social media management to boost your online presence
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">Content Strategy</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">Community Management</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">Paid Advertising</span>
                  </li>
                </ul>
                <Link 
                  href="/services#social-media" 
                  className="text-[#FF5400] hover:text-[#FF5400]/80 font-medium inline-flex items-center"
                >
                  Get Started →
                </Link>
              </div>

              {/* Branding Card */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Branding</h3>
                <p className="text-gray-600 mb-6">
                  Build a strong, memorable brand that connects with your audience
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">Brand Strategy</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">Visual Identity</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">Brand Guidelines</span>
                  </li>
                </ul>
                <Link 
                  href="/services#branding" 
                  className="text-[#FF5400] hover:text-[#FF5400]/80 font-medium inline-flex items-center"
                >
                  Get Started →
                </Link>
              </div>

              {/* Cloud & VPS Solutions Card */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Cloud & VPS Solutions</h3>
                <p className="text-gray-600 mb-6">
                  Professional cloud infrastructure setup and management for your web applications
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">VPS Server Setup</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">Cloud Migration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">Backup Solutions</span>
                  </li>
                </ul>
                <Link 
                  href="/services#cloud-solutions" 
                  className="text-[#FF5400] hover:text-[#FF5400]/80 font-medium inline-flex items-center"
                >
                  Get Started →
                </Link>
              </div>

              {/* Website Maintenance Card */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Website Maintenance</h3>
                <p className="text-gray-600 mb-6">
                  Keep your website secure, updated, and performing at its best
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">Regular Updates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">Security Monitoring</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5400]"></span>
                    <span className="text-gray-600">Performance Optimization</span>
                  </li>
                </ul>
                <Link 
                  href="/services#maintenance" 
                  className="text-[#FF5400] hover:text-[#FF5400]/80 font-medium inline-flex items-center"
                >
                  Get Started →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Work Showcase Section */}
        <section className="py-24 bg-gray-50" id="work">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">PORTFOLIO</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Recent Work</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how we've helped businesses transform their digital presence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Project Card 1 */}
              <div className="group relative overflow-hidden rounded-xl bg-white shadow-md h-full">
                <div className="aspect-video w-full bg-gray-200">
                  <Image 
                    src="/images/portfolio/placeholder.jpg" 
                    alt="Project 1"
                    width={600}
                    height={340}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Business Website Redesign</h3>
                  <p className="text-gray-600 mb-5">Modern and responsive website redesign for a corporate client.</p>
                  <span className="text-sm font-medium text-blue-600">Web Design</span>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="group relative overflow-hidden rounded-xl bg-white shadow-md h-full">
                <div className="aspect-video w-full bg-gray-200">
                  <Image 
                    src="/images/portfolio/placeholder.jpg" 
                    alt="Project 2"
                    width={600}
                    height={340}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Brand Identity Package</h3>
                  <p className="text-gray-600 mb-5">Complete brand identity development for a startup.</p>
                  <span className="text-sm font-medium text-purple-600">Graphic Design</span>
                </div>
              </div>

              {/* Project Card 3 */}
              <div className="group relative overflow-hidden rounded-xl bg-white shadow-md h-full">
                <div className="aspect-video w-full bg-gray-200">
                  <Image 
                    src="/images/portfolio/placeholder.jpg" 
                    alt="Project 3"
                    width={600}
                    height={340}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">E-commerce Platform</h3>
                  <p className="text-gray-600 mb-5">Custom e-commerce solution with integrated payment systems.</p>
                  <span className="text-sm font-medium text-green-600">Web Development</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <Link href="/portfolio" className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors">
                View All Projects
              </Link>
            </div>
          </div>
        </section>

        {/* Simplified Contact Section */}
        <section className="py-24 bg-[#0A1929] text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Transform Your Digital Presence?</h2>
              <p className="text-xl text-blue-200 mb-10 leading-relaxed">
                Let's discuss how we can help your business grow
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full transition-colors inline-flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
                <Link 
                  href="/contact" 
                  className="px-8 py-4 bg-transparent border border-white hover:bg-white/10 text-white font-medium rounded-full transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
