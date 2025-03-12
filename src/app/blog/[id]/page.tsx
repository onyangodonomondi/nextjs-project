'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import { getPost } from '@/lib/dbUtils';

// Sample blog post data (in a real app, this would come from an API or database)
const blogPost = {
  id: 1,
  title: "The Impact of AI in Modern Web Design",
  content: `
    <p>Artificial Intelligence is revolutionizing the way we approach web design and development. From automated layouts to personalized user experiences, AI is transforming how websites are created and optimized.</p>

    <h2>The Evolution of Web Design</h2>
    <p>Over the past decade, web design has evolved significantly. With the introduction of AI-powered tools, designers can now:</p>
    <ul>
      <li>Generate responsive layouts automatically</li>
      <li>Create personalized user experiences</li>
      <li>Optimize content for better engagement</li>
      <li>Predict user behavior and preferences</li>
    </ul>

    <h2>Key Benefits of AI in Web Design</h2>
    <p>The integration of AI in web design brings numerous advantages:</p>
    <ol>
      <li>Increased efficiency in design process</li>
      <li>Better user engagement through personalization</li>
      <li>Improved conversion rates</li>
      <li>Data-driven design decisions</li>
    </ol>

    <h2>Looking to the Future</h2>
    <p>As AI technology continues to advance, we can expect even more innovative solutions in web design. The future holds exciting possibilities for creating more intelligent and adaptive websites.</p>
  `,
  category: "Web Design",
  date: "Mar 15, 2024",
  readTime: "5 min read",
  image: "/images/blog/ai-web-design.jpg",
  author: {
    name: "John Doe",
    avatar: "/images/team/author1.jpg",
    role: "Senior Web Designer"
  },
  tags: ["AI", "Web Design", "Technology", "UX", "Development"]
};

export default async function BlogPost() {
  const params = useParams();
  const postId = params.id;

  // Update the data fetching
  const post = await getPost(postId);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <PageHero 
          title={blogPost.title}
          description={`${blogPost.category} · ${blogPost.date} · ${blogPost.readTime}`}
        />

        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Featured Image */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12">
                <Image
                  src={blogPost.image}
                  alt={blogPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 mb-12">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={blogPost.author.avatar}
                    alt={blogPost.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{blogPost.author.name}</h3>
                  <p className="text-gray-500 text-sm">{blogPost.author.role}</p>
                </div>
              </div>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {/* Tags */}
              <div className="border-t border-gray-200 pt-8">
                <h4 className="text-sm font-medium text-gray-600 mb-4">Tagged with:</h4>
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Blog
                </Link>
                <div className="flex gap-4">
                  <button className="text-gray-600 hover:text-primary transition-colors">
                    <i className="fas fa-share-alt"></i>
                  </button>
                  <button className="text-gray-600 hover:text-primary transition-colors">
                    <i className="fas fa-bookmark"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
} 