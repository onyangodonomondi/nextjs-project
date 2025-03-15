'use client';

import { useEffect } from 'react';

export default function DebugInfo({ data, label = 'Debug' }: { data: any, label?: string }) {
  useEffect(() => {
    console.log(`[${label}]`, data);
  }, [data, label]);
  
  return null;
} 