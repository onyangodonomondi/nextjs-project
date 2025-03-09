import { getImagesFromDirectory } from '@/utils/getImages';
import GraphicsGallery from '@/components/GraphicsGallery';

// This needs to be a Server Component to use async
export default async function Graphics() {
  // Fetch all images
  const brandingImages = await getImagesFromDirectory('/images/branding');
  const packagingImages = await getImagesFromDirectory('/images/packaging');
  const cardImages = await getImagesFromDirectory('/images/portfolio/cards');
  const flierImages = await getImagesFromDirectory('/images/portfolio/fliers');
  const letterheadImages = await getImagesFromDirectory('/images/portfolio/letterheads');

  // Create categories object with fetched images
  const categories = {
    branding: brandingImages,
    packaging: packagingImages,
    portfolio: {
      cards: cardImages,
      fliers: flierImages,
      letterheads: letterheadImages
    }
  };

  // Since we need client-side interactivity, we'll split the page into client and server components
  return (
    <GraphicsGallery categories={categories} />
  );
} 