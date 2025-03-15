import React from 'react';

// Higher Order Component for performance optimization
export function withPerformanceOptimization<T>(Component: React.ComponentType<T>) {
  // Create a wrapper component
  const OptimizedComponent = (props: T) => {
    // Here you can add performance monitoring, error boundaries, etc.
    return <Component {...props} />;
  };

  // Set display name for debugging
  const displayName = Component.displayName || Component.name || 'Component';
  OptimizedComponent.displayName = `Optimized(${displayName})`;

  return OptimizedComponent;
} 