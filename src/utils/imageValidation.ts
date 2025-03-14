import { lookup } from 'mime-types';

interface ImageValidationOptions {
  maxSize?: number;
  allowedTypes?: string[];
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export class ImageValidator {
  private static readonly DEFAULT_OPTIONS: ImageValidationOptions = {
    maxSize: 50 * 1024 * 1024, // 50MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    minWidth: 200,
    minHeight: 200,
    maxWidth: 8000,
    maxHeight: 8000
  };

  static async validateImage(file: File, options: Partial<ImageValidationOptions> = {}) {
    const settings = { ...this.DEFAULT_OPTIONS, ...options };
    const errors: string[] = [];

    // Check file size
    if (file.size > settings.maxSize!) {
      errors.push(`File size must be less than ${settings.maxSize! / (1024 * 1024)}MB`);
    }

    // Check file type
    const mimeType = lookup(file.name);
    if (!mimeType || !settings.allowedTypes!.includes(mimeType)) {
      errors.push(`Invalid file type. Only JPEG, PNG and WebP images are allowed.`);
    }

    // Check dimensions
    const dimensions = await this.getImageDimensions(file);
    if (dimensions) {
      if (dimensions.width < settings.minWidth! || dimensions.height < settings.minHeight!) {
        errors.push(`Image must be at least ${settings.minWidth}x${settings.minHeight} pixels`);
      }
      if (dimensions.width > settings.maxWidth! || dimensions.height > settings.maxHeight!) {
        errors.push(`Image must be no larger than ${settings.maxWidth}x${settings.maxHeight} pixels`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      dimensions
    };
  }

  private static getImageDimensions(file: File): Promise<{ width: number; height: number } | null> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        resolve(null);
      };
      img.src = URL.createObjectURL(file);
    });
  }
} 