import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// New route segment config
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Set maximum duration for the API route
export const maxDuration = 60;

// Increase body size limit
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;

    if (!file || !category) {
      return NextResponse.json(
        { error: 'File and category are required' },
        { status: 400 }
      );
    }

    // Map categories to directories
    const categoryPaths: Record<string, string> = {
      'logos': 'logos',
      'branding': 'branding',
      'fliers': 'portfolio/fliers',
      'websites': 'portfolio/websites'
    };

    const basePath = categoryPaths[category];
    if (!basePath) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Create full directory path
    const uploadDir = path.join(process.cwd(), 'public', 'images', basePath);
    await mkdir(uploadDir, { recursive: true });

    // Create unique filename
    const timestamp = Date.now();
    const safeFilename = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
    const filename = `${timestamp}-${safeFilename}`;
    const fullPath = path.join(uploadDir, filename);

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(fullPath, buffer);

    // Return web path
    const webPath = `/images/${basePath}/${filename}`;
    
    return NextResponse.json({
      success: true,
      path: webPath,
      filename
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload file' },
      { status: 500 }
    );
  }
} 