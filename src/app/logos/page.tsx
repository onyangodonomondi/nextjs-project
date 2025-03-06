import { getImagesFromDirectory } from '@/utils/getImages';
import LogosGallery from '@/components/LogosGallery';

export default async function Logos() {
  // Fetch all logo images from the logos directory
  const logos = await getImagesFromDirectory('/images/logos');

  return <LogosGallery logos={logos} />;
} 