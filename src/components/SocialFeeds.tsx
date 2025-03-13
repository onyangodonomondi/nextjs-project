'use client';

export default function SocialFeeds() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Connect With Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow us on social media for updates and inspiration
          </p>
        </div>

        {/* Social Media Links */}
        <div className="max-w-lg mx-auto space-y-4">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/mockydigital"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#1877F2] hover:bg-[#1877F2]/90 
            text-white rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30
            group relative overflow-hidden"
          >
            <i className="fab fa-facebook text-2xl"></i>
            <span className="font-medium text-lg">Follow on Facebook</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/mockydigital"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] 
            hover:opacity-90 text-white rounded-lg transition-all duration-300 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30
            group relative overflow-hidden"
          >
            <i className="fab fa-instagram text-2xl"></i>
            <span className="font-medium text-lg">Follow on Instagram</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </a>

          {/* Twitter/X */}
          <a
            href="https://twitter.com/mockydigital"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-black hover:bg-black/90 
            text-white rounded-lg transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-black/30
            group relative overflow-hidden"
          >
            <i className="fab fa-x-twitter text-2xl"></i>
            <span className="font-medium text-lg">Follow on X</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@mockydigital"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-black hover:bg-black/90 
            text-white rounded-lg transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-black/30
            group relative overflow-hidden"
          >
            <i className="fab fa-tiktok text-2xl"></i>
            <span className="font-medium text-lg">Follow on TikTok</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </a>
        </div>
      </div>
    </section>
  );
} 