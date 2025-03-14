import { readdirSync, existsSync, statSync } from 'fs';
import { join } from 'path';
import type { ImageItem } from '../getImages';

export function getImagesFromFS(path: string): ImageItem[] {
  try {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const directory = join(process.cwd(), 'public', cleanPath);
    
    if (!existsSync(directory)) {
      console.log(`Directory not found: ${directory}`);
      return [];
    }

    const files = readdirSync(directory);

    return files
      .filter(file => {
        const filePath = join(directory, file);
        return (
          /\.(jpg|jpeg|png|gif|webp)$/i.test(file) && 
          existsSync(filePath) && 
          statSync(filePath).isFile()
        );
      })
      .map((file, index) => {
        // Always use relative paths starting with /
        const imagePath = `/${cleanPath}/${file}`;
        return {
          id: index + 1,
          src: imagePath,
          alt: file.split('.')[0].replace(/-/g, ' '),
        };
      });
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
} 