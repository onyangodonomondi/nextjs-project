import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add caching headers for images
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
    const response = NextResponse.next();
    
    // Cache successful requests for 1 week
    response.headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/images/:path*'
}; 