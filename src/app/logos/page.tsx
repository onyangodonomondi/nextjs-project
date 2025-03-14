import LogosGallery from '@/components/LogosGallery';

export default async function Logos() {
  // Fetch logo images using the API route
  const fetchImages = async (path: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/images?path=${encodeURIComponent(path)}`, {
      cache: 'no-store' // Disable caching to always get fresh data
    });
    if (!response.ok) return [];
    return response.json();
  };

  // Fetch all logo images from the logos directory
  const logos = await fetchImages('/images/logos');

  return <LogosGallery logos={logos} />;
} 