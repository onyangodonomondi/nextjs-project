'use client';

import Image from 'next/image';

export default function LetterheadGallery() {
  const letterheads = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Professional Letterhead Design ${i + 1}`,
    image: `/images/portfolio/letterheads/${i + 1}.jpg`,
    description: 'Professional corporate letterhead design'
  }));

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Corporate Letterheads</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional letterhead designs that enhance your business communication
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {letterheads.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl shadow-lg"
              data-aos="fade-up"
            >
              <div className="relative aspect-[1/1.4] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-200">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 