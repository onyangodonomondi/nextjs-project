import { NextResponse } from 'next/server';
import { getImagesFromFS } from '@/utils/server/fileSystem';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');

  if (!path) {
    return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
  }

  const images = getImagesFromFS(path);
  return NextResponse.json(images);
} 