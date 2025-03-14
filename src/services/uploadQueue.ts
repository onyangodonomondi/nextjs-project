import { ImageService } from './imageService';

interface QueuedUpload {
  file: File;
  category: string;
  options: any;
  onProgress?: (progress: number) => void;
}

export class UploadQueue {
  private static queue: QueuedUpload[] = [];
  private static isProcessing = false;
  private static readonly MAX_RETRIES = 3;

  static async addToQueue(upload: QueuedUpload) {
    try {
      let attempts = 0;
      while (attempts < this.MAX_RETRIES) {
        try {
          const formData = new FormData();
          formData.append('file', upload.file);
          formData.append('category', upload.category);
          formData.append('format', upload.options.format || 'webp');

          const response = await fetch('/api/admin/uploadImage', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Upload failed');
          }

          return await response.json();
        } catch (error) {
          attempts++;
          if (attempts === this.MAX_RETRIES) throw error;
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  static get pending() {
    return this.queue.length;
  }

  static clear() {
    this.queue = [];
    return true;
  }
} 