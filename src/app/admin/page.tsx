'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getImagesFromDirectory } from '@/utils/getImages';
import type { ImageItem } from '@/utils/getImages';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';
import { UploadQueue } from '@/services/uploadQueue';
import { ImageValidator } from '@/utils/imageValidation';
import { ErrorTracker } from '@/services/errorTracking';
import { ImageDebug } from '@/components/ImageDebug';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ImageLoader } from '@/components/ImageLoader';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiCopy, FiEdit2, FiMaximize2 } from 'react-icons/fi';

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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
        categories.map(async (category) => {
          console.log('Loading images for category:', category.path);
          const images = await getImagesFromDirectory(category.path);
          console.log('Loaded images:', images);
          
          return {
            ...category,
            images: images.map(img => {
              const src = img.src.startsWith('/') ? img.src : `/${img.src}`;
              console.log('Processed image path:', src);
              return {
                ...img,
                src,
              };
            })
          };
        })
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

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: file.type,
      initialQuality: 0.8,
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
      console.error('Error compressing image:', error);
      throw new Error('Image compression failed');
    }
  };

  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files?.length) return;
    let file = files[0];
    
    setIsLoading(true);
    try {
      // Validate image
      const validation = await ImageValidator.validateImage(file);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      // Compress if file size is over 1MB
      if (file.size > 1024 * 1024) {
        const compressedFile = await compressImage(file);
        file = compressedFile;
      }

      // Upload file
      const result = await UploadQueue.addToQueue({
        file,
        category: selectedCategory,
        options: {
          preserveOriginal: true,
          quality: 80
        }
      });

      toast.success('Image uploaded successfully');
      
      // Refresh category
      const updatedCategories = [...categories];
      const categoryIndex = updatedCategories.findIndex(cat => cat.name === selectedCategory);
      if (categoryIndex !== -1) {
        const images = await getImagesFromDirectory(updatedCategories[categoryIndex].path);
        updatedCategories[categoryIndex] = {
          ...updatedCategories[categoryIndex],
          images
        };
        setCategories(updatedCategories);
      }
    } catch (error) {
      ErrorTracker.trackError(
        error as Error,
        'ImageUpload',
        { category: selectedCategory, fileName: file.name }
      );
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  }, [categories, selectedCategory]);

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

  const filteredImages = useCallback(() => {
    const category = categories.find((cat) => cat.name === selectedCategory);
    if (!category) return [];
    
    return category.images.filter(image => 
      image.alt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, selectedCategory, searchTerm]);

  const handleImagePreview = (image: ImageItem) => {
    setSelectedImage(image);
    setIsPreviewOpen(true);
  };

  const handleCopyUrl = async (imageSrc: string) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${imageSrc}`);
      toast.success('Image URL copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  const handleDownload = async (imageSrc: string) => {
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = imageSrc.split('/').pop() || 'image';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  const filteredAndSortedImages = useCallback(() => {
    const filtered = filteredImages();
    
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.alt.localeCompare(b.alt)
          : b.alt.localeCompare(a.alt);
      }
      // Add date sorting when you have date metadata
      return 0;
    });
  }, [filteredImages, sortBy, sortOrder]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Admin Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
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
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            
            {/* Add Quick Stats */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-gray-500">Total Images: </span>
                <span className="font-semibold">{
                  categories.reduce((acc, cat) => acc + cat.images.length, 0)
                }</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Current Category: </span>
                <span className="font-semibold">{selectedCategory}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Category Navigation */}
      <div className="sticky top-16 bg-gray-50 border-b z-40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2 overflow-x-auto py-2 w-full sm:w-auto">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === category.name
                      ? 'bg-primary text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-50 hover:scale-102'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {category.name}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category.name 
                        ? 'bg-white/20' 
                        : 'bg-gray-100'
                    }`}>
                      {category.images.length}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {/* Add Control Panel */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'date')}
                  className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary"
                >
                  <option value="name">Sort by Name</option>
                  <option value="date">Sort by Date</option>
                </select>

                <button
                  onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
                  className="p-2 rounded bg-white hover:bg-gray-50"
                >
                  <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                </button>

                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white'}`}
                >
                  <i className="fas fa-grid-2"></i>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white'}`}
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Upload Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className={`
            border-2 border-dashed rounded-lg p-8 mb-8 text-center cursor-pointer
            transition-all duration-300 transform
            ${isDragging 
              ? 'border-primary bg-primary/5 scale-102' 
              : 'border-gray-300 hover:border-primary hover:scale-101'
            }
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
            <i className={`fas fa-cloud-upload-alt text-5xl mb-4 transition-colors duration-200 ${
              isDragging ? 'text-primary' : 'text-gray-400'
            }`}></i>
            {isDragging ? (
              <p className="text-primary text-lg font-medium">Drop to upload to {selectedCategory}</p>
            ) : (
              <>
                <p className="text-gray-600 text-lg">Drag & drop an image here, or click to select</p>
                <p className="text-sm text-gray-500 mt-2">
                  Uploading to: <span className="font-medium">{selectedCategory}</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Supported formats: JPG, PNG, WebP • Max size: 5MB • Images over 1MB will be compressed
                </p>
              </>
            )}
          </div>
        </div>

        {/* Enhanced Image Grid */}
        <ErrorBoundary>
          <motion.div
            layout
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "flex flex-col gap-4"
            }
          >
            <AnimatePresence>
              {filteredAndSortedImages().map((image) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
                    viewMode === 'list' ? 'flex items-center p-4' : ''
                  }`}
                >
                  <div 
                    className={`relative cursor-pointer ${
                      viewMode === 'list' ? 'w-24 h-24' : 'aspect-square'
                    }`}
                    onClick={() => handleImagePreview(image)}
                  >
                    <ImageLoader
                      src={image.src}
                      alt={image.alt}
                      className="object-cover"
                    />
                  </div>

                  {/* Enhanced Overlay with more actions */}
                  <div className={`
                    absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-200 flex flex-col items-center justify-center gap-4
                    ${viewMode === 'list' ? 'hidden' : ''}
                  `}>
                    <p className="text-white text-sm px-4 text-center break-words">
                      {image.alt}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUrl(image.src);
                        }}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                        title="Copy URL"
                      >
                        <FiCopy />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(image.src);
                        }}
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                        title="Download"
                      >
                        <FiDownload />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(image.src);
                        }}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                        title="Delete"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>

                  {/* Enhanced List View Info */}
                  {viewMode === 'list' && (
                    <div className="flex-1 ml-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{image.alt}</p>
                        <p className="text-sm text-gray-500">{image.src.split('/').pop()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyUrl(image.src)}
                          className="text-blue-500 hover:text-blue-600 p-2"
                          title="Copy URL"
                        >
                          <FiCopy />
                        </button>
                        <button
                          onClick={() => handleDownload(image.src)}
                          className="text-green-500 hover:text-green-600 p-2"
                          title="Download"
                        >
                          <FiDownload />
                        </button>
                        <button
                          onClick={() => handleDeleteImage(image.src)}
                          className="text-red-500 hover:text-red-600 p-2"
                          title="Delete"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </ErrorBoundary>
      </div>

      {/* Enhanced Loading Indicator */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl animate-fadeIn">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-lg">Processing image...</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Image Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-lg font-medium">{selectedImage.alt}</h3>
                <p className="text-sm text-gray-500">{selectedImage.src}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleCopyUrl(selectedImage.src)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <FiCopy /> Copy URL
                  </button>
                  <button
                    onClick={() => handleDownload(selectedImage.src)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <FiDownload /> Download
                  </button>
                  <button
                    onClick={() => handleDeleteImage(selectedImage.src)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <i className="fas fa-trash-alt"></i> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 