'use client';

// Minimalist implementation with no dependencies
export default function SimpleStats() {
  return (
    <section className="py-16 bg-[#0A2558] w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Impact
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/10 p-6 rounded-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">150+</div>
              <p className="text-white/80">Projects Completed</p>
            </div>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">100+</div>
              <p className="text-white/80">Happy Clients</p>
            </div>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">5+</div>
              <p className="text-white/80">Years Experience</p>
            </div>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">100%</div>
              <p className="text-white/80">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 