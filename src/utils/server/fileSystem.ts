import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { ImageItem } from '../getImages';

export function getImagesFromFS(path: string): ImageItem[] {
  try {
    // Remove leading slash and clean path
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const directory = join(process.cwd(), 'public', cleanPath);
    
    if (!existsSync(directory)) {
      console.log(`Directory not found: ${directory}`);
      return [];
    }

    const files = readdirSync(directory);
    
    // Get base URL from environment or default to empty (relative path)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    
    return files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map((file, index) => ({
        id: index + 1,
        src: `${baseUrl}/${cleanPath}/${file}`,
        alt: file.split('.')[0].replace(/-/g, ' '),
      }));
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
} 