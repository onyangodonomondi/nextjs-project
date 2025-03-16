import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { writeFile, mkdir, unlink } from 'fs/promises';
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
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const summary = formData.get('summary') as string;
    const content = formData.get('content') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    const tagsString = formData.get('tags') as string;
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()) : [];
    const status = (formData.get('status') as 'draft' | 'published') || 'draft';
    const metadataFilename = formData.get('metadataFilename') as string;
    const currentFeaturedImage = formData.get('currentFeaturedImage') as string;
    
    // Validate required fields
    if (!id || !title || !summary || !content || !category || !metadataFilename) {
      return NextResponse.json(
        { error: 'ID, title, summary, content, category, and metadata filename are required' },
        { status: 400 }
      );
    }
    
    // Create directories if they don't exist
    await ensureDirectoriesExist();
    
    // Read the existing metadata
    const metadataPath = path.join(METADATA_DIR, metadataFilename);
    let existingMetadata: BlogMetadata;
    
    try {
      const data = await fs.readFile(metadataPath, 'utf-8');
      existingMetadata = JSON.parse(data);
    } catch (error) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Generate slug from title (if title changed)
    const newSlug = slugify(title, { 
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
    
    let featuredImagePath = currentFeaturedImage || existingMetadata.featuredImage;
    
    // Handle new image upload if provided
    if (file) {
      // Delete previous image if it exists and is not the default
      if (existingMetadata.featuredImage && existingMetadata.featuredImage.includes('/images/blog/')) {
        try {
          const oldImagePath = path.join(process.cwd(), 'public', existingMetadata.featuredImage.replace(/^\//, ''));
          await unlink(oldImagePath);
          console.log(`Deleted old image: ${oldImagePath}`);
        } catch (error) {
          console.error('Error deleting old image:', error);
          // Continue even if delete fails
        }
      }
      
      // Generate unique filename for the new image
      const timestamp = Date.now();
      const originalFilename = file.name;
      const fileExtension = originalFilename.split('.').pop() || 'jpg';
      const newFilename = `${timestamp}-${newSlug}.${fileExtension}`;
      const imagePath = path.join(BLOGS_DIR, newFilename);
      
      // Convert file to buffer and save it
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      await writeFile(imagePath, fileBuffer);
      
      // Create the relative path for the image
      featuredImagePath = `/images/blog/${newFilename}`;
    }
    
    // Update metadata object
    const updatedMetadata: BlogMetadata = {
      ...existingMetadata,
      title,
      summary,
      content,
      featuredImage: featuredImagePath,
      author: author || existingMetadata.author,
      category,
      tags,
      updatedAt: new Date().toISOString(),
      slug: newSlug,
      status
    };
    
    // If the slug changed, we need to create a new metadata file and delete the old one
    if (newSlug !== existingMetadata.slug) {
      // Create new metadata file
      const newMetadataFilename = `${newSlug}.json`;
      const newMetadataPath = path.join(METADATA_DIR, newMetadataFilename);
      
      // Save updated metadata to new file
      await writeFile(newMetadataPath, JSON.stringify(updatedMetadata, null, 2));
      console.log(`Saved updated blog metadata to: ${newMetadataPath}`);
      
      // Delete old metadata file
      try {
        await unlink(metadataPath);
        console.log(`Deleted old metadata file: ${metadataPath}`);
      } catch (error) {
        console.error('Error deleting old metadata file:', error);
        // Continue even if delete fails
      }
    } else {
      // Save updated metadata to the same file
      await writeFile(metadataPath, JSON.stringify(updatedMetadata, null, 2));
      console.log(`Updated blog metadata in: ${metadataPath}`);
    }
    
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
    revalidatePath(`/blog/${existingMetadata.slug}`);
    if (newSlug !== existingMetadata.slug) {
      revalidatePath(`/blog/${newSlug}`);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
      blog: updatedMetadata,
      metadataFilename: newSlug !== existingMetadata.slug ? `${newSlug}.json` : metadataFilename
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
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