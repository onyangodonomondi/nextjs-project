'use client';

export default function SocialFeeds() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#144272]">
            Connect With Us
          </h2>
          <p className="text-gray-600">
            Follow us on social media for updates and inspiration
          </p>
        </div>

        {/* Social Follow Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          <a 
            href="https://www.facebook.com/mockydigital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-full hover:bg-[#1877F2]/90 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <i className="fab fa-facebook text-xl"></i>
            <span className="font-medium">Follow on Facebook</span>
          </a>

          <a 
            href="https://www.instagram.com/mockydigital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#E4405F] text-white rounded-full hover:bg-[#E4405F]/90 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <i className="fab fa-instagram text-xl"></i>
            <span className="font-medium">Follow on Instagram</span>
          </a>

          <a 
            href="https://twitter.com/mockydigital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <i className="fab fa-x-twitter text-xl"></i>
            <span className="font-medium">Follow on X</span>
          </a>

          <a 
            href="https://www.tiktok.com/@mockydigital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#000000] text-white rounded-full hover:bg-[#000000]/90 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <i className="fab fa-tiktok text-xl"></i>
            <span className="font-medium">Follow on TikTok</span>
          </a>
        </div>
      </div>
    </section>
  );
} 