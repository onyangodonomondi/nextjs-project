import { cache } from 'react';

/**
 * Utility functions for fetching and processing images
 */

export interface ImageItem {
  id: number;
  src: string;
  alt: string;
  title?: string;
  category?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  size?: number;
  blurDataURL?: string;
}

/**
 * Fetch images from an API endpoint
 * @param path - The path to fetch images from
 * @returns Promise with an array of ImageItem objects
 */
export async function fetchImages(path: string): Promise<ImageItem[]> {
  try {
    const response = await fetch(`/api/images?path=${encodeURIComponent(path)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

/**
 * Get a subset of random items from an array
 * @param array - The array to get random items from
 * @param count - The number of items to get
 * @returns A new array with random items
 */
export function getRandomItems<T>(array: T[], count: number): T[] {
  if (!array || array.length === 0) return [];
  
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * Sort images by date
 * @param images - Array of images to sort
 * @param ascending - Sort direction (default: false - newest first)
 * @returns Sorted array of images
 */
export function sortImagesByDate(images: ImageItem[], ascending = false): ImageItem[] {
  return [...images].sort((a, b) => {
    if (!a.createdAt && !b.createdAt) return 0;
    if (!a.createdAt) return ascending ? -1 : 1;
    if (!b.createdAt) return ascending ? 1 : -1;
    
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

/**
 * Extract a category from a filename
 * @param filename - The filename to extract from
 * @returns The category as a string
 */
export function getCategoryFromFilename(filename: string): string {
  const categories: Record<string, string> = {
    logo: 'Branding',
    brand: 'Branding',
    website: 'Web Development',
    web: 'Web Development',
    flier: 'Print Design',
    print: 'Print Design',
    graphic: 'Graphic Design',
    poster: 'Print Design',
    card: 'Print Design',
  };
  
  const lowercaseFilename = filename.toLowerCase();
  
  for (const [keyword, category] of Object.entries(categories)) {
    if (lowercaseFilename.includes(keyword)) {
      return category;
    }
  }
  
  return 'Other';
}

export const getImagesFromDirectory = cache(async (path: string): Promise<ImageItem[]> => {
  try {
    const response = await fetch(`/api/images?path=${encodeURIComponent(path)}`, {
      next: { 
        revalidate: 60,
        tags: ['images', path]
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }

    const images = await response.json();

    // Validate the response data
    if (!Array.isArray(images)) {
      throw new Error('Invalid response format');
    }

    return images.map(img => ({
      ...img,
      size: Number(img.size) || 0,
      createdAt: img.createdAt || new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}); 