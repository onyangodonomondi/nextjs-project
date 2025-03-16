'use client';

import React, { useState, useEffect } from 'react';
import PageHero from '@/components/PageHero';
import BlogGrid from '@/components/blog/BlogGrid';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useSearchParams } from 'next/navigation';
import type { BlogItem } from '@/app/api/blogs/route';

export const metadata = {
  title: 'Digital Marketing & Web Development Blog | Mocky Digital Kenya',
  description: 'Expert insights on web design, digital marketing, and branding strategies for Kenyan businesses. Learn about the latest trends and best practices.',
  keywords: 'digital marketing blog, web development tips, branding strategies kenya, seo guide nairobi, business growth kenya, web design tutorials'
};

export default function BlogPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const tagParam = searchParams.get('tag');
  
  const [initialBlogs, setInitialBlogs] = useState<BlogItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch initial blogs
  useEffect(() => {
    const fetchInitialBlogs = async () => {
      try {
        // Build query params
        const params = new URLSearchParams();
        if (categoryParam) params.append('category', categoryParam);
        if (tagParam) params.append('tag', tagParam);
        
        const response = await fetch(`/api/blogs?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const data = await response.json();
        setInitialBlogs(data);
      } catch (error) {
        console.error('Error fetching initial blogs:', error);
        setInitialBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialBlogs();
  }, [categoryParam, tagParam]);
  
  return (
    <main className="pt-24">
      <PageHero 
        title="Digital Marketing & Web Development Blog"
        subtitle="Expert Insights for Business Growth in Kenya"
      />
      
      <section className="container mx-auto px-4 py-12">
        <ErrorBoundary>
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <BlogGrid 
              initialBlogs={initialBlogs || []}
              category={categoryParam || undefined}
              tag={tagParam || undefined}
              showFilters={true}
            />
          )}
        </ErrorBoundary>
      </section>
    </main>
  );
} 