'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiTag } from 'react-icons/fi';
import type { BlogItem } from '@/app/api/blogs/route';

interface BlogCardProps {
  blog: BlogItem;
  index: number;
}

export default function BlogCard({ blog, index }: BlogCardProps) {
  // Format date for display
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
    >
      {/* Featured Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Link href={`/blog/${blog.slug}`}>
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
            {blog.category}
          </span>
        </div>
        
        {/* Title */}
        <Link href={`/blog/${blog.slug}`} className="group">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h3>
        </Link>
        
        {/* Summary */}
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {blog.summary}
        </p>
        
        {/* Meta Info */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-sm text-gray-500 mt-auto">
          <div className="flex items-center mb-2 sm:mb-0">
            <FiCalendar className="mr-1" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center">
            <FiUser className="mr-1" />
            <span>{blog.author}</span>
          </div>
        </div>
        
        {/* Read More Link */}
        <Link
          href={`/blog/${blog.slug}`}
          className="mt-4 inline-flex items-center font-medium text-primary hover:text-primary-dark"
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
} 