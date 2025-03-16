import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

// Cache time to live (10 minutes)
const CACHE_TTL = 10 * 60 * 1000;

// Define the interface for blog items
export interface BlogItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  metadataFilename?: string;
  status: 'draft' | 'published';
}

// Keep cache of blogs to improve performance
let blogsCache: BlogItem[] | null = null;
let lastCacheTime = 0;

// Directory paths
const BLOGS_DIR = path.join(process.cwd(), 'public', 'images', 'blog');
const METADATA_DIR = path.join(process.cwd(), 'public', 'data', 'blogs');

/**
 * GET handler - retrieves all blogs or filtered by category/tag
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string, 10) : undefined;
    const forceFresh = searchParams.has('fresh');
    
    // Check if we have a valid cache that's not expired
    const now = Date.now();
    if (blogsCache && (now - lastCacheTime < CACHE_TTL) && !forceFresh) {
      console.log('Returning blogs from cache');
      
      // Filter cache if needed
      let filteredBlogs = blogsCache;
      
      if (category) {
        filteredBlogs = filteredBlogs.filter(blog => blog.category.toLowerCase() === category.toLowerCase());
      }
      
      if (tag) {
        filteredBlogs = filteredBlogs.filter(blog => blog.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
      }
      
      if (status) {
        filteredBlogs = filteredBlogs.filter(blog => blog.status === status);
      } else {
        // Default to published only for non-admin requests
        filteredBlogs = filteredBlogs.filter(blog => blog.status === 'published');
      }
      
      // Apply limit if specified
      if (limit && limit > 0) {
        filteredBlogs = filteredBlogs.slice(0, limit);
      }
      
      return NextResponse.json(filteredBlogs, {
        headers: {
          'Cache-Control': 'public, max-age=600', // 10 minutes
        }
      });
    }
    
    // Ensure directories exist
    await ensureDirectoriesExist();
    
    // Get all blog posts from metadata
    const blogs = await getAllBlogs();
    
    // Update cache
    blogsCache = blogs;
    lastCacheTime = now;
    
    // Filter blogs if needed
    let filteredBlogs = blogs;
    
    if (category) {
      filteredBlogs = filteredBlogs.filter(blog => blog.category.toLowerCase() === category.toLowerCase());
    }
    
    if (tag) {
      filteredBlogs = filteredBlogs.filter(blog => blog.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    }
    
    if (status) {
      filteredBlogs = filteredBlogs.filter(blog => blog.status === status);
    } else {
      // Default to published only for non-admin requests
      filteredBlogs = filteredBlogs.filter(blog => blog.status === 'published');
    }
    
    // Apply limit if specified
    if (limit && limit > 0) {
      filteredBlogs = filteredBlogs.slice(0, limit);
    }
    
    return NextResponse.json(filteredBlogs, {
      headers: {
        'Cache-Control': 'public, max-age=600', // 10 minutes
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler - invalidates the cache
 */
export async function DELETE() {
  // Clear the cache
  blogsCache = null;
  lastCacheTime = 0;
  
  // Revalidate the blog pages
  revalidatePath('/blog');
  revalidatePath('/api/blogs');
  
  return NextResponse.json(
    { success: true, message: 'Blog cache invalidated' },
    { status: 200 }
  );
}

/**
 * Helper function to ensure required directories exist
 */
async function ensureDirectoriesExist() {
  try {
    // Create blog images directory if it doesn't exist
    await fs.mkdir(BLOGS_DIR, { recursive: true });
    
    // Create metadata directory if it doesn't exist
    await fs.mkdir(METADATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating directories:', error);
    throw new Error('Failed to create required directories');
  }
}

/**
 * Helper function to get all blogs from metadata
 */
async function getAllBlogs(): Promise<BlogItem[]> {
  try {
    // Read the metadata directory
    const files = await fs.readdir(METADATA_DIR);
    const metadataFiles = files.filter(file => file.endsWith('.json'));
    
    // Array to store all blogs
    const blogs: BlogItem[] = [];
    
    // Read each metadata file
    for (const file of metadataFiles) {
      try {
        const filePath = path.join(METADATA_DIR, file);
        const data = await fs.readFile(filePath, 'utf-8');
        const metadata = JSON.parse(data) as BlogItem;
        
        // Add the metadata filename for future reference
        metadata.metadataFilename = file;
        
        // Add to blogs array
        blogs.push(metadata);
      } catch (error) {
        console.error(`Error reading metadata file ${file}:`, error);
        // Continue with next file
      }
    }
    
    // Sort by createdAt descending (newest first)
    return blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Error getting blogs from metadata:', error);
    throw new Error('Failed to get blogs from metadata');
  }
} 