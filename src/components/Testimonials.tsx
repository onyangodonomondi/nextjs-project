'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      content: 'Mocky Digital transformed our online presence completely. Their team is professional, creative, and delivered beyond our expectations.',
      author: 'Sarah Johnson',
      position: 'CEO, TechStart Kenya',
      image: 'https://placehold.co/150x150/orange/white?text=SJ'
    },
    {
      content: 'Working with Mocky Digital was a game-changer for our business. Their social media management has helped us reach new heights.',
      author: 'John Kamau',
      position: 'Marketing Director, Fresh Foods',
      image: 'https://placehold.co/150x150/orange/white?text=JK'
    },
    {
      content: 'The team\'s attention to detail and creative approach helped us establish a strong brand identity that resonates with our audience.',
      author: 'Lisa Wanjiku',
      position: 'Founder, Style Hub',
      image: 'https://placehold.co/150x150/orange/white?text=LW'
    }
  ];

  return (
    <section className="testimonials bg-gray-50 py-20" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="section-header text-center mb-16">
          <span className="text-orange-500 font-semibold mb-2 block">Testimonials</span>
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600">Hear from businesses we've helped transform</p>
        </div>
        
        <div className="testimonials-carousel relative max-w-4xl mx-auto">
          <div className="testimonials-track">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`testimonial-slide ${index === activeSlide ? 'block' : 'hidden'}`}
              >
                <div className="testimonial-card bg-white rounded-xl shadow-lg p-8">
                  <div className="testimonial-content mb-8">
                    <div className="quote-icon text-orange-500 text-4xl mb-4">
                      <i className="fas fa-quote-left"></i>
                    </div>
                    <p className="text-gray-600 text-lg italic">{testimonial.content}</p>
                    <div className="rating text-orange-500 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>
                  <div className="testimonial-author flex items-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="author-info ml-4">
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-gray-600">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-dots flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot w-3 h-3 rounded-full transition-colors ${
                  index === activeSlide ? 'bg-orange-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
              ></button>
            ))}
          </div>

          <div className="carousel-controls absolute top-1/2 -translate-y-1/2 w-full">
            <button
              className="prev absolute left-0 -translate-x-12 w-10 h-10 rounded-full bg-white shadow-lg text-orange-500 hover:text-orange-600 transition-colors flex items-center justify-center"
              onClick={() => setActiveSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              aria-label="Previous slide"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              className="next absolute right-0 translate-x-12 w-10 h-10 rounded-full bg-white shadow-lg text-orange-500 hover:text-orange-600 transition-colors flex items-center justify-center"
              onClick={() => setActiveSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              aria-label="Next slide"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 