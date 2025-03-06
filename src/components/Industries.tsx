export default function Industries() {
  const industries = [
    { icon: '🏢', name: 'Corporate', description: 'Enterprise solutions for large organizations' },
    { icon: '🛍️', name: 'E-commerce', description: 'Online retail and digital marketplace solutions' },
    { icon: '🏥', name: 'Healthcare', description: 'Digital solutions for medical practices' },
    { icon: '🎓', name: 'Education', description: 'E-learning and educational platforms' },
    { icon: '🏦', name: 'Finance', description: 'Fintech and banking solutions' },
    { icon: '🏪', name: 'Retail', description: 'Point of sale and inventory systems' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Industries We Serve</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver specialized solutions across various industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl hover:bg-gray-100 transition-colors"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-4xl mb-4">{industry.icon}</div>
              <h3 className="text-xl font-bold text-primary mb-2">{industry.name}</h3>
              <p className="text-gray-600">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 