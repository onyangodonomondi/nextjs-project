'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };
  
  const colorClasses = {
    primary: 'border-t-primary',
    white: 'border-t-white',
    gray: 'border-t-gray-600',
  };
  
  return (
    <div className="flex justify-center items-center p-4">
      <div 
        className={`${sizeClasses[size]} rounded-full border-gray-200 ${colorClasses[color] || 'border-t-primary'} animate-spin`} 
        role="status" 
        aria-label="Loading"
      />
    </div>
  );
} 