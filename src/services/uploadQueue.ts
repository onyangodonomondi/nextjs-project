import { ImageService } from './imageService';

interface UploadOptions {
  preserveOriginal: boolean;
  quality: number;
}

interface UploadRequest {
  file: File;
  category: string;
  options: UploadOptions;
}

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

  static async addToQueue({ file, category, options }: UploadRequest) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('preserveOriginal', options.preserveOriginal.toString());
    formData.append('quality', options.quality.toString());

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  }

  static get pending() {
    return this.queue.length;
  }

  static clear() {
    this.queue = [];
    return true;
  }
} 