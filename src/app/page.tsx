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
    <main className="overflow-hidden">
      {/* Hero Section - Modified to start below navbar */}
      <section className="relative overflow-hidden bg-[#0A1929]">
        <div className="container relative mx-auto px-6 py-16 flex items-center min-h-[90vh]">
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
                <Link href="/portfolio" 
                  className="border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-full font-medium text-center transition-colors">
                  View Our Work
                </Link>
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

      {/* How We Work Section */}
      <section className="py-24 bg-gray-50" id="process">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[#FF5400]">
              How We Work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our proven process ensures we deliver exceptional results for every project
            </p>
          </div>

          {/* Replace the vertical timeline with a horizontal process flow */}
          <div className="relative">
            {/* Horizontal line connecting all steps */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#FF5400] to-blue-500 transform -translate-y-1/2 z-0"></div>
            
            {/* Steps in horizontal layout */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#FF5400] to-[#FF7A00] flex items-center justify-center text-white text-2xl font-bold shadow-lg z-20 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md text-center h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">01. Discovery</h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    We begin by understanding your goals, audience, and unique challenges.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FFA500] flex items-center justify-center text-white text-2xl font-bold shadow-lg z-20 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md text-center h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">02. Planning</h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    We craft a detailed roadmap outlining timelines and key milestones.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#FFA500] to-[#FFD700] flex items-center justify-center text-white text-2xl font-bold shadow-lg z-20 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                    <line x1="8" y1="2" x2="8" y2="18"></line>
                    <line x1="16" y1="6" x2="16" y2="22"></line>
                  </svg>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md text-center h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">03. Design</h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    Our creative team brings concepts to life through iterative design.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700] to-[#4299E1] flex items-center justify-center text-white text-2xl font-bold shadow-lg z-20 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md text-center h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">04. Refine</h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    We rigorously test and refine our work to meet high quality standards.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#4299E1] to-[#0070F3] flex items-center justify-center text-white text-2xl font-bold shadow-lg z-20 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md text-center h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">05. Launch</h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    We expertly deploy your project and provide ongoing support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/process" 
              className="inline-block px-8 py-4 bg-[#FF5400] hover:bg-[#FF5400]/90 text-white font-medium rounded-full transition-colors"
            >
              Learn More About Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-white" id="why-us">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[#FF5400]">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine creativity, strategy, and technical expertise to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Advantage 1 */}
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF5400] to-[#FF7A00]"></div>
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md text-[#FF5400]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Fast Turnaround</h3>
              <p className="text-gray-600">
                We deliver high-quality results on time, ensuring your business stays ahead of the competition.
              </p>
              <div className="mt-6 text-3xl font-bold text-[#FF5400]">95%</div>
              <div className="text-sm text-gray-500">On-time delivery rate</div>
            </div>

            {/* Advantage 2 */}
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF7A00] to-[#FFA500]"></div>
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md text-[#FF7A00]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Dedicated Team</h3>
              <p className="text-gray-600">
                Our team of experts is committed to the success of your project from inception to completion.
              </p>
              <div className="mt-6 text-3xl font-bold text-[#FF7A00]">12+</div>
              <div className="text-sm text-gray-500">Industry specialists</div>
            </div>

            {/* Advantage 3 */}
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFA500] to-[#FFD700]"></div>
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md text-[#FFA500]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Quality Assurance</h3>
              <p className="text-gray-600">
                We maintain rigorous quality standards to ensure flawless execution of every project.
              </p>
              <div className="mt-6 text-3xl font-bold text-[#FFA500]">100%</div>
              <div className="text-sm text-gray-500">Satisfaction guarantee</div>
            </div>

            {/* Advantage 4 */}
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700] to-[#4299E1]"></div>
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md text-[#4299E1]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Innovative Solutions</h3>
              <p className="text-gray-600">
                We leverage the latest technologies and creative approaches to solve complex challenges.
              </p>
              <div className="mt-6 text-3xl font-bold text-[#4299E1]">250+</div>
              <div className="text-sm text-gray-500">Projects completed</div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mt-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-8 md:mb-0">
                <div className="relative w-24 h-24 mx-auto mb-4 md:mb-6">
                  <Image 
                    src="/images/testimonials/client1.jpg" 
                    alt="Client Testimonial"
                    width={96}
                    height={96}
                    className="rounded-full object-cover w-full h-full"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#FF5400] text-white w-8 h-8 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-gray-800">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">CEO, TechStart Solutions</p>
                </div>
              </div>
              <div className="md:w-2/3 md:pl-12">
                <blockquote className="text-gray-700 text-lg md:text-xl italic leading-relaxed">
                  "Working with Mocky Digital transformed our online presence completely. Their team not only delivered a stunning website but also provided strategic insights that helped grow our business. I highly recommend their services to anyone looking for quality, creativity, and results."
                </blockquote>
                <div className="flex items-center justify-center md:justify-start mt-6">
                  <div className="flex text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section - Implemented directly in page.tsx */}
      <section className="py-20 bg-gray-50" id="connect">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Connect With Us
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Follow us on social media for updates and inspiration
            </p>

            <div className="flex flex-col gap-4 max-w-md mx-auto">
              {/* Facebook */}
              <a
                href="https://facebook.com/mockydigital"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877F2] hover:bg-[#166FE5] text-white flex items-center justify-center gap-3 py-3 px-6 rounded-full font-medium transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Follow on Facebook</span>
              </a>
              
              {/* Instagram */}
              <a
                href="https://instagram.com/mockydigital"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white flex items-center justify-center gap-3 py-3 px-6 rounded-full font-medium transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                <span>Follow on Instagram</span>
              </a>
              
              {/* X (Twitter) */}
              <a
                href="https://x.com/mockydigital"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-900 text-white flex items-center justify-center gap-3 py-3 px-6 rounded-full font-medium transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
                <span>Follow on X</span>
              </a>
              
              {/* TikTok */}
              <a
                href="https://tiktok.com/@mockydigital"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-900 text-white flex items-center justify-center gap-3 py-3 px-6 rounded-full font-medium transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
                <span>Follow on TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      </main>
  );
}
