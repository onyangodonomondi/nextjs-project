import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const categoryName = formData.get('category') as string;

    if (!file || !categoryName) {
      return NextResponse.json(
        { error: 'File and category are required' },
        { status: 400 }
      );
    }

    // Map category name to path
    const categoryPaths: { [key: string]: string } = {
      'Branding': 'images/branding',
      'Packaging': 'images/packaging',
      'Cards': 'images/portfolio/cards',
      'Fliers': 'images/portfolio/fliers',
      'Letterheads': 'images/portfolio/letterheads',
      'Logos': 'images/logos'
    };

    const categoryPath = categoryPaths[categoryName];
    if (!categoryPath) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Create directory path
    const directoryPath = join(process.cwd(), 'public', categoryPath);
    
    // Ensure directory exists
    try {
      await mkdir(directoryPath, { recursive: true });
    } catch (error) {
      console.error('Error creating directory:', error);
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Process image with sharp
    const processedBuffer = await sharp(buffer)
      .jpeg({ 
        quality: 80,
        mozjpeg: true 
      })
      .resize({
        width: 1920,
        height: 1920,
        fit: 'inside',
        withoutEnlargement: true
      })
      .toBuffer();

    // Create unique filename with .jpg extension since we're converting to JPEG
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`.replace(/\.[^/.]+$/, '') + '.jpg';
    const filepath = join(directoryPath, filename);

    // Write processed file
    await writeFile(filepath, processedBuffer);

    return NextResponse.json({ 
      success: true,
      path: `/${categoryPath}/${filename}`
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload file' },
      { status: 500 }
    );
  }
} 