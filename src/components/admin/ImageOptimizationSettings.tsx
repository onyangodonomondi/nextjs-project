import { useState } from 'react';

export interface OptimizationOptions {
  quality: number;
  maxWidth: number;
  format: 'jpeg' | 'webp' | 'png';
  preserveExif: boolean;
}

interface Props {
  options: OptimizationOptions;
  onChange: (options: OptimizationOptions) => void;
}

export function ImageOptimizationSettings({ options, onChange }: Props) {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium text-gray-900">Image Optimization</h3>
      
      <div className="space-y-2">
        <label className="block text-sm text-gray-700">
          Quality ({options.quality}%)
          <input
            type="range"
            min="1"
            max="100"
            value={options.quality}
            onChange={(e) => onChange({ ...options, quality: Number(e.target.value) })}
            className="w-full"
          />
        </label>

        <label className="block text-sm text-gray-700">
          Max Width
          <select
            value={options.maxWidth}
            onChange={(e) => onChange({ ...options, maxWidth: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value={1280}>1280px</option>
            <option value={1920}>1920px</option>
            <option value={2560}>2560px</option>
          </select>
        </label>

        <label className="block text-sm text-gray-700">
          Format
          <select
            value={options.format}
            onChange={(e) => onChange({ ...options, format: e.target.value as OptimizationOptions['format'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="webp">WebP</option>
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
          </select>
        </label>

        <label className="flex items-center text-sm text-gray-700">
          <input
            type="checkbox"
            checked={options.preserveExif}
            onChange={(e) => onChange({ ...options, preserveExif: e.target.checked })}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="ml-2">Preserve EXIF data</span>
        </label>
      </div>
    </div>
  );
} 