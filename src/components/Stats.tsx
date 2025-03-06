'use client';

export default function Stats() {
  const stats = [
    { number: '150+', label: 'Projects Completed', icon: '🎯' },
    { number: '50+', label: 'Happy Clients', icon: '😊' },
    { number: '5+', label: 'Years Experience', icon: '⭐' },
    { number: '100%', label: 'Client Satisfaction', icon: '🏆' }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering excellence through numbers that speak for themselves
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-primary">
                {stat.number}
              </div>
              <div className="text-lg text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 