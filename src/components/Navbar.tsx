'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Capabilities', path: '/capabilities' },
  { label: 'Portfolio', path: '/graphics' },
  { 
    label: 'Pages',
    children: [
      { label: 'Logo Design', path: '/logos', icon: 'fa-pen-nib' },
      { label: 'Web Development', path: '/web-development', icon: 'fa-code' },
      { label: 'Social Media', path: '/social-media', icon: 'fa-share-nodes' },
    ]
  },
  { label: 'Branding', path: '/branding' },
  { label: 'Pricing', path: '/pricing' },
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
          <Link 
            href="/" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={closeMenu}
          >
            <div className="relative w-10 h-10">
              <Image
                src="/images/logo.png"
                alt="Mocky Digital Logo"
                width={40}
                height={40}
                className="rounded-lg"
                priority
              />
            </div>
            <span className="text-primary font-bold text-xl tracking-tight">MOCKY</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {menuItems.map((item) => (
                <li key={item.label} className="relative group">
                  {item.children ? (
                    <>
                      <button
                        onClick={(e) => toggleDropdown(e, item.label)}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-50 transition-all"
                      >
                        {item.label}
                        <i className="fas fa-chevron-down text-xs transition-transform group-hover:rotate-180"></i>
                      </button>
                      <ul className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.path}
                              onClick={() => handleLinkClick(false)}
                              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                            >
                              <i className={`fas ${child.icon} w-5`}></i>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={() => handleLinkClick(false)}
                      className="block px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-50 transition-all"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* Mobile Navigation Menu */}
          <nav 
            className={`lg:hidden fixed inset-y-0 right-0 transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div 
              className={`w-[280px] h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
              style={{
                backgroundColor: 'white', // Explicit background color
                minHeight: '100vh' // Ensure full height
              }}
            >
              {/* Menu Content */}
              <div className="p-6">
                <ul className="space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.label}>
                      {item.children ? (
                        <div>
                          <button
                            onClick={(e) => toggleDropdown(e, item.label)}
                            className="dropdown-button flex items-center justify-between w-full p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors bg-white"
                          >
                            {item.label}
                            <i className={`fas fa-chevron-down text-xs transition-transform ${
                              activeDropdown === item.label ? 'rotate-180' : ''
                            }`}></i>
                          </button>
                          {activeDropdown === item.label && (
                            <ul className="dropdown-menu mt-1 ml-4 border-l-2 border-gray-100 space-y-1 bg-white">
                              {item.children.map((child) => (
                                <li key={child.label}>
                                  <Link
                                    href={child.path}
                                    onClick={() => handleLinkClick(false)}
                                    className="flex items-center gap-3 p-3 text-gray-600 hover:text-primary transition-colors bg-white"
                                  >
                                    <i className={`fas ${child.icon} w-5`}></i>
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.path}
                          onClick={() => handleLinkClick(false)}
                          className="block p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors bg-white"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
} 