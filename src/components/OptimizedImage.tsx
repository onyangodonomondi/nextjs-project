'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  lowQualitySrc?: string;
  fadeIn?: boolean;
}

/**
 * A wrapper around Next.js Image component with additional optimizations:
 * - Progressive loading with blur-up effect
 * - Fade-in animation on load
 * - Better error handling
 * - Proper sizes attribute for responsive images
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  fill = false,
  lowQualitySrc,
  fadeIn = true,
  sizes = '100vw',
  quality = 75,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Reset loading state when src changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);
  
  // Default blur data URL if none provided
  const defaultBlurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  
  // Calculate appropriate sizes based on layout
  let sizeValue = sizes;
  if (fill && !sizes) {
    sizeValue = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  }
  
  // Styles for fade-in effect
  const imageStyle = {
    transition: fadeIn ? 'opacity 0.5s ease, filter 0.5s ease' : 'none',
    opacity: isLoaded ? 1 : 0.5,
    filter: isLoaded ? 'none' : 'blur(10px)',
  };
  
  return (
    <>
      {error ? (
        <div className={`relative flex items-center justify-center bg-gray-100 ${className}`} style={props.style}>
          <span className="text-sm text-gray-500">Failed to load image</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt || ''}
          className={className}
          sizes={sizeValue}
          quality={quality}
          fill={fill}
          priority={priority}
          placeholder={lowQualitySrc || props.blurDataURL ? "blur" : "empty"}
          blurDataURL={props.blurDataURL || lowQualitySrc || defaultBlurDataURL}
          style={{
            ...props.style,
            ...imageStyle
          }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          {...props}
        />
      )}
    </>
  );
} 