'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

export default function Stats() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const stats = [
    {
      number: 150,
      suffix: '+',
      label: 'Projects Completed',
      gradient: 'from-[#0A2558] to-[#1a3a6d]'
    },
    {
      number: 100,
      suffix: '+',
      label: 'Happy Clients',
      gradient: 'from-[#1a3a6d] to-[#0A2558]'
    },
    {
      number: 5,
      suffix: '+',
      label: 'Years Experience',
      gradient: 'from-[#0A2558] to-[#1a3a6d]'
    },
    {
      number: 100,
      suffix: '%',
      label: 'Client Satisfaction',
      gradient: 'from-[#1a3a6d] to-[#0A2558]'
    }
  ];

  return (
    <section className="py-16 bg-[#0A2558] w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Impact
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Delivering excellence through numbers that speak for themselves
          </p>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-white/10`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="flex items-baseline">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {hasAnimated && (
                      <CountUp
                        end={stat.number}
                        duration={2}
                        separator=","
                      />
                    )}
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-white/90">
                    {stat.suffix}
                  </span>
                </div>
                
                <p className="text-white/80 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Stats as original }; 