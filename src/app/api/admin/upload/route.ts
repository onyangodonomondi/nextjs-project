import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
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

    // Create category directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'images', category.toLowerCase());
    await mkdir(uploadDir, { recursive: true });

    // Get file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file with original name and format
    const filePath = join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true,
      path: `/images/${category.toLowerCase()}/${file.name}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
} 