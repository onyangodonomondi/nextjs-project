'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function NotFound() {
  useEffect(() => {
    // Add any analytics tracking here
    console.log('404 page viewed');
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-secondary/5 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-bold text-primary mb-4">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-700 max-w-md mx-auto text-lg">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200"
            >
              <i className="fas fa-home mr-2"></i>
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-medium rounded-lg border-2 border-primary hover:bg-primary/5 transition-colors duration-200"
            >
              <i className="fas fa-envelope mr-2"></i>
              Contact Support
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              You might find these helpful:
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/graphics"
                className="text-primary hover:text-primary-dark transition-colors font-medium"
              >
                Graphics Gallery
              </Link>
              <Link 
                href="/capabilities"
                className="text-primary hover:text-primary-dark transition-colors font-medium"
              >
                Our Services
              </Link>
              <Link 
                href="/pricing"
                className="text-primary hover:text-primary-dark transition-colors font-medium"
              >
                Pricing Plans
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Optional: Fun Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <p className="text-base font-medium text-gray-900">
            Lost in digital space? Don't worry, even the best explorers take wrong turns! 🚀
          </p>
        </motion.div>
      </div>
    </main>
  );
} 