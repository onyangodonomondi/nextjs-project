import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(request: Request) {
  try {
    const { path: imagePath } = await request.json();
    
    if (!imagePath) {
      return NextResponse.json({ error: 'Image path is required' }, { status: 400 });
    }

    // Clean the path and ensure it's within the public directory
    const cleanPath = imagePath.replace(/^\//, '');
    const fullPath = path.join(process.cwd(), 'public', cleanPath);

    // Delete the file
    await unlink(fullPath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
} 