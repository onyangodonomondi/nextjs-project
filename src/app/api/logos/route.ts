import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Function to get logos from the new directory structure
async function getLogos() {
  try {
    // The directory where logos are stored in the public folder
    const logoDirectory = path.join(process.cwd(), 'public', 'images', 'portfolio', 'logos');
    
    // Check if directory exists
    if (!fs.existsSync(logoDirectory)) {
      console.error(`Directory not found: ${logoDirectory}`);
      return [];
    }
    
    // Read files from the directory
    const fileNames = fs.readdirSync(logoDirectory);
    
    // Filter for image files only
    const imageFiles = fileNames.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
    );
    
    // Create properly structured logo objects
    const logos = imageFiles.map((fileName, index) => ({
      id: index + 1,
      title: fileName.replace(/\.(jpg|jpeg|png|gif|webp|svg)$/i, '').replace(/-/g, ' '),
      src: `/images/portfolio/logos/${fileName}`,
      alt: fileName.replace(/\.(jpg|jpeg|png|gif|webp|svg)$/i, '').replace(/-/g, ' '),
      imageUrl: `/images/portfolio/logos/${fileName}`
    }));
    
    return logos;
  } catch (error) {
    console.error('Error reading logo directory:', error);
    return [];
  }
}

export async function GET() {
  // For static builds, use fallback data if needed
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) {
    // Fallback data for static builds
    const fallbackLogos = [
      {
        id: 1,
        title: 'Sample Logo 1',
        src: '/images/portfolio/logos/sample-logo-1.jpg',
        alt: 'Sample Logo 1',
        imageUrl: '/images/portfolio/logos/sample-logo-1.jpg'
      },
      {
        id: 2,
        title: 'Sample Logo 2',
        src: '/images/portfolio/logos/sample-logo-2.jpg',
        alt: 'Sample Logo 2',
        imageUrl: '/images/portfolio/logos/sample-logo-2.jpg'
      }
    ];
    return NextResponse.json(fallbackLogos);
  }

  const logos = await getLogos();
  return NextResponse.json(logos);
} 