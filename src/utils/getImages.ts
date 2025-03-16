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
    // Parse the path and any query parameters (like timestamps for cache busting)
    let basePath = path;
    let queryParams = '';
    
    // Properly split path from query string to prevent directory lookup errors
    if (path.includes('?')) {
      [basePath, queryParams] = path.split('?');
    }
    
    // Clean the path to make sure it's formatted correctly
    basePath = basePath.trim();
    
    // Parse existing query parameters
    const searchParams = new URLSearchParams(queryParams || '');
    
    // Add a timestamp parameter for cache busting if not already present
    if (!searchParams.has('t')) {
      searchParams.set('t', Date.now().toString());
    }
    
    // Get all parameters from the URL
    const timestamp = searchParams.get('t') || Date.now().toString();
    const optimized = searchParams.get('optimized') === 'true';
    
    // Construct the API URL with all parameters
    const cleanPath = encodeURIComponent(basePath);
    const apiUrl = `/api/images?path=${cleanPath}&t=${timestamp}${optimized ? '&optimized=true' : ''}`;
    
    console.log(`Fetching images from: ${apiUrl} ${optimized ? '(optimized mode)' : ''}`);
    
    const response = await fetch(apiUrl, {
      next: { 
        revalidate: 0 // Don't cache
      },
      cache: 'no-store', // Prevent browser caching
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

    if (!response.ok) {
      console.error(`Failed to fetch images from ${basePath}: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();

    // Validate the response data
    if (!Array.isArray(data)) {
      console.error(`Invalid response format from ${basePath}, expected array but got:`, typeof data);
      return [];
    }

    // Log the number of images found
    console.log(`Found ${data.length} images in ${basePath}`);

    // Ensure all properties are present and correctly typed
    return data.map(img => ({
      id: Number(img.id) || Math.floor(Math.random() * 100000),
      src: img.src || '',
      alt: img.alt || 'Image',
      title: img.title || img.alt || 'Image',
      category: img.category || '',
      size: Number(img.size) || 0,
      createdAt: img.createdAt || new Date().toISOString(),
      updatedAt: img.updatedAt || img.createdAt || new Date().toISOString(),
      blurDataURL: img.blurDataURL || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}); 