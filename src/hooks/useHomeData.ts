import { useState, useEffect } from 'react';
import { getTestimonials } from '@/utils/getTestimonials';
import { getPortfolioItems } from '@/utils/getPortfolioItems';

export function useHomeData() {
  const [testimonials, setTestimonials] = useState([]);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [testimonialsData, portfolioData] = await Promise.all([
          getTestimonials(),
          getPortfolioItems()
        ]);
        setTestimonials(testimonialsData);
        setPortfolioItems(portfolioData);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { testimonials, portfolioItems, isLoading };
} 