'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

interface ClientGallerySectionProps {
  items: any[];
  gridCols: string;
  aspectRatio: string;
  objectFit: string;
  padding?: string;
  category: string;
}

export default function ClientGallerySection({
  items,
  gridCols,
  aspectRatio,
  objectFit,
  padding = '',
  category
}: ClientGallerySectionProps) {
  // Store the entire collection and current visible set
  const [allItems, setAllItems] = useState(items);
  const [visibleItems, setVisibleItems] = useState(items.slice(0, 8));
  const [isLoading, setIsLoading] = useState(false);

  // Function to refresh the gallery with new images
  const refreshGallery = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Basic approach: shuffle the existing items
      const remainingItems = [...allItems];
      const newItems = [];
      
      // Select 8 random items from the remaining set
      for (let i = 0; i < 8; i++) {
        if (remainingItems.length === 0) break;
        const randomIndex = Math.floor(Math.random() * remainingItems.length);
        newItems.push(remainingItems.splice(randomIndex, 1)[0]);
      }
      
      // If we don't have enough items, refetch from API
      if (newItems.length < 8) {
        try {
          // Try to get more items from the API
          const response = await fetch(`/api/images?path=/images/portfolio/${category}`);
          if (response.ok) {
            const data = await response.json();
            // Update the all items state with the new data
            setAllItems(data);
            // Use the new data to fill the remaining slots
            const additionalItems = data.filter(
              item => !newItems.some(newItem => newItem.src === item.src)
            );
            
            while (newItems.length < 8 && additionalItems.length > 0) {
              const randomIndex = Math.floor(Math.random() * additionalItems.length);
              newItems.push(additionalItems.splice(randomIndex, 1)[0]);
            }
          }
        } catch (error) {
          console.error("Error fetching additional items:", error);
        }
      }
      
      // Animate the transition
      setVisibleItems([]);
      
      // Short delay for the animation
      setTimeout(() => {
        setVisibleItems(newItems);
      }, 300);
      
    } catch (error) {
      console.error("Error refreshing gallery:", error);
    } finally {
      setIsLoading(false);
    }
  }, [allItems, category]);

  return (
    <>
      <div className={`grid ${gridCols} gap-4 md:gap-6`}>
        {visibleItems.map((item, index) => (
          <div 
            key={`${category}-${index}-${item.id || Math.random()}`}
            className={`group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all ${aspectRatio} transform transition-all duration-500 ${isLoading ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
          >
            {/* Optional placeholder background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
            
            <Image
              src={item.src}
              alt={item.alt || `${category} item`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, 25vw"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              loading={index < 4 ? "eager" : "lazy"}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white text-lg font-medium">{item.alt}</h3>
              <p className="text-white/80 mt-1 text-sm capitalize">
                {item.category || category}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <button 
          onClick={refreshGallery}
          disabled={isLoading}
          className="px-6 py-3 bg-[#0A1929] text-white rounded-full inline-flex items-center justify-center hover:bg-[#0A1929]/90 transition-colors min-w-[180px] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </>
          ) : (
            'Load More'
          )}
        </button>
      </div>
    </>
  );
} 