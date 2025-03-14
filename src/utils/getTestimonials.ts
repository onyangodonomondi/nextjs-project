import { getImagesFromFS } from './serverUtils';

export interface TestimonialType {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  testimonial: string;
}

export async function getTestimonials(): Promise<TestimonialType[]> {
  try {
    const testimonialImages = await Promise.resolve(getImagesFromFS('/images/testimonials'));
    
    if (!testimonialImages || testimonialImages.length === 0) {
      console.log('No testimonial images found');
      return [];
    }

    // Map testimonial data with images
    return [
      {
        id: 1,
        name: "John Doe",
        role: "CEO",
        company: "Tech Solutions Ltd",
        image: testimonialImages[0]?.src || "/images/placeholder-avatar.png",
        testimonial: "Working with Mocky Digital transformed our online presence. Their team delivered exceptional results that exceeded our expectations."
      },
      {
        id: 2,
        name: "Jane Smith",
        role: "Marketing Director",
        company: "Creative Minds Inc",
        image: testimonialImages[1]?.src || "/images/placeholder-avatar.png",
        testimonial: "The professionalism and creativity of Mocky Digital's team helped us achieve our branding goals. Highly recommended!"
      },
      {
        id: 3,
        name: "David Wilson",
        role: "Founder",
        company: "Startup Hub",
        image: testimonialImages[2]?.src || "/images/placeholder-avatar.png",
        testimonial: "Outstanding service and attention to detail. Mocky Digital helped us establish a strong digital presence from day one."
      }
    ];
  } catch (error) {
    console.error('Error getting testimonials:', error);
    return [];
  }
} 