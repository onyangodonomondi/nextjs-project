'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define navigation links outside component to prevent re-creation on render
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/logos', label: 'Logos' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Optimize scroll listener with useCallback and better throttling
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);
  
  useEffect(() => {
    // Initial check on mount
    handleScroll();
    
    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Style classes - precomputed to avoid recalculation
  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all ${
    scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;
  
  const linkClasses = scrolled 
    ? 'text-gray-800 hover:text-primary' 
    : 'text-white hover:text-primary-light';

  return (
    <header className={headerClasses}>
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
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Mocky Digital</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                prefetch={false}
                className={`font-medium transition ${linkClasses}`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contact" 
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded transition"
              prefetch={false}
            >
              Get Quote
            </Link>
          </nav>

          {/* Mobile Menu Button - simplified */}
          <button 
            className="lg:hidden z-10 p-2" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 transition ${
              isOpen ? 'rotate-45 translate-y-2 bg-white' : scrolled ? 'bg-gray-800' : 'bg-white'
            }`} />
            <div className={`w-6 h-0.5 my-1.5 transition ${
              isOpen ? 'opacity-0' : scrolled ? 'bg-gray-800' : 'bg-white'
            }`} />
            <div className={`w-6 h-0.5 transition ${
              isOpen ? '-rotate-45 -translate-y-2 bg-white' : scrolled ? 'bg-gray-800' : 'bg-white'
            }`} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay - simplified */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-40 lg:hidden">
          <div className="flex items-center justify-center h-full">
            <nav className="flex flex-col items-center space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  prefetch={false}
                  className="text-white text-xl font-medium hover:text-primary transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/contact" 
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full text-lg font-medium transition mt-4"
                onClick={() => setIsOpen(false)}
                prefetch={false}
              >
                Get Quote
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 