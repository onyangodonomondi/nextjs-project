'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { ImageItem } from '@/utils/getImages';
import PageHero from '@/components/PageHero';

interface Props {
  initialLogos?: ImageItem[];
  initialGraphics?: ImageItem[];
  initialFliers?: ImageItem[];
  initialWebsites?: ImageItem[];
}

export default function GraphicsGallery({ 
  initialLogos = [], 
  initialGraphics = [], 
  initialFliers = [], 
  initialWebsites = [] 
}: Props) {
  // Process initial data once
  const processedInitialData = useMemo(() => {
    return {
      logos: initialLogos.map(logo => ({ ...logo, category: 'logo' })),
      graphics: initialGraphics.map(graphic => ({ ...graphic, category: 'graphic' })),
      fliers: initialFliers.map(flier => ({ ...flier, category: 'flier' })),
      websites: initialWebsites.map(website => ({ ...website, category: 'website' }))
    };
  }, [initialLogos, initialGraphics, initialFliers, initialWebsites]);

  // State
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Image data with explicit categories - initialized with initial data
  const [allImages, setAllImages] = useState(processedInitialData);

  // Data fetching - only runs once or when needed
  useEffect(() => {
    const shouldFetch = 
      initialLogos.length === 0 ||
      initialGraphics.length === 0 ||
      initialFliers.length === 0 ||
      initialWebsites.length === 0;
    
    if (!shouldFetch) return;
    
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // Sequential fetching to avoid race conditions
        if (initialLogos.length === 0) {
          const res = await fetch('/api/images?path=/images/logos');
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) {
              setAllImages(prev => ({
                ...prev,
                logos: data.map(item => ({ ...item, category: 'logo' }))
              }));
            }
          }
        }
        
        if (initialGraphics.length === 0) {
          const res = await fetch('/api/images?path=/images/branding');
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) {
              setAllImages(prev => ({
                ...prev, 
                graphics: data.map(item => ({ ...item, category: 'graphic' }))
              }));
            }
          }
        }
        
        if (initialFliers.length === 0) {
          const res = await fetch('/api/images?path=/images/portfolio/fliers');
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) {
              setAllImages(prev => ({
                ...prev,
                fliers: data.map(item => ({ ...item, category: 'flier' }))
              }));
            }
          }
        }
        
        if (initialWebsites.length === 0) {
          const res = await fetch('/api/images?path=/images/portfolio/websites');
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) {
              setAllImages(prev => ({
                ...prev,
                websites: data.map(item => ({ ...item, category: 'website' }))
              }));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []); // Empty dependency array - runs once on mount

  // Memoize displayed images to prevent unnecessary recalculations
  const displayedImages = useMemo(() => {
    switch (filter) {
      case 'all':
        return [...allImages.logos, ...allImages.graphics, ...allImages.fliers, ...allImages.websites];
      case 'logos':
        return [...allImages.logos];
      case 'graphics':
        return [...allImages.graphics];
      case 'fliers':
        return [...allImages.fliers];
      case 'websites':
        return [...allImages.websites];
      default:
        return [];
    }
  }, [filter, allImages]);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHero 
        title="Our Portfolio" 
        description="Browse our collection of creative work"
      />
      
      <div className="my-8">
        <div className="filter-nav mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
              All Projects
            </FilterButton>
            <FilterButton active={filter === 'logos'} onClick={() => setFilter('logos')}>
              Logos
            </FilterButton>
            <FilterButton active={filter === 'graphics'} onClick={() => setFilter('graphics')}>
              Graphics
            </FilterButton>
            <FilterButton active={filter === 'fliers'} onClick={() => setFilter('fliers')}>
              Fliers
            </FilterButton>
            <FilterButton active={filter === 'websites'} onClick={() => setFilter('websites')}>
              Websites
            </FilterButton>
          </div>
        </div>
      </div>

      {/* Gallery Grid with smooth transitions */}
      <div className="min-h-[400px]">
        {isLoading ? (
          <div className="loading-skeleton grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : displayedImages.length > 0 ? (
          <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedImages.map((image) => (
              <GalleryItem 
                key={`${image.category}-${image.id}`}
                image={image} 
                onClick={() => setSelectedImage(image)} 
              />
            ))}
          </div>
        ) : (
          <div className="empty-state text-center py-12">
            <p className="text-gray-500">No images found in this category</p>
          </div>
        )}
      </div>
      
      {/* Image Modal */}
      {selectedImage && (
        <ImageModal 
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}

// FilterButton component
function FilterButton({ 
  active, 
  onClick, 
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors ${
        active 
          ? 'bg-primary text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}

// GalleryItem component - with better image loading
function GalleryItem({ 
  image, 
  onClick 
}: { 
  image: ImageItem; 
  onClick: () => void 
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div 
      className="gallery-item relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
      onClick={onClick}
    >
      {!isImageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}
      
      <Image
        src={image.src}
        alt={image.alt || 'Gallery image'}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsImageLoaded(true)}
        loading="eager" // Load immediately
        priority={true}  // High priority
      />
      
      {isImageLoaded && (
        <>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-3">
              <p className="font-medium text-sm md:text-base">{image.alt}</p>
              <p className="text-xs mt-1 capitalize">{image.category}</p>
            </div>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full opacity-70">
            {image.category}
          </div>
        </>
      )}
    </div>
  );
}

// ImageModal component
function ImageModal({ 
  image, 
  onClose 
}: { 
  image: ImageItem; 
  onClose: () => void 
}) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
        <button 
          className="absolute top-4 right-4 bg-black bg-opacity-70 text-white rounded-full w-10 h-10 flex items-center justify-center z-10"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="relative bg-black bg-opacity-70 rounded-lg overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt || 'Portfolio image'}
            width={1200}
            height={800}
            className="w-full h-auto max-h-[80vh] object-contain"
            priority={true}
            loading="eager"
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
            <h3 className="text-white text-lg font-medium">{image.alt}</h3>
            <p className="text-gray-300 text-sm capitalize">{image.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 