'use client';

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We learn about your business, goals, and requirements'
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'We develop a tailored plan to achieve your objectives'
    },
    {
      number: '03',
      title: 'Design & Development',
      description: 'We create and refine your digital solutions'
    },
    {
      number: '04',
      title: 'Launch & Support',
      description: 'We deploy your project and provide ongoing maintenance'
    }
  ];

  return (
    <section className="process bg-gray-50 py-20" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="section-header text-center mb-16">
          <span className="text-orange-500 font-semibold mb-2 block">How We Work</span>
          <h2 className="text-3xl font-bold mb-4">Our Process</h2>
          <p className="text-xl text-gray-600">We follow a systematic approach to deliver the best results</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="process-step text-center" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="step-number text-4xl font-bold text-orange-500 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 