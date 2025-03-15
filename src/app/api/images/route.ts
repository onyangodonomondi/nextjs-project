import { NextResponse } from 'next/server';
import { getImagesFromFS } from '@/utils/server/fileSystem';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
    }

    const images = getImagesFromFS(path);
    
    // Ensure all image paths are absolute
    const processedImages = images.map(img => ({
      ...img,
      src: img.src.startsWith('/') ? img.src : `/${img.src}`
    }));

    return NextResponse.json(processedImages, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error('Error getting images:', error);
    return NextResponse.json(
      { error: 'Failed to get images' },
      { status: 500 }
    );
  }
} 