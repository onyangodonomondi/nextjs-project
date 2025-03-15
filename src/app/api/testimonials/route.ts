import { NextResponse } from 'next/server';
import { getTestimonialsData } from '@/utils/serverUtils';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 1 minute

export async function GET() {
  try {
    const testimonials = await getTestimonialsData();
    
    return NextResponse.json(testimonials, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
} 