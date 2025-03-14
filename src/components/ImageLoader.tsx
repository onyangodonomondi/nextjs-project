'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageLoader({ src, alt, className = '' }: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  return (
    <div className="relative w-full h-full bg-gray-100">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse w-full h-full bg-gray-200" />
        </div>
      )}
      <div className="relative w-full h-full">
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
            setImgSrc('/images/placeholder.jpg');
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-gray-500">Failed to load image</span>
        </div>
      )}
    </div>
  );
} 