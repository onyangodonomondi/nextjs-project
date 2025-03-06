export default function WhyChooseUs() {
  const reasons = [
    {
      icon: '🎯',
      title: 'Strategic Approach',
      description: 'We develop tailored solutions aligned with your business goals and target audience.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We stay ahead of industry trends to deliver cutting-edge digital solutions.'
    },
    {
      icon: '🤝',
      title: 'Partnership',
      description: 'We work closely with you, ensuring transparent communication throughout the project.'
    },
    {
      icon: '⚡',
      title: 'Fast Delivery',
      description: 'We maintain quick turnaround times without compromising on quality.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Partner with us for innovative digital solutions that drive real business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-4xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-bold text-primary mb-3">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 