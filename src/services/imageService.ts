import sharp from 'sharp';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
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

  static async processAndSaveImage(
    file: File,
    category: string,
    options: Partial<ImageProcessingOptions> = {}
  ) {
    try {
      const processOptions = { ...this.DEFAULT_OPTIONS, ...options };
      const categoryPath = this.categoryPaths[category];

      if (!categoryPath) {
        throw new Error('Invalid category');
      }

      const uploadPath = join(process.cwd(), this.UPLOAD_BASE_PATH, categoryPath);
      await mkdir(uploadPath, { recursive: true });

      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Use the provided filename without extension
      const filename = file.name.split('.')[0];
      
      // Generate multiple formats and sizes
      const [optimizedImage, thumbnail] = await Promise.all([
        this.optimizeImage(buffer, {
          ...processOptions,
          width: processOptions.width,
          height: processOptions.height,
        }),
        this.optimizeImage(buffer, {
          ...processOptions,
          width: 400,
          height: 400,
        })
      ]);

      const [imagePath, thumbnailPath] = await Promise.all([
        this.saveImage(optimizedImage, uploadPath, filename, processOptions.format),
        this.saveImage(thumbnail, uploadPath, `thumb-${filename}`, processOptions.format)
      ]);

      return {
        path: imagePath.split('public')[1],
        thumbnailPath: thumbnailPath.split('public')[1],
        format: processOptions.format
      };
    } catch (error) {
      console.error('Image processing error:', error);
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
    path: string,
    filename: string,
    format: string = 'jpeg'
  ): Promise<string> {
    const filepath = join(path, `${filename}.${format}`);
    await writeFile(filepath, buffer);
    return filepath;
  }
} 