import { cache } from 'react';

export interface ImageItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  size: number;
  createdAt: string;
  title?: string;
  description?: string;
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