'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import imageCompression from 'browser-image-compression';

interface Props {
  onUploadSuccess: () => void;
}

export default function ImageUploadForm({ onUploadSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('logos');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: (p: number) => setProgress(Math.round(p * 100))
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return new File([compressedFile], file.name, {
        type: compressedFile.type
      });
    } catch (error) {
      console.error('Compression error:', error);
      throw new Error('Image compression failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setProgress(0);

    try {
      // Compress image if it's larger than 1MB
      const processedFile = file.size > 1024 * 1024 
        ? await compressImage(file)
        : file;

      const formData = new FormData();
      formData.append('file', processedFile);
      formData.append('category', category);

      const response = await fetch('/api/admin/uploadImage', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }

      toast.success('Image uploaded successfully');
      setFile(null);
      setProgress(0);
      onUploadSuccess();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-2 font-medium">Category:</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
          disabled={isUploading}
        >
          <option value="logos">Logos</option>
          <option value="branding">Branding</option>
          <option value="fliers">Fliers</option>
          <option value="websites">Websites</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">Image:</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
          disabled={isUploading}
        />
      </div>

      {isUploading && progress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <button 
        type="submit" 
        disabled={!file || isUploading}
        className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isUploading ? `Uploading... ${progress}%` : 'Upload Image'}
      </button>
    </form>
  );
} 