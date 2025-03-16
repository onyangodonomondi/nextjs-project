'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ImageItem } from '@/utils/getImages';

interface WorkItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
  link?: string;
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

// After the imports, add a constant for fallback image URL
const FALLBACK_IMAGE = '/images/placeholder.jpg';

export default function RecentWork() {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState(6);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Fetch recent work items
  useEffect(() => {
    const fetchRecentWork = async () => {
      try {
        setLoading(true);
        // Use the specialized API route for homepage images
        const response = await fetch('/api/images/homepage');
        
        if (!response.ok) {
          throw new Error(`Error fetching recent work: ${response.status}`);
        }
        
        const data = await response.json();
        
        // If we have data, use it directly
        if (data && Array.isArray(data) && data.length > 0) {
          setWorks(data);
        } else {
          // If no data from API, use fallback data
          setWorks(getFallbackData());
        }
      } catch (error) {
        console.error('Error loading recent work:', error);
        setError('Failed to load recent work');
        setWorks(getFallbackData());
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentWork();
  }, []);
  
  // Generate fallback data if API fails
  const getFallbackData = (): WorkItem[] => [
    {
      id: 1,
      src: '/images/portfolio/logos/logo-1.png',
      alt: 'Logo Design Project',
      title: 'Modern Brand Identity',
      category: 'Branding',
      link: '/portfolio'
    },
    {
      id: 2,
      src: '/images/portfolio/websites/website-1.jpg',
      alt: 'Website Design Project',
      title: 'E-commerce Platform',
      category: 'Web Development',
      link: '/web-development'
    },
    {
      id: 3,
      src: '/images/portfolio/fliers/flier-1.jpg',
      alt: 'Marketing Flier',
      title: 'Corporate Event Promotion',
      category: 'Print Design',
      link: '/graphics'
    },
    {
      id: 4,
      src: '/images/portfolio/logos/logo-2.png',
      alt: 'Corporate Logo',
      title: 'Financial Services Rebrand',
      category: 'Branding',
      link: '/portfolio'
    },
    {
      id: 5,
      src: '/images/portfolio/websites/website-2.jpg',
      alt: 'Portfolio Website',
      title: 'Professional Portfolio',
      category: 'Web Development',
      link: '/web-development'
    },
    {
      id: 6,
      src: '/images/portfolio/fliers/flier-2.jpg',
      alt: 'Product Flier',
      title: 'Product Launch Campaign',
      category: 'Print Design',
      link: '/graphics'
    }
  ];
  
  // Intersection Observer for lazy loading more items
  useEffect(() => {
    if (!containerRef.current || works.length <= visibleItems) return;
    
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        // Load more items when user scrolls to the bottom of current items
        setVisibleItems(prev => Math.min(prev + 3, works.length));
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [works.length, visibleItems]);
  
  // Handle manual load more
  const handleLoadMore = () => {
    setVisibleItems(prev => Math.min(prev + 3, works.length));
  };
  
  if (error && works.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recent Work</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our latest projects and see how we help businesses transform their digital presence.
          </p>
        </div>
        
        {loading && works.length === 0 ? (
          // Skeleton loading state
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg overflow-hidden h-64 animate-pulse">
                <div className="h-full w-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 recent-work-grid"
              ref={containerRef}
            >
              {works.slice(0, visibleItems).map((work, index) => (
                <div 
                  key={work.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 recent-work-item"
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.5s ease-out forwards ${index * 0.1}s`,
                  }}
                >
                  <Link href={work.link || '/portfolio'} className="block">
                    <div className="relative h-56 md:h-64 overflow-hidden">
                      <Image
                        src={work.src}
                        alt={work.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading={index < 3 ? "eager" : "lazy"}
                        quality={85}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        onError={() => {
                          // This will apply a fallback image if the original image fails to load
                          const imgElement = document.getElementById(`work-img-${work.id}`) as HTMLImageElement;
                          if (imgElement) {
                            imgElement.onerror = null;
                            imgElement.src = FALLBACK_IMAGE;
                          }
                        }}
                        id={`work-img-${work.id}`}
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-blue-500 text-sm font-medium">{work.category}</span>
                      <h3 className="text-xl font-semibold mt-1 text-gray-900 group-hover:text-blue-600 transition-colors">
                        {work.title}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Load More Button - only show if there are more items to load */}
            {visibleItems < works.length && (
              <div className="text-center mt-10">
                <button
                  onClick={handleLoadMore}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium inline-flex items-center"
                >
                  Load More
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
            
            {/* View All Projects Link */}
            <div className="text-center mt-10">
              <Link
                href="/portfolio"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                View All Projects
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
      
      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .recent-work-grid {
            gap: 12px !important;
          }
          
          .recent-work-item {
            min-height: 260px !important;
          }
        }
        
        @media (max-width: 480px) {
          .recent-work-grid {
            gap: 10px !important;
          }
          
          .recent-work-item {
            min-height: 220px !important;
          }
          
          .recent-work-item h3 {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
} 