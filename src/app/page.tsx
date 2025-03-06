import { getImagesFromDirectory } from '@/utils/getImages';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import RecentWork from '@/components/RecentWork';
import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';
import WhyChooseUs from '@/components/WhyChooseUs';

export default async function Home() {
  // Fetch recent work
  const logos = await getImagesFromDirectory('/images/logos');
  const graphics = await getImagesFromDirectory('/images/branding');
  const fliers = await getImagesFromDirectory('/images/portfolio/fliers');
  const websites = await getImagesFromDirectory('/images/portfolio/websites');

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Process />
        <RecentWork 
          logos={logos} 
          graphics={graphics} 
          fliers={fliers} 
          websites={websites}
        />
        <Stats />
        <Testimonials />
      </main>
    </>
  );
}
