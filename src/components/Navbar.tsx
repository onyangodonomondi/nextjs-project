'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define navigation links outside component to prevent re-creation on render
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  {
    label: 'Services',
    dropdown: true,
    items: [
      { href: '/services', label: 'All Services' },
      { href: '/web-development', label: 'Web Development' },
      { href: '/graphics', label: 'Graphics' },
      { href: '/vps-solutions', label: 'VPS Solutions' },
    ]
  },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/process', label: 'Process' },
  { href: '/logos', label: 'Logos' },
  { href: '/contact', label: 'Contact' },
];

// CSS for animations
const animationCSS = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease forwards;
}

.animate-slide-down {
  animation: slideDown 0.3s ease forwards;
}
`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
      
      // Apply styles directly to the DOM element
      if (headerRef.current) {
        const header = headerRef.current;
        if (isScrolled) {
          header.style.padding = '0.5rem 0';
          header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
          header.style.padding = '1.5rem 0';
          header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
      }
    };
    
    // Close desktop dropdown when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdown && !((e.target as Element).closest('.dropdown-toggle'))) {
        setOpenDropdown(null);
      }
      
      // Close mobile menu when clicking outside
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node) && 
          !(e.target as Element).closest('.mobile-toggle')) {
        setIsOpen(false);
      }
    };
    
    // ESC key to close mobile menu
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    // Initial check
    handleScroll();
    
    // Lock body scroll when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [openDropdown, isOpen]);

  // Component mount effect - add CSS animation styles
  useEffect(() => {
    // Add CSS animations to the document head
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = animationCSS;
      style.id = 'navbar-animations';
      
      // Only add if not already present
      if (!document.getElementById('navbar-animations')) {
        document.head.appendChild(style);
      }
      
      return () => {
        // Clean up on unmount
        const existingStyle = document.getElementById('navbar-animations');
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, []);
  
  // Toggle desktop dropdown menu
  const toggleDropdown = (label: string) => {
    if (openDropdown === label) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(label);
    }
  };

  // Toggle mobile dropdown
  const toggleMobileDropdown = (label: string) => {
    if (mobileDropdown === label) {
      setMobileDropdown(null);
    } else {
      setMobileDropdown(label);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    // Reset mobile dropdown state when closing menu
    if (isOpen) {
      setMobileDropdown(null);
    }
  };

  // CRITICAL: Use the EXACT same static className on both server and client - no computed values
  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 bg-white shadow py-6 ${scrolled ? 'navbar-scrolled' : ''}`}
        style={{ transition: 'padding 0.3s ease, box-shadow 0.3s ease' }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="Mocky Digital Logo"
                width={36}
                height={36}
                className="mr-2"
              />
              <span className="self-center text-lg font-semibold whitespace-nowrap text-gray-900">
                Mocky Digital
              </span>
            </Link>

            {/* Desktop Navigation with Dropdown */}
            <nav className="hidden lg:flex items-center space-x-4">
              {navLinks.map((link) => 
                link.dropdown ? (
                  <div key={link.label} className="relative dropdown-toggle">
                    <button 
                      className="font-medium text-gray-800 hover:text-blue-500 transition-colors px-2 flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(link.label);
                      }}
                    >
                      {link.label}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 ml-1 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {openDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-50">
                        {link.items?.map((item) => (
                          <Link 
                            key={item.href} 
                            href={item.href || '#'}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    key={link.href} 
                    href={link.href || '#'}
                    className="font-medium text-gray-800 hover:text-blue-500 transition-colors px-2"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <a 
                href="mailto:info@mockydigital.com" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors ml-2"
              >
                Get Quote
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden mobile-toggle z-50 p-2 rounded-md focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <div className="relative w-6 h-5">
                <span 
                  className={`absolute w-6 h-0.5 bg-gray-800 transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 top-2' : 'top-0'
                  }`}
                ></span>
                <span 
                  className={`absolute w-6 h-0.5 bg-gray-800 top-2 transition-all duration-150 ease-in-out ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span 
                  className={`absolute w-6 h-0.5 bg-gray-800 transform transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 top-2' : 'top-4'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Slide-in from right with backdrop */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isOpen ? 'bg-black/50 backdrop-blur-sm visible' : 'bg-black/0 invisible pointer-events-none'
        }`}
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
      >
        {/* Menu Content - Slide in panel */}
        <div 
          ref={menuRef}
          className={`fixed top-0 right-0 h-full w-[300px] max-w-[80vw] bg-white shadow-xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Header */}
          <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
            <div className="flex items-center justify-between p-4">
              <Link 
                href="/" 
                className="flex items-center space-x-2" 
                onClick={() => setIsOpen(false)}
              >
                <Image 
                  src="/images/logo.png" 
                  alt="Mocky Digital Logo"
                  width={28} 
                  height={28}
                />
                <span className="font-semibold text-gray-900">Mocky Digital</span>
              </Link>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Menu Navigation */}
          <nav className="py-3 px-4">
            {navLinks.map((link) => (
              <div key={link.label} className="mb-1">
                {link.dropdown ? (
                  <div>
                    <button 
                      className="flex items-center justify-between w-full p-3 text-left rounded-lg hover:bg-gray-50 focus:outline-none"
                      onClick={() => toggleMobileDropdown(link.label)}
                      aria-expanded={mobileDropdown === link.label}
                    >
                      <span className="font-medium text-gray-800">{link.label}</span>
                      <svg 
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                          mobileDropdown === link.label ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Mobile dropdown content */}
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        mobileDropdown === link.label 
                          ? 'max-h-96 opacity-100 mt-1'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="ml-4 pl-2 border-l-2 border-blue-100 space-y-1 py-1">
                        {link.items?.map((item) => (
                          <Link 
                            key={item.href} 
                            href={item.href || '#'} 
                            className="block p-2 text-gray-600 hover:text-blue-500 rounded-md"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 opacity-75"></span>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link 
                    href={link.href || '#'} 
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="font-medium text-gray-800">{link.label}</span>
                  </Link>
                )}
              </div>
            ))}
            
            {/* Call-to-action button */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <a 
                href="mailto:info@mockydigital.com"
                className="flex items-center justify-center w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                <span className="font-medium">Get a Quote</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            
            {/* Contact info */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Need help? Contact us:</p>
              <div className="flex justify-center mt-2 space-x-3">
                <a 
                  href="tel:+254741590670" 
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Call us"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
                <a 
                  href="https://wa.me/254741590670" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
                <a 
                  href="mailto:info@mockydigital.com" 
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Email us"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
} 