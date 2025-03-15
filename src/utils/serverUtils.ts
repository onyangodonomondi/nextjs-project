// Mark as server component
'use server';

// Use node:fs instead of fs directly
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import type { ImageItem } from './getImages';

// Use the node namespace to make it clear we're using Node.js APIs
export async function getImagesFromServer(dirPath: string): Promise<ImageItem[]> {
  try {
    // Normalize path for consistency
    const normalizedPath = dirPath.startsWith('/') ? dirPath.slice(1) : dirPath;
    const publicDir = join(process.cwd(), 'public');
    const fullPath = join(publicDir, normalizedPath);
    
    // Check if directory exists
    try {
      await stat(fullPath);
    } catch (error) {
      console.warn(`Directory not found: ${fullPath}`);
      return [];
    }
    
    // Get directory contents
    const files = await readdir(fullPath);
    
    // Get stats for each file and build ImageItem objects
    const images: ImageItem[] = [];
    
    for (const file of files) {
      if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(file)) continue;
      
      try {
        const filePath = join(fullPath, file);
        const fileStats = await stat(filePath);
        
        // Determine category from path
        let category = 'uncategorized';
        if (normalizedPath.includes('logos')) category = 'logo';
        if (normalizedPath.includes('branding')) category = 'graphics';
        if (normalizedPath.includes('fliers')) category = 'flier';
        if (normalizedPath.includes('websites')) category = 'website';
        
        images.push({
          id: images.length + 1,
          src: `/${normalizedPath}/${file}`.replace(/\\/g, '/'),
          alt: file.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '').replace(/-/g, ' '),
          size: fileStats.size,
          createdAt: fileStats.birthtime.toISOString(),
          category
        });
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
      }
    }
    
    return images;
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

// Add getTestimonialsData function for server-side testimonial fetching
export async function getTestimonialsData() {
  try {
    const dataPath = join(process.cwd(), 'src', 'data', 'testimonials.json');
    const fileContents = await readFile(dataPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading testimonials data:', error);
    return [];
  }
} 