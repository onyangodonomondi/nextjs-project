'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FiUpload, FiX, FiSave, FiEdit } from 'react-icons/fi';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import type { BlogItem } from '@/app/api/blogs/route';

// Import the editor dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="border rounded-lg p-4 h-64 bg-gray-50 flex items-center justify-center">
      <LoadingSpinner size="md" />
      <span className="ml-2">Loading editor...</span>
    </div>
  ),
});

interface BlogFormProps {
  onSuccess?: (blog: BlogItem) => void;
  onCancel?: () => void;
  initialData?: BlogItem;
  isEdit?: boolean;
}

export default function BlogForm({ 
  onSuccess, 
  onCancel, 
  initialData,
  isEdit = false
}: BlogFormProps) {
  // Form state
  const [title, setTitle] = useState(initialData?.title || '');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');
  const [status, setStatus] = useState<'draft' | 'published'>(initialData?.status || 'draft');
  
  // File state
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.featuredImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Loading state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);
  
  // Categories
  const categories = [
    'Web Development',
    'Digital Marketing',
    'Graphic Design',
    'Branding',
    'SEO',
    'Social Media',
    'E-commerce',
    'UI/UX Design',
    'Business',
    'Technology'
  ];
  
  // Handle client-side only components
  useEffect(() => {
    setMounted(true);
    
    // Load Quill CSS on the client side
    const link = document.createElement('link');
    link.href = 'https://unpkg.com/react-quill@2.0.0/dist/quill.snow.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);
  
  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  
  // Handle file removal
  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!summary.trim()) newErrors.summary = 'Summary is required';
    if (!content.trim()) newErrors.content = 'Content is required';
    if (!category) newErrors.category = 'Category is required';
    if (!previewUrl && !file) newErrors.file = 'Featured image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    
    try {
      // Create form data
      const formData = new FormData();
      
      // Add fields to form data
      if (isEdit && initialData) {
        formData.append('id', initialData.id);
        formData.append('metadataFilename', initialData.metadataFilename || '');
        formData.append('currentFeaturedImage', initialData.featuredImage);
      }
      
      formData.append('title', title);
      formData.append('summary', summary);
      formData.append('content', content);
      formData.append('author', author);
      formData.append('category', category);
      formData.append('tags', tags);
      formData.append('status', status);
      
      // Add file if selected
      if (file) {
        formData.append('file', file);
      }
      
      // Send request to API
      const endpoint = isEdit 
        ? '/api/admin/updateBlog' 
        : '/api/admin/uploadBlog';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save blog post');
      }
      
      const data = await response.json();
      
      // Show success message
      toast.success(isEdit ? 'Blog post updated successfully' : 'Blog post created successfully');
      
      // Call success callback
      if (onSuccess) {
        onSuccess(data.blog);
      }
      
      // Reset form if not editing
      if (!isEdit) {
        setTitle('');
        setSummary('');
        setContent('');
        setAuthor('');
        setCategory('');
        setTags('');
        setStatus('draft');
        setFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };
  
  // Quill editor modules and formats
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image', 'align'
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter blog title"
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>
        
        {/* Summary */}
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
            Summary <span className="text-red-500">*</span>
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.summary ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter a brief summary of the blog post"
          />
          {errors.summary && <p className="mt-1 text-sm text-red-500">{errors.summary}</p>}
        </div>
        
        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Featured Image <span className="text-red-500">*</span>
          </label>
          
          {previewUrl ? (
            <div className="relative aspect-video w-full max-w-md mb-2 rounded-lg overflow-hidden">
              <Image
                src={previewUrl}
                alt="Featured image preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveFile}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <FiX />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 ${
                errors.file ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Click to upload featured image</p>
              <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          {errors.file && <p className="mt-1 text-sm text-red-500">{errors.file}</p>}
        </div>
        
        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content <span className="text-red-500">*</span>
          </label>
          <div className={`${errors.content ? 'border border-red-500 rounded-lg' : ''} min-h-[400px]`}>
            {mounted && (
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="Write your blog post content here..."
                theme="snow"
                className="h-64 mb-12"
              />
            )}
          </div>
          {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
        </div>
        
        {/* Author */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter author name"
          />
        </div>
        
        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
        </div>
        
        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="e.g. web design, seo, marketing"
          />
        </div>
        
        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="draft"
                checked={status === 'draft'}
                onChange={() => setStatus('draft')}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2">Draft</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="published"
                checked={status === 'published'}
                onChange={() => setStatus('published')}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2">Published</span>
            </label>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" color="white" />
                <span className="ml-2">Saving...</span>
              </>
            ) : (
              <>
                {isEdit ? <FiEdit className="mr-2" /> : <FiSave className="mr-2" />}
                {isEdit ? 'Update Post' : 'Save Post'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 