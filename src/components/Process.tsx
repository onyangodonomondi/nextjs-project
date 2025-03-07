'use client';

import { useInView } from 'react-intersection-observer';

export default function Process() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

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
    <section className="py-16 bg-[#0A2558] w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-medium mb-2 block">
            How We Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Process
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            We follow a systematic approach to deliver the best results
          </p>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-white/10"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <span className="text-4xl font-bold text-orange-500">
                  {step.number}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-white/80">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 