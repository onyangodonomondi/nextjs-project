'use client';

import { useState } from 'react';
import ImageUpload from './ImageUpload';

export default function BlogPostForm() {
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);

  const handleImageUpload = (filepath: string) => {
    setFeaturedImage(filepath);
  };

  return (
    <form>
      {/* Other form fields */}
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Featured Image
        </label>
        <ImageUpload
          onUpload={handleImageUpload}
          currentImage={featuredImage}
        />
      </div>

      {/* Rest of the form */}
    </form>
  );
} 