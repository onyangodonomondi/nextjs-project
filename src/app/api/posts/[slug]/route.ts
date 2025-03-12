import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { PostWithRelations } from '@/types/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { 
        slug: params.slug 
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        },
        tags: {
          select: {
            name: true
          }
        }
      }
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post satisfies PostWithRelations);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 