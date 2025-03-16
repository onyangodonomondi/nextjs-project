'use client';

import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiEye, FiPlus, FiRefreshCw } from 'react-icons/fi';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';
import BlogForm from './BlogForm';
import type { BlogItem } from '@/app/api/blogs/route';
import Image from 'next/image';

export default function BlogManager() {
  // State
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Fetch blogs on mount
  useEffect(() => {
    fetchBlogs();
  }, []);
  
  // Fetch blogs from API
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Include status=draft to get all blogs including drafts
      const response = await fetch('/api/blogs?status=draft');
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    
    try {
      // Invalidate cache
      await fetch('/api/blogs', { method: 'DELETE' });
      
      // Fetch fresh data
      await fetchBlogs();
      
      toast.success('Blog list refreshed');
    } catch (error) {
      console.error('Error refreshing blogs:', error);
      toast.error('Failed to refresh blog list');
    } finally {
      setRefreshing(false);
    }
  };
  
  // Handle create
  const handleCreate = () => {
    setEditingBlog(null);
    setShowForm(true);
  };
  
  // Handle edit
  const handleEdit = (blog: BlogItem) => {
    setEditingBlog(blog);
    setShowForm(true);
  };
  
  // Handle delete
  const handleDelete = async (blog: BlogItem) => {
    if (!blog.metadataFilename) {
      toast.error('Cannot delete blog: Missing metadata filename');
      return;
    }
    
    if (!confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      return;
    }
    
    try {
      const response = await fetch('/api/admin/deleteBlog', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metadataFilename: blog.metadataFilename,
          slug: blog.slug,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete blog post');
      }
      
      // Remove from state
      setBlogs(blogs.filter(b => b.id !== blog.id));
      
      toast.success('Blog post deleted successfully');
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete blog post');
    }
  };
  
  // Handle form success
  const handleFormSuccess = (blog: BlogItem) => {
    if (editingBlog) {
      // Update existing blog in state
      setBlogs(blogs.map(b => b.id === blog.id ? blog : b));
    } else {
      // Add new blog to state
      setBlogs([blog, ...blogs]);
    }
    
    setShowForm(false);
    setEditingBlog(null);
  };
  
  // Handle form cancel
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingBlog(null);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Render blog form
  if (showForm) {
    return (
      <div className="space-y-6">
        <BlogForm
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
          initialData={editingBlog || undefined}
          isEdit={!!editingBlog}
        />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        
        <div className="flex space-x-2">
          <button
            onClick={handleRefresh}
            className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
            disabled={refreshing}
          >
            {refreshing ? (
              <>
                <LoadingSpinner size="sm" />
                <span className="ml-2">Refreshing...</span>
              </>
            ) : (
              <>
                <FiRefreshCw className="mr-2" />
                Refresh
              </>
            )}
          </button>
          
          <button
            onClick={handleCreate}
            className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center"
          >
            <FiPlus className="mr-2" />
            New Post
          </button>
        </div>
      </div>
      
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
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No blog posts found.</p>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Create Your First Blog Post
          </button>
        </div>
      )}
      
      {/* Blog list */}
      {!loading && !error && blogs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blog Post
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <Image
                          src={blog.featuredImage}
                          alt={blog.title}
                          fill
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{blog.summary}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-primary">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      blog.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(blog.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <FiEye />
                      </a>
                      <button
                        onClick={() => handleEdit(blog)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(blog)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 