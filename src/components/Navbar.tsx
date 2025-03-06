'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.nav-menu') && !target.closest('.nav-toggle')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`header fixed w-full top-0 z-50 bg-white shadow-sm transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <nav className="navbar container mx-auto px-4 flex justify-between items-center relative">
          <div className="logo flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
              <div className="relative w-10 h-10">
                <Image
                  className="rounded-lg"
                  src="/images/logo.png"
                  alt="Mocky Digital Logo"
                  width={40}
                  height={40}
                  priority
                />
              </div>
              <span className="text-primary font-bold text-xl">MOCKY</span>
            </Link>
          </div>

          <button 
            className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} 
            aria-label="Toggle navigation"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <span className="hamburger"></span>
          </button>

          <div className={`nav-menu-wrapper ${isMenuOpen ? 'active' : ''}`}>
            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <li><Link href="/" onClick={closeMenu}>Home</Link></li>
              <li><Link href="/graphics" onClick={closeMenu}>Graphics Design</Link></li>
              <li><Link href="/logos" onClick={closeMenu}>Logo Design</Link></li>
              <li><Link href="/web-development" onClick={closeMenu}>Web Development</Link></li>
              <li><Link href="/social-media" onClick={closeMenu}>Social Media</Link></li>
              <li><Link href="/branding" onClick={closeMenu}>Branding</Link></li>
              <li><Link href="/pricing" onClick={closeMenu}>Pricing</Link></li>
              <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
            </ul>
          </div>
        </nav>
      </header>
      
      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
} 