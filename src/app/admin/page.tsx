'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getImagesFromDirectory } from '@/utils/getImages';
import type { ImageItem } from '@/utils/getImages';
import toast from 'react-hot-toast';
import { FiUpload, FiTrash2, FiLogOut, FiRefreshCw, FiImage, FiFolder } from 'react-icons/fi';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  path: string;
  description: string;
  icon: JSX.Element;
}

const categories: Category[] = [
  {
    id: 'logos',
    name: 'Logos',
    path: '/images/logos',
    description: 'Brand logos and identity designs',
    icon: <FiImage className="w-6 h-6" />
  },
  {
    id: 'branding',
    name: 'Branding',
    path: '/images/branding',
    description: 'Complete branding materials',
    icon: <FiFolder className="w-6 h-6" />
  },
  {
    id: 'fliers',
    name: 'Fliers',
    path: '/images/portfolio/fliers',
    description: 'Marketing fliers and posters',
    icon: <FiImage className="w-6 h-6" />
  },
  {
    id: 'websites',
    name: 'Websites',
    path: '/images/portfolio/websites',
    description: 'Website designs and mockups',
    icon: <FiFolder className="w-6 h-6" />
  }
];

export default function AdminDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const router = useRouter();

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth || adminAuth !== process.env.NEXT_PUBLIC_ADMIN_AUTH) {
      router.push('/admin/login');
      return;
    }
    fetchImages(selectedCategory.path);
  }, [router, selectedCategory]);

  const fetchImages = async (path: string) => {
    setIsLoading(true);
    try {
      const fetchedImages = await getImagesFromDirectory(path);
      setImages(fetchedImages);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Failed to fetch images');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadingFiles(files);
  };

  const handleUpload = async () => {
    if (!uploadingFiles.length) {
      toast.error('Please select files to upload');
      return;
    }

    const uploads = uploadingFiles.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', selectedCategory.id);

      try {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));

        const response = await fetch('/api/admin/uploadImage', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error('Upload failed');

        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
        return response.json();
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`Failed to upload ${file.name}`);
        return null;
      }
    });

    await Promise.all(uploads);
    setUploadingFiles([]);
    setUploadProgress({});
    fetchImages(selectedCategory.path);
    toast.success('Upload complete');
  };

  const handleDelete = async (imagePath: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch('/api/admin/deleteImage', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: imagePath })
      });

      if (!response.ok) throw new Error('Delete failed');

      toast.success('Image deleted');
      fetchImages(selectedCategory.path);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Portfolio Manager</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => fetchImages(selectedCategory.path)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Refresh"
            >
              <FiRefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                      selectedCategory.id === category.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {category.icon}
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm opacity-75">{category.description}</div>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Upload Section */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="font-medium text-gray-900">Upload Images</h3>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="w-full"
                />
                {uploadingFiles.length > 0 && (
                  <div className="space-y-2">
                    {uploadingFiles.map((file) => (
                      <div key={file.name} className="text-sm">
                        <div className="flex justify-between text-gray-600">
                          <span className="truncate">{file.name}</span>
                          <span>{uploadProgress[file.name] || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-primary h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[file.name] || 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={handleUpload}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                    >
                      <FiUpload className="w-5 h-5" />
                      Upload {uploadingFiles.length} file(s)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedCategory.name}
                </h2>
                <p className="text-gray-500 mt-1">{selectedCategory.description}</p>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {images.map((image) => (
                        <motion.div
                          key={image.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => handleDelete(image.src)}
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 