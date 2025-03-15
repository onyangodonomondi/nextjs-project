import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Cache for portfolio items
let cachedPortfolioItems: any[] | null = null;
let cacheTime = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

// Helper function to get name from path
const getNameFromPath = (filePath: string): string => {
  const fileName = path.basename(filePath, path.extname(filePath));
  return fileName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Function to get supported image files
const isImageFile = (filename: string): boolean => {
  const ext = path.extname(filename).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext);
};

export async function GET() {
  try {
    // Check if we have a valid cache
    const now = Date.now();
    if (cachedPortfolioItems && now - cacheTime < CACHE_DURATION) {
      console.log('Using cached portfolio items');
      return NextResponse.json(cachedPortfolioItems, {
        headers: {
          'Cache-Control': 'public, max-age=300, s-maxage=600',
        },
      });
    }

    console.log('Fetching portfolio items from filesystem');
    
    // Define the base portfolio directory
    const portfolioDir = path.join(process.cwd(), 'public', 'images', 'portfolio');
    const portfolioItems = [];
    
    // Get all subdirectories in the portfolio directory
    const dirs = await fs.readdir(portfolioDir, { withFileTypes: true });
    const categoryDirs = dirs.filter(dir => dir.isDirectory());
    
    // Process each category directory
    for (const categoryDir of categoryDirs) {
      const categoryPath = path.join(portfolioDir, categoryDir.name);
      const categoryName = categoryDir.name.toLowerCase();
      
      try {
        // Read files in the category directory
        const files = await fs.readdir(categoryPath);
        const imageFiles = files.filter(isImageFile);
        
        // Create portfolio items for each image
        for (const file of imageFiles) {
          const imagePath = path.join('images', 'portfolio', categoryName, file);
          portfolioItems.push({
            src: `/${imagePath}`,
            alt: getNameFromPath(file),
            category: categoryName,
          });
        }
      } catch (error) {
        console.error(`Error reading directory ${categoryPath}:`, error);
      }
    }
    
    // Update cache
    cachedPortfolioItems = portfolioItems;
    cacheTime = now;
    
    // Return the portfolio items with caching headers
    return NextResponse.json(portfolioItems, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=600',
      },
    });
  } catch (error) {
    console.error('Error in portfolio API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio items' },
      { status: 500 }
    );
  }
} 