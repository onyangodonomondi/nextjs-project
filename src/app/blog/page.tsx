import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Digital Marketing & Web Development Blog | Mocky Digital Kenya',
  description: 'Expert insights on web design, digital marketing, and branding strategies for Kenyan businesses. Learn about the latest trends and best practices.',
  keywords: 'digital marketing blog, web development tips, branding strategies kenya, seo guide nairobi, business growth kenya, web design tutorials'
};

export default function BlogPage() {
  return (
    <main className="pt-24">
      <PageHero 
        title="Digital Marketing & Web Development Blog"
        subtitle="Expert Insights for Business Growth in Kenya"
      />
      {/* Add your blog content structure */}
    </main>
  );
} 