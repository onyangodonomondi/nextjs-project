interface PageHeroProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
  description?: string;
}

export default function PageHero({ title, subtitle, bgImage, description }: PageHeroProps) {
  return (
    <section className="hero-small bg-gradient-to-br from-primary to-secondary text-white py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{title}</h1>
          {subtitle && <p className="text-xl text-white">{subtitle}</p>}
          {description && <p className="text-xl text-white">{description}</p>}
        </div>
      </div>
    </section>
  );
} 