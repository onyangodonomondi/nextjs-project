import React from 'react';
import { getImagesFromDirectory } from '@/utils/getImages';
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

  const testimonials = await getTestimonials();

  return (
    <React.Fragment>
      <Navbar />
      <main>
        <Hero />
        <CallbackForm />
        <Services />
        <Process />
        <RecentWork 
          logos={logos} 
          graphics={graphics} 
          fliers={fliers} 
          websites={websites}
        />
        <Stats />
        <Testimonials testimonials={testimonials} />
        <WhyChooseUs />
      </main>
    </React.Fragment>
  );
}

export const metadata = {
  title: 'Mocky Digital - Leading Graphic Design & Web Development Agency in Nairobi, Kenya',
  description: 'Professional web design, graphic design, and digital marketing services in Nairobi. Expert branding, SEO services, and custom web development solutions for Kenyan businesses.',
  keywords: 'graphic design nairobi, web development kenya, digital marketing agency, professional website design, branding experts kenya, seo services nairobi, corporate branding'
};
