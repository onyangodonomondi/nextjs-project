import LogosGallery from '@/components/LogosGallery';

// Add a special flag for build time
const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL;

export default async function LogosPage() {
  // Initialize the logos array with fallback data
  let logos = [
    {
      id: '1',
      title: 'Sample Logo 1',
      imageUrl: '/images/sample-logo-1.jpg',
    },
    {
      id: '2',
      title: 'Sample Logo 2',
      imageUrl: '/images/sample-logo-2.jpg',
    }
  ];
  
  // Skip API fetch during build time
  if (!isBuildTime) {
    try {
      const logosData = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/logos`, { 
        next: { revalidate: 3600 } 
      });
      
      if (logosData.ok) {
        const fetchedLogos = await logosData.json();
        if (fetchedLogos && fetchedLogos.length > 0) {
          logos = fetchedLogos;
        }
      }
    } catch (error) {
      console.error("Error fetching logos:", error);
      // We already have fallback data
    }
  }

  return <LogosGallery logos={logos} />;
} 