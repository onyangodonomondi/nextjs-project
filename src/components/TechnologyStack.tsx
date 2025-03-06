export default function TechnologyStack() {
  const technologies = [
    { category: 'Frontend', items: ['React', 'Next.js', 'Vue.js', 'Angular'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'PHP', 'Java'] },
    { category: 'Database', items: ['MongoDB', 'MySQL', 'PostgreSQL'] },
    { category: 'Cloud', items: ['AWS', 'Google Cloud', 'Azure'] }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Technology Stack</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We use cutting-edge technologies to build robust solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h3 className="text-xl font-bold text-primary mb-4">{tech.category}</h3>
              <ul className="space-y-2">
                {tech.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <i className="fas fa-check text-accent"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 