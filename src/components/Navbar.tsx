'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Capabilities', path: '/capabilities' },
  { label: 'Graphics', path: '/graphics' },
  { label: 'Web Development', path: '/web-development' },
  { label: 'VPS Solutions', path: '/vps-solutions' },
  { label: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update click outside handler to ignore dropdown clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isDropdownClick = target.closest('.dropdown-button') || target.closest('.dropdown-menu');
      
      if (isMenuOpen && !target.closest('.nav-menu') && !target.closest('.nav-toggle') && !isDropdownClick) {
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
    setActiveDropdown(null);
  };

  const toggleDropdown = (e: React.MouseEvent, label: string) => {
    e.stopPropagation(); // Prevent event bubbling
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const handleLinkClick = (hasChildren: boolean) => {
    // Only close menu if it's a regular link, not a dropdown
    if (!hasChildren) {
      closeMenu();
    }
  };

  return (
    <>
      <header 
        className={`fixed w-full top-0 z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'py-2 bg-white/80 backdrop-blur-lg shadow-lg' 
            : 'py-4 bg-white'
        }`}
      >
        <nav className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Mocky Digital"
              width={40}
              height={40}
              className="w-10"
            />
            <span className="ml-2 text-xl font-bold">MOCKY</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.path}
                  className="text-gray-700 hover:text-primary"
                  onClick={() => handleLinkClick(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[99] bg-white pt-20">
          <nav className="container mx-auto px-4 py-4">
            {menuItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.path}
                  className="block py-3 text-gray-700"
                  onClick={() => handleLinkClick(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
} 