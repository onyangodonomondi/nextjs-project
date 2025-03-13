'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Graphics', path: '/graphics' },
  { label: 'Web Development', path: '/web-development' },
  { label: 'Social Media', path: '/social-media' },
  { 
    label: 'More',
    children: [
      { label: 'VPS Solutions', path: '/vps-solutions' },
      { label: 'Portfolio', path: '/portfolio' },
      { label: 'Pricing', path: '/pricing' }
    ]
  },
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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
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
                  {item.children ? (
                    <>
                      <button
                        className="flex items-center space-x-1 text-gray-700 hover:text-primary"
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      >
                        <span>{item.label}</span>
                        <i className="fas fa-chevron-down text-xs"></i>
                      </button>
                      <div className={`absolute top-full left-0 w-48 py-2 bg-white rounded-lg shadow-lg transition-all transform origin-top ${
                        activeDropdown === item.label ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                      }`}>
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.path}
                      className="text-gray-700 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 z-[100]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[99] bg-[#0A2647] pt-20">
          {/* Close Button */}
          <div className="absolute top-6 right-4">
            <button
              className="p-2 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>

          <nav className="container mx-auto px-4 py-4">
            {menuItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full py-4 text-white text-lg"
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    >
                      <span>{item.label}</span>
                      <i className={`fas fa-chevron-${activeDropdown === item.label ? 'up' : 'down'}`}></i>
                    </button>
                    {activeDropdown === item.label && (
                      <div className="pl-6 space-y-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.path}
                            className="block py-3 text-gray-200 hover:text-white"
                            onClick={() => {
                              setIsMenuOpen(false);
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className="block py-4 text-white text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
} 