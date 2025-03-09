import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Mocky Digital</h3>
            <p className="text-gray-300 mb-6">
              Professional Digital Agency offering Graphics Design, Web Development, and Digital Marketing services in Kenya.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/mockydigital" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/mockydigital" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com/mockydigital" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com/company/mockydigital" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/graphics" className="text-gray-300 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/graphics" className="text-gray-300 hover:text-white transition-colors">
                  Graphics Design
                </Link>
              </li>
              <li>
                <Link href="/web-development" className="text-gray-300 hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/social-media" className="text-gray-300 hover:text-white transition-colors">
                  Social Media
                </Link>
              </li>
              <li>
                <Link href="/branding" className="text-gray-300 hover:text-white transition-colors">
                  Branding
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt mt-1"></i>
                <span className="text-gray-300">Nairobi, Kenya</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-phone"></i>
                <a href="tel:+254741590670" className="text-gray-300 hover:text-white transition-colors">
                  +254 741 590 670
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-envelope"></i>
                <a href="mailto:info@mockydigital.com" className="text-gray-300 hover:text-white transition-colors">
                  info@mockydigital.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Mocky Digital. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 