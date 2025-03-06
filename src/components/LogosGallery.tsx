'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

interface LogoType {
  title: string;
  description: string;
  examples: string;
  image: string;
}

interface Props {
  logos: ImageItem[];
}

const logoTypes: LogoType[] = [
  {
    title: 'Wordmark Logos',
    description: 'Text-based logos that focus on your company name',
    examples: 'Like Coca-Cola, Google, or Disney',
    image: '/images/portfolio/logo-types/wordmark.png'
  },
  {
    title: 'Lettermark Logos',
    description: 'Initials or acronyms of your company name',
    examples: 'Like IBM, CNN, or HP',
    image: '/images/portfolio/logo-types/lettermark.png'
  },
  {
    title: 'Symbol Logos',
    description: 'Iconic designs that represent your brand',
    examples: 'Like Apple\'s apple or Twitter\'s bird',
    image: '/images/portfolio/logo-types/symbol.png'
  },
  {
    title: 'Combination Marks',
    description: 'Text and symbols combined into one logo',
    examples: 'Like Burger King or Adidas',
    image: '/images/portfolio/logo-types/combination.png'
  },
  {
    title: 'Emblem Logos',
    description: 'Text inside a symbol or icon',
    examples: 'Like Starbucks or Harvard University',
    image: '/images/portfolio/logo-types/emblem.png'
  },
  {
    title: 'Dynamic Logos',
    description: 'Logos that can change while keeping their basic identity',
    examples: 'Like Google Doodles',
    image: '/images/portfolio/logo-types/dynamic.png'
  }
];

export default function LogosGallery({ logos }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    logoType: '',
    description: '',
    color: '',
    reference: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle the form submission
    // For now, we'll redirect to WhatsApp with the information
    const message = encodeURIComponent(
      `Hi Mocky Digital,\n\nI'm interested in a logo design:\n` +
      `Name: ${formData.name}\n` +
      `Company: ${formData.company}\n` +
      `Logo Type: ${formData.logoType}\n` +
      `Description: ${formData.description}\n` +
      `Preferred Colors: ${formData.color}\n` +
      `Reference Examples: ${formData.reference}`
    );
    window.open(`https://wa.me/254741590670?text=${message}`, '_blank');
  };

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <PageHero 
          title="Logo Design Portfolio"
          description="Explore our collection of unique and memorable logo designs."
        />

        {/* Logo Types Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary">Types of Logos We Create</h2>
              <p className="text-xl text-gray-600">
                Choose the perfect logo style for your brand
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {logoTypes.map((type) => (
                <div 
                  key={type.title}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  data-aos="fade-up"
                >
                  <div className="relative w-full aspect-square mb-4 max-w-[200px] mx-auto">
                    <Image
                      src={type.image}
                      alt={type.title}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 200px"
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-primary">{type.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                  <p className="text-xs text-gray-500">{type.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-orange-500">Our Logo Designs</h2>
              <p className="text-xl text-gray-600">
                Browse through our collection of professional logo designs
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {logos.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  data-aos="fade-up"
                  onClick={() => setSelectedImage(item.src)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading={index < 6 ? "eager" : "lazy"}
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                    quality={75}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Request Form Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setShowRequestForm(true)}
            className="bg-primary text-white px-6 py-4 rounded-full shadow-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <i className="fas fa-pencil-alt"></i>
            Request Logo Design
          </button>
        </div>

        {/* Request Form Modal */}
        {showRequestForm && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowRequestForm(false)}
          >
            <div 
              className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-6">Request Logo Design</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Logo Type</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.logoType}
                    onChange={e => setFormData({...formData, logoType: e.target.value})}
                    required
                  >
                    <option value="">Select a logo type</option>
                    {logoTypes.map(type => (
                      <option key={type.title} value={type.title}>{type.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description of Your Business</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Colors</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="e.g., Blue and Gold, Modern and Professional colors"
                    value={formData.color}
                    onChange={e => setFormData({...formData, color: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Reference Examples (Optional)</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={2}
                    placeholder="Links or descriptions of logos you like"
                    value={formData.reference}
                    onChange={e => setFormData({...formData, reference: e.target.value})}
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="px-6 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full max-w-4xl">
              <Image
                src={selectedImage}
                alt="Enlarged logo"
                width={1200}
                height={1200}
                quality={90}
                priority
                className="object-contain w-full h-auto"
              />
              <button
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
} 