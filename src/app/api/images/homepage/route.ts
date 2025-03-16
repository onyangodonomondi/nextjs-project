import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Cache for homepage images
let cachedImages: any[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Helper function to extract category from filename
function extractCategoryFromFilename(filename: string): string {
  const categories = {
    logo: 'Branding',
    brand: 'Branding',
    website: 'Web Development',
    web: 'Web Development',
    flier: 'Print Design',
    print: 'Print Design',
    graphic: 'Graphic Design',
    poster: 'Print Design',
    social: 'Social Media',
    card: 'Print Design',
    brochure: 'Print Design'
  };
  
  const lowercaseFilename = filename.toLowerCase();
  
  // Check if filename contains any category keyword
  for (const [keyword, category] of Object.entries(categories)) {
    if (lowercaseFilename.includes(keyword)) {
      return category;
    }
  }
  
  return 'Portfolio';
}

// Helper function to format title from filename
function formatTitleFromFilename(filename: string): string {
  return filename
    .replace(/\.(jpg|jpeg|png|webp|gif|svg)$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function GET() {
  try {
    const now = Date.now();
    
    // Return cached images if available and not expired
    if (cachedImages && now - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json(cachedImages, {
        headers: {
          'Cache-Control': 'public, max-age=1800, s-maxage=3600',
        },
      });
    }
    
    // Path to homepage images
    const imageDir = path.join(process.cwd(), 'public', 'images', 'homepage');
    
    // Check if directory exists
    try {
      await fs.access(imageDir);
    } catch (error) {
      console.warn('Homepage image directory not found');
      return NextResponse.json([], {
        headers: {
          'Cache-Control': 'public, max-age=60, s-maxage=300',
        },
      });
    }
    
    // Read the directory
    const files = await fs.readdir(imageDir);
    
    // Filter for image files and create metadata
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
    const images = await Promise.all(
      files
        .filter(file => {
          const ext = path.extname(file).toLowerCase();
          return imageExtensions.includes(ext);
        })
        .map(async (file, index) => {
          const filePath = path.join(imageDir, file);
          const stats = await fs.stat(filePath);
          
          // Format the image name and extract category from filename
          const displayName = formatTitleFromFilename(file);
          const category = extractCategoryFromFilename(file);
          
          return {
            id: index + 1,
            src: `/images/homepage/${file}`,
            alt: displayName,
            title: displayName,
            category: category,
            // Determine appropriate link based on category
            link: category === 'Web Development' 
              ? '/web-development' 
              : category === 'Branding' 
                ? '/logos' 
                : '/portfolio',
            updatedAt: stats.mtime.toISOString(),
          };
        })
    );
    
    // Sort by newest first
    const sortedImages = images.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    
    // Update cache
    cachedImages = sortedImages;
    cacheTimestamp = now;
    
    return NextResponse.json(sortedImages, {
      headers: {
        'Cache-Control': 'public, max-age=1800, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error in homepage images API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch homepage images' },
      { status: 500 }
    );
  }
} 