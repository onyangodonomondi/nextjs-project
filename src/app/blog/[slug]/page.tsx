'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import BlogDetail from '@/components/blog/BlogDetail';
import type { BlogItem } from '@/app/api/blogs/route';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function SingleBlogPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch blog post
  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found');
          }
          throw new Error('Failed to fetch blog post');
        }
        
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError(error instanceof Error ? error.message : 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [slug]);
  
  // Loading state
  if (loading) {
    return (
      <main className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </main>
    );
  }
  
  // Error state
  if (error || !blog) {
    return (
      <main className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              {error || 'Blog post not found'}
            </h1>
            <p className="mb-8">
              The blog post you're looking for could not be found or is no longer available.
            </p>
            <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary-dark">
              <FiArrowLeft className="mr-2" />
              Back to Blogs
            </Link>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="pt-24">
      <div className="container mx-auto px-4 py-12">
        <ErrorBoundary>
          <BlogDetail blog={blog} />
        </ErrorBoundary>
      </div>
    </main>
  );
} 