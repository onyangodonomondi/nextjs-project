'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define navigation links outside component to prevent re-creation on render
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/web-development', label: 'Web Development' },
  { href: '/graphics', label: 'Graphics' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/logos', label: 'Logos' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
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
    
    // Only add the scroll listener after component is mounted
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check (important: only run after mounting)
    setTimeout(handleScroll, 0);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // CRITICAL: Use the EXACT same static className on both server and client - no computed values
  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow py-6"
      style={{ transition: 'padding 0.3s ease, box-shadow 0.3s ease' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="Mocky Digital Logo"
              width={40}
              height={40}
              className="mr-3"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-900">
              Mocky Digital
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                prefetch={false}
                className="font-medium text-gray-800 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contact" 
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded transition-colors"
              prefetch={false}
            >
              Get Quote
            </Link>
          </nav>

          {/* Mobile Menu Button - Simple version without conditional classes */}
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

      {/* Mobile Navigation Overlay - Only render on client side after hydration */}
      {mounted && isOpen ? (
        <div className="fixed inset-0 bg-white z-40 lg:hidden">
          <div className="flex items-center justify-center h-full">
            <nav className="flex flex-col items-center space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  prefetch={false}
                  className="text-gray-800 text-xl font-medium hover:text-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
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