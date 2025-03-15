import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';

export default function VirtualizedLogoGrid({ 
  logos = [],
  onSelectImage = () => {},
  itemsPerRow = 4,
  updateLogoPath = (path) => path || ''
}) {
  const parentRef = useRef(null);
  
  // Memoize row data calculation to prevent recalculation on each render
  const rows = useMemo(() => {
    // Only calculate when logos or itemsPerRow changes
    return logos.reduce((acc, item, i) => {
      const rowIndex = Math.floor(i / itemsPerRow);
      if (!acc[rowIndex]) acc[rowIndex] = [];
      acc[rowIndex].push(item);
      return acc;
    }, []);
  }, [logos, itemsPerRow]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 240,
    overscan: 3, // Reduced overscan for better performance
  });
  
  // Use requestIdleCallback for non-critical operations
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    const handle = idleCallback(() => {
      console.log('Virtualizing logos in idle time');
    });
    
    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(handle);
      } else {
        clearTimeout(handle);
      }
    };
  }, []);

  return (
    <div 
      ref={parentRef} 
      className="h-[800px] overflow-auto"
      style={{ contain: 'strict' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.index}
            className="absolute top-0 left-0 w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            style={{
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {rows[virtualRow.index].map((item, colIndex) => (
              <div
                key={`${virtualRow.index}-${colIndex}`}
                className="group relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onSelectImage(item.src || item.imageUrl)}
              >
                {(item.src || item.imageUrl) ? (
                  <Image
                    src={updateLogoPath(item.src || item.imageUrl)}
                    alt={item.alt || item.title || 'Logo'}
                    fill
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhAI6dtiLOgAAAABJRU5ErkJggg=="
                    className="object-contain"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16.66vw"
                    quality={70} // Slightly reduce quality for better performance
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/portfolio/logo-types/wordmark.png';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
} 