'use server';

import { promises as fs } from 'fs';
import path from 'path';
import type { ImageItem } from '@/utils/getImages';

interface FileStats {
  file: string;
  stats: fs.Stats;
}

export async function getImagesFromDirectory(dirPath: string): Promise<ImageItem[]> {
  try {
    // Normalize the path
    const normalizedPath = dirPath.startsWith('/') ? dirPath.slice(1) : dirPath;
    const publicDir = path.join(process.cwd(), 'public');
    const fullPath = path.join(publicDir, normalizedPath);

    // Check if directory exists
    try {
      await fs.access(fullPath);
    } catch {
      console.warn(`Directory not found: ${fullPath}`);
      return [];
    }

    const files = await fs.readdir(fullPath);
    const fileStats = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(fullPath, file);
        const stats = await fs.stat(filePath);
        return { file, stats };
      })
    );

    return fileStats
      .filter(({ file }) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map(({ file, stats }, index) => ({
        id: index + 1,
        src: `/${normalizedPath}/${file}`.replace(/\\/g, '/'),
        alt: file.replace(/\.(jpg|jpeg|png|webp)$/i, '').replace(/-/g, ' '),
        size: stats.size,
        createdAt: stats.birthtime.toISOString(),
        category: getCategoryFromPath(normalizedPath)
      }));
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

function getCategoryFromPath(path: string): string {
  if (path.includes('logos')) return 'logo';
  if (path.includes('branding')) return 'graphics';
  if (path.includes('fliers')) return 'flier';
  if (path.includes('websites')) return 'website';
  return 'uncategorized';
} 