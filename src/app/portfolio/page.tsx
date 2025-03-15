import { getImagesFromServer } from '@/utils/serverUtils';
import GraphicsGallery from '@/components/GraphicsGallery';

// This needs to be a Server Component to use async
export default async function PortfolioPage() {
  // Get initial data for server-side rendering
  const logos = await getImagesFromServer('/images/logos');
  const graphics = await getImagesFromServer('/images/branding');
  const fliers = await getImagesFromServer('/images/portfolio/fliers');
  const websites = await getImagesFromServer('/images/portfolio/websites');

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Portfolio</h1>
        
        <GraphicsGallery 
          initialLogos={logos}
          initialGraphics={graphics} 
          initialFliers={fliers} 
          initialWebsites={websites}
        />
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Portfolio | Mocky Digital Kenya',
  description: 'Browse our portfolio of professional graphic design, branding, and web development projects.',
  keywords: 'portfolio, graphic design work, kenya web development projects, logo design samples, branding examples, nairobi graphic designer'
}; 