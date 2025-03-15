import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';

interface DropZoneProps {
  onFilesDropped: (files: File[]) => void;
}

export function DropZone({ onFilesDropped }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={async (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        onFilesDropped(files);
      }}
      className={`border-2 border-dashed rounded-lg p-8 transition-all ${
        isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
      }`}
    >
      <div className="text-center">
        <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-gray-600">Drag and drop images here</p>
        <p className="text-sm text-gray-500 mt-1">
          Supported formats: JPG, PNG, WebP • Max size: 5MB
        </p>
      </div>
    </div>
  );
} 