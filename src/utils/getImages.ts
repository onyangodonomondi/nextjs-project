import { getImagesFromFS } from './serverUtils';

export interface ImageItem {
  id: number;
  src: string;
  alt: string;
  category?: string;
  title?: string;
  description?: string;
}

export async function getImagesFromDirectory(path: string): Promise<ImageItem[]> {
  try {
    const response = await fetch(`/api/images?path=${encodeURIComponent(path)}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }

    const images = await response.json();
    return images;
  } catch (error) {
    console.error('Error getting images:', error);
    return [];
  }
} 