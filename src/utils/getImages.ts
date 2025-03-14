import { getImagesFromFS } from './serverUtils';

export interface ImageItem {
  id: number;
  src: string;
  alt: string;
  category?: string;
}

export async function getImagesFromDirectory(path: string): Promise<ImageItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/images?path=${encodeURIComponent(path)}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }

    const images = await response.json();
    return images.map((img: ImageItem) => ({
      ...img,
      src: img.src.startsWith('/') ? img.src : `/${img.src}`
    }));
  } catch (error) {
    console.error('Error getting images:', error);
    return [];
  }
} 