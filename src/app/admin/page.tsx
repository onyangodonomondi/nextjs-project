'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getImagesFromDirectory } from '@/utils/getImages';
import type { ImageItem } from '@/utils/getImages';
import toast from 'react-hot-toast';
import { FiUpload, FiTrash2, FiLogOut, FiRefreshCw, FiImage, FiFolder, FiSearch, FiX, FiEye } from 'react-icons/fi';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { inter } from '../fonts';
import dynamic from 'next/dynamic';
import { clearAuth, isAuthenticated } from '@/utils/auth';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ImageStats } from '@/components/admin/ImageStats';
import { DropZone } from '@/components/admin/DropZone';
import { ImageOptimizationSettings, type OptimizationOptions } from '@/components/admin/ImageOptimizationSettings';

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
    path: '/images/portfolio/logos',
    description: 'Brand logos and identity designs',
    icon: <FiImage className="w-6 h-6" />
  },
  {
    id: 'cards',
    name: 'Cards',
    path: '/images/portfolio/cards',
    description: 'Business cards and promotional cards',
    icon: <FiImage className="w-6 h-6" />
  },
  {
    id: 'fliers',
    name: 'Fliers',
    path: '/images/portfolio/fliers',
    description: 'Marketing fliers and posters',
    icon: <FiImage className="w-6 h-6" />
  },
  {
    id: 'letterheads',
    name: 'Letterheads',
    path: '/images/portfolio/letterheads',
    description: 'Company letterheads and stationery',
    icon: <FiImage className="w-6 h-6" />
  },
  {
    id: 'profiles',
    name: 'Profiles',
    path: '/images/portfolio/profiles',
    description: 'Company profiles and presentations',
    icon: <FiFolder className="w-6 h-6" />
  },
  {
    id: 'websites',
    name: 'Websites',
    path: '/images/portfolio/websites',
    description: 'Website designs and mockups',
    icon: <FiFolder className="w-6 h-6" />
  }
];

// Wrap the entire component in a higher-order component with Suspense
export default function AdminPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><LoadingSpinner size="lg" /></div>}>
      <AdminDashboard />
    </Suspense>
  );
}

// The actual dashboard component
function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get the selected category from URL or use default
  const initialCategoryId = searchParams?.get('category') || 'logos';
  const initialCategory = categories.find(cat => cat.id === initialCategoryId) || categories[0];
  
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
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
  
  // Track last deleted images to remove them from the UI
  const [deletedImagePaths, setDeletedImagePaths] = useState<Set<string>>(new Set());
  
  // Update URL when category changes (without full page reload)
  const updateUrlWithCategory = useCallback((categoryId: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('category', categoryId);
    window.history.pushState({}, '', url);
  }, []);

  // Define fetchImages before using it in useEffect
  const fetchImages = useCallback(async (path: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Clean path from any existing query parameters
      const cleanPath = path.split('?')[0];
      
      // Add cache-busting timestamp parameter to prevent stale data
      const timestamp = Date.now();
      console.log(`🔍 Fetching images from path: ${cleanPath} with timestamp ${timestamp}`);
      
      // Request optimized images for faster loading (minimal data)
      const optimizedParam = "optimized=true";
      
      // Force the correct path for logos if needed
      let finalPath = cleanPath;
      if (cleanPath.includes('logos') && !cleanPath.includes('/portfolio/')) {
        finalPath = '/images/portfolio/logos';
        console.log(`⚠️ Correcting logo path from ${cleanPath} to ${finalPath}`);
      }
      
      // Get images with cache busting
      console.log(`📡 API Request URL: ${finalPath}?${optimizedParam}&t=${timestamp}`);
      const fetchedImages = await getImagesFromDirectory(`${finalPath}?${optimizedParam}&t=${timestamp}`);
      
      if (!fetchedImages || fetchedImages.length === 0) {
        console.log(`❌ No images found in ${finalPath}`);
        setError(`No images found in ${finalPath}`);
        setImages([]);
        return;
      }
      
      console.log(`✅ Successfully fetched ${fetchedImages.length} images from ${finalPath}`);
      
      // Add cache-busting to image URLs to prevent browser caching
      const processedImages = fetchedImages.map(img => {
        // Make sure the src doesn't already have a timestamp
        const srcWithoutParams = img.src.split('?')[0];
        return {
          ...img,
          src: `${srcWithoutParams}?t=${timestamp}`,
        };
      });
      
      // Filter out any images that have been deleted
      const filteredImages = processedImages.filter(img => {
        const srcWithoutParams = img.src.split('?')[0];
        return !deletedImagePaths.has(srcWithoutParams);
      });
      
      setImages(filteredImages);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch images');
      toast.error('Failed to fetch images');
      
      // Keep existing images if available to prevent UI disruption
      if (images.length === 0) {
        // Set empty array only if we don't have images already
        setImages([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [deletedImagePaths, images.length]);

  // Authentication check
  useEffect(() => {
    const checkAuthAndLoadImages = async () => {
      try {
        // Check if user is authenticated
        const isAuth = isAuthenticated();
        
        if (!isAuth) {
          console.log('User is not authenticated, redirecting to login');
          router.replace('/admin/login');
          return;
        }

        setIsAuthChecking(false);
        setIsLoading(true);
        
        // Set the correct category directory path format
        let categoryPath = selectedCategory.path;
        
        // Force the correct path for logos if needed
        if (selectedCategory.id === 'logos' && !categoryPath.includes('/portfolio/')) {
          categoryPath = '/images/portfolio/logos';
          console.log(`⚠️ Correcting initial logo path to: ${categoryPath}`);
        }

        console.log(`🔄 Loading images from category: ${selectedCategory.name} (${categoryPath})`);

        // Request optimized images for faster initial load (minimal data)
        const optimizedParam = "optimized=true";
        const timestamp = Date.now();
        
        console.log(`📡 Initial API Request URL: ${categoryPath}?${optimizedParam}&t=${timestamp}`);
        
        // Use the getImagesFromDirectory function with cache busting and optimized flag
        const fetchedImages = await getImagesFromDirectory(`${categoryPath}?${optimizedParam}&t=${timestamp}`);
        
        // Log the fetched images for debugging
        console.log(`✅ Fetched ${fetchedImages.length} images from ${categoryPath}`);
              
        if (fetchedImages.length === 0) {
          setError(`No images found in ${categoryPath}`);
          setImages([]);
          setIsLoading(false);
          return;
        }
        
        // Sort the images by newest first, using null checks for createdAt
        const sortedImages = [...fetchedImages].sort((a, b) => {
          if (!a.createdAt && !b.createdAt) return 0;
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        
        // Add cache busting to prevent browser caching
        const processedImages = sortedImages.map(img => {
          const srcWithoutParams = img.src.split('?')[0];
          return {
            ...img,
            src: `${srcWithoutParams}?t=${timestamp}`,
          };
        });
        
        // Filter out any images that have been deleted in this session
        const filteredImages = processedImages.filter(img => {
          const srcWithoutParams = img.src.split('?')[0];
          return !deletedImagePaths.has(srcWithoutParams);
        });
        
        setImages(filteredImages);
        setError(null);
        
        // Calculate total size of all images (use default size if not available)
        const totalBytes = sortedImages.reduce((sum, img) => sum + (img.size || 0), 0);
        console.log(`Total size of images: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
      } catch (error) {
        console.error('Error loading images:', error);
        
        // Set a user-friendly error message
        setError('Failed to load images. Please try again.');
      } finally {
        setIsLoading(false);
        setIsAuthChecking(false);
      }
    };

    checkAuthAndLoadImages();
  }, [router, selectedCategory, deletedImagePaths]);

  // Category change handler - also update URL for persistence
  const handleCategoryChange = useCallback(async (category: Category) => {
    setSelectedCategory(category);
    updateUrlWithCategory(category.id);
    await fetchImages(category.path);
  }, [fetchImages, updateUrlWithCategory]);

  // Memoize selected category data
  const selectedCategoryData = useMemo(() => {
    return categories.find(cat => cat.id === selectedCategory.id);
  }, [selectedCategory.id]);

  // Add file validation function
  const validateFile = (file: File) => {
    const maxSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      throw new Error(`Invalid file type: ${file.type}. Only JPG, PNG and WebP are allowed.`);
    }

    if (file.size > maxSize) {
      throw new Error(`File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum size is 2MB.`);
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
    // Extract base path without query parameters
    const baseImagePath = imagePath.split('?')[0];
    
    // Always ensure the path uses the canonical format for logos
    let correctedPath = baseImagePath;
    
    // Check if this is a logo and correct its path if needed
    if (selectedCategory.id === 'logos' && !baseImagePath.includes('/portfolio/logos')) {
      // Extract the filename
      const filename = baseImagePath.split('/').pop();
      
      // Set the canonical path
      correctedPath = `/images/portfolio/logos/${filename}`;
      console.log(`Converting to canonical logo path: ${correctedPath}`);
    }

    try {
      if (window.confirm('Are you sure you want to delete this image?')) {
        // Add the base path to the deleted paths set to immediately remove from UI
        setDeletedImagePaths(prev => {
          const newSet = new Set(prev);
          newSet.add(baseImagePath);
          return newSet;
        });
        
        // Update the UI immediately by filtering out the deleted image
        setImages(prevImages => prevImages.filter(img => {
          const imgBasePath = img.src.split('?')[0];
          return imgBasePath !== baseImagePath;
        }));
        
        // Show success toast
        toast.success('Image deleted successfully');
        
        // Make the API request with the corrected path
        console.log(`Attempting to delete image: ${correctedPath}`);
        const response = await fetch('/api/admin/deleteImage', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            path: correctedPath,
            // No alternative paths - only use the canonical path
            alternativePaths: []
          }),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          console.error('Error deleting image:', result);
          throw new Error(result.error || 'Failed to delete image');
        }
        
        console.log('Delete API response:', result);
      }
    } catch (error) {
      console.error('Error in deletion:', error);
      toast.error('Failed to delete image');
      
      // On error, remove the image from the deleted paths set and refresh
      setDeletedImagePaths(prev => {
        const newSet = new Set(prev);
        newSet.delete(baseImagePath);
        return newSet;
      });
      
      // Reload the images
      fetchImages(selectedCategory.path);
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

  // Fix the filteredImages to include both filtering and sorting
  const filteredImages = useMemo(() => {
    // Apply search filter
    const filtered = searchQuery 
      ? images.filter((img: ImageItem) => {
          const normalizedQuery = searchQuery.toLowerCase();
          return (
            img.alt?.toLowerCase().includes(normalizedQuery) ||
            img.src?.toLowerCase().includes(normalizedQuery) ||
            img.title?.toLowerCase().includes(normalizedQuery) ||
            img.category?.toLowerCase().includes(normalizedQuery)
          );
        })
      : images;
    
    // Then apply sorting
    return filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'name':
          return a.alt.localeCompare(b.alt);
        case 'date':
          return new Date(b.createdAt || Date.now()).getTime() - new Date(a.createdAt || Date.now()).getTime();
        case 'size':
          return (b.size ?? 0) - (a.size ?? 0);
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

  const handleBulkDelete = async () => {
    if (selectedImages.size === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedImages.size} images?`)) {
      try {
        setIsLoading(true);
        
        // Track which images are being deleted for UI update
        const imagesToDelete = new Set(Array.from(selectedImages).map(path => path.split('?')[0]));
        
        // Update UI immediately by adding to deletedImagePaths
        setDeletedImagePaths(prev => {
          const newSet = new Set(prev);
          imagesToDelete.forEach(path => newSet.add(path));
          return newSet;
        });
        
        // Update images array to remove deleted images
        setImages(prevImages => prevImages.filter(img => {
          const baseImagePath = img.src.split('?')[0];
          return !imagesToDelete.has(baseImagePath);
        }));
        
        const deletePromises = Array.from(selectedImages).map(async (imagePath) => {
          // Get base path without timestamp
          const baseImagePath = imagePath.split('?')[0];
          
          // Always ensure the path uses the canonical format for logos
          let correctedPath = baseImagePath;
          
          // Check if this is a logo and correct its path
          if (selectedCategory.id === 'logos' && !baseImagePath.includes('/portfolio/logos')) {
            // Extract the filename
            const filename = baseImagePath.split('/').pop();
            
            // Set the canonical path
            correctedPath = `/images/portfolio/logos/${filename}`;
            console.log(`Converting to canonical logo path: ${correctedPath}`);
          }
        
          const response = await fetch('/api/admin/deleteImage', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              path: correctedPath,
              // No alternative paths - only use the canonical path
              alternativePaths: []
            }),
          });
          
          return response.ok;
        });
        
        const results = await Promise.all(deletePromises);
        const successCount = results.filter(Boolean).length;
        
        // Show a success message with the count
        toast.success(`Successfully deleted ${successCount} images`);
        
        // Clear selection 
        setSelectedImages(new Set());
      } catch (error) {
        console.error('Error in bulk deletion:', error);
        toast.error('Failed to delete some images');
      } finally {
        setIsLoading(false);
      }
    }
  };

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

  // Handle refresh button click
  const handleRefresh = useCallback(() => {
    fetchImages(selectedCategory.path);
  }, [fetchImages, selectedCategory.path]);

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

        {/* Image Grid with Virtualization for better performance */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.slice(0, 40).map((image) => (
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
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
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

        {/* Show load more button if we have more than 40 images */}
        {filteredImages.length > 40 && (
          <div className="text-center pt-4">
            <button 
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              onClick={() => {
                // This would implement pagination logic in a full implementation
                toast.success("Showing first 40 images for better performance");
              }}
            >
              Showing first 40 images ({filteredImages.length} total)
            </button>
          </div>
        )}

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
  }, [filteredImages, isLoading, error, selectedCategory.path, fetchImages, selectedImages, toggleImageSelection, handleDelete]);

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
              onClick={handleRefresh}
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