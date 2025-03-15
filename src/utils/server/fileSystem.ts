import { readdirSync, existsSync, statSync } from 'fs';
import { join } from 'path';
import type { ImageItem } from '../getImages';

export function getImagesFromFS(dirPath: string): ImageItem[] {
  try {
    // Clean the path
    const cleanPath = dirPath.startsWith('/') ? dirPath.slice(1) : dirPath;
    const fullPath = join(process.cwd(), 'public', cleanPath);

    if (!existsSync(fullPath)) {
      console.warn(`Directory not found: ${fullPath}`);
      return [];
    }

    const files = readdirSync(fullPath);
    
    return files
      .filter(file => {
        const ext = file.toLowerCase();
        return (
          ext.endsWith('.jpg') ||
          ext.endsWith('.jpeg') ||
          ext.endsWith('.png') ||
          ext.endsWith('.webp')
        );
      })
      .map((file, index) => ({
        id: index + 1,
        src: `/${cleanPath}/${file}`,
        alt: file.split('.')[0].replace(/-/g, ' ')
      }));
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
} 