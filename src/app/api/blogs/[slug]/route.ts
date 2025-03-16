import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { BlogItem } from '../route';

const METADATA_DIR = path.join(process.cwd(), 'public', 'data', 'blogs');

// Cache for single blog posts (slug -> blog data)
const singleBlogCache: Record<string, { blog: BlogItem; timestamp: number }> = {};
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const forceFresh = request.nextUrl.searchParams.has('fresh');
    
    // Check cache
    const now = Date.now();
    if (
      singleBlogCache[slug] && 
      (now - singleBlogCache[slug].timestamp < CACHE_TTL) && 
      !forceFresh
    ) {
      console.log(`Returning blog '${slug}' from cache`);
      return NextResponse.json(singleBlogCache[slug].blog);
    }
    
    // Find the blog post in the metadata directory
    const files = await fs.readdir(METADATA_DIR);
    const metadataFiles = files.filter(file => file.endsWith('.json'));
    
    let foundBlog: BlogItem | null = null;
    
    for (const file of metadataFiles) {
      try {
        const filePath = path.join(METADATA_DIR, file);
        const data = await fs.readFile(filePath, 'utf-8');
        const blog = JSON.parse(data) as BlogItem;
        
        if (blog.slug === slug) {
          // Add the metadata filename for future reference
          blog.metadataFilename = file;
          foundBlog = blog;
          break;
        }
      } catch (error) {
        console.error(`Error reading metadata file ${file}:`, error);
        // Continue with next file
      }
    }
    
    if (!foundBlog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Update cache
    singleBlogCache[slug] = {
      blog: foundBlog,
      timestamp: now,
    };
    
    return NextResponse.json(foundBlog);
  } catch (error) {
    console.error(`Error fetching blog post:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
} 