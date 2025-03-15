'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface LogoModalProps {
  src: string;
  onClose: () => void;
}

export default function LogoModal({ src, onClose }: LogoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Handle clicks outside the modal
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';

    // Clean up
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-96 md:h-[70vh]">
          <Image
            src={src}
            alt="Logo Preview"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
            quality={90}
            priority
          />
        </div>
        <div className="flex justify-between items-center bg-white p-4">
          <button
            onClick={onClose}
            className="ml-auto bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-full"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 