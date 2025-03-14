import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { ImageItem } from './getImages';

export function getImagesFromFS(path: string): ImageItem[] {
  const directory = join(process.cwd(), 'public', path);
  
  if (!existsSync(directory)) {
    console.log(`Directory not found: ${directory}`);
    return [];
  }

  const files = readdirSync(directory);
  return files
    .filter((file: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    .map((file: string, index: number): ImageItem => ({
      id: index + 1,
      src: `${path}/${file}`,
      alt: file.split('.')[0].replace(/-/g, ' '),
    }));
} 