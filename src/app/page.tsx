import React from 'react';
import { getImagesFromFS } from '@/utils/server/fileSystem';
import type { ImageItem } from '@/utils/getImages';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import RecentWork from '@/components/RecentWork';
import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';
import WhyChooseUs from '@/components/WhyChooseUs';
import { getTestimonials } from '@/utils/getTestimonials';
import CallbackForm from '@/components/CallbackForm';
import SocialFeeds from '@/components/SocialFeeds';

// Use server-side fetching directly
export default async function Home() {
  // Get initial data during server-side rendering
  const initialLogos = getImagesFromFS('/images/logos')
    .map((img: ImageItem) => ({ ...img, category: 'logo' }));
  
  const initialGraphics = getImagesFromFS('/images/branding')
    .map((img: ImageItem) => ({ ...img, category: 'graphics' }));
  
  const initialFliers = getImagesFromFS('/images/portfolio/fliers')
    .map((img: ImageItem) => ({ ...img, category: 'flier' }));
  
  const initialWebsites = getImagesFromFS('/images/portfolio/websites')
    .map((img: ImageItem) => ({ ...img, category: 'website' }));

  const testimonials = await getTestimonials();

  return (
    <React.Fragment>
      <Navbar />
      <main className="pt-20">
        <Hero />
        <CallbackForm />
        <Services />
        <Process />
        <Stats />
        <WhyChooseUs />
        <RecentWork 
          initialLogos={initialLogos} 
          initialGraphics={initialGraphics} 
          initialFliers={initialFliers} 
          initialWebsites={initialWebsites}
        />
        <Testimonials testimonials={testimonials} />
        <SocialFeeds />
      </main>
    </React.Fragment>
  );
}

export const metadata = {
  title: 'Mocky Digital - Leading Graphic Design & Web Development Agency in Nairobi, Kenya',
  description: 'Professional web design, graphic design, and digital marketing services in Nairobi. Expert branding, SEO services, and custom web development solutions for Kenyan businesses.',
  keywords: 'graphic design nairobi, web development kenya, digital marketing agency, professional website design, branding experts kenya, seo services nairobi, corporate branding'
};
