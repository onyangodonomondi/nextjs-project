'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import useState
import { useState, useEffect, useRef } from 'react';

// Import Link
import Link from 'next/link';

// Import Swiper as SwiperType
import { Swiper as SwiperType } from 'swiper';

// Sample portfolio works
const portfolioWorks = [
  { id: 1, image: '/images/works/work1.jpg', category: 'Branding' },
  { id: 2, image: '/images/works/work2.jpg', category: 'UI/UX' },
  { id: 3, image: '/images/works/work3.jpg', category: 'Motion' },
  // Add more works...
];

// Services with actual images from your directory
const services = [
  {
    title: 'Graphic Design',
    image: '/images/graphics/graphic design.jpg',
    description: 'Professional graphic design solutions'
  },
  {
    title: 'Motion Graphics',
    image: '/images/graphics/mtiongraphic.jpg',
    description: 'Dynamic motion design'
  },
  {
    title: 'PowerPoint Design',
    image: '/images/graphics/powerpint design.jpg',
    description: 'Professional presentations'
  },
  {
    title: 'SaaS Product Design',
    image: '/images/graphics/Saas Product design.jpg',
    description: 'Software interface design'
  },
  {
    title: 'UI/UX Design',
    image: '/images/graphics/UI UX.jpg',
    description: 'User interface & experience'
  },
  {
    title: 'Web Design',
    image: '/images/graphics/web design.jpg',
    description: 'Modern web solutions'
  }
];

// Update the portfolio images array with new images
const portfolioImages = [
  '/images/graphics/graphic design.jpg',
  '/images/graphics/mtiongraphic.jpg',
  '/images/graphics/powerpint design.jpg',
  '/images/graphics/Saas Product design.jpg',
  '/images/graphics/UI UX.jpg',
  '/images/graphics/web design.jpg'
];

// Add this function to get random images
function getRandomImages(count: number) {
  const shuffled = [...portfolioImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function Graphics() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [randomImages] = useState(() => getRandomImages(6));
  const swiperRef = useRef<SwiperType>();
  const [colors, setColors] = useState({
    color1: '#000000',
    color2: '#000000',
    color3: '#000000'
  });
  const [isMobile, setIsMobile] = useState(false);

  // Add useEffect to handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle click outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Format the message for WhatsApp without icons
    const message = `New Graphics Design Request

Type: ${formData.get('projectType')}
Name: ${formData.get('name')}
Phone: ${formData.get('phone')}
Email: ${formData.get('email')}
Brand Name: ${formData.get('brandName')}
Industry: ${formData.get('industry')}
Website: ${formData.get('website')}

Project Description:
${formData.get('description')}

Timeline: ${formData.get('timeline')}
Brand Colors: ${[
  formData.get('color1'),
  formData.get('color2'),
  formData.get('color3')
].filter(Boolean).join(', ')}

Files: ${selectedFiles.map(file => file.name).join(', ') || 'No files attached'}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp number
    const whatsappNumber = "254741590670";
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    form.reset();
    setSelectedFiles([]);
    setIsSubmitting(false);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, colorKey: string) => {
    const newColor = e.target.value.toUpperCase();
    setColors(prev => ({ ...prev, [colorKey]: newColor }));
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>, colorKey: string) => {
    let hex = e.target.value;
    // Always update the text input value
    setColors(prev => ({ ...prev, [colorKey]: hex }));
    
    // Only update the color picker if it's a valid hex
    if (hex.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      // If user didn't type #, add it
      if (!hex.startsWith('#')) {
        hex = '#' + hex;
      }
      setColors(prev => ({ ...prev, [colorKey]: hex }));
    }
  };

  // Add this useEffect near your other hooks
  useEffect(() => {
    const handleVisibilityChange = () => {
      swiperRef.current?.autoplay?.stop();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <>
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-4" ref={menuRef}>
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Mocky Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg font-bold text-gray-900">MOCKY</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/graphics" 
                className="text-sm font-medium text-primary"
              >
                Graphics
              </Link>
              <Link 
                href="/web" 
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                Web
              </Link>
              <Link 
                href="/pricing" 
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link 
                href="/portfolio" 
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                Portfolio
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-700 hover:text-gray-900 md:hidden"
              aria-label="Toggle menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg md:hidden"
                >
                  <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-col space-y-1">
                      <Link 
                        href="/graphics" 
                        className="px-4 py-2 text-sm font-medium text-primary rounded-lg hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Graphics
                      </Link>
                      <Link 
                        href="/web" 
                        className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Web
                      </Link>
                      <Link 
                        href="/pricing" 
                        className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Pricing
                      </Link>
                      <Link 
                        href="/portfolio" 
                        className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Portfolio
                      </Link>
                      <Link 
                        href="/contact" 
                        className="px-4 py-2 text-sm font-medium text-primary rounded-lg hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </header>

      <main className="bg-[#FDF9F3]"> {/* Duck Design's cream background */}
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-80px)] pt-28 md:pt-32 lg:pt-40 pb-12 md:pb-16 lg:pb-32 relative overflow-hidden">
          <div className="container mx-auto">
            {/* Left Content Area */}
            <div className="relative z-10 w-full px-4 md:px-8 lg:max-w-[45%]">
              {/* Tag line */}
              <div className="mb-4 md:mb-6 lg:mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 md:gap-3"
                >
                  <div className="w-6 md:w-8 h-[2px] bg-primary"></div>
                  <p className="text-primary/80 uppercase tracking-wider font-medium text-xs md:text-sm">
                    YOUR FULL SERVICE DESIGN PARTNER
                  </p>
                </motion.div>
              </div>

              {/* Main Content */}
              <div className="space-y-4 md:space-y-6 lg:space-y-8">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.1]"
                >
                  Design Without Limits
                </motion.h1>
                <div className="space-y-2 md:space-y-3 lg:space-y-4">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-base sm:text-lg md:text-xl text-gray-600"
                  >
                    We will take care of all your creative needs.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-base sm:text-lg md:text-xl text-gray-600"
                  >
                    No lengthy hiring procedures. No inefficient freelancers. No contracts.
                  </motion.p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-2 md:pt-4"
                >
                  <a 
                    href="mailto:info@mocky.co.ke"
                    className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-[#FFB840] text-black rounded-full hover:bg-[#FFB840]/90 transition-colors text-base md:text-lg font-medium group w-full sm:w-auto"
                  >
                    MAIL US
                    <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative w-full mt-8 md:mt-12 lg:mt-0 lg:absolute lg:top-0 lg:right-0 lg:w-[55%] lg:h-full"
            >
              <div className="relative w-full aspect-[4/3] lg:h-full">
                <Image
                  src="/images/graphics/hero section.png"
                  alt="Design Services Hero"
                  fill
                  className="object-contain lg:object-right scale-90"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 55vw"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Fix Your Graphics Design Bottleneck Section */}
        <section className="py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Left Content */}
              <div className="w-full lg:w-1/2">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-6"
                >
                  Trusted by Leading Brands
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                  <span className="text-[#FF5400]">Fix Your</span>{' '}
                  <span className="text-[#1E293B]">Graphics</span>{' '}
                  <span className="text-[#B08968]">Design Bottleneck</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl"
                >
                  Your brand designs are too important to be left in the hands of unreliable freelancers or expensive creative agencies. Why not hire an experienced, full-time designer who knows you by name and your brand by heart?
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row gap-4 sm:items-center"
                >
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary to-[#FFB840] text-white rounded-full hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 text-base md:text-lg font-medium group"
                  >
                    SEE OUR PLANS
                    <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </div>

              {/* Right Content - Client Logos */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 mt-8">
                  {randomImages.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="aspect-square relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-4 group overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`Portfolio Work ${index + 1}`}
                        fill
                        className="object-cover p-2 transition-all duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 40vw, (max-width: 1024px) 25vw, 20vw"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section - Simple */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our Services
            </h2>
          </div>
          
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView="auto"
            loop={true}
            autoplay={!isMobile ? {
              delay: 3000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true
            } : false}
            observer={true}
            observeParents={true}
            className="services-slider"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onBeforeDestroy={(swiper) => {
              swiper.autoplay?.stop();
            }}
          >
            {services.map((service) => (
              <SwiperSlide 
                key={service.title} 
                className="!w-[280px] sm:!w-[400px] md:!w-[600px] lg:!w-[700px]"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mb-4">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 400px, (max-width: 1024px) 600px, 700px"
                      priority
                    />
                  </div>
                  <div className="text-center px-4">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Getting Started Section */}
        <section className="py-12 md:py-20 bg-[#1E293B] w-full">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1.5 md:px-4 bg-white/20 rounded-full text-white text-xs md:text-sm font-medium mb-4"
              >
                START YOUR JOURNEY
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4"
              >
                Fill the form to get started
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-300 max-w-xl mx-auto text-sm md:text-base"
              >
                Begin your design journey with us in three simple steps
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
              {/* Project Requirements Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/[0.05] backdrop-blur-lg rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/[0.08] hover:border-white/[0.15] transition-colors group"
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="p-3 md:p-4 bg-[#FF5400]/20 rounded-xl shrink-0">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-[#FF5400]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-white">Step 1: Project Requirements</h3>
                    <ul className="space-y-3 md:space-y-4">
                      {[
                        'Your Business Name',
                        'Nature of Business/Products/Services',
                        'Design Ideas or Sketches (if any)'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-200 gap-3 group/item text-sm md:text-base">
                          <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF5400]/30 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#FF5400]/40 transition-colors">
                            <svg className="w-3 h-3 md:w-4 md:h-4 text-[#FF5400]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* M-PESA Payment Details Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/[0.05] backdrop-blur-lg rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/[0.08] hover:border-white/[0.15] transition-colors"
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="p-3 md:p-4 bg-[#FF5400]/20 rounded-xl shrink-0">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-[#FF5400]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-white">Step 2: M-PESA Payment</h3>
                    <div className="space-y-4 md:space-y-6">
                      {/* M-PESA Instructions */}
                      <div className="text-gray-300 space-y-2 mb-4 md:mb-6">
                        <p className="text-sm md:text-base">To make payment via M-PESA:</p>
                        <ol className="list-decimal list-inside space-y-1 pl-4 text-xs md:text-sm">
                          <li>Go to M-PESA on your phone</li>
                          <li>Select Pay Bill option</li>
                          <li>Enter Business number and Account number</li>
                          <li>Enter amount and your M-PESA PIN</li>
                          <li>Confirm payment details and submit</li>
                        </ol>
                      </div>

                      {/* Payment Details */}
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center justify-between p-3 md:p-4 bg-white/[0.08] rounded-lg hover:bg-white/[0.12] transition-colors group/item">
                          <div>
                            <p className="text-xs md:text-sm text-gray-300">Safaricom M-PESA Paybill</p>
                            <p className="text-base md:text-lg text-white font-medium">522533</p>
                          </div>
                          <button
                            onClick={() => handleCopy('522533', 'paybill')}
                            className="px-3 py-1.5 text-xs md:text-sm bg-white/[0.08] border border-white/20 rounded-lg hover:bg-white/[0.15] transition-all text-white flex items-center gap-2 group-hover/item:border-white/30"
                          >
                            {copiedText === 'paybill' ? (
                              <>
                                <svg className="w-3 h-3 md:w-4 md:h-4 text-[#4ADE80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-[#4ADE80]">Copied</span>
                              </>
                            ) : (
                              'Copy Number'
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-3 md:p-4 bg-white/[0.08] rounded-lg hover:bg-white/[0.12] transition-colors group/item">
                          <div>
                            <p className="text-xs md:text-sm text-gray-300">Account Number</p>
                            <p className="text-base md:text-lg text-white font-medium">7934479</p>
                          </div>
                          <button
                            onClick={() => handleCopy('7934479', 'account')}
                            className="px-3 py-1.5 text-xs md:text-sm bg-white/[0.08] border border-white/20 rounded-lg hover:bg-white/[0.15] transition-all text-white flex items-center gap-2 group-hover/item:border-white/30"
                          >
                            {copiedText === 'account' ? (
                              <>
                                <svg className="w-3 h-3 md:w-4 md:h-4 text-[#4ADE80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-[#4ADE80]">Copied</span>
                              </>
                            ) : (
                              'Copy Number'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 md:mt-12 text-center max-w-2xl mx-auto px-4"
            >
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Step 3: Project Kickoff</h3>
              <p className="text-sm md:text-base text-gray-300">
                Once payment is confirmed, our team will reach out to you within 24 hours to begin your project. We'll work closely with you to ensure your design needs are met with excellence.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-gray-300 mt-12 md:mt-16 max-w-2xl mx-auto italic text-sm md:text-base px-4"
            >
              We assure you that your investment is in good hands, and we are committed to delivering designs that exceed your expectations.
            </motion.p>
          </div>
        </section>

        {/* Project Details Form Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary font-medium mb-4"
              >
                Start Your Project
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Our Works
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Project Type & Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block text-lg font-medium text-gray-700">Project Type</label>
                    <select 
                      name="projectType"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    >
                      <option value="">Select Project Type</option>
                      <option value="branding">Branding & Identity Design</option>
                      <option value="ui-ux">UI/UX Design</option>
                      <option value="motion">Motion Graphics & Animation</option>
                      <option value="print">Print Design</option>
                      <option value="social">Social Media Design</option>
                      <option value="presentation">Presentation Design</option>
                      <option value="packaging">Packaging Design</option>
                      <option value="illustration">Custom Illustration</option>
                      <option value="infographic">Infographic Design</option>
                      <option value="email">Email Design</option>
                      <option value="banner">Banner & Ad Design</option>
                      <option value="book">Book & Magazine Design</option>
                      <option value="merchandise">Merchandise Design</option>
                      <option value="signage">Signage & Environmental Design</option>
                      <option value="3d">3D Design & Rendering</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-lg font-medium text-gray-700">Timeline</label>
                    <select 
                      name="timeline"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    >
                      <option value="">Select Timeline</option>
                      <option value="urgent">Urgent (1-2 days)</option>
                      <option value="normal">Normal (3-5 days)</option>
                      <option value="relaxed">Relaxed (1-2 weeks)</option>
                    </select>
                  </div>
                </div>

                {/* Brand Details */}
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700">Brand Details</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <input
                      type="text"
                      name="brandName"
                      placeholder="Brand Name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                    <input
                      type="text"
                      name="industry"
                      placeholder="Industry"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                    <input
                      type="url"
                      name="website"
                      placeholder="Website (if any)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700">Project Description</label>
                  <textarea
                    name="description"
                    rows={4}
                    placeholder="Describe your project requirements, goals, and any specific preferences..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  ></textarea>
                </div>

                {/* Brand Assets */}
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700">Brand Assets</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className="text-gray-600">Brand Colors (if any)</p>
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            name="color1" 
                            value={colors.color1}
                            onChange={(e) => handleColorChange(e, 'color1')}
                            className="w-12 h-12 rounded border border-gray-200" 
                          />
                          <input
                            type="text"
                            name="color1_hex"
                            value={colors.color1}
                            onChange={(e) => handleHexChange(e, 'color1')}
                            placeholder="Enter hex code (e.g. #FF5400)"
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            name="color2" 
                            value={colors.color2}
                            onChange={(e) => handleColorChange(e, 'color2')}
                            className="w-12 h-12 rounded border border-gray-200" 
                          />
                          <input
                            type="text"
                            name="color2_hex"
                            value={colors.color2}
                            onChange={(e) => handleHexChange(e, 'color2')}
                            placeholder="Enter hex code (e.g. #1E293B)"
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            name="color3" 
                            value={colors.color3}
                            onChange={(e) => handleColorChange(e, 'color3')}
                            className="w-12 h-12 rounded border border-gray-200" 
                          />
                          <input
                            type="text"
                            name="color3_hex"
                            value={colors.color3}
                            onChange={(e) => handleHexChange(e, 'color3')}
                            placeholder="Enter hex code (e.g. #B08968)"
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-gray-600">Upload Files (Logo, Brand Guide, etc.)</p>
                      <div className="flex items-center justify-center w-full">
                        <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-200 border-dashed cursor-pointer hover:border-primary transition-colors group">
                          <div className="flex flex-col items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="mt-2 text-gray-600 group-hover:text-primary">Drop files here or click to upload</span>
                            {selectedFiles.length > 0 && (
                              <div className="mt-4 text-sm text-gray-500">
                                {selectedFiles.map((file, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {file.name}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            name="files"
                            onChange={handleFileChange}
                            className="hidden"
                            multiple
                            accept=".pdf,.jpg,.png,.ai,.psd"
                          />
                        </label>
                      </div>
                      {selectedFiles.length > 0 && (
                        <div className="text-sm text-gray-500">
                          {selectedFiles.length} file(s) selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary to-[#FFB840] text-white rounded-full hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 text-base md:text-lg font-medium group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Project Details
                        <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* How to Get Started Section */}
        <section className="py-12 md:py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
              {/* Left Side - Title */}
              <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-4 md:space-y-6"
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                    Here's how to get started:
                  </h2>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link 
                      href="/pricing"
                      className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary to-[#FFB840] text-white rounded-full hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 text-base md:text-lg font-medium group w-full sm:w-auto justify-center sm:justify-start"
                    >
                      SEE OUR PLANS
                      <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Side - Timeline */}
              <div className="w-full lg:w-2/3">
                <div className="relative pl-10 sm:pl-12 md:pl-16">
                  {/* Timeline Line */}
                  <div className="absolute left-[18px] sm:left-[22px] md:left-[29px] top-[10px] bottom-[10px] w-[2px] bg-gradient-to-b from-primary/5 via-primary/20 to-primary/5" />

                  {/* Timeline Steps */}
                  <div className="space-y-6 sm:space-y-8 md:space-y-12">
                    {[
                      {
                        icon: (
                          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                        ),
                        title: "Choose a Plan",
                        description: "Clients select from various plans based on their needs and budget."
                      },
                      {
                        icon: (
                          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        ),
                        title: "Payment",
                        description: "After selecting a plan, clients proceed to payment."
                      },
                      {
                        icon: (
                          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        ),
                        title: "Onboarding and Brief",
                        description: "Upon successful payment, a project manager is assigned to the client for onboarding and task clarification. Clients fill out a brief detailing their business and design needs."
                      },
                      {
                        icon: (
                          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ),
                        title: "Designer Assignment",
                        description: "A personal designer is assigned to the client after the brief is completed."
                      },
                      {
                        icon: (
                          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        ),
                        title: "Task Creation and Submission",
                        description: "Clients create and submit tasks, providing necessary materials (logos, texts, images, etc.)"
                      },
                      {
                        icon: (
                          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        ),
                        title: "Feedback and Revisions",
                        description: "The designer submits completed tasks for review. Clients review the work, request revisions if needed."
                      },
                      {
                        icon: (
                          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ),
                        title: "Task Completion",
                        description: "Once the client is satisfied, the task is marked as complete."
                      }
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8 sm:pl-10 md:pl-14"
                      >
                        {/* Step Icon Container */}
                        <div className="absolute left-0 top-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full border-2 border-primary flex items-center justify-center shadow-lg text-primary transform -translate-x-1/2">
                          {/* Icon Wrapper for proper scaling */}
                          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
                            {step.icon}
                          </div>
                        </div>
                        
                        {/* Step Content */}
                        <div className="pt-1.5">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-primary">
                            {step.title}
                          </h3>
                          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        :global(.swiper-wrapper) {
          transition-timing-function: linear !important;
        }
        :global(.swiper) {
          overflow: visible !important;
          padding: 1rem 0;
        }
        :global(.swiper-slide) {
          transition: all 0.3s ease;
          opacity: 0.85;
          @media (max-width: 640px) {
            opacity: 1;
          }
        }
        :global(.swiper-slide:hover) {
          z-index: 1;
          opacity: 1;
        }
        :global(.services-slider) {
          visibility: visible;
          opacity: 1;
          transition: opacity 0.3s ease;
        }
        :global(.services-slider:not(:hover)) {
          opacity: 0.9;
        }
      `}</style>
    </>
  );
} 