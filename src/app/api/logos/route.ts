import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Cache the logos in memory to avoid repeated filesystem operations
let cachedLogos = null;
let lastCacheTime = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

// Function to get logos from the new directory structure
async function getLogos() {
  // Check if we have cached logos and if the cache is still valid
  const now = Date.now();
  if (cachedLogos && (now - lastCacheTime < CACHE_TTL)) {
    console.log('Using cached logos');
    return cachedLogos;
  }

  try {
    // Try the new path first
    const newLogoDirectory = path.join(process.cwd(), 'public', 'images', 'portfolio', 'logos');
    console.log(`Looking for logos in: ${newLogoDirectory}`);
    
    // Check if new directory exists
    if (fs.existsSync(newLogoDirectory)) {
      // Read files from the directory
      const fileNames = fs.readdirSync(newLogoDirectory);
      
      // Filter for image files only
      const imageFiles = fileNames.filter(file => 
        /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
      );
      console.log(`Found ${imageFiles.length} image files`);
      
      // Create properly structured logo objects
      const logoMap = new Map(); // Use Map to deduplicate
      
      imageFiles.forEach((fileName, index) => {
        const title = fileName.replace(/\.(jpg|jpeg|png|gif|webp|svg)$/i, '').replace(/-/g, ' ');
        const logoItem = {
          id: index + 1,
          title: title,
          src: `/images/portfolio/logos/${fileName}`,
          alt: title,
          imageUrl: `/images/portfolio/logos/${fileName}`
        };
        
        // Use file name as key to deduplicate
        logoMap.set(fileName, logoItem);
      });
      
      // Convert Map values to array
      const logos = Array.from(logoMap.values());
      
      // Cache the results
      cachedLogos = logos;
      lastCacheTime = now;
      
      return logos;
    }
    
    // Return demo data if no real logos found
    const demoLogos = [
      {
        id: 1,
        title: 'Demo Logo 1',
        src: '/images/portfolio/logo-types/wordmark.png',
        alt: 'Demo Logo 1',
        imageUrl: '/images/portfolio/logo-types/wordmark.png'
      },
      {
        id: 2,
        title: 'Demo Logo 2',
        src: '/images/portfolio/logo-types/lettermark.png',
        alt: 'Demo Logo 2',
        imageUrl: '/images/portfolio/logo-types/lettermark.png'
      },
      {
        id: 3,
        title: 'Demo Logo 3',
        src: '/images/portfolio/logo-types/symbol.png',
        alt: 'Demo Logo 3',
        imageUrl: '/images/portfolio/logo-types/symbol.png'
      },
      {
        id: 4,
        title: 'Demo Logo 4',
        src: '/images/portfolio/logo-types/combination.png',
        alt: 'Demo Logo 4',
        imageUrl: '/images/portfolio/logo-types/combination.png'
      }
    ];
    
    // Cache the results
    cachedLogos = demoLogos;
    lastCacheTime = now;
    
    return demoLogos;
  } catch (error) {
    console.error('Error reading logo directory:', error);
    return [];
  }
}

export async function GET() {
  try {
    console.log('Getting logos');
    const logos = await getLogos();
    
    console.log(`Returning ${logos.length} logos`);
    return NextResponse.json(logos, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=1800',
        'Vary': 'Accept-Encoding',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch logos', details: error instanceof Error ? error.message : String(error) },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Content-Type': 'application/json',
        }
      }
    );
  }
} 