'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function RecentWork() {
  const portfolioItems = [
    {
      category: 'cards',
      image: '/images/portfolio/cards/1.jpg',
      type: 'Business Cards',
      title: 'Corporate Identity Cards'
    },
    {
      category: 'fliers',
      image: '/images/portfolio/fliers/1.jpg',
      type: 'Marketing Materials',
      title: 'Event Promotion Flier'
    },
    {
      category: 'letterheads',
      image: '/images/portfolio/letterheads/1.jpg',
      type: 'Letterheads',
      title: 'Professional Letterhead Design'
    },
    {
      category: 'profiles',
      image: '/images/portfolio/profiles/1.jpg',
      type: 'Company Profiles',
      title: 'Corporate Profile Design'
    },
    {
      category: 'projects',
      image: '/images/portfolio/profiles/10.jpg',
      type: 'Projects',
      title: 'Client Project Implementation'
    },
    {
      category: 'web',
      image: '/web/Macbook2-1024x683.jpg',
      type: 'Web Development',
      title: 'Modern Website Design'
    }
  ];

  return (
    <section className="recent-work py-20" id="portfolio">
      <div className="container mx-auto px-4">
        <div className="work-header text-center mb-12">
          <h2 className="text-3xl font-bold mb-8 text-orange-500">Recent Work</h2>
        </div>

        <div className="work-categories flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up">
          <Link href="#" className="category-link px-6 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors">All</Link>
          <Link href="/graphics#cards-portfolio" className="category-link px-6 py-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors">Cards</Link>
          <Link href="/graphics#flier-portfolio" className="category-link px-6 py-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors">Fliers</Link>
          <Link href="/graphics#letterheads-portfolio" className="category-link px-6 py-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors">Letterheads</Link>
          <Link href="/graphics#profiles-portfolio" className="category-link px-6 py-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors">Profiles</Link>
          <Link href="/web-development" className="category-link px-6 py-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors">Websites</Link>
        </div>
        
        <div className="work-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div 
              key={index}
              className="work-item group" 
              data-category={item.category}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="work-image relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 