'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getImagesFromDirectory } from '@/utils/getImages';
import type { ImageItem } from '@/utils/getImages';
import toast from 'react-hot-toast';

interface ImageCategory {
  name: string;
  path: string;
  images: ImageItem[];
}

export default function AdminDashboard() {
  const [categories, setCategories] = useState<ImageCategory[]>([
    { name: 'Branding', path: '/images/branding', images: [] },
    { name: 'Packaging', path: '/images/packaging', images: [] },
    { name: 'Cards', path: '/images/portfolio/cards', images: [] },
    { name: 'Fliers', path: '/images/portfolio/fliers', images: [] },
    { name: 'Letterheads', path: '/images/portfolio/letterheads', images: [] },
    { name: 'Logos', path: '/images/logos', images: [] },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Branding');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Check authentication
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth || adminAuth !== process.env.NEXT_PUBLIC_ADMIN_AUTH) {
      router.push('/admin/login');
      return;
    }
    loadImages();
  }, [router]);

  const loadImages = async () => {
    try {
      const updatedCategories = await Promise.all(
        categories.map(async (category) => ({
          ...category,
          images: await getImagesFromDirectory(category.path),
        }))
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error loading images:', error);
      toast.error('Failed to load images');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async (imagePath: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch('/api/admin/deleteImage', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: imagePath }),
      });

      if (response.ok) {
        toast.success('Image deleted successfully');
        await loadImages();
      } else {
        throw new Error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', categories.find(cat => cat.name === selectedCategory)?.path || '');

      const response = await fetch('/api/admin/uploadImage', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      toast.success('Image uploaded successfully');
      await loadImages();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.png"
                  alt="Mocky Digital"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-xl font-bold text-gray-900 ml-3">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16"> {/* Add padding top to account for fixed header */}
        {/* Category Navigation */}
        <div className="sticky top-16 bg-gray-50 border-b z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto py-4">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === category.name
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {category.name}
                    <span className="text-xs bg-opacity-20 px-2 py-1 rounded-full">
                      {category.images.length}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 mb-8 text-center cursor-pointer
              transition-colors duration-200
              ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}
            `}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            <div className="flex flex-col items-center">
              <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-3"></i>
              {isDragging ? (
                <p className="text-primary">Drop the image here</p>
              ) : (
                <>
                  <p className="text-gray-600">Drag & drop an image here, or click to select</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Uploading to: {selectedCategory}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Image Grid with fixed image handling */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories
              .find((cat) => cat.name === selectedCategory)
              ?.images.map((image) => (
                <div
                  key={image.id}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover"
                      priority={image.id <= 4}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-4">
                      <p className="text-white text-sm px-4 text-center">{image.alt}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteImage(image.src)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                        >
                          <i className="fas fa-trash-alt"></i>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
} 