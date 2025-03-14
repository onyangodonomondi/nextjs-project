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

    // Map category name to path and ensure it exists in public directory
    const categoryPaths: { [key: string]: string } = {
      'Branding': 'public/images/branding',
      'Packaging': 'public/images/packaging',
      'Cards': 'public/images/portfolio/cards',
      'Fliers': 'public/images/portfolio/fliers',
      'Letterheads': 'public/images/portfolio/letterheads',
      'Logos': 'public/images/logos'
    };

    const uploadPath = categoryPaths[categoryName];
    if (!uploadPath) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Create full directory path
    const directoryPath = join(process.cwd(), uploadPath);
    
    // Ensure directory exists
    await mkdir(directoryPath, { recursive: true });

    // Process image with sharp
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

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

    // Create unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`.replace(/\.[^/.]+$/, '') + '.jpg';
    const filepath = join(directoryPath, filename);

    // Write file
    await writeFile(filepath, processedBuffer);

    // Return path relative to public directory for client use
    const clientPath = filepath.split('public')[1];
    return NextResponse.json({ 
      success: true,
      path: clientPath
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload file' },
      { status: 500 }
    );
  }
} 