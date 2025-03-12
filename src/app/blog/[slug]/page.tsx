'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  featuredImage: string | null;
  author: {
    name: string;
    email: string;
  };
  tags: {
    name: string;
  }[];
}

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.slug}`);
        if (!response.ok) {
          throw new Error(response.status === 404 ? 'Post not found' : 'Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !post) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <PageHero 
          title={post.title}
          description={`${post.category} · ${new Date(post.createdAt).toLocaleDateString()}`}
        />

        {/* Rest of your blog post display logic */}
      </main>
    </>
  );
} 