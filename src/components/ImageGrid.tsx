'use client';

import { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { ImageItem } from '@/utils/getImages';
import { FiTrash2 } from 'react-icons/fi';

interface ImageGridProps {
  images: ImageItem[];
  onDelete: (path: string) => void;
}

export const ImageGrid = memo(function ImageGrid({ images, onDelete }: ImageGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {images.map((image) => (
        <motion.div
          key={image.id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
            loading="lazy"
            quality={75}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={() => onDelete(image.src)}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              title="Delete"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}); 