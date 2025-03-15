import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import Navbar from '@/components/Navbar';
import CallbackForm from '@/components/CallbackForm';
import BasicStats from '@/components/stats/BasicStats';
import { getImagePath } from '@/utils/paths';

// Dynamic imports
const Hero = dynamic(() => import('@/components/Hero'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

// Server Component
export default async function Home() {
  console.log('Rendering Home page');
  
  return (
    <React.Fragment>
      <Navbar />
      <main className="pt-20">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
        <CallbackForm />
        <BasicStats />
      </main>
    </React.Fragment>
  );
}

export const metadata = {
  title: 'Mocky Digital - Leading Graphic Design & Web Development Agency in Nairobi, Kenya',
  description: 'Professional web design, graphic design, and digital marketing services in Nairobi.',
  keywords: 'graphic design nairobi, web development kenya, digital marketing agency'
};
