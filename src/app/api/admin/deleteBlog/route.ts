import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { unlink } from 'fs/promises';
import { revalidatePath } from 'next/cache';

// Directory paths
const METADATA_DIR = path.join(process.cwd(), 'public', 'data', 'blogs');

export async function DELETE(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { metadataFilename, slug } = body;
    
    if (!metadataFilename || !slug) {
      return NextResponse.json(
        { error: 'Metadata filename and slug are required' },
        { status: 400 }
      );
    }
    
    // Get the metadata file path
    const metadataPath = path.join(METADATA_DIR, metadataFilename);
    
    // Read the metadata file to get the featured image path
    try {
      const data = await fs.readFile(metadataPath, 'utf-8');
      const metadata = JSON.parse(data);
      
      // Delete the featured image if it exists
      if (metadata.featuredImage && metadata.featuredImage.includes('/images/blog/')) {
        try {
          const imagePath = path.join(process.cwd(), 'public', metadata.featuredImage.replace(/^\//, ''));
          await unlink(imagePath);
          console.log(`Deleted blog image: ${imagePath}`);
        } catch (error) {
          console.error('Error deleting blog image:', error);
          // Continue even if image delete fails
        }
      }
      
      // Delete the metadata file
      await unlink(metadataPath);
      console.log(`Deleted blog metadata: ${metadataPath}`);
      
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
        message: 'Blog post deleted successfully'
      });
    } catch (error) {
      console.error('Error reading or deleting blog post:', error);
      return NextResponse.json(
        { error: 'Blog post not found or could not be deleted' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
} 