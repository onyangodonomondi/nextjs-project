'use client';

import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import PortfolioGallery from './PortfolioGallery';

export default function ClientPortfolioSection() {
  // Initialize with empty array as default
  const [categories, setCategories] = useState<string[]>(['all']);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        
        // Fetch categories from API
        const response = await fetch('/api/portfolio/categories');
        
        if (!response.ok) {
          // If the categories API fails, try to extract them from the portfolio items
          const portfolioResponse = await fetch('/api/portfolio');
          if (!portfolioResponse.ok) {
            throw new Error('Failed to fetch portfolio data');
          }
          
          const portfolioItems = await portfolioResponse.json();
          // Extract unique categories
          const uniqueCategories = [...new Set(portfolioItems.map(item => item.category))];
          // Ensure we have at least the "all" category
          setCategories(uniqueCategories.length > 0 ? ['all', ...uniqueCategories] : ['all']);
        } else {
          const data = await response.json();
          // Ensure we include 'all' category at the beginning
          const retrievedCategories = data.categories || [];
          setCategories(retrievedCategories.length > 0 ? ['all', ...retrievedCategories] : ['all']);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to hardcoded categories from portfolio folders we know exist
        setCategories(['all', 'cards', 'fliers', 'letterheads', 'logos', 'profiles']);
        setError('Error loading categories. Using default values.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Render error fallback with better error handling
  const ErrorFallback = () => (
    <div className="text-center py-10">
      <p className="text-red-500 mb-4">Something went wrong loading the portfolio.</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      {loading ? (
        <div className="py-10 text-center">
          <LoadingSpinner size="lg" color="primary" />
          <p className="mt-4 text-gray-500">Loading portfolio...</p>
        </div>
      ) : (
        <PortfolioGallery categories={categories} />
      )}
      
      {error && (
        <p className="text-center text-amber-500 mt-4">{error}</p>
      )}
    </ErrorBoundary>
  );
} 