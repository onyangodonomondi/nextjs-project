'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Enhanced testimonial data with images
const testimonialData = [
  {
    id: 1,
    name: "John Mwangi",
    company: "KenyaTech Solutions",
    role: "CEO",
    text: "Mocky Digital transformed our brand identity with exceptional design work. Their team delivered beyond our expectations, providing a website that perfectly captures our vision.",
    image: "/images/testimonials/testimonial-1.jpg"
  },
  {
    id: 2,
    name: "Sarah Okello",
    company: "Nairobi Retail Group",
    role: "Marketing Director",
    text: "Working with Mocky Digital was a game-changer for our online presence. Their creative solutions and attention to detail helped us stand out in a competitive market.",
    image: "/images/testimonials/testimonial-2.jpg"
  },
  {
    id: 3,
    name: "David Ochieng",
    company: "EastAfrica Tours",
    role: "Founder",
    text: "The team at Mocky Digital understands the unique needs of Kenyan businesses. They created a beautiful, functional website that's already bringing in new customers.",
    image: "/images/testimonials/testimonial-3.jpg"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonialData.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);
  
  // Show specific testimonial
  const showTestimonial = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false); // Pause auto-rotation when manually selecting
    
    // Resume auto-rotation after 10 seconds of inactivity
    const timer = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
    
    return () => clearTimeout(timer);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">What Our Clients Say</h2>
        <p className="text-center text-gray-600 mb-8">Hear from our satisfied clients</p>
        
        <div className="max-w-4xl mx-auto">
          {/* Enhanced testimonial card */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 transition-all duration-300">
            <div className="mb-6 md:mb-8">
              <p className="italic text-gray-700 mb-4 text-lg leading-relaxed">"{testimonialData[activeIndex].text}"</p>
              
              <div className="flex items-center mt-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 mr-4">
                  <Image 
                    src={testimonialData[activeIndex].image}
                    alt={testimonialData[activeIndex].name}
                    fill
                    sizes="56px"
                    style={{ objectFit: 'cover' }}
                    quality={90}
                  />
                </div>
                <div>
                  <p className="font-medium text-lg">{testimonialData[activeIndex].name}</p>
                  <p className="text-gray-600">{testimonialData[activeIndex].role}, {testimonialData[activeIndex].company}</p>
                </div>
              </div>
            </div>
            
            {/* Navigation dots with enhanced styling */}
            <div className="flex justify-center space-x-3">
              {testimonialData.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => showTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 