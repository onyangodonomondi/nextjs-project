import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2647] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-orange-500 font-semibold text-lg mb-4">Mocky Digital</h3>
            <p className="text-gray-300 text-sm mb-4">
              Professional Digital Agency offering Graphics Design, Web Development, and Digital Marketing services in Kenya.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-orange-500 font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/capabilities" className="text-gray-300 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors">
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
            <h3 className="text-orange-500 font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
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
            <h3 className="text-orange-500 font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <i className="fas fa-map-marker-alt mr-2"></i> Nairobi, Kenya
              </li>
              <li>
                <a href="tel:+254741590670" className="text-gray-300 hover:text-white transition-colors">
                  <i className="fas fa-phone mr-2"></i> +254 741 590 670
                </a>
              </li>
              <li>
                <a href="mailto:info@mockydigital.com" className="text-gray-300 hover:text-white transition-colors">
                  <i className="fas fa-envelope mr-2"></i> info@mockydigital.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Mocky Digital. All rights reserved.
            </p>
            <div className="flex gap-4">
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