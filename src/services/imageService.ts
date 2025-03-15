import sharp from 'sharp';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface ImageProcessingOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'webp' | 'avif';
}

export class ImageService {
  private static readonly UPLOAD_BASE_PATH = 'public/images';
  private static readonly DEFAULT_OPTIONS: ImageProcessingOptions = {
    width: 1920,
    height: 1920,
    quality: 80,
    format: 'webp'
  };

  private static categoryPaths: Record<string, string> = {
    'Branding': 'branding',
    'Packaging': 'packaging',
    'Cards': 'portfolio/cards',
    'Fliers': 'portfolio/fliers',
    'Letterheads': 'portfolio/letterheads',
    'Logos': 'logos'
  };

  static async processAndSaveImage(file: File, category: string) {
    try {
      // Map categories to directories
      const categoryPaths: Record<string, string> = {
        'branding': '/images/branding',
        'logos': '/images/logos',
        'fliers': '/images/portfolio/fliers',
        'websites': '/images/portfolio/websites'
      };

      const basePath = categoryPaths[category] || '/images/uploads';
      const uploadDir = path.join(process.cwd(), 'public', basePath);

      // Ensure directory exists
      await mkdir(uploadDir, { recursive: true });

      // Clean filename and keep original name
      const filename = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
      const fullPath = path.join(uploadDir, filename);

      // Save file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(fullPath, buffer);

      // Return web-accessible path
      return {
        path: path.join(basePath, filename).replace(/\\/g, '/'),
        filename
      };
    } catch (error) {
      console.error('Error saving image:', error);
      throw error;
    }
  }

  private static async optimizeImage(
    buffer: Buffer,
    options: ImageProcessingOptions
  ): Promise<Buffer> {
    const processor = sharp(buffer)
      .resize({
        width: options.width,
        height: options.height,
        fit: 'inside',
        withoutEnlargement: true
      });

    switch (options.format) {
      case 'webp':
        return processor.webp({ quality: options.quality }).toBuffer();
      case 'avif':
        return processor.avif({ quality: options.quality }).toBuffer();
      default:
        return processor.jpeg({ 
          quality: options.quality,
          mozjpeg: true 
        }).toBuffer();
    }
  }

  private static async saveImage(
    buffer: Buffer,
    uploadPath: string,
    filename: string,
    format: string = 'jpeg'
  ): Promise<string> {
    const filepath = path.join(uploadPath, `${filename}.${format}`);
    await writeFile(filepath, buffer);
    return filepath;
  }
} 