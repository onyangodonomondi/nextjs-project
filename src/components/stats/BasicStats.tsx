export default function BasicStats() {
  return (
    <section className="py-16 bg-[#0A2558]">
      <div className="container mx-auto px-4 text-white">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 p-4 rounded">
            <p className="text-3xl font-bold">150+</p>
            <p>Projects</p>
          </div>
          <div className="bg-white/10 p-4 rounded">
            <p className="text-3xl font-bold">100+</p>
            <p>Clients</p>
          </div>
          <div className="bg-white/10 p-4 rounded">
            <p className="text-3xl font-bold">5+</p>
            <p>Years</p>
          </div>
          <div className="bg-white/10 p-4 rounded">
            <p className="text-3xl font-bold">100%</p>
            <p>Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
} 