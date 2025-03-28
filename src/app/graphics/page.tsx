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

// Import Toaster and toast
import { Toaster, toast } from 'react-hot-toast';

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

// Constants can stay outside the component
const projectTypes = [
  'Logo Design',
  'Business Cards',
  'Letterheads',
  'Envelopes',
  'Invoice/Quotations',
  'Complimentary Slips',
  'Brand Manual',
  'Email Signatures',
  'Brand Strategy',
  'Social Media Graphics',
  'Marketing Materials',
  'Packaging Design',
  'Brochures & Flyers',
  'Posters & Banners',
  'PowerPoint Templates',
  'Menu Design',
  'Book Covers',
  'Magazine Layout'
];

const timelineOptions = [
  'Urgent (24 hours)',
  'Standard (2-3 days)',
  'Regular (3-5 days)',
  'Extended (1 week+)'
];

export default function Graphics() {
  // Move state declarations inside the component
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTimeline, setSelectedTimeline] = useState('');
  const [colors, setColors] = useState({
    primary: '#511515',
    secondary: '#000000',
    accent: '#000000'
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [randomImages] = useState(() => getRandomImages(6));
  const swiperRef = useRef<SwiperType>();
  const [isMobile, setIsMobile] = useState(false);

  // Add state for form fields
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    website: '',
    designBrief: '',
    colors: {
      primary: '',
      secondary: '',
      accent: ''
    }
  });

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

  // First, add this style to handle body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

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

  const handleColorChange = (type: 'primary' | 'secondary' | 'accent', value: string) => {
    setColors(prev => ({
      ...prev,
      [type]: value
    }));
    // Also update the form data
    setFormData(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [type]: value
      }
    }));
  };

  // Add this useEffect near your other hooks
  useEffect(() => {
    const handleVisibilityChange = () => {
      swiperRef.current?.autoplay?.stop();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // First, add this function at the top of your component
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Use a simple alert for now
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy to clipboard');
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('color')) {
      setFormData(prev => ({
        ...prev,
        colors: {
          ...prev.colors,
          [name.replace('color', '').toLowerCase()]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Update the WhatsApp button
  const handleStartJourney = (data: typeof formData) => {
    const message = encodeURIComponent(
      `Hello! I'd like to start my design journey with you.

I will make the deposit to the provided paybill on the website to make the communication official.

Business Details:
- Name: ${data.businessName}
- Type: ${data.businessType}
${data.website ? `- Website: ${data.website}` : ''}

Design Brief:
${data.designBrief}

${data.colors.primary || data.colors.secondary || data.colors.accent ? `Brand Colors:
${data.colors.primary ? `- Primary: ${data.colors.primary}` : ''}
${data.colors.secondary ? `- Secondary: ${data.colors.secondary}` : ''}
${data.colors.accent ? `- Accent: ${data.colors.accent}` : ''}` : ''}`
    );

    const whatsappUrl = `https://wa.me/254741590670?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Toaster />
      <main className="bg-[#FDF9F3]">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-80px)] pt-28 md:pt-32 lg:pt-40 pb-12 md:pb-16 lg:pb-32 relative overflow-hidden">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
            {/* Left Content Area */}
            <div className="relative z-10 w-full lg:w-[50%] lg:pr-8">
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
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                >
                  Design 
                  <span className="text-[#FF5400] block">Without</span>
                  Limits
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
                  <motion.a
                    href="/portfolio"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-8 py-4 bg-primary text-white font-medium rounded-full 
                      hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                  >
                    View Our Portfolio
                    <i className="fas fa-arrow-right ml-2"></i>
                  </motion.a>
                </motion.div>
              </div>
            </div>

            {/* Hero Image - Enhanced positioning */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: 0.2,
                type: "spring",
                stiffness: 100
              }}
              className="relative w-full mt-12 lg:mt-0 lg:w-[55%] lg:h-[540px] xl:h-[640px] flex justify-center lg:justify-end"
            >
              <div className="relative w-[90%] md:w-[80%] h-[400px] md:h-[480px] lg:h-full lg:-mr-8 xl:-mr-16">
                <div className="absolute w-[80%] h-[80%] rounded-full bg-primary/5 top-[10%] left-[10%] filter blur-3xl -z-1"></div>
                <Image
                  src="/images/graphics/hero section.png"
                  alt="Design Services Hero"
                  fill
                  className="object-contain object-center lg:object-right scale-100 lg:scale-110 hover:scale-105 lg:hover:scale-115 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 55vw"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Add this after the hero section */}
        <div className="bg-[#0A2647] py-4 relative overflow-hidden">
          <motion.div
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            className="whitespace-nowrap"
          >
            <div className="inline-flex items-center text-white text-lg font-medium">
              <span>Logo Design</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>Brand Identity</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>Social Media Graphics</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>UI/UX Design</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>Web Design</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>Motion Graphics</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>Print Design</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>Packaging Design</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>Illustration</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>3D Design</span>
              {/* Duplicate the list to create seamless loop */}
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>Logo Design</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>Brand Identity</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>Social Media Graphics</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>UI/UX Design</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>Web Design</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>Motion Graphics</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>Print Design</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>Packaging Design</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>Illustration</span>
              <span className="mx-4 text-[#FF5400]">. . .</span>
              <span>3D Design</span>
            </div>
          </motion.div>
        </div>

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

        {/* Services Section */}
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-[#0A2647] text-center mb-6"
              >
                Our Design Services
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 text-center"
              >
                Professional design solutions for your brand
              </motion.p>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Each service card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-[300px] overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/logo.jpg"
                    alt="Logo Design"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Logo Design</h3>
                <p className="text-gray-600">Professional and memorable logos that represent your brand identity</p>
              </motion.div>

              {/* Business Cards */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/bscards.jpg"
                    alt="Business Cards"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Business Cards</h3>
                <p className="text-gray-600">Eye-catching business cards that leave a lasting impression</p>
              </motion.div>

              {/* Brand Manual */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/brandmanual.jpeg"
                    alt="Brand Manual"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Brand Manual</h3>
                <p className="text-gray-600">Comprehensive brand guidelines to maintain consistency</p>
              </motion.div>

              {/* Brochures */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/bronchures.jpeg"
                    alt="Brochures"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Brochures</h3>
                <p className="text-gray-600">Informative and visually appealing brochures</p>
              </motion.div>

              {/* Caps */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/caps.jpeg"
                    alt="Caps"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Branded Caps</h3>
                <p className="text-gray-600">Custom designed caps with your brand identity</p>
              </motion.div>

              {/* Company Profile */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/companyprofile.jpeg"
                    alt="Company Profile"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Company Profile</h3>
                <p className="text-gray-600">Professional company profiles that showcase your business</p>
              </motion.div>

              {/* Email Signature */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/emailsignature.jpeg"
                    alt="Email Signature"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Email Signature</h3>
                <p className="text-gray-600">Professional email signatures for your business communications</p>
              </motion.div>

              {/* Fliers */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/fliers.jpeg"
                    alt="Fliers"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Fliers</h3>
                <p className="text-gray-600">Eye-catching fliers for your events and promotions</p>
              </motion.div>

              {/* Layered */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/layered.jpeg"
                    alt="Layered Designs"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Layered Designs</h3>
                <p className="text-gray-600">Complex layered designs for various applications</p>
              </motion.div>

              {/* Letterhead */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/letterhead.jpg"
                    alt="Letterhead"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Letterhead</h3>
                <p className="text-gray-600">Professional letterheads for your business correspondence</p>
              </motion.div>

              {/* Merchandise */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/merchandise.jpg"
                    alt="Merchandise"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Merchandise</h3>
                <p className="text-gray-600">Custom branded merchandise and promotional items</p>
              </motion.div>

              {/* Notebook */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/notebook.jpeg"
                    alt="Notebook"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Notebooks</h3>
                <p className="text-gray-600">Custom designed notebooks and stationery</p>
              </motion.div>

              {/* Pen */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/pen.jpeg"
                    alt="Branded Pens"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Branded Pens</h3>
                <p className="text-gray-600">Custom branded pens for your business</p>
              </motion.div>

              {/* Roll-up Banners */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/rollupbanners.jpeg"
                    alt="Roll-up Banners"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Roll-up Banners</h3>
                <p className="text-gray-600">Professional roll-up banners for events and displays</p>
              </motion.div>

              {/* Staff ID Cards */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/staffidcards.jpeg"
                    alt="Staff ID Cards"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Staff ID Cards</h3>
                <p className="text-gray-600">Professional staff identification cards</p>
              </motion.div>

              {/* Teardrop Banner */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/teardropbanner.jpeg"
                    alt="Teardrop Banner"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Teardrop Banners</h3>
                <p className="text-gray-600">Eye-catching teardrop banners for outdoor advertising</p>
              </motion.div>

              {/* Wristbands */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/wristbands.jpeg"
                    alt="Wristbands"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Wristbands</h3>
                <p className="text-gray-600">Custom designed wristbands for events and branding</p>
              </motion.div>

              {/* Billboard */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/billboard.jpeg"
                    alt="Billboard"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Billboard Design</h3>
                <p className="text-gray-600">Impactful billboard designs for outdoor advertising</p>
              </motion.div>

              {/* Backdrop */}
              <motion.div className="group">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/backdrop.jpeg"
                    alt="Backdrop"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Event Backdrops</h3>
                <p className="text-gray-600">Custom designed backdrops for events and exhibitions</p>
              </motion.div>

              {/* Calendar Design */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-[300px] overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/calendar.jpeg"
                    alt="Calendar Design"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>Calendar Design</h3>
                <p className="text-gray-600">Custom designed calendars for your business and promotional needs</p>
              </motion.div>

              {/* T-shirt Design */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-[300px] overflow-hidden rounded-xl mb-4">
                  <Image
                    src="/images/graphics/samples/tshirts.jpeg"
                    alt="T-shirt Design"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-4 
                  group-hover:text-primary transition-colors`}>T-shirt Design</h3>
                <p className="text-gray-600">Custom designed t-shirts for your brand, events, or team uniforms</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Design Brief Section */}
        <section className="bg-[#0A2647] py-16 md:py-20">
          <div className="container mx-auto px-4">
            {/* Title Section */}
            <div className="max-w-3xl mx-auto mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-6"
              >
                Let's Bring Your Vision to Life
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-lg text-gray-300 text-center"
              >
                Share your project details with us, and let our expert designers create something exceptional for your brand
              </motion.p>
            </div>

            {/* Form Container */}
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Project Type & Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-white font-medium">Design Service</label>
                  <select 
                    className="w-full px-4 py-3.5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FF5400] focus:border-[#FF5400] bg-white/5 text-white"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                  >
                    <option value="" className="text-gray-900">Select Design Service</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="text-gray-900">{type}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-white font-medium">Preferred Timeline</label>
                  <select 
                    className="w-full px-4 py-3.5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FF5400] focus:border-[#FF5400] bg-white/5 text-white"
                    value={selectedTimeline}
                    onChange={(e) => setSelectedTimeline(e.target.value)}
                  >
                    <option value="" className="text-gray-900">Select Timeline</option>
                    {timelineOptions.map((timeline) => (
                      <option key={timeline} value={timeline} className="text-gray-900">{timeline}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Brand Information */}
              <div className="space-y-4">
                <h3 className="text-white font-medium text-lg mb-4">Tell Us About Your Brand</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Business Name"
                    className="w-full px-4 py-3.5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FF5400] focus:border-[#FF5400] bg-white/5 text-white placeholder-gray-400"
                  />
                  <input
                    type="text"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    placeholder="Industry/Business Type"
                    className="w-full px-4 py-3.5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FF5400] focus:border-[#FF5400] bg-white/5 text-white placeholder-gray-400"
                  />
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="Website (Optional)"
                    className="w-full px-4 py-3.5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FF5400] focus:border-[#FF5400] bg-white/5 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Design Brief */}
              <div className="space-y-2">
                <label className="block text-white font-medium">Design Brief</label>
                <textarea
                  name="designBrief"
                  value={formData.designBrief}
                  onChange={handleInputChange}
                  placeholder="Share your vision, specific requirements, or any design preferences. The more details you provide, the better we can understand your needs."
                  className="w-full px-4 py-3.5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FF5400] focus:border-[#FF5400] bg-white/5 text-white placeholder-gray-400"
                ></textarea>
              </div>

              {/* Brand Colors */}
              <div className="space-y-4">
                <h3 className="text-white font-medium text-lg mb-4">Brand Colors (Optional)</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Primary Color</label>
                    <div className="flex gap-4">
                      <input
                        type="color"
                        className="h-[42px] w-16 rounded cursor-pointer bg-white/5"
                        value={colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                      />
                      <input
                        type="text"
                        value={colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`)}
                        placeholder="#000000"
                        className="w-full px-4 py-3.5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FF5400] focus:border-[#FF5400] bg-white/5 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Secondary Color</label>
                    <div className="flex gap-4">
                      <input
                        type="color"
                        className="h-[42px] w-16 rounded cursor-pointer bg-white/5"
                        value={colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                      />
                      <input
                        type="text"
                        value={colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`)}
                        placeholder="#000000"
                        className="w-full px-4 py-3.5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FF5400] focus:border-[#FF5400] bg-white/5 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Accent Color</label>
                    <div className="flex gap-4">
                      <input
                        type="color"
                        className="h-[42px] w-16 rounded cursor-pointer bg-white/5"
                        value={colors.accent}
                        onChange={(e) => handleColorChange('accent', e.target.value)}
                      />
                      <input
                        type="text"
                        value={colors.accent}
                        onChange={(e) => handleColorChange('accent', e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`)}
                        placeholder="#000000"
                        className="w-full px-4 py-3.5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FF5400] focus:border-[#FF5400] bg-white/5 text-white"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-3">
                  Specify your brand colors to ensure design consistency, or leave them as default for our designers to propose a color scheme.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => handleStartJourney(formData)}
                  className="bg-[#FF5400] hover:bg-[#FF5400]/90 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300"
                >
                  Start Your Design Journey
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Project Requirements Section */}
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* How It Works - Left Side */}
              <div>
                <div className="mb-12">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-[#0A2647] mb-4"
                  >
                    How It Works
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-lg text-gray-600"
                  >
                    Simple steps to get your design
                  </motion.p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div className="space-y-8">
                    <div className={`flex items-center gap-4`}>
                      <div className={`flex-shrink-0 w-10 h-10 bg-[#FF5400]/10 rounded-full 
                        flex items-center justify-center text-[#FF5400] font-semibold text-lg`}>
                        1
                      </div>
                      <div>
                        <h4 className={`font-semibold text-gray-900 mb-4 
                          group-hover:text-primary transition-colors`}>Submit Your Brief</h4>
                        <p className="text-gray-600">Fill in the project details and requirements</p>
                      </div>
                    </div>

                    <div className={`flex items-center gap-4`}>
                      <div className={`flex-shrink-0 w-10 h-10 bg-[#FF5400]/10 rounded-full 
                        flex items-center justify-center text-[#FF5400] font-semibold text-lg`}>
                        2
                      </div>
                      <div>
                        <h4 className={`font-semibold text-gray-900 mb-4 
                          group-hover:text-primary transition-colors`}>Make Deposit</h4>
                        <p className="text-gray-600">Secure your project slot with a small deposit</p>
                      </div>
                    </div>

                    <div className={`flex items-center gap-4`}>
                      <div className={`flex-shrink-0 w-10 h-10 bg-[#FF5400]/10 rounded-full 
                        flex items-center justify-center text-[#FF5400] font-semibold text-lg`}>
                        3
                      </div>
                      <div>
                        <h4 className={`font-semibold text-gray-900 mb-4 
                          group-hover:text-primary transition-colors`}>Review & Feedback</h4>
                        <p className="text-gray-600">Get your initial designs and provide feedback</p>
                      </div>
                    </div>

                    <div className={`flex items-center gap-4`}>
                      <div className={`flex-shrink-0 w-10 h-10 bg-[#FF5400]/10 rounded-full 
                        flex items-center justify-center text-[#FF5400] font-semibold text-lg`}>
                        4
                      </div>
                      <div>
                        <h4 className={`font-semibold text-gray-900 mb-4 
                          group-hover:text-primary transition-colors`}>Final Delivery</h4>
                        <p className="text-gray-600">Receive your polished, final design files</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Make Your Deposit - Right Side */}
              <div>
                <div className="mb-12">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-[#0A2647] mb-4"
                  >
                    Make Your Deposit
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-lg text-gray-600"
                  >
                    Secure your project slot with a deposit via M-PESA
                  </motion.p>
                </div>

                <div className={`bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 min-w-[350px] border border-gray-100 hover:border-primary/20 group`}>
                  {/* M-PESA Header */}
                  <div className={`flex items-center gap-6 mb-8 pb-6 border-b border-gray-100`}>
                    <div className={`p-4 bg-[#FF5400]/10 rounded-xl`}>
                      <i className="fas fa-money-bill-wave text-3xl text-[#FF5400]"></i>
                    </div>
                    <div>
                      <h3 className={`font-semibold text-2xl text-gray-900 mb-2`}>M-PESA Payment</h3>
                      <p className="text-gray-600">Follow these simple steps to make your deposit</p>
                    </div>
                  </div>

                  {/* Payment Steps */}
                  <div className={`space-y-6 mb-8`}>
                    <div className={`flex gap-4`}>
                      <div className={`flex-shrink-0 w-8 h-8 bg-[#FF5400]/10 rounded-full 
                        flex items-center justify-center text-[#FF5400] font-semibold`}>
                        1
                      </div>
                      <div>
                        <p className="text-gray-600">Go to M-PESA on your phone</p>
                      </div>
                    </div>

                    <div className={`flex gap-4`}>
                      <div className={`flex-shrink-0 w-8 h-8 bg-[#FF5400]/10 rounded-full 
                        flex items-center justify-center text-[#FF5400] font-semibold`}>
                        2
                      </div>
                      <div>
                        <p className="text-gray-600">Select Pay Bill option</p>
                      </div>
                    </div>

                    <div className={`flex gap-4`}>
                      <div className={`flex-shrink-0 w-8 h-8 bg-[#FF5400]/10 rounded-full 
                        flex items-center justify-center text-[#FF5400] font-semibold`}>
                        3
                      </div>
                      <div>
                        <p className="text-gray-600">Enter Business number and Account number below</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg`}>
                    <div>
                      <label className="text-sm text-gray-600 block mb-2">Business Number</label>
                      <div className={`flex items-center gap-3`}>
                        <span className={`text-2xl font-semibold text-gray-900`}>522533</span>
                        <button 
                          onClick={() => copyToClipboard('522533')}
                          className={`text-[#FF5400] hover:text-[#FF5400]/80 text-sm flex items-center gap-1`}
                        >
                          <i className="fas fa-copy"></i>
                          Copy
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-2">Account Number</label>
                      <div className={`flex items-center gap-3`}>
                        <span className={`text-2xl font-semibold text-gray-900`}>7934479</span>
                        <button 
                          onClick={() => copyToClipboard('7934479')}
                          className={`text-[#FF5400] hover:text-[#FF5400]/80 text-sm flex items-center gap-1`}
                        >
                          <i className="fas fa-copy"></i>
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Confirmation */}
                  <div className={`mt-8 p-6 bg-[#FF5400]/5 rounded-lg border border-[#FF5400]/10`}>
                    <div className={`flex items-start gap-4`}>
                      <div className={`p-2 bg-[#FF5400]/10 rounded-lg mt-1`}>
                        <i className="fas fa-info-circle text-[#FF5400]"></i>
                      </div>
                      <div>
                        <h4 className={`font-semibold text-gray-900 mb-2`}>Share Your Transaction</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          After making your payment, please share the M-PESA transaction message with us on WhatsApp 
                          <a 
                            href="https://wa.me/254741590670" 
                            className={`text-[#FF5400] hover:text-[#FF5400]/80 font-medium ml-1`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            (+254 741 590 670)
                          </a>. 
                          This will help us confirm your payment and begin your project immediately.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Note */}
                  <p className="text-sm text-gray-500 mt-6 text-center">
                    Once payment is complete, you will receive a confirmation message from M-PESA
                  </p>
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