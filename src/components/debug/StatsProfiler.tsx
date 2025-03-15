'use client';

import React, { Profiler } from 'react';
import Stats from '@/components/Stats';

export default function StatsProfiler() {
  // Callback function to log render performance
  const onRenderCallback = (
    id: string,
    phase: "mount" | "update",
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Component ${id} ${phase}:`);
      console.log(`Actual duration: ${actualDuration.toFixed(2)}ms`);
      console.log(`Base duration: ${baseDuration.toFixed(2)}ms`);
    }
  };

  return (
    <Profiler id="Stats" onRender={onRenderCallback}>
      <Stats />
    </Profiler>
  );
} 