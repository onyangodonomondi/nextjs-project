import Image from 'next/image';
import { useEffect } from 'react';

interface LogoModalProps {
  src: string;
  onClose: () => void;
}

export default function LogoModal({ src, onClose }: LogoModalProps) {
  // Ensure src is valid
  const validSrc = src || '/images/portfolio/logo-types/wordmark.png';
  
  // Prevent scrolling of the body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Add ESC key listener
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl">
        <Image
          src={validSrc}
          alt="Enlarged logo"
          width={1200}
          height={1200}
          quality={90}
          priority
          className="object-contain w-full h-auto"
          onError={(e) => {
            // Fallback to a default image on error
            const target = e.target as HTMLImageElement;
            target.src = '/images/portfolio/logo-types/wordmark.png';
          }}
        />
        <button
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close modal"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
} 