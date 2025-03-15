'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { websiteProjects } from './WebsiteProjects';
import type { ImageItem } from '@/utils/getImages';

interface WebsiteProject {
  id: number;
  title: string;
  description: string;
  src: string;
  alt: string;
  link: string;
}

interface Props {
  initialLogos?: ImageItem[];
  initialGraphics?: ImageItem[];
  initialFliers?: ImageItem[];
  initialWebsites?: ImageItem[];
}

interface ImageCardProps {
  item: ImageItem;
  index: number;
  aspectRatio?: string;
  isLogo?: boolean;
}

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function RecentWork() {
  const [images, setImages] = useState<{
    logos: ImageItem[];
    graphics: ImageItem[];
    fliers: ImageItem[];
    websites: ImageItem[];
  }>({
    logos: [],
    graphics: [],
    fliers: [],
    websites: []
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [visibleItems, setVisibleItems] = useState({
    graphics: 4,
    fliers: 4,
    logos: 4,
    websites: 4
  });
  const [sortOrder, setSortOrder] = useState('date');

  // Function to sort images by date (add null checks)
  const sortByDate = (a: ImageItem, b: ImageItem) => {
    if (!a.createdAt && !b.createdAt) return 0;
    if (!a.createdAt) return 1;
    if (!b.createdAt) return -1;
    
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  };

  const sortBySize = (a: ImageItem, b: ImageItem) => {
    if (!a.size && !b.size) return 0;
    if (!a.size) return 1;
    if (!b.size) return -1;
    
    return b.size - a.size;
  };

  // Update the sorting logic
  const sortImages = (items: ImageItem[]) => {
    switch (sortOrder) {
      case 'name':
        return [...items].sort((a, b) => a.alt.localeCompare(b.alt));
      case 'date':
        return [...items].sort(sortByDate);
      case 'size':
        return [...items].sort(sortBySize);
      default:
        return items;
    }
  };

  useEffect(() => {
    async function fetchImages() {
      try {
        setIsLoading(true);
        const [logosRes, graphicsRes, fliersRes, websitesRes] = await Promise.all([
          fetch('/api/images?path=/images/logos'),
          fetch('/api/images?path=/images/branding'),
          fetch('/api/images?path=/images/portfolio/fliers'),
          fetch('/api/images?path=/images/portfolio/websites')
        ]);

        // Check for fetch errors
        if (!logosRes.ok || !graphicsRes.ok || !fliersRes.ok || !websitesRes.ok) {
          throw new Error('One or more API calls failed');
        }

        // Parse JSON responses
        const [logos, graphics, fliers, websites] = await Promise.all([
          logosRes.json(),
          graphicsRes.json(),
          fliersRes.json(),
          websitesRes.json()
        ]);

        setImages({
          logos: Array.isArray(logos) ? logos : [],
          graphics: Array.isArray(graphics) ? graphics : [],
          fliers: Array.isArray(fliers) ? fliers : [],
          websites: Array.isArray(websites) ? websites : []
        });
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to load images');
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, []);

  // Update the random items selection to use sorted images
  const randomGraphics = getRandomItems(sortImages(images.graphics), visibleItems.graphics);
  const randomFliers = getRandomItems(sortImages(images.fliers), visibleItems.fliers);
  const randomLogos = getRandomItems(sortImages(images.logos), visibleItems.logos);
  const randomWebsites = getRandomItems(sortImages(images.websites), visibleItems.websites);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePreviousImage();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  // Update navigation handlers
  const handleNextImage = () => {
    const allImages = [...randomGraphics, ...randomFliers, ...randomLogos, ...randomWebsites];
    const currentIndex = allImages.findIndex(img => img.src === selectedImage);
    if (currentIndex < allImages.length - 1) {
      setSelectedImage(allImages[currentIndex + 1].src);
    }
  };

  const handlePreviousImage = () => {
    const allImages = [...randomGraphics, ...randomFliers, ...randomLogos, ...randomWebsites];
    const currentIndex = allImages.findIndex(img => img.src === selectedImage);
    if (currentIndex > 0) {
      setSelectedImage(allImages[currentIndex - 1].src);
    }
  };

  // Load more handler
  const handleLoadMore = (section: 'graphics' | 'fliers' | 'logos' | 'websites') => {
    setVisibleItems(prev => ({
      ...prev,
      [section]: prev[section] + 4
    }));
  };

  // Sharing handler
  const handleShare = async (image: string) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this design',
          text: 'Look at this amazing work from Mocky Digital',
          url: window.location.origin + image
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 aspect-square rounded-lg"></div>
        </div>
      ))}
    </div>
  );

  // Image card component
  const ImageCard = ({ item, index, aspectRatio = 'aspect-square', isLogo = false }: ImageCardProps) => (
    <div
      key={item.id}
      className={`group relative ${aspectRatio} bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      onClick={() => setSelectedImage(item.src)}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className={`${isLogo ? 'object-contain p-3' : 'object-cover'} transition-transform duration-300 group-hover:scale-110`}
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white p-4">
        <div className="text-center">
          <h4 className="font-bold">{item.alt}</h4>
          {item.category && (
            <p className="text-sm mt-2 text-gray-300">{item.category}</p>
          )}
        </div>
      </div>

      {/* Share button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          handleShare(item.src);
        }}
        className="absolute bottom-2 right-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <i className="fas fa-share-alt text-gray-600"></i>
      </button>
    </div>
  );

  // Website card component
  const WebsiteCard = ({ project, index }: { project: WebsiteProject; index: number }) => (
    <div
      key={project.id}
      className="group relative aspect-[16/9] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <Image
        src={project.src}
        alt={project.alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      
      {/* Hover overlay with title and description */}
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
        <h4 className="font-bold text-lg mb-2">{project.title}</h4>
        <p className="text-sm text-center mb-4">{project.description}</p>
        <Link
          href={project.link}
          className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
          target="_blank"
          onClick={(e) => e.stopPropagation()}
        >
          Visit Website
        </Link>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Recent Work</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our latest projects and creative solutions
          </p>
        </div>

        {/* Filter options */}
        <div className="mb-12 flex justify-center gap-4">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All Work
          </button>
          <button 
            onClick={() => setFilter('recent')}
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === 'recent' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Most Recent
          </button>
        </div>

        {/* Recent Graphics */}
        <div className="mb-16">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-primary">Print|| Merchandise</h3>
                  <span className="text-sm text-gray-500">({images.graphics.length} items)</span>
                </div>
                <Link href="/graphics" className="text-primary hover:text-primary-dark font-medium flex items-center gap-2">
                  View All <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {randomGraphics.map((item, index) => (
                  <ImageCard key={item.id} item={item} index={index} />
                ))}
              </div>
              {visibleItems.graphics < images.graphics.length && (
                <button 
                  onClick={() => handleLoadMore('graphics')}
                  className="mt-8 mx-auto block px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                >
                  Load More
                </button>
              )}
            </>
          )}
        </div>

        {/* Marketing Fliers */}
        <div className="mb-16">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-primary">Marketing Fliers</h3>
                <Link 
                  href="/graphics?category=fliers" 
                  className="text-primary hover:text-primary-dark font-medium flex items-center gap-2"
                >
                  View All <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {randomFliers.map((item, index) => (
                  <ImageCard item={item} index={index} aspectRatio="aspect-[3/4]" />
                ))}
              </div>
              {visibleItems.fliers < images.fliers.length && (
                <button 
                  onClick={() => handleLoadMore('fliers')}
                  className="mt-8 mx-auto block px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                >
                  Load More
                </button>
              )}
            </>
          )}
        </div>

        {/* Websites Section */}
        <div className="mb-16">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-primary">Web Development</h3>
                  <span className="text-sm text-gray-500">({websiteProjects.length} projects)</span>
                </div>
                <Link 
                  href="/web-development" 
                  className="text-primary hover:text-primary-dark font-medium flex items-center gap-2"
                >
                  View All <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {websiteProjects.slice(0, visibleItems.websites).map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative aspect-[4/3] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
                      <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                      <p className="text-sm text-center mb-4">{item.description}</p>
                      <Link
                        href={item.link}
                        className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit Website
                      </Link>
                    </div>

                    {/* Share button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(item.src);
                      }}
                      className="absolute bottom-2 right-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <i className="fas fa-share-alt text-gray-600"></i>
                    </button>
                  </div>
                ))}
              </div>
              {visibleItems.websites < websiteProjects.length && (
                <button 
                  onClick={() => handleLoadMore('websites')}
                  className="mt-8 mx-auto block px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                >
                  Load More
                </button>
              )}
            </>
          )}
        </div>

        {/* Recent Logos */}
        <div>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-primary">Logo Design</h3>
                <Link 
                  href="/logos" 
                  className="text-primary hover:text-primary-dark font-medium flex items-center gap-2"
                >
                  View All <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {randomLogos.map((item, index) => (
                  <ImageCard item={item} index={index} isLogo />
                ))}
              </div>
              {visibleItems.logos < images.logos.length && (
                <button 
                  onClick={() => handleLoadMore('logos')}
                  className="mt-8 mx-auto block px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                >
                  Load More
                </button>
              )}
            </>
          )}
        </div>

        {/* Enhanced Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full max-w-5xl">
              <Image
                src={selectedImage}
                alt="Enlarged work"
                width={1920}
                height={1080}
                quality={90}
                priority
                className="object-contain w-full h-auto"
              />
              
              {/* Navigation buttons */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreviousImage();
                }}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
              >
                <i className="fas fa-chevron-right"></i>
              </button>

              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <i className="fas fa-times"></i>
              </button>

              {/* Download button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(selectedImage, '_blank');
                }}
                className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <i className="fas fa-download"></i>
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 