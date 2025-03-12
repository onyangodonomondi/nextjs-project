'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Image from 'next/image';
import Link from 'next/link';

// Types
interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  createdAt: string;
  featuredImage: string | null;
  slug: string;
  author: {
    name: string;
  };
  tags: {
    name: string;
  }[];
}

interface PaginationData {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

// Available categories
const categories = [
  "All",
  "Web Design",
  "Development",
  "Branding",
  "Digital Marketing",
  "UI/UX",
];

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, searchQuery]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...(selectedCategory !== 'All' && { category: selectedCategory }),
        ...(searchQuery && { search: searchQuery }),
        limit: '10',
        page: '1'
      });

      const response = await fetch(`/api/posts?${params}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      
      const data = await response.json();
      setPosts(data.posts);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <PageHero 
          title="Our Blog"
          description="Insights and updates from the world of digital design and development"
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Search and Filter Controls */}
            <div className="mb-12 space-y-6">
              {/* Search Input */}
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 pr-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                      ${selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12 text-red-600">
                <p>{error}</p>
              </div>
            )}

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.featuredImage || "/images/blog/placeholder.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src="/images/team/author1.jpg"
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-900 font-medium">{post.author.name}</p>
                        <p className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()} · {post.excerpt.split(' ').length} min read</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
                    >
                      Read More
                      <i className="fas fa-arrow-right ml-2 text-sm transition-transform group-hover:translate-x-1"></i>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* No Results Message */}
            {!loading && !error && posts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">
                  <i className="fas fa-search"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="mt-12 flex justify-center">
                {/* Add pagination UI here */}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
} 