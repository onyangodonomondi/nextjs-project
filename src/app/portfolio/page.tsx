import { getImagesFromDirectory } from '@/utils/getImages';
import GraphicsGallery from '@/components/GraphicsGallery';

// This needs to be a Server Component to use async
export default async function Graphics() {
  // Fetch all images using the API route
  const fetchImages = async (path: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/images?path=${encodeURIComponent(path)}`, {
      cache: 'no-store' // Disable caching to always get fresh data
    });
    if (!response.ok) return [];
    return response.json();
  };

  // Fetch all images
  const [brandingImages, packagingImages, cardImages, flierImages, letterheadImages] = await Promise.all([
    fetchImages('/images/branding'),
    fetchImages('/images/packaging'),
    fetchImages('/images/portfolio/cards'),
    fetchImages('/images/portfolio/fliers'),
    fetchImages('/images/portfolio/letterheads')
  ]);

  // Create categories object with fetched images
  const categories = {
    branding: brandingImages,
    packaging: packagingImages,
    portfolio: {
      cards: cardImages,
      flyers: flierImages,
      brochures: letterheadImages
    }
  };

  // Since we need client-side interactivity, we'll split the page into client and server components
  return (
    <GraphicsGallery categories={categories} />
  );
} 