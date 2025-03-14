import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE(request: Request) {
  try {
    const { path: imagePath } = await request.json();
    
    // Security check: ensure the path is within the public directory
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    const publicDir = path.join(process.cwd(), 'public');
    
    if (!fullPath.startsWith(publicDir)) {
      return NextResponse.json(
        { error: 'Invalid path' },
        { status: 400 }
      );
    }

    await fs.unlink(fullPath);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
} 