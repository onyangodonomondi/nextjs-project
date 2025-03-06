import { getImagesFromDirectory } from '@/utils/getImages';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import RecentWork from '@/components/RecentWork';
import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';
import WhyChooseUs from '@/components/WhyChooseUs';

// Add category to the images when getting them
export default async function Home() {
  const logos = await getImagesFromDirectory('/images/logos').then(images =>
    images.map(img => ({ ...img, category: 'logo' }))
  );
  
  const graphics = await getImagesFromDirectory('/images/branding').then(images =>
    images.map(img => ({ ...img, category: 'graphics' }))
  );
  
  const fliers = await getImagesFromDirectory('/images/portfolio/fliers').then(images =>
    images.map(img => ({ ...img, category: 'flier' }))
  );
  
  const websites = await getImagesFromDirectory('/images/portfolio/websites').then(images =>
    images.map(img => ({ ...img, category: 'website' }))
  );

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <RecentWork 
          logos={logos} 
          graphics={graphics} 
          fliers={fliers} 
          websites={websites}
        />
        <Stats />
        <Testimonials />
        <WhyChooseUs />
      </main>
    </>
  );
}
