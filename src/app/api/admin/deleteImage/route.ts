import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';
import { access, constants, stat } from 'fs/promises';

export async function DELETE(request: Request) {
  try {
    // Parse JSON body and extract path parameter
    let requestBody;
    try {
      requestBody = await request.json();
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' }, 
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
    }

    const { path: imagePath } = requestBody;
    
    if (!imagePath) {
      return NextResponse.json(
        { error: 'Image path is required' }, 
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
    }

    // Clean the path from any query parameters
    const rawPath = imagePath.split('?')[0].trim();
    
    // Remove leading slash for consistent path handling
    let cleanPath = rawPath.replace(/^\//, '');
    
    // For logos, always enforce the canonical path format
    if (cleanPath.includes('logos') || rawPath.includes('logos')) {
      // Extract the filename
      const filename = path.basename(cleanPath);
      
      // Force the canonical path regardless of what was passed
      cleanPath = `images/portfolio/logos/${filename}`;
      console.log(`Enforcing canonical logo path: ${cleanPath}`);
    }
    
    const fullPath = path.join(process.cwd(), 'public', cleanPath);

    // For logging
    console.log(`Attempting to delete image: ${fullPath}`);

    let fileDeleted = false;

    // Try to delete the file from the canonical path
    try {
      // Verify the path is valid and the file exists
      await access(fullPath, constants.F_OK);
      
      // Validate that this is a file and not a directory
      const fileStats = await stat(fullPath);
      if (!fileStats.isFile()) {
        throw new Error(`Path exists but is not a file: ${fullPath}`);
      }
      
      // File exists, try to delete it
      await unlink(fullPath);
      console.log(`Successfully deleted: ${fullPath}`);
      fileDeleted = true;
    } catch (fileError) {
      // File doesn't exist at the canonical path
      console.log(`File not found at path: ${fullPath}`);
      console.log(`File not found, already deleted: ${fullPath}`);
    }

    // Return success with cache control headers, even if file wasn't found
    // The goal is to remove it from the system, and if it's not there, that goal is met
    return NextResponse.json(
      { 
        success: true,
        fileDeleted,
        message: fileDeleted 
          ? 'File successfully deleted' 
          : 'File not found, already deleted',
        path: fullPath
      },
      { 
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (error) {
    console.error('Error in delete image route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete image', 
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
} 