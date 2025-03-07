import { getImagesFromDirectory } from './getImages';

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
    const testimonialImages = await getImagesFromDirectory('/images/testimonials');
    
    // Make sure we have images before creating testimonials
    if (!testimonialImages || testimonialImages.length === 0) {
      console.warn('No testimonial images found');
      return [];
    }

    return [
      {
        id: 1,
        name: "Client 1",
        role: "CEO",
        company: "Company A",
        image: testimonialImages[0]?.src || "/images/placeholder-avatar.png",
        testimonial: "Working with Mocky Digital was an absolute pleasure. Their attention to detail and creative solutions exceeded our expectations."
      },
      {
        id: 2,
        name: "Client 2",
        role: "Marketing Director",
        company: "Company B",
        image: testimonialImages[1]?.src || "/images/placeholder-avatar.png",
        testimonial: "The team at Mocky Digital delivered exceptional results. Their expertise in design and development helped transform our brand."
      },
      {
        id: 3,
        name: "Client 3",
        role: "Founder",
        company: "Company C",
        image: testimonialImages[2]?.src || "/images/placeholder-avatar.png",
        testimonial: "Professional, responsive, and highly skilled. Mocky Digital helped us achieve our digital goals with outstanding results."
      }
    ];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
} 