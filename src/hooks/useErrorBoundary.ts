'use client';

import { useState, useCallback } from 'react';

export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);
  
  const handleError = useCallback((error: Error) => {
    console.error('Component error caught:', error);
    setError(error);
  }, []);
  
  return { error, handleError };
} 