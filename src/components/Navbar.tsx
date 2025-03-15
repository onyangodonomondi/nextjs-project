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
    ]
  },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/logos', label: 'Logos' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef(null);
  
  // Handle scroll events ONLY after component is mounted
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      
      // Apply styles directly to the DOM element after hydration
      if (headerRef.current) {
        const header = headerRef.current as HTMLElement;
        if (isScrolled) {
          header.style.padding = '0.5rem 0';
          header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
          header.classList.add('navbar-scrolled');
        } else {
          header.style.padding = '1.5rem 0';
          header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
          header.classList.remove('navbar-scrolled');
        }
      }
    };
    
    // Close dropdown when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdown && !((e.target as Element).closest('.dropdown-toggle'))) {
        setOpenDropdown(null);
      }
    };
    
    // Only add the scroll listener after component is mounted
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClickOutside);
    
    // Initial check (important: only run after mounting)
    setTimeout(handleScroll, 0);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openDropdown]);
  
  // Toggle dropdown menu
  const toggleDropdown = (label: string) => {
    if (openDropdown === label) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(label);
    }
  };

  // CRITICAL: Use the EXACT same static className on both server and client - no computed values
  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow py-6"
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
                    className="font-medium text-gray-800 hover:text-accent transition-colors px-2 flex items-center"
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
                          href={item.href}
                          prefetch={false}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-accent"
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
                  href={link.href}
                  prefetch={false}
                  className="font-medium text-gray-800 hover:text-accent transition-colors px-2"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link 
              href="/contact" 
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded transition-colors ml-2"
              prefetch={false}
            >
              Get Quote
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden z-10 p-2 focus:outline-none"
            onClick={() => mounted && setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-gray-800" />
            <div className="w-6 h-0.5 bg-gray-800 my-1.5" />
            <div className="w-6 h-0.5 bg-gray-800" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {mounted && isOpen ? (
        <div className="fixed inset-0 bg-white z-40 lg:hidden">
          <div className="flex items-center justify-center h-full">
            <nav className="flex flex-col items-center space-y-6">
              {navLinks.map((link) => 
                link.dropdown ? (
                  <div key={link.label} className="flex flex-col items-center">
                    <span className="text-gray-800 text-xl font-medium mb-2">
                      {link.label}
                    </span>
                    <div className="flex flex-col items-center space-y-4">
                      {link.items?.map((item) => (
                        <Link 
                          key={item.href} 
                          href={item.href}
                          prefetch={false}
                          className="text-gray-600 text-lg hover:text-accent transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    prefetch={false}
                    className="text-gray-800 text-xl font-medium hover:text-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link 
                href="/contact" 
                className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full text-lg font-medium transition-colors mt-4"
                onClick={() => setIsOpen(false)}
                prefetch={false}
              >
                Get Quote
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
} 