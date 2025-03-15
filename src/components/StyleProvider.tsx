'use client';

import { inter } from '@/app/fonts';

export function StyleProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className}>
      {children}
    </div>
  );
} 