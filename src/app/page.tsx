import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import RecentWork from '@/components/RecentWork';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <RecentWork />
        <Testimonials />
      </main>
    </>
  );
}
