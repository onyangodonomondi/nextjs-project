'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TestimonialType } from '@/utils/getTestimonials';

export default function Testimonials({ testimonials }: { testimonials: TestimonialType[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!testimonials.length) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Hear from our satisfied clients about their experience working with us
          </p>
        </div>

        <div className="relative">
          {/* Testimonials Slider */}
          <div className="relative mx-auto max-w-3xl">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-opacity duration-500 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <blockquote className="text-xl text-gray-700 mb-4">
                    "{testimonial.testimonial}"
                  </blockquote>
                  <div className="font-medium">
                    <div className="text-primary text-lg">{testimonial.name}</div>
                    <div className="text-gray-500">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === activeIndex ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 