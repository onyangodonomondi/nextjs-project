import { getImagesFromFS } from '@/utils/server/fileSystem';
import GraphicsGallery from '@/components/GraphicsGallery';

// This needs to be a Server Component to use async
export default async function Graphics() {
  // Fetch all images directly from the file system
  const [brandingImages, packagingImages, cardImages, flierImages, letterheadImages] = await Promise.all([
    getImagesFromFS('/images/branding'),
    getImagesFromFS('/images/packaging'),
    getImagesFromFS('/images/portfolio/cards'),
    getImagesFromFS('/images/portfolio/fliers'),
    getImagesFromFS('/images/portfolio/letterheads')
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