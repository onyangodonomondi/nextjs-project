import { getPlaiceholder } from 'plaiceholder';
import fs from 'fs/promises';
import path from 'path';

export async function getBlurDataUrl(imagePath: string) {
  try {
    // Read the file from the public directory
    const file = await fs.readFile(path.join(process.cwd(), 'public', imagePath));
    
    // Get the base64 blur data
    const { base64 } = await getPlaiceholder(file);
    
    return base64;
  } catch (err) {
    console.error('Error generating blur data:', err);
    return null;
  }
}

export const imageLoader = ({ src, width, quality = 75 }) => {
  // Use Next.js image optimization
  if (src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }
  
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
};

export const getImageSizes = (breakpoint: string) => {
  switch (breakpoint) {
    case 'sm':
      return '(max-width: 640px) 100vw, 50vw';
    case 'md':
      return '(max-width: 768px) 50vw, 33vw';
    case 'lg':
      return '(max-width: 1024px) 33vw, 25vw';
    default:
      return '100vw';
  }
}; 