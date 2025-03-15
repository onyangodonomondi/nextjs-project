import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Cache for categories
let cachedCategories: string[] | null = null;
let cacheTime = 0;
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

export async function GET() {
  try {
    // Check if we have a valid cache
    const now = Date.now();
    if (cachedCategories && now - cacheTime < CACHE_DURATION) {
      console.log('Using cached categories');
      return NextResponse.json({ categories: cachedCategories }, {
        headers: {
          'Cache-Control': 'public, max-age=600, s-maxage=1200',
        },
      });
    }

    console.log('Fetching categories from filesystem');
    
    // Define the base portfolio directory
    const portfolioDir = path.join(process.cwd(), 'public', 'images', 'portfolio');
    
    // Get all subdirectories in the portfolio directory
    const dirs = await fs.readdir(portfolioDir, { withFileTypes: true });
    const categories = dirs
      .filter(dir => dir.isDirectory())
      .map(dir => dir.name.toLowerCase());
    
    // Update cache
    cachedCategories = categories;
    cacheTime = now;
    
    // Return the categories with caching headers
    return NextResponse.json({ categories }, {
      headers: {
        'Cache-Control': 'public, max-age=600, s-maxage=1200',
      },
    });
  } catch (error) {
    console.error('Error in categories API route:', error);
    
    // Fallback to hardcoded categories
    const fallbackCategories = ['cards', 'fliers', 'letterheads', 'logos', 'profiles'];
    
    return NextResponse.json(
      { 
        categories: fallbackCategories,
        error: 'Could not fetch from filesystem, using fallback categories'
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=60, s-maxage=300',
        },
      }
    );
  }
} 