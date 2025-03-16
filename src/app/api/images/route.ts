import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join, extname } from 'path';
import * as path from 'path';

// Simple in-memory cache
const IMAGE_CACHE = new Map();
const CACHE_TIMESTAMPS = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

// Define the optimized image type for better type safety
interface OptimizedImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  size: number;
  createdAt: string;
}

// Define the full image type
interface FullImage extends OptimizedImage {
  title: string;
  updatedAt: string;
  width?: number;
  height?: number;
}

// Utility function to get image dimensions
async function getImageDimensions(filepath: string) {
  try {
    // For now, just return a placeholder
    return { width: 800, height: 600 };
    // In a real implementation, you'd use sharp or another library to get dimensions
  } catch (error) {
    console.error('Error getting image dimensions:', error);
    return { width: 0, height: 0 };
  }
}

// Check if a file is a valid image
function isValidImageFile(filename: string): boolean {
  const ext = extname(filename).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext);
}

export async function GET(request: NextRequest) {
  try {
    // Get path from query parameter
    const searchParams = request.nextUrl.searchParams;
    const imagePath = searchParams.get('path');
    const optimizedOnly = searchParams.get('optimized') === 'true'; // New param to get lighter payload
    const timestamp = searchParams.get('t'); // Get timestamp for cache busting
    const forceFresh = !!timestamp; // If timestamp is provided, force a fresh fetch
    
    if (!imagePath) {
      return NextResponse.json(
        { error: 'Missing path parameter' },
        { status: 400 }
      );
    }

    // Clean up the path parameter to remove any issues
    const cleanPath = imagePath.split('?')[0].trim();
    console.log(`Processing image request for path: ${cleanPath} (${forceFresh ? 'force fresh' : 'may use cache'}) (${optimizedOnly ? 'optimized payload' : 'full payload'})`);

    // Check if we have a valid cache entry (skip if cache busting is requested)
    const now = Date.now();
    const cacheKey = `${cleanPath}:${optimizedOnly ? 'optimized' : 'full'}`;
    const cacheTimestamp = CACHE_TIMESTAMPS.get(cacheKey);
    
    if (!forceFresh && cacheTimestamp && now - cacheTimestamp < CACHE_TTL && IMAGE_CACHE.has(cacheKey)) {
      console.log(`Using cached images for ${cleanPath} (${optimizedOnly ? 'optimized' : 'full'})`);
      return NextResponse.json(IMAGE_CACHE.get(cacheKey), {
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=7200', // Increase cache times
          'Content-Type': 'application/json',
        },
      });
    }

    // Clear cache for this path if cache busting is requested
    if (forceFresh) {
      console.log(`Cache busting requested for ${cleanPath}`);
      IMAGE_CACHE.delete(cacheKey);
    }

    // Normalize path for safety
    let normalizedPath = cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath;
    const publicDir = join(process.cwd(), 'public');
    
    // Special case for logos - always use the canonical path
    if (normalizedPath.includes('logos')) {
      console.log(`Logo path detected: ${normalizedPath} - Using canonical path`);
      normalizedPath = 'images/portfolio/logos';
    }
    
    const dirPath = join(publicDir, normalizedPath);
    
    // Verify the directory exists
    try {
      const dirStats = await fs.stat(dirPath);
      if (!dirStats.isDirectory()) {
        throw new Error(`Path is not a directory: ${dirPath}`);
      }
      console.log(`Directory found: ${dirPath}`);
    } catch (error) {
      console.warn(`Directory not found: ${dirPath}`);
      return NextResponse.json([], {
        status: 200,
        headers: forceFresh ? 
          {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          } : 
          {
            'Cache-Control': 'public, max-age=60, s-maxage=600',
          },
      });
    }
    
    // Read directory contents
    const files = await fs.readdir(dirPath);
    console.log(`Found ${files.length} files in directory ${dirPath}`);
    
    // Filter for image files and generate metadata
    const imageFiles = files.filter(isValidImageFile);
    console.log(`Found ${imageFiles.length} image files in directory ${dirPath}`);
    
    // Use a Map to deduplicate images by filename
    const imageMap = new Map<string, OptimizedImage | FullImage>();
    
    // Process each image file
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      try {
        const filePath = join(dirPath, file);
        const stats = await fs.stat(filePath);
        
        // Skip if we've already processed this file
        if (imageMap.has(file)) {
          console.log(`Skipping duplicate file: ${file}`);
          continue;
        }
        
        // Determine category from path
        let category = 'uncategorized';
        if (normalizedPath.includes('logo')) category = 'logo';
        else if (normalizedPath.includes('brand')) category = 'graphic';
        else if (normalizedPath.includes('flier')) category = 'flier';
        else if (normalizedPath.includes('website')) category = 'website';
        
        // Format image name for display
        const displayName = file
          .replace(/\.(jpg|jpeg|png|webp|gif|svg)$/i, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());
        
        // Calculate relative image path for URL
        let imageSrc = join('/', normalizedPath, file).replace(/\\/g, '/');
        
        // Remove public from the path if it's included
        if (imageSrc.includes('/public/')) {
          imageSrc = imageSrc.replace('/public/', '/');
        }
        
        // Create the base optimized image object (always needed)
        const optimizedImage: OptimizedImage = {
          id: i + 1,
          src: imageSrc,
          alt: displayName,
          category: category,
          size: stats.size,
          createdAt: stats.mtime.toISOString(),
        };
        
        // If we only want optimized data, use the lighter version
        if (optimizedOnly) {
          imageMap.set(file, optimizedImage);
          continue;
        }
        
        // For full data, extend the optimized image with additional properties
        const fullImage: FullImage = {
          ...optimizedImage,
          title: displayName,
          updatedAt: stats.mtime.toISOString(),
        };
        
        // Get additional metadata only for full images
        const dimensions = await getImageDimensions(filePath);
        
        imageMap.set(file, {
          ...fullImage,
          width: dimensions.width,
          height: dimensions.height,
        });
      } catch (error) {
        console.error(`Error processing image ${file}:`, error);
      }
    }
    
    // Convert Map values to array
    const images = Array.from(imageMap.values());
    
    // Log images count and payload size
    console.log(`Processed ${images.length} unique images (${optimizedOnly ? 'optimized payload' : 'full payload'})`);
    
    // Sort by most recent update
    const sortedImages = images.sort((a, b) => {
      // For optimized data, createdAt might be the only date available
      const dateA = 'updatedAt' in a ? a.updatedAt : a.createdAt;
      const dateB = 'updatedAt' in b ? b.updatedAt : b.createdAt;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
    
    // Update cache
    IMAGE_CACHE.set(cacheKey, sortedImages);
    CACHE_TIMESTAMPS.set(cacheKey, now);
    
    // Return the results
    return NextResponse.json(sortedImages, {
      headers: {
        'Cache-Control': forceFresh ? 
          'no-cache, no-store, must-revalidate' : 
          'public, max-age=300, s-maxage=3600', // 5min client, 1hr CDN
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in image API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// The tryAlternativePaths function has been removed/commented out since we're now handling
// path normalization directly in the GET function to avoid duplicate results and recursive API calls.
// The function was causing duplicates by making recursive GET calls when finding alternative paths.

/*
async function tryAlternativePaths(
  request: NextRequest, 
  normalizedPath: string, 
  publicDir: string, 
  searchParams: URLSearchParams, 
  forceFresh: boolean
) {
  // This function has been deprecated.
  // Now we directly normalize paths in the main GET function to avoid duplicate results.
  return null;
}
*/ 