import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Professional Branding Services in Kenya | Corporate Identity Design',
  description: 'Expert branding and corporate identity design services in Nairobi. Create a powerful brand that resonates with your audience and drives business growth.',
  keywords: 'corporate branding kenya, logo design nairobi, brand identity, business branding, professional branding agency, brand development kenya'
};

export default function BrandingPage() {
  return (
    <main className="pt-24">
      <PageHero 
        title="Brand Development & Corporate Identity"
        subtitle="Create a Powerful Brand Identity that Sets You Apart"
      />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Professional Branding Services in Kenya</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Logo Design & Brand Identity</h3>
              <p className="text-gray-600">Professional logo design and brand identity development for businesses in Nairobi and across Kenya.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Corporate Branding</h3>
              <p className="text-gray-600">Comprehensive corporate branding solutions to establish a strong market presence.</p>
            </div>
            {/* Add more sections */}
          </div>
        </div>
      </section>
    </main>
  );
} 