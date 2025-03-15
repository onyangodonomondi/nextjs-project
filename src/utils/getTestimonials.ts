import { cache } from 'react';

export interface TestimonialType {
  id: number;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  image: string;
}

export const getTestimonials = cache(async (): Promise<TestimonialType[]> => {
  try {
    const response = await fetch('/api/testimonials', { 
      next: { revalidate: 60 } 
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch testimonials: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.error('Invalid testimonials data format');
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}); 