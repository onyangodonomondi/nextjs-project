/**
 * Helper utilities for static generation
 */
import fs from 'fs';
import path from 'path';

/**
 * Gets image paths from multiple possible locations
 */
export function getImagePathsForStaticBuild(type: 'logos' | 'projects' = 'logos'): string[] {
  // Define all possible places where images might be
  const basePaths = [
    path.join(process.cwd(), 'public', 'images', 'portfolio', type),
    path.join(process.cwd(), 'public', 'images', type),
  ];
  
  // Try paths in order until we find one that exists
  for (const basePath of basePaths) {
    try {
      if (fs.existsSync(basePath)) {
        const files = fs.readdirSync(basePath);
        const imagePaths = files
          .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
          .map(file => `/images/${basePath.includes('portfolio') ? 'portfolio/' : ''}${type}/${file}`);
        
        if (imagePaths.length > 0) {
          return imagePaths;
        }
      }
    } catch (err) {
      console.warn(`Warning: Could not read directory ${basePath}`);
    }
  }
  
  // If no images found, return placeholders
  return ['/images/placeholder.jpg'];
}

// Add this function to handle missing directories during build
export function ensureBuildDirectories() {
  const requiredDirs = [
    path.join(process.cwd(), 'public', 'images', 'logos'),
    path.join(process.cwd(), 'public', 'images', 'portfolio', 'logos')
  ];
  
  for (const dir of requiredDirs) {
    try {
      if (!fs.existsSync(dir)) {
        console.log(`Creating required directory: ${dir}`);
        fs.mkdirSync(dir, { recursive: true });
      }
    } catch (err) {
      console.warn(`Warning: Could not create directory ${dir}`);
    }
  }
}

// Call this at the top of the file
if (process.env.NODE_ENV === 'production') {
  ensureBuildDirectories();
} 