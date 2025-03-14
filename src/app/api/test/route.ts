import { NextResponse } from 'next/server';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const publicDir = join(process.cwd(), 'public');
    const imagesDir = join(publicDir, 'images');
    
    const dirs = {
      cwd: process.cwd(),
      public: existsSync(publicDir),
      images: existsSync(imagesDir),
      contents: existsSync(imagesDir) ? readdirSync(imagesDir) : [],
      categories: ['branding', 'packaging', 'logos'].map(cat => ({
        name: cat,
        path: join(imagesDir, cat),
        exists: existsSync(join(imagesDir, cat)),
        contents: existsSync(join(imagesDir, cat)) 
          ? readdirSync(join(imagesDir, cat)) 
          : []
      }))
    };

    return NextResponse.json(dirs);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
} 