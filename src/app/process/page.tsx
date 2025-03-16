import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CopyButton from '@/components/CopyButton';

export const metadata = {
  title: 'Our Process | Mocky Digital',
  description: 'Learn about our simple 4-step process that delivers exceptional results on every project.',
  keywords: 'process, workflow, design process, web development, brief, deposit, feedback, delivery, mpesa'
};

export default function ProcessPage() {
  return (
    <main className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-[#0A1929] to-[#0F2942] text-white">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Our <span className="text-[#FF5400] relative">Process
                  <span className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-1 bg-[#FF5400]/60 rounded-full"></span>
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
                A straightforward approach that ensures quality results and satisfied clients
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5">
                <Link
                  href="/contact"
                  className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#FF5400] hover:bg-[#FF5400]/90 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto text-center"
                >
                  Start Your Project
                </Link>
                <a
                  href="#process-details"
                  className="px-6 sm:px-8 py-3 sm:py-3.5 border border-white/30 hover:bg-white/10 text-white font-medium rounded-full transition-all duration-300 hover:border-white/50 w-full sm:w-auto text-center mt-3 sm:mt-0"
                  aria-label="See process details"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Steps Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-white" id="process-details">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 text-[#FF5400] relative inline-block">
              Our Process
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-1 bg-[#FF5400]/40 rounded-full"></span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mt-4 sm:mt-5 px-2">
              We follow a simple, effective approach to ensure consistent quality and successful outcomes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24">
            {/* How It Works */}
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-[#0A1929] flex items-center">
                <span className="inline-block w-7 h-7 sm:w-8 sm:h-8 bg-[#FF5400]/10 rounded-full mr-2 sm:mr-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF5400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                How It Works
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 md:mb-12 border-l-4 border-[#FF5400]/30 pl-3 sm:pl-4 italic">
                Simple steps to get your design project completed
              </p>
              
              <div className="space-y-6 sm:space-y-8 md:space-y-10">
                <div className="flex gap-4 sm:gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-100 flex items-center justify-center text-[#FF5400] font-bold text-xl group-hover:bg-[#FF5400] group-hover:text-white transition-colors duration-300">
                      1
                    </div>
                  </div>
                  <div className="pt-1 sm:pt-2">
                    <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 group-hover:text-[#FF5400] transition-colors duration-300">Submit Your Brief</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Fill in the project details and requirements through our simple form</p>
                  </div>
                </div>
                
                <div className="flex gap-4 sm:gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-100 flex items-center justify-center text-[#FF5400] font-bold text-xl group-hover:bg-[#FF5400] group-hover:text-white transition-colors duration-300">
                      2
                    </div>
                  </div>
                  <div className="pt-1 sm:pt-2">
                    <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 group-hover:text-[#FF5400] transition-colors duration-300">Make Deposit</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Secure your project slot with a small deposit via M-PESA</p>
                  </div>
                </div>
                
                <div className="flex gap-4 sm:gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-100 flex items-center justify-center text-[#FF5400] font-bold text-xl group-hover:bg-[#FF5400] group-hover:text-white transition-colors duration-300">
                      3
                    </div>
                  </div>
                  <div className="pt-1 sm:pt-2">
                    <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 group-hover:text-[#FF5400] transition-colors duration-300">Review & Feedback</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Get your initial designs and provide detailed feedback</p>
                  </div>
                </div>
                
                <div className="flex gap-4 sm:gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-100 flex items-center justify-center text-[#FF5400] font-bold text-xl group-hover:bg-[#FF5400] group-hover:text-white transition-colors duration-300">
                      4
                    </div>
                  </div>
                  <div className="pt-1 sm:pt-2">
                    <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 group-hover:text-[#FF5400] transition-colors duration-300">Final Delivery</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Receive your polished, final design files ready for use</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Make Your Deposit */}
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 mt-8 md:mt-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-[#0A1929] flex items-center">
                <span className="inline-block w-7 h-7 sm:w-8 sm:h-8 bg-[#FF5400]/10 rounded-full mr-2 sm:mr-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF5400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </span>
                Make Your Deposit
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 md:mb-12 border-l-4 border-[#FF5400]/30 pl-3 sm:pl-4 italic">
                Secure your project slot with a deposit via M-PESA
              </p>
              
              <div className="bg-white rounded-lg sm:rounded-xl p-5 sm:p-6 md:p-8 shadow-sm mb-6 sm:mb-8 border border-gray-100 hover:border-orange-100 transition-colors duration-300">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-10 sm:w-10 text-[#FF5400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">M-PESA Payment</h3>
                    <p className="text-sm sm:text-base text-gray-600">Follow these simple steps to make your deposit</p>
                  </div>
                </div>
                
                <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
                  <div className="flex gap-3 sm:gap-4 hover:bg-orange-50/50 p-3 rounded-lg transition-colors duration-200">
                    <div className="flex-shrink-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-100 flex items-center justify-center text-[#FF5400] font-bold text-sm">
                        1
                      </div>
                    </div>
                    <div className="pt-0.5 sm:pt-1">
                      <p className="text-sm sm:text-base text-gray-700">Go to M-PESA on your phone</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 sm:gap-4 hover:bg-orange-50/50 p-3 rounded-lg transition-colors duration-200">
                    <div className="flex-shrink-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-100 flex items-center justify-center text-[#FF5400] font-bold text-sm">
                        2
                      </div>
                    </div>
                    <div className="pt-0.5 sm:pt-1">
                      <p className="text-sm sm:text-base text-gray-700">Select Pay Bill option</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 sm:gap-4 hover:bg-orange-50/50 p-3 rounded-lg transition-colors duration-200">
                    <div className="flex-shrink-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-100 flex items-center justify-center text-[#FF5400] font-bold text-sm">
                        3
                      </div>
                    </div>
                    <div className="pt-0.5 sm:pt-1">
                      <p className="text-sm sm:text-base text-gray-700">Enter Business number and Account number below</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Business Number</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl sm:text-2xl font-bold text-[#0A1929]">522533</p>
                      <CopyButton textToCopy="522533" label="Copy" />
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Account Number</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl sm:text-2xl font-bold text-[#0A1929]">7934479</p>
                      <CopyButton textToCopy="7934479" label="Copy" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 sm:p-5 rounded-lg border border-orange-100">
                  <div className="flex gap-3 sm:gap-4 items-start">
                    <div className="rounded-full bg-orange-100 p-1 sm:p-1.5 mt-1 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF5400]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 sm:mb-2 text-[#0A1929] text-sm sm:text-base">Share Your Transaction</h4>
                      <p className="text-xs sm:text-sm md:text-base text-gray-700">
                        After making your payment, please share the M-PESA transaction message with us on WhatsApp 
                        (<a href="https://wa.me/254741590670" className="text-[#FF5400] font-medium hover:underline">+254 741 590 670</a>). 
                        This will help us confirm your payment and begin your project immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-600 text-center italic">
                Once payment is complete, you will receive a confirmation message from M-PESA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 text-[#FF5400] relative inline-block">
              Why Our Process Works
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-1 bg-[#FF5400]/40 rounded-full"></span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mt-4 sm:mt-5 px-2">
              Our straightforward methodology delivers consistent results while maintaining flexibility for your unique needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FF5400]/10 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-[#FF5400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800">Transparent Communication</h3>
              <p className="text-sm sm:text-base text-gray-600">
                We maintain clear, consistent communication throughout the project, keeping you informed at every stage of the process.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FF5400]/10 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-[#FF5400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800">Rapid Iterations</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Our agile approach allows us to quickly adapt to feedback and make adjustments, ensuring the final product meets your vision.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 sm:col-span-2 md:col-span-1 sm:mx-auto md:mx-0 sm:max-w-md md:max-w-none">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FF5400]/10 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-[#FF5400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800">Detailed Documentation</h3>
              <p className="text-sm sm:text-base text-gray-600">
                We provide comprehensive documentation at each phase, creating a valuable resource for future reference and improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#0A1929] to-[#0F2942] text-white">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Let's work together to bring your vision to life through our simple, effective process
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5">
              <Link
                href="/contact"
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#FF5400] hover:bg-[#FF5400]/90 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto text-center"
              >
                Contact Us
              </Link>
              <a
                href="https://wa.me/254741590670?text=Hello%20Mocky%20Digital!%20I'm%20interested%20in%20starting%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3 sm:py-3.5 border border-white/30 hover:bg-white/10 text-white font-medium rounded-full transition-all duration-300 hover:border-white/50 inline-flex items-center justify-center gap-2 w-full sm:w-auto mt-3 sm:mt-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 