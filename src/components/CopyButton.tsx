'use client';

import React, { useState } from 'react';

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
}

export default function CopyButton({ textToCopy, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <button 
      className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded transition-colors duration-200 ${
        copied 
          ? 'bg-green-100 text-green-700' 
          : 'bg-orange-50 text-[#FF5400] hover:bg-orange-100'
      }`}
      onClick={handleCopy}
      aria-label={`Copy ${label} to clipboard`}
    >
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
            <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
} 