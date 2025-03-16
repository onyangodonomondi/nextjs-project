'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiTag, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import type { BlogItem } from '@/app/api/blogs/route';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface BlogDetailProps {
  blog: BlogItem;
}

export default function BlogDetail({ blog }: BlogDetailProps) {
  // Format date for display
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.summary,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('Link copied to clipboard!');
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
        });
    }
  };
  
  return (
    <ErrorBoundary>
      <article className="max-w-4xl mx-auto">
        {/* Back to blogs link */}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary-dark">
            <FiArrowLeft className="mr-2" />
            Back to Blogs
          </Link>
        </div>
        
        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-video w-full overflow-hidden rounded-xl mb-8"
        >
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </motion.div>
        
        {/* Blog Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          {/* Category Badge */}
          <div className="mb-4">
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">
              {blog.category}
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {blog.title}
          </h1>
          
          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <FiCalendar className="mr-1" />
              <span>{formattedDate}</span>
            </div>
            
            <div className="flex items-center">
              <FiUser className="mr-1" />
              <span>{blog.author}</span>
            </div>
            
            {/* Share Button */}
            <button 
              onClick={handleShare}
              className="flex items-center text-primary hover:text-primary-dark ml-auto"
            >
              <FiShare2 className="mr-1" />
              <span>Share</span>
            </button>
          </div>
        </motion.div>
        
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {blog.tags.map((tag) => (
              <Link 
                key={tag} 
                href={`/blog?tag=${tag}`}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
              >
                #{tag}
              </Link>
            ))}
          </motion.div>
        )}
        
        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        {/* Share and Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="flex justify-between items-center">
            <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary-dark">
              <FiArrowLeft className="mr-2" />
              Back to Blogs
            </Link>
            
            <button 
              onClick={handleShare}
              className="flex items-center text-primary hover:text-primary-dark"
            >
              <FiShare2 className="mr-1" />
              <span>Share</span>
            </button>
          </div>
        </motion.div>
      </article>
    </ErrorBoundary>
  );
} 