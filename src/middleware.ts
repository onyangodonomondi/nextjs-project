import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const adminAuth = request.cookies.get('adminAuth');

  // Handle admin routes
  if (path.startsWith('/admin')) {
    // Allow access to login page if not authenticated
    if (path === '/admin/login') {
      if (adminAuth?.value === process.env.NEXT_PUBLIC_ADMIN_AUTH) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Protect other admin routes
    if (adminAuth?.value !== process.env.NEXT_PUBLIC_ADMIN_AUTH) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Start with a more limited matcher
  matcher: ['/admin/:path*']
}; 