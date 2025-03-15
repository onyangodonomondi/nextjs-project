'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import type { ImageItem } from '@/utils/getImages';
import { FiLink, FiEye, FiTrash2, FiX } from 'react-icons/fi';

interface ImageGridProps {
  images: ImageItem[];
  category: string;
  onImageDelete: () => void;
}

export default function ImageGrid({ images, category, onImageDelete }: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [retryCount, setRetryCount] = useState<Record<string, number>>({});

  const handleDelete = async (imagePath: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch('/api/admin/deleteImage', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path: imagePath })
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      toast.success('Image deleted successfully');
      onImageDelete();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image');
    }
  };

  const handleImageError = (src: string) => {
    setFailedImages(prev => new Set([...prev, src]));
    setRetryCount(prev => ({
      ...prev,
      [src]: (prev[src] || 0) + 1
    }));
  };

  const handleRetry = (src: string) => {
    setFailedImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(src);
      return newSet;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      failedImages.forEach(src => {
        if ((retryCount[src] || 0) < 3) {
          handleRetry(src);
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [failedImages, retryCount]);

  useEffect(() => {
    // Debug log the images
    console.log('Category:', category);
    console.log('Images:', images);
  }, [images, category]);

  const handleCopyUrl = async (imageSrc: string) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${imageSrc}`);
      toast.success('Image URL copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  const getImageUrl = (src: string) => {
    const uniqueId = Math.random().toString(36).substring(7);
    if (!src.startsWith('/')) {
      src = '/' + src;
    }
    return `${src}?v=${uniqueId}`;
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <motion.div
            key={image.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="aspect-square relative bg-gray-50">
              {failedImages.has(image.src) ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center p-4">
                    <p className="text-red-500 mb-2">Failed to load image</p>
                    {retryCount[image.src] < 3 && (
                      <button
                        onClick={() => handleRetry(image.src)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Retry
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <Image
                  src={getImageUrl(image.src)}
                  alt={image.alt}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  onError={() => handleImageError(image.src)}
                />
              )}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                onClick={() => handleCopyUrl(image.src)}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                title="Copy URL"
              >
                <FiLink className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => setSelectedImage(image)}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                title="Preview"
              >
                <FiEye className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => handleDelete(image.src)}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                title="Delete"
              >
                <FiTrash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>

            {/* Image info */}
            <div className="p-3 border-t">
              <p className="text-sm text-gray-600 truncate">{image.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full h-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
              <button
                className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 