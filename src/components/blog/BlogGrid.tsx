'use client';

import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { BlogItem } from '@/app/api/blogs/route';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface BlogGridProps {
  category?: string;
  tag?: string;
  limit?: number;
  showFilters?: boolean;
  initialBlogs?: BlogItem[];
}

export default function BlogGrid({ 
  category: initialCategory,
  tag: initialTag,
  limit,
  showFilters = true,
  initialBlogs
}: BlogGridProps) {
  const [blogs, setBlogs] = useState<BlogItem[]>(initialBlogs || []);
  const [loading, setLoading] = useState(!initialBlogs);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState(initialCategory || '');
  const [tag, setTag] = useState(initialTag || '');
  
  // List of categories for filtering
  const [categories, setCategories] = useState<string[]>([]);
  // List of tags for filtering
  const [tags, setTags] = useState<string[]>([]);
  
  // Fetch blogs based on filters
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query params
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (tag) params.append('tag', tag);
      if (limit) params.append('limit', limit.toString());
      
      const response = await fetch(`/api/blogs?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      
      const data = await response.json();
      setBlogs(data);
      
      // Extract unique categories and tags for filters
      if (data.length > 0 && showFilters) {
        const uniqueCategories = [...new Set(data.map((blog: BlogItem) => blog.category))];
        setCategories(uniqueCategories);
        
        const allTags = data.flatMap((blog: BlogItem) => blog.tags);
        const uniqueTags = [...new Set(allTags)];
        setTags(uniqueTags);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch blogs on mount or when filters change
  useEffect(() => {
    if (!initialBlogs) {
      fetchBlogs();
    }
  }, [category, tag, limit]);
  
  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  
  // Handle tag change
  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTag(e.target.value);
  };
  
  return (
    <div className="space-y-8">
      {/* Filters */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          {/* Category filter */}
          <div className="w-full sm:w-auto">
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          
          {/* Tag filter */}
          {tags.length > 0 && (
            <div className="w-full sm:w-auto">
              <select
                value={tag}
                onChange={handleTagChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">All Tags</option>
                {tags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
      
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <button
            onClick={fetchBlogs}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
      
      {/* Empty state */}
      {!loading && !error && blogs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No blog posts found.</p>
        </div>
      )}
      
      {/* Blog grid */}
      {!loading && !error && blogs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </motion.div>
      )}
    </div>
  );
} 