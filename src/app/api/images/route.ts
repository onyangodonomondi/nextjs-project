import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join } from 'path';
import path from 'path';

// Cache for image data to avoid filesystem operations
const IMAGE_CACHE = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes in milliseconds (increased from 5 min)
const CACHE_TIMESTAMPS = new Map();

// Function to determine image dimensions (useful for responsive image loading)
async function getImageDimensions(filepath: string) {
  try {
    // Simple implementation - in a production app, you might want to use
    // a more sophisticated image processing library or get dimensions
    // from an external service
    return {
      width: 800,
      height: 600
    };
  } catch (error) {
    console.error(`Error getting image dimensions for ${filepath}:`, error);
    return { width: 0, height: 0 };
  }
}

// Check if file is a valid image
function isValidImageFile(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext);
}

export async function GET(request: NextRequest) {
  try {
    // Get path from query parameter
    const searchParams = request.nextUrl.searchParams;
    const imagePath = searchParams.get('path');
    const optimizedOnly = searchParams.get('optimized') === 'true'; // New param to get lighter payload
    
    if (!imagePath) {
      return NextResponse.json(
        { error: 'Missing path parameter' },
        { status: 400 }
      );
    }

    // Check if we have a valid cache entry
    const now = Date.now();
    const cacheKey = `${imagePath}:${optimizedOnly ? 'optimized' : 'full'}`;
    const cacheTimestamp = CACHE_TIMESTAMPS.get(cacheKey);
    
    if (cacheTimestamp && now - cacheTimestamp < CACHE_TTL && IMAGE_CACHE.has(cacheKey)) {
      console.log(`Using cached images for ${imagePath} (${optimizedOnly ? 'optimized' : 'full'})`);
      return NextResponse.json(IMAGE_CACHE.get(cacheKey), {
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=7200', // Increase cache times
          'Content-Type': 'application/json',
        },
      });
    }

    // Normalize path for safety
    const normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const publicDir = join(process.cwd(), 'public');
    const dirPath = join(publicDir, normalizedPath);
    
    // Verify the directory exists
    try {
      await fs.stat(dirPath);
    } catch (error) {
      console.warn(`Directory not found: ${dirPath}`);
      return NextResponse.json([], {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=60, s-maxage=600',
        },
      });
    }
    
    // Read directory contents
    const files = await fs.readdir(dirPath);
    
    // Filter for image files and generate metadata
    const imagePromises = files
      .filter(isValidImageFile)
      .map(async (file, index) => {
        try {
          const filePath = join(dirPath, file);
          const stats = await fs.stat(filePath);
          
          // Determine category from path
          let category = 'uncategorized';
          if (normalizedPath.includes('logo')) category = 'logo';
          else if (normalizedPath.includes('brand')) category = 'graphic';
          else if (normalizedPath.includes('flier')) category = 'flier';
          else if (normalizedPath.includes('website')) category = 'website';
          
          // Format image name for display
          const displayName = file
            .replace(/\.(jpg|jpeg|png|webp|gif|svg)$/i, '')
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          // Get complete URL with domain
          const imageSrc = `/${normalizedPath}/${file}`.replace(/\\/g, '/');
          
          // Return lightweight object if optimized is requested
          if (optimizedOnly) {
            return {
              id: index + 1,
              src: imageSrc,
              alt: displayName,
              category,
              createdAt: stats.mtime.toISOString(),
            };
          }
          
          // Return full object otherwise
          return {
            id: index + 1,
            src: imageSrc,
            alt: displayName,
            title: displayName,
            category,
            size: stats.size,
            createdAt: stats.mtime.toISOString(),
            updatedAt: stats.mtime.toISOString(),
            blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0+P+/HgAEggHf1ZU/HAAAAABJRU5ErkJggg==" // Lightweight blur placeholder
          };
        } catch (error) {
          console.error(`Error processing file ${file}:`, error);
          return null;
        }
      });
    
    // Wait for all image processing to complete
    const images = (await Promise.all(imagePromises)).filter(Boolean);
    
    // Sort images by date (newest first) to maintain consistency
    const sortedImages = images.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    // Update cache
    IMAGE_CACHE.set(cacheKey, sortedImages);
    CACHE_TIMESTAMPS.set(cacheKey, now);
    
    // Return the results with appropriate cache headers
    return NextResponse.json(sortedImages, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=7200', // Increase cache times
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in image API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
} 