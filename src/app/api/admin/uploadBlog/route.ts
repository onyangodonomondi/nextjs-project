import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

// Directory paths
const BLOGS_DIR = path.join(process.cwd(), 'public', 'images', 'blog');
const METADATA_DIR = path.join(process.cwd(), 'public', 'data', 'blogs');

// Define the interface for blog metadata
interface BlogMetadata {
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
  status: 'draft' | 'published';
}

export async function POST(request: NextRequest) {
  try {
    // Parse the form data
    const formData = await request.formData();
    
    // Extract fields from form data
    const file = formData.get('file') as File | null;
    const title = formData.get('title') as string;
    const summary = formData.get('summary') as string;
    const content = formData.get('content') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    const tagsString = formData.get('tags') as string;
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()) : [];
    const status = (formData.get('status') as 'draft' | 'published') || 'draft';
    
    // Validate required fields
    if (!file || !title || !summary || !content || !category) {
      return NextResponse.json(
        { error: 'Featured image, title, summary, content, and category are required' },
        { status: 400 }
      );
    }
    
    // Create directories if they don't exist
    await ensureDirectoriesExist();
    
    // Generate a unique id for the blog
    const id = uuidv4();
    
    // Generate slug from title
    const slug = slugify(title, { 
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
    
    // Generate unique filename for the image based on timestamp
    const timestamp = Date.now();
    const originalFilename = file.name;
    const fileExtension = originalFilename.split('.').pop() || 'jpg';
    const newFilename = `${timestamp}-${slug}.${fileExtension}`;
    const imagePath = path.join(BLOGS_DIR, newFilename);
    
    // Convert file to buffer and save it
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await writeFile(imagePath, fileBuffer);
    
    // Create the relative path for the image (for use in frontend)
    const relativePath = `/images/blog/${newFilename}`;
    
    // Create metadata object
    const metadata: BlogMetadata = {
      id,
      title,
      summary,
      content,
      featuredImage: relativePath,
      author: author || 'Mocky Digital',
      category,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slug,
      status
    };
    
    // Generate metadata filename
    const metadataFilename = `${slug}.json`;
    const metadataPath = path.join(METADATA_DIR, metadataFilename);
    
    // Save metadata to JSON file
    await writeFile(metadataPath, JSON.stringify(metadata, null, 2));
    console.log(`Saved blog metadata to: ${metadataPath}`);
    
    // Try to invalidate the cache for the blog pages
    try {
      await fetch(`${request.nextUrl.origin}/api/blogs`, {
        method: 'DELETE',
      });
      console.log('Successfully invalidated blog cache');
    } catch (cacheError) {
      console.error('Error invalidating cache:', cacheError);
    }
    
    // Revalidate paths
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    
    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      blog: metadata
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

/**
 * Helper function to ensure required directories exist
 */
async function ensureDirectoriesExist() {
  try {
    // Create blog images directory if it doesn't exist
    await mkdir(BLOGS_DIR, { recursive: true });
    
    // Create metadata directory if it doesn't exist
    await mkdir(METADATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating directories:', error);
    throw new Error('Failed to create required directories');
  }
} 