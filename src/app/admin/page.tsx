'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { getImagesFromDirectory } from '@/utils/getImages';
import type { ImageItem } from '@/utils/getImages';
import toast from 'react-hot-toast';
import { FiUpload, FiTrash2, FiLogOut, FiRefreshCw, FiImage, FiFolder } from 'react-icons/fi';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { inter } from '../fonts';
import dynamic from 'next/dynamic';
import { clearAuth, isAuthenticated } from '@/utils/auth';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ImageStats } from '@/components/admin/ImageStats';
import { DropZone } from '@/components/admin/DropZone';
import { ImageOptimizationSettings, type OptimizationOptions } from '@/components/admin/ImageOptimizationSettings';
import { FiSearch } from 'react-icons/fi';

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
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [previewImage, setPreviewImage] = useState<ImageItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'name' | 'date' | 'size'>('date');
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [optimizationOptions, setOptimizationOptions] = useState<OptimizationOptions>({
    quality: 80,
    maxWidth: 1920,
    format: 'webp',
    preserveExif: true,
  });
  const router = useRouter();

  // Define fetchImages before using it in useEffect
  const fetchImages = useCallback(async (path: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedImages = await getImagesFromDirectory(path);
      if (!fetchedImages.length) {
        setError(`No images found in ${path}`);
      }
      setImages(fetchedImages);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to fetch images');
      toast.error('Failed to fetch images');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Authentication check
  useEffect(() => {
    const checkAuthAndLoadImages = async () => {
      if (!isAuthenticated()) {
        router.replace('/admin/login');
        return;
      }
      setIsAuthChecking(false);
      await fetchImages(selectedCategory.path);
    };

    checkAuthAndLoadImages();
  }, [router, selectedCategory.path, fetchImages]);

  // Category change handler
  const handleCategoryChange = useCallback(async (category: Category) => {
    setSelectedCategory(category);
    await fetchImages(category.path);
  }, [fetchImages]);

  // Memoize selected category data
  const selectedCategoryData = useMemo(() => {
    return categories.find(cat => cat.id === selectedCategory.id);
  }, [selectedCategory.id]);

  // Add file validation function
  const validateFile = (file: File) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      throw new Error(`Invalid file type: ${file.type}. Only JPG, PNG and WebP are allowed.`);
    }

    if (file.size > maxSize) {
      throw new Error(`File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum size is 5MB.`);
    }

    return true;
  };

  // Update handleFileSelect
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    try {
      files.forEach(validateFile);
      setUploadingFiles(files);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Invalid file');
      event.target.value = ''; // Reset input
    }
  }, []);

  const handleUpload = async () => {
    if (!uploadingFiles.length) {
      toast.error('Please select files to upload');
      return;
    }

    const uploads = uploadingFiles.map(async (file, index) => {
      try {
        // Validate file
        validateFile(file);

        // Compress if needed
        let processedFile = file;
        if (file.size > 1024 * 1024) {
          processedFile = await compressImage(file);
        }

        const formData = new FormData();
        formData.append('file', processedFile);
        formData.append('category', selectedCategory.id);

        // Update progress
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));

        const response = await fetch('/api/admin/uploadImage', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error('Upload failed');

        // Complete progress
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
        toast.success(`Uploaded ${file.name}`);

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
  };

  // Lazy load image compression
  const compressImage = useCallback(async (file: File) => {
    const imageCompression = (await import('browser-image-compression')).default;
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: file.type,
    };

    try {
      console.log(`Compressing image: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
      const compressedFile = await imageCompression(file, options);
      console.log(`Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
      
      return new File([compressedFile], file.name, {
        type: file.type,
        lastModified: file.lastModified,
      });
    } catch (error) {
      console.error('Compression error:', error);
      throw error;
    }
  }, []);

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
    clearAuth();
    router.replace('/admin/login');
  };

  // Add preview handler
  const handleImagePreview = (image: ImageItem) => {
    setPreviewImage(image);
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        handleSelectAll();
      }
      if (e.key === 'Delete' && selectedImages.size > 0) {
        e.preventDefault();
        handleBulkDelete();
      }
      if (e.key === 'Escape' && previewImage) {
        setPreviewImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImages, previewImage]);

  // Add filtered images logic
  const filteredImages = useMemo(() => {
    return images
      .filter(image => 
        image.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.src.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortOrder) {
          case 'name':
            return a.alt.localeCompare(b.alt);
          case 'date':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'size':
            return b.size - a.size;
          default:
            return 0;
        }
      });
  }, [images, searchQuery, sortOrder]);

  // Add bulk selection handlers
  const handleSelectAll = useCallback(() => {
    if (selectedImages.size === filteredImages.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(filteredImages.map(img => img.src)));
    }
  }, [filteredImages, selectedImages.size]);

  const handleBulkDelete = useCallback(async () => {
    if (!selectedImages.size) return;
    
    if (!confirm(`Delete ${selectedImages.size} selected images?`)) return;

    setIsLoading(true);
    try {
      await Promise.all(
        Array.from(selectedImages).map(path =>
          fetch('/api/admin/deleteImage', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path })
          })
        )
      );
      
      toast.success(`Deleted ${selectedImages.size} images`);
      setSelectedImages(new Set());
      await fetchImages(selectedCategory.path);
    } catch (error) {
      console.error('Bulk delete error:', error);
      toast.error('Failed to delete some images');
    } finally {
      setIsLoading(false);
    }
  }, [selectedImages, selectedCategory.path, fetchImages]);

  // Add image selection toggle
  const toggleImageSelection = useCallback((imagePath: string) => {
    setSelectedImages(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(imagePath)) {
        newSelection.delete(imagePath);
      } else {
        newSelection.add(imagePath);
      }
      return newSelection;
    });
  }, []);

  // Render optimization with useMemo
  const renderImages = useMemo(() => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">{error}</p>
          <button
            onClick={() => fetchImages(selectedCategory.path)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Retry
          </button>
        </div>
      );
    }

    if (!images.length) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No images found in this category</p>
        </div>
      );
    }

    return (
      <div className="p-6 space-y-6">
        {/* Stats */}
        <ImageStats images={images} />

        {/* Search and Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
              className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="size">Sort by Size</option>
            </select>

            {selectedImages.size > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {selectedImages.size} selected
                </span>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Image Grid with Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <motion.div
              key={image.src}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
            >
              <div className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={selectedImages.has(image.src)}
                  onChange={() => toggleImageSelection(image.src)}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>

              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                onClick={() => handleImagePreview(image)}
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleDelete(image.src)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery ? 'No images match your search' : 'No images in this category'}
            </p>
          </div>
        )}
      </div>
    );
  }, [filteredImages, isLoading, error, selectedCategory.path, fetchImages]);

  if (isAuthChecking) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
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
                    onClick={() => handleCategoryChange(category)}
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
                  {selectedCategoryData?.name}
                </h2>
                <p className="text-gray-500 mt-1">{selectedCategoryData?.description}</p>
              </div>

              {renderImages}
            </div>
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <Image
                src={previewImage.src}
                alt={previewImage.alt}
                fill
                className="object-contain"
                quality={100}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium">{previewImage.alt}</h3>
              <p className="text-sm text-gray-500 mt-1">{previewImage.src}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 