import { NextResponse } from 'next/server';
import { ImageService } from '@/services/imageService';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const format = formData.get('format') as 'jpeg' | 'webp' | 'avif' || 'webp';

    if (!file || !category) {
      return NextResponse.json(
        { error: 'File and category are required' },
        { status: 400 }
      );
    }

    const result = await ImageService.processAndSaveImage(file, category, { format });

    return NextResponse.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload file' },
      { status: 500 }
    );
  }
} 